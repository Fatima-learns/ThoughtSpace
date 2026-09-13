import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router";

import { useAuth } from "../context/AuthContext";


function Register() {

  const { register } =
    useAuth();

  const navigate =
    useNavigate();


  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });


  const [error, setError] =
    useState("");


  function handleChange(event) {

    setForm({
      ...form,

      [event.target.name]:
        event.target.value,
    });

  }


  function handleSubmit(event) {

    event.preventDefault();

    setError("");


    if (form.password.length < 6) {

      setError(
        "Password must be at least 6 characters."
      );

      return;

    }


    const result =
      register(
        form.name,
        form.email,
        form.password
      );


    if (!result.success) {

      setError(
        result.message
      );

      return;

    }


    navigate("/");

  }


  return (
    <div className="flex min-h-[calc(100vh-130px)] items-center justify-center px-5 py-12">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
      >

        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">

          Join ThoughtSpace

        </p>


        <h1 className="mt-2 text-3xl font-bold text-gray-900">

          Create an account

        </h1>


        <div className="mt-7 space-y-5">

          <div>

            <label className="mb-2 block text-sm font-semibold">
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-violet-500"
            />

          </div>


          <div>

            <label className="mb-2 block text-sm font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-violet-500"
            />

          </div>


          <div>

            <label className="mb-2 block text-sm font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-violet-500"
            />

          </div>

        </div>


        {error && (

          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>

        )}


        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Create Account
        </button>


        <p className="mt-5 text-center text-sm text-gray-500">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-violet-600"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;