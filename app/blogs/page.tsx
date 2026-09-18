import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const allBlogs = await getBlogs()

  const blogs = filter
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : allBlogs

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Blogs</h2>
      <Link href="/blogs/new" className="mb-6 inline-block rounded bg-blue-200 px-4 py-2 font-medium text-white hover:bg-blue-400">Create a new blog</Link>

      <form action="/blogs" className="mb-8 flex gap-3">
        <input type="text" name="filter" defaultValue={filter} placeholder="Search by title ..." className="flex-1 rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"/>
        <button type="submit" className="rounded bg-gray-700 px-5 py-2 text-white hover:bg-gray-800">Search</button>
      </form>

      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <Link href={`/blogs/${blog.id}`} className="text-xl font-semibold text-blue-600 hover:text-blue-800">{blog.title}</Link> <p className="mt-2 text-gray-600"> by {blog.author}, {blog.likes} likes
            </p>
            <br />
            <a href={blog.url} className="text-sm text-gray-500 hover:text-blue-600">{blog.url}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs