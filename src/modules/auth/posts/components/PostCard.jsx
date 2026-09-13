import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import PostForm from "./PostForm";


function PostCard({
  post,
  onUpdate,
  onDelete,
}) {

  const { user } = useAuth();

  const [editing, setEditing] =
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

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this post?"
      );


    if (confirmed) {

      onDelete(post.id);

    }

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
    <article className="mb-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Author */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-600">

            {post.author.charAt(0)}

          </div>


          <div>

            <h3 className="font-semibold text-gray-900">

              {post.author}

            </h3>


            <p className="text-xs text-gray-500">

              {post.createdAt}

            </p>

          </div>

        </div>


        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">

          {post.category}

        </span>

      </div>


      {/* Content */}

      <p className="my-6 leading-7 text-gray-700">

        {post.content}

      </p>


      {/* Actions */}

      {isOwner && (

        <div className="flex gap-2 border-t border-gray-100 pt-4">

          <button
            onClick={() =>
              setEditing(true)
            }
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Edit
          </button>


          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            Delete
          </button>

        </div>

      )}

    </article>
  );
}

export default PostCard;