export default async function UpdatePost({ params }) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      title: "Updated Title",
      body: "Updated body content",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }, 
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <main style={{ padding: 20 }}>
      <h1>/api/update/{id} — PUT</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
