import {
  Link,
  NavLink,
  useNavigate,
} from "react-router";

import { useAuthContext } from "../modules/auth/context/AuthContext";


function Navbar() {
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();


  function handleLogout() {
    logout();

    navigate("/");
  }


  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">

        {/* Logo */}

        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Thought<span className="text-violet-600">Space</span>
        </Link>


        {/* Navigation */}

        <nav className="flex items-center gap-5 text-sm font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-violet-600"
                : "text-gray-600 hover:text-violet-600"
            }
          >
            Home
          </NavLink>


          {user ? (
            <>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600"
                    : "text-gray-600 hover:text-violet-600"
                }
              >
                Create
              </NavLink>


              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600"
                    : "text-gray-600 hover:text-violet-600"
                }
              >
                Profile
              </NavLink>


              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-gray-600 hover:text-violet-600"
              >
                Login
              </NavLink>

              <Link
                to="/register"
                className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
              >
                Join
              </Link>
            </>
          )}

        </nav>

      </div>

    </header>
  );
}

export default Navbar;