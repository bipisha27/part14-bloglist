const blogs = [
  { id: 1, title: 'Learning Next.js', author: 'Efra', url: 'http://example.com/1', likes: 5 },
  { id: 2, title: 'Understanding App Router', author: 'Sylvia', url: 'http://example.com/2', likes: 3 },
  { id: 3, title: 'Why Git Is Confusing', author: 'Ella', url: 'http://example.com/3', likes: 10 },
]

let nextId = 4

export const getBlogs = () => {
  return blogs 
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({id: nextId++, title, author, url, likes: 0})
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}