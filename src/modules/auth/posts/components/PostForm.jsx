import { useState } from "react";


const categories = [
  "Advice",
  "Experience",
  "Motivation",
  "Learning",
  "Other",
];


function PostForm({
  initialPost = null,
  onSubmit,
  onCancel,
}) {

  const [content, setContent] = useState(
    initialPost?.content || ""
  );

  const [category, setCategory] = useState(
    initialPost?.category || "Advice"
  );


  function handleSubmit(event) {

    event.preventDefault();


    if (!content.trim()) {
      return;
    }


    onSubmit({
      content: content.trim(),

      category,
    });

  }


  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >

      <h2 className="mb-5 text-xl font-bold text-gray-900">

        {initialPost
          ? "Edit your thought"
          : "Share something worth sharing"}

      </h2>


      <div className="mb-5">

        <label
          htmlFor="content"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Your thought
        </label>


        <textarea
          id="content"
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="Share an idea, lesson, experience or advice..."
          maxLength={500}
          className="min-h-40 w-full resize-y rounded-xl border border-gray-300 p-4 text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />

        <p className="mt-2 text-right text-xs text-gray-400">
          {content.length}/500
        </p>

      </div>


      <div className="mb-6">

        <label
          htmlFor="category"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Category
        </label>


        <select
          id="category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-violet-500"
        >

          {categories.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>


      <div className="flex gap-3">

        <button
          type="submit"
          className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          {initialPost
            ? "Save Changes"
            : "Share Post"}
        </button>


        {onCancel && (

          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>

        )}

      </div>

    </form>
  );
}

export default PostForm;