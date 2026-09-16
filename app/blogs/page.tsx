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
    <div>
      <h2>Blogs</h2>
      <Link href="/blogs/new">Create a new blog</Link>

      <form action="/blogs">
        <input type="text" name="filter" defaultValue={filter} placeholder="Search by title ..." />
        <button type="submit">Search</button>
      </form>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}, {blog.likes} likes
            <br />
            <a href={blog.url}>{blog.url}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs