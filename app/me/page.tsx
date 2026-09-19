import { redirect } from "next/navigation"
import { getCurrentUser } from "@/app/services/session"
import GenerateTokenButton from "./GenerateTokenButton"
import { markAsRead } from "../actions/blogs"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"

export default async function MePage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/login")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, currentUser.id),
    with: {
      readingList: {
        with: {
          blog: true
        }
      }
    }
  })

  if (!user) {
    redirect("/login")
  }

  const unreadBlogs = user.readingList.filter((item) => !item.read)
  const readBlogs = user.readingList.filter((item) => item.read)

  return (
    <main className="mx-auto mt-10 max-w-3xl px-6">
      <div className="rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">My Page</h1>

        <div data-testid="user-profile" className="space-y-3">
          <p data-testid="user-name">
            <strong>Name: </strong>
            {user.name}
          </p>

          <p data-testid="user-username">
            <strong>Username: </strong>
            {user.username}
          </p>

          <div data-testid="api-token-section" className="pt-4">
            <strong>API Token: </strong>
            <GenerateTokenButton initialToken={user.token} />
          </div>

          <div data-testid="reading-list-section" className="pt-6">
            <h2 className="mb-6 text-2xl font-bold">Reading List</h2>

            <div data-testid="unread-section" className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">Unread</h3>

              {unreadBlogs.length === 0 ? (
                <p
                  data-testid="empty-reading-list"
                  className="text-gray-600"
                >
                  <span data-testid="no-unread-blogs">No unread blogs.</span>
                </p>
              ) : (
                <div className="space-y-4">
                  {unreadBlogs.map((item) => (
                    <div
                      key={item.id}
                      className="rounded border border-gray-200 p-4"
                    >
                      <h4 className="text-lg font-semibold">
                        {item.blog.title}
                      </h4>

                      <p className="text-gray-700">
                        Author: {item.blog.author}
                      </p>

                      <a
                        href={item.blog.url}
                        className="text-blue-600 hover:underline"
                      >
                        {item.blog.url}
                      </a>

                      <form action={markAsRead} className="mt-3">
                        <input
                          type="hidden"
                          name="id"
                          value={item.id}
                        />

                        <button
                          type="submit"
                          data-testid={`mark-read-${item.id}`}
                          className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                          Mark as read
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">Read</h3>

              {readBlogs.length === 0 ? (
                <p className="text-gray-600">No read blogs.</p>
              ) : (
                <div className="space-y-4">
                  {readBlogs.map((item) => (
                    <div
                      key={item.id}
                      className="rounded border border-gray-200 p-4"
                    >
                      <h4 className="text-lg font-semibold">
                        {item.blog.title}
                      </h4>

                      <p className="text-gray-700">
                        Author: {item.blog.author}
                      </p>

                      <a
                        href={item.blog.url}
                        className="text-blue-600 hover:underline"
                      >
                        {item.blog.url}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}