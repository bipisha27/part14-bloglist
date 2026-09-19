import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 }
    )
  }

  const body = await request.json()

  if (!body.username || !body.name || !body.password) {
    return NextResponse.json(
      { error: "username, name and password are required" },
      { status: 400 }
    )
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const [user] = await db
    .insert(users)
    .values({
      username: body.username,
      name: body.name,
      passwordHash
    })
    .returning()

  return NextResponse.json(
    {
      id: user.id,
      username: user.username,
      name: user.name
    },
    { status: 201 }
  )
}
