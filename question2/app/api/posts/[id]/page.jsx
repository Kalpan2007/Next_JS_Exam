export default async function PostDetail({ params }) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });
  const post = await res.json();

  return (
    <main style={{ padding: 20 }}>
      <h1>/api/posts/{id} — GET</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </main>
  );
}
