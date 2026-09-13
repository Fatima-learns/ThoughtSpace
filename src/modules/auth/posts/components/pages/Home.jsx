import { useEffect, useState } from "react";

import postsData from "../../../../../data/post";

import PostCard from "../PostCard";


const categories = [
  "All",
  "Advice",
  "Experience",
  "Motivation",
  "Learning",
  "Other",
];


function Home() {

  const [posts, setPosts] =
    useState(() => {

      const savedPosts =
        localStorage.getItem(
          "thoughtspace_posts"
        );


      if (savedPosts) {

        return JSON.parse(savedPosts);

      }


      localStorage.setItem(
        "thoughtspace_posts",
        JSON.stringify(postsData)
      );


      return postsData;

    });


  const [category, setCategory] =
    useState("All");


  useEffect(() => {

    localStorage.setItem(
      "thoughtspace_posts",
      JSON.stringify(posts)
    );

  }, [posts]);


  function handleUpdate(
    id,
    updatedData
  ) {

    setPosts((currentPosts) =>

      currentPosts.map((post) =>

        post.id === id

          ? {
              ...post,
              ...updatedData,
            }

          : post

      )

    );

  }


  function handleDelete(id) {

    setPosts((currentPosts) =>

      currentPosts.filter(
        (post) =>
          post.id !== id
      )

    );

  }


  const filteredPosts =
    category === "All"

      ? posts

      : posts.filter(
          (post) =>
            post.category === category
        );


  return (
    <div className="mx-auto max-w-6xl px-5">

      {/* Hero */}

      <section className="py-16 md:py-24">

        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-violet-600">

          A place for ideas

        </p>


        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">

          Share something worth sharing.

        </h1>


        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">

          Thoughts, advice, experiences and
          lessons from people learning through life.

        </p>

      </section>


      {/* Feed header */}

      <section className="mb-7">

        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">

          Community

        </p>


        <h2 className="mt-1 text-2xl font-bold text-gray-900">

          Latest thoughts

        </h2>


        {/* Filters */}

        <div className="mt-5 flex flex-wrap gap-2">

          {categories.map((item) => (

            <button
              key={item}
              onClick={() =>
                setCategory(item)
              }
              className={`
                rounded-full px-4 py-2 text-sm font-semibold transition
                ${
                  category === item
                    ? "bg-violet-600 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-600"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>

      </section>


      {/* Posts */}

      <section className="mx-auto max-w-3xl pb-16">

        {filteredPosts.length > 0 ? (

          filteredPosts.map((post) => (

            <PostCard
              key={post.id}
              post={post}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />

          ))

        ) : (

          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

            <h3 className="font-bold text-gray-900">
              No posts found
            </h3>

            <p className="mt-2 text-gray-500">
              Try another category.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default Home;