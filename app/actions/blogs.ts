"use server"

import {redirect} from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { addBlog, likeBlog } from "../services/blogs"

type BlogFormState = {
  error: string 
  success?: string 
  values?: { title: string; author: string; url: string}
}

export const createBlog = async(
  prevData: { error: string},
  formData: FormData
): Promise<BlogFormState> => {
  const session = await auth()

  if(!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string 

  if(!title || title.length < 5) {
    return {error: "title must be at least 5 characters long.", values: {title, author, url}}
  }

  if(!author || author.length < 5) {
    return {error: "author must be at least 5 characters long.", values: {title, author, url}}
  }

  if(!url || url.length < 5) {
    return {error: "url must be at least 5 characters long.", values: {title, author, url}}
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")

  return { error: "", success: "Blog created successfully."}
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
}