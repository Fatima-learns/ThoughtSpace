import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "../modules/auth/posts/components/pages/Home";
import Login from "../modules/auth/posts/components/pages/Login";
import Register from "../modules/auth/pages/register";
import Profile from "../modules/auth/posts/components/pages/Profile";
import CreatePost from "../modules/auth/posts/components/pages/CreatePost";
import ProtectedRoute from "../modules/auth/components/ProtectedRoute";


const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    children: [

      {
        index: true,

        element: <Home />,
      },

      {
        path: "login",

        element: <Login />,
      },

      {
        path: "register",

        element: <Register />,
      },

      {
        element: <ProtectedRoute />,

        children: [

          {
            path: "create",

            element: <CreatePost />,
          },

          {
            path: "profile",

            element: <Profile />,
          },

        ],
      },

    ],
  },
]);


export default router;