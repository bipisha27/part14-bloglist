import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { getCurrentUser } from "../../services/session"
import { likeBlogAction, addToReadingList } from "../../actions/blogs"

const BlogPage = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params
  const blog = await getBlogById(Number(id))
  const user = await getCurrentUser()

  if (!blog) {
    notFound()
  }

  const isOwner = user?.id === blog.userId

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">
          {blog.title}
        </h2>

        <p className="mb-3 text-gray-700">
          <span className="font-semibold">Author:</span> {blog.author}
        </p>

        <p className="mb-4 text-gray-700">
          <span className="font-semibold">URL:</span>{" "}
          <a
            href={blog.url}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {blog.url}
          </a>
        </p>

        <p className="mb-5 text-gray-700">
          <span className="font-semibold">Likes:</span> {blog.likes}
        </p>

        <div className="flex gap-3">
          <form action={likeBlogAction}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              Like
            </button>
          </form>

          {user && !isOwner && (
            <form action={addToReadingList}>
              <input type="hidden" name="blogId" value={blog.id} />
              <button
                type="submit"
                className="rounded bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
              >
                Add to reading list
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage