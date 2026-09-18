"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

const NewBlog = () => {
  const router = useRouter()
  const [state, formAction] = useActionState(createBlog, { error: "" })
  const { showNotification } = useNotification()

useEffect(() => {
  if (state.error) {
    showNotification(state.error, "error")
  }

  if(state.success) {
    showNotification(state.success, "success")
    router.push('/blogs')
  }
}, [state, showNotification, router])

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Create a new blog</h2>
      <form action={formAction} className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-md">
        <div className="mb-5">
          <label className="mb-2 block font-semibold text-gray-700">
            Title
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
              className="w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-5">
          <label className="mb-2 block font-semibold text-gray-700">
            Author
            <input
              type="text"
              name="author"
              required
              minLength={5}
              defaultValue={state.values?.author}
              className="w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none" />
          </label>
        </div>
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-gray-700">
            Url
            <input
              type="text"
              name="url"
              required
              minLength={5}
              defaultValue={state.values?.url}
              className="w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
        </div>
        <button type="submit" className="rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700">Create</button>
      </form>
    </div>
  )
}

export default NewBlog
