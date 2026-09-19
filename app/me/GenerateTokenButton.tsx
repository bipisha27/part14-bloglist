"use client"

import { useState } from "react"
import { generateToken } from "../actions/users"

type GenerateTokenButtonProps = {
  initialToken: string | null
}

const GenerateTokenButton = ({
  initialToken,
}: GenerateTokenButtonProps) => {
  const [token, setToken] = useState(initialToken)

  const handleClick = async () => {
    const newToken = await generateToken()
    setToken(newToken)
  }

  return (
    <div>
      {token ? (
        <p
          data-testid="token-display"
          className="mt-2 break-all rounded bg-gray-100 p-3 font-mono text-sm"
        >
          <span data-testid="api-token">{token}</span>
        </p>
      ) : (
        <p
          data-testid="no-token-message"
          className="mt-2 text-gray-600"
        >
          No token has been generated yet.
        </p>
      )}

      <div className="pt-4">
        <button
          type="button"
          data-testid="generate-token-button"
          onClick={handleClick}
          className="rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Generate new token
        </button>
      </div>
    </div>
  )
}

export default GenerateTokenButton
