"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const colorClass = type === "success" ? "bg-green-600" : "bg-red-600"
  const testId = type === "success" ? "notification" : "error-message"

  return (
    <div
      data-testid={testId}
      className={`px-4 py-2 mb-2 rounded text-white ${colorClass}`}
    >
      {message}
    </div>
  )
}