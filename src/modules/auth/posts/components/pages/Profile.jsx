import { Link } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from "react";


function Profile() {

  const { user } =
    useAuthContext();


  const [myPosts, setMyPosts] =
    useState([]);


  useEffect(() => {

    const savedPosts =
      JSON.parse(
        localStorage.getItem(
          "thoughtspace_posts"
        )
      ) || [];


    const userPosts =
      savedPosts.filter(
        (post) =>
          post.authorId === user.id
      );


    setMyPosts(userPosts);

  }, [user]);


  return (
    <div className="mx-auto max-w-3xl px-5 py-14">

      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-600">

          {user.name.charAt(0)}

        </div>


        <h1 className="mt-5 text-2xl font-bold text-gray-900">

          {user.name}

        </h1>


        <p className="mt-1 text-gray-500">

          {user.email}

        </p>


        <div className="mx-auto my-7 max-w-xs rounded-xl bg-gray-50 p-4">

          <strong className="block text-2xl text-gray-900">

            {myPosts.length}

          </strong>

          <span className="text-sm text-gray-500">

            Posts

          </span>

        </div>


        <Link
          to="/create"
          className="inline-block rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Share a thought
        </Link>

      </div>

    </div>
  );
}

export default Profile;