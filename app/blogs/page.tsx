import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <Link href="/blogs/new">Create a new blog</Link>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <strong>{blog.title}</strong> by {blog.author}, {blog.likes} likes 
            <br />
            <a href={blog.url}>{blog.url}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs