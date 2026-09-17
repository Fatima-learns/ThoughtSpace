import React, { useState } from 'react'
import useApi from '../../../shared/useApi'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router'

const Register = () => {

  const api = useApi()
  const authContext = useAuthContext()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password
      })

      authContext.setAccessToken(response.data.accessToken)
      authContext.setUser(response.data.data.user)

      navigate("/profile")

    }catch (error) {
        setError("Email already exists")
      }
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

      <div className="mx-auto w-full max-w-md">

        <div className="mb-4 text-center">

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Create an account
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-gray-500">
            Join ThoughtSpace and share your thoughts with the community.
          </p>

        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
          >

            <div className="flex flex-col gap-2">

              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-800"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              />

            </div>

            <div className="flex flex-col gap-2">

              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-800"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              />

                  {error && (
      <p className="text-sm text-red-600">
        {error}
      </p>
    )}

            </div>


          
            <div className="flex flex-col gap-2">

              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-800"
              >
                Password
              </label>

              <input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              />

            </div>


            <button
              type="submit"
              className="mt-1 w-full rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 active:bg-purple-800 cursor-pointer"
            >
              Create Account
            </button>

          </form>


          <p className="mt-5 text-center text-sm text-gray-500">

            Already have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-purple-600 transition hover:text-purple-700 hover:underline cursor-pointer"
            >
              Login
            </button>

          </p>

        </div>

      </div>

    </main>
  )
}

export default Register