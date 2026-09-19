"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {})

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction} noValidate>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values?.username}
            />
          </label>
          {state.errors?.username && (
            <p data-testid="username-error" style={{ color: "red" }}>
              {state.errors.username}
            </p>
          )}
        </div>

        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              defaultValue={state.values?.name}
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          {state.errors?.password && (
            <p data-testid="password-error" style={{ color: "red" }}>
              {state.errors.password}
            </p>
          )}
        </div>

        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" />
          </label>
          {state.errors?.passwordConfirm && (
            <p data-testid="passwordConfirm-error" style={{ color: "red" }}>
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>

        <button type="submit" data-testid="register-button">
          Register
        </button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}