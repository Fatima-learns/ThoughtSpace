import { useState } from "react";

import { useAuthContext } from "../../context/AuthContext";

import PostForm from "./PostForm";


function PostCard({
  post,
  onUpdate,
  onDelete,
}) {

  const { user } = useAuthContext();

  const [editing, setEditing] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);


  const isOwner =
    user && user.id === post.authorId;


  function handleUpdate(updatedData) {

    onUpdate(
      post.id,
      updatedData
    );

    setEditing(false);

  }


  function handleDelete() {

    onDelete(post.id);

    setShowDeleteModal(false);

  }


  if (editing) {

    return (
      <PostForm
        initialPost={post}

        onSubmit={handleUpdate}

        onCancel={() =>
          setEditing(false)
        }
      />
    );

  }


  return (
    <>
      <article className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">


        <div className="flex items-start justify-between gap-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-600 sm:h-11 sm:w-11">

              {post.author.charAt(0)}

            </div>


            <div className="min-w-0">

              <h3 className="truncate font-semibold text-gray-900">

                {post.author}

              </h3>


              <p className="text-xs text-gray-500">

                {post.createdAt}

              </p>

            </div>

          </div>


          <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">

            {post.category}

          </span>

        </div>



        <p className="my-5 leading-7 text-gray-700 sm:my-6">

          {post.content}

        </p>



        {isOwner && (

          <div className="flex gap-2 border-t border-gray-100 pt-4">

            <button
              onClick={() =>
                setEditing(true)
              }
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 cursor-pointer"
            >
              Edit
            </button>


            <button
              onClick={() =>
                setShowDeleteModal(true)
              }
              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 cursor-pointer"
            >
              Delete
            </button>

          </div>

        )}

      </article>



      {showDeleteModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-lg font-bold text-gray-900">
              Delete post?
            </h2>


            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>


            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default PostCard;