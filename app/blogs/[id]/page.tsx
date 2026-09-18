import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { likeBlogAction } from "../../actions/blogs";


const BlogPage = async ({params}: {params: Promise<{id:string}> }) => {
  const {id} = await params
  const blog = await getBlogById(Number(id))

  if(!blog) {
    notFound()
  }

  return(
    <div className="mx-auto max-w-3xl px-6 py-8">
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">{blog.title}</h2>
      <p className="mb-3 text-gray-700">
       <span className="font-semibold"> Author: </span> {blog.author}</p>
      <p className="mb-4 text-gray-700">
        <span className="font-semibold">URL:</span>{" "} <a href={blog.url} className="text-blue-600 hover:text-blue-800 hover:underline" > {blog.url} </a>
      </p>
      <p className="mb-5 text-gray-700">
       <span className="font-semibold">Likes: 
       </span> {blog.likes} </p> 
      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700">Like</button>
      </form>
    </div>
    </div>
  )
}

export default BlogPage