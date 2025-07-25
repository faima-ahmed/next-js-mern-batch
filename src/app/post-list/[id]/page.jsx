import React from "react";
import async from "./../../page";

const PostDetails = async ({ params }) => {
  const { id } = await params;
  console.log(id, "id");
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return (
    <div>
      <h2>Post Details of post - {id}</h2>
      <p>Post Body - {post.body}</p>
    </div>
  );
};

export async function generateStaticParams() {
  console.log("i am running");

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5`
  );
  const posts = await res.json();
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default PostDetails;
