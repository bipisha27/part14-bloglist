"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "../services/session"

type RegisterFormState = {
  error: string
  values?: { username: string; name: string}
}

export const registerUser = async(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const values = {username, name}

  if(!username || username.length < 4) {
    return {error: "Username must be at least 4 characters long.", values}
  }

  if(!password || password.length < 4) {
    return {error: "Password must be at least 4 characters long.", values}
  }

  if(password != passwordConfirm) {
    return {error: "Passwords do not match.", values}
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username)
  })

  if(existingUser) {
    return {error: "Username already exists.", values}
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({username, name, passwordHash})

  redirect("/login")
}

export const generateToken = async () => {
  const user = await getCurrentUser()

  if(!user) {
    redirect("/login")
  }

  const token = crypto.randomUUID()

  await db
    .update(users)
    .set({token})
    .where(eq(users.id, user.id))

  revalidatePath("/me")
}