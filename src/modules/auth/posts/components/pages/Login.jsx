import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import useApi from "../../../../../shared/useApi";

function Login() {

  const api = useApi();
  const authContext = useAuthContext();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");


  function handleChange(event) {

    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

  }


  async function handleSubmit(event) {

    event.preventDefault();

    setError("");

    try {

      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      authContext.setAccessToken(
        response.data.accessToken
      );

      authContext.setUser(
        response.data.data.user
      );

      navigate("/");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }
  }


  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

      <div className="mx-auto w-full max-w-md">

        <div className="mb-6 text-center">

          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            Welcome back
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
            Login
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-gray-500">
            Login to continue sharing your thoughts on ThoughtSpace.
          </p>

        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >

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
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              />

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
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
              />

            </div>


            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}


            <button
              type="submit"
              className="mt-1 w-full rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 active:bg-purple-800 cursor-pointer"
            >
              Login
            </button>

          </form>


          <p className="mt-5 text-center text-sm text-gray-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-purple-600 hover:text-purple-700 hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}

export default Login;