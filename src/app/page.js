import Counter from "@/app/components/Counter";

export default async function Home() {
  console.log("i am render");
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5`);
  const posts = await res.json();

  return (
    <div>
      <h2>I am jsx</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <hr />
      <Counter />
    </div>
  );
}
