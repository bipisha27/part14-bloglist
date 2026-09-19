"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 px-6 py-4 text-white shadow-md">
      <Link href="/" className="mr-5 hover:text-blue-300">
        home
      </Link>

      {" | "}

      <Link href="/blogs" className="mr-5 hover:text-blue-300">
        blogs
      </Link>

      {" | "}

      <Link href="/users" className="mr-5 hover:text-blue-300">
        users
      </Link>

      {" | "}

      {session ? (
        <>
          <Link href="/blogs/new" className="mr-5 hover:text-blue-300">
            create new
          </Link>

          {" | "}

          <Link href="/me" className="mr-5 hover:text-blue-300">
          me 
          </Link>

          {" | "}

          <em className="mr-4 text-gray-300">
            {session.user?.name} logged in
          </em>

          {" "}

          <button
            onClick={() => signOut()}
            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="mr-5 hover:text-blue-300">
            login
          </Link>

          {" | "}

          <Link
            href="/register"
            className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
          >
            register
          </Link>
        </>
      )}
    </nav>
  )
}