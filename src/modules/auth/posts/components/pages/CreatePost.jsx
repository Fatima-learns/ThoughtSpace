import { useNavigate } from "react-router";

import { useAuthContext } from "../../../context/AuthContext";

import PostForm from "../PostForm";


function CreatePost() {

  const { user } = useAuthContext();

  const navigate = useNavigate();


  function handleCreate(postData) {

    const savedPosts =
      JSON.parse(
        localStorage.getItem(
          "thoughtspace_posts"
        )
      ) || [];


    const newPost = {

      id: Date.now(),

      content: postData.content,

      category: postData.category,

      author: user.name,

      authorId: user.id,

      createdAt:
        new Date()
          .toISOString()
          .split("T")[0],

    };


    localStorage.setItem(

      "thoughtspace_posts",

      JSON.stringify([
        newPost,
        ...savedPosts,
      ])

    );


    navigate("/");

  }


  return (
    <div className="mx-auto max-w-3xl px-5 py-14">

      <p className="text-sm font-bold uppercase tracking-widest text-violet-600">

        Create

      </p>


      <h1 className="mt-2 text-4xl font-bold text-gray-900">

        Share your thought

      </h1>


      <p className="mt-3 mb-8 text-gray-600">

        Write something useful, honest,
        encouraging or interesting.

      </p>


      <PostForm
        onSubmit={handleCreate}
      />

    </div>
  );
}

export default CreatePost;