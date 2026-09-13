import { Link } from "react-router";

import { useAuth } from "../../../context/AuthContext";

import { useEffect, useState } from "react";

function Profile() {
  const { user } = useAuth();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const savedPosts =
      JSON.parse(
        localStorage.getItem("thoughtspace_posts")
      ) || [];

    const userPosts = savedPosts.filter(
      (post) => post.authorId === user.id
    );

    setMyPosts(userPosts);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-12">

      <div className="mx-auto max-w-3xl">

        {/* Profile Card */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

          {/* Avatar */}

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-3xl font-bold text-violet-600">

            {user.name.charAt(0).toUpperCase()}

          </div>


          {/* User Information */}

          <h1 className="mt-5 text-2xl font-bold text-gray-900">

            {user.name}

          </h1>


          <p className="mt-1 text-gray-500">

            {user.email}

          </p>


          {/* Stats */}

          <div className="mx-auto my-7 max-w-xs rounded-xl bg-gray-50 p-5">

            <p className="text-3xl font-bold text-gray-900">

              {myPosts.length}

            </p>

            <p className="mt-1 text-sm text-gray-500">

              Thoughts Shared

            </p>

          </div>


          {/* Create Post */}

          <Link
            to="/create"
            className="inline-block rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
          >

            Share a Thought

          </Link>

        </div>


        {/* My Posts */}

        <div className="mt-10">

          <h2 className="mb-5 text-2xl font-bold text-gray-900">

            My Thoughts

          </h2>


          {myPosts.length === 0 ? (

            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">

              <p className="text-gray-500">

                You haven't shared any thoughts yet.

              </p>


              <Link
                to="/create"
                className="mt-4 inline-block font-semibold text-violet-600"
              >

                Share your first thought →

              </Link>

            </div>

          ) : (

            <div className="space-y-4">

              {myPosts.map((post) => (

                <div
                  key={post.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >

                  <div className="mb-3 flex items-center justify-between">

                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">

                      {post.category}

                    </span>


                    <span className="text-xs text-gray-400">

                      {post.createdAt}

                    </span>

                  </div>


                  <p className="leading-7 text-gray-700">

                    {post.content}

                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;