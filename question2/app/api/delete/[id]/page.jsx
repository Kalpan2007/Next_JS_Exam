export default async function DeletePost({ params }) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <main style={{ padding: 20 }}>
      <h1>/api/delete/{id} — DELETE</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
