export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  const posts = await res.json();

  return (
    <main style={{ padding: 20 }}>
      <h1>/api/posts — GET</h1>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id} style={{ marginBottom: 10 }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
