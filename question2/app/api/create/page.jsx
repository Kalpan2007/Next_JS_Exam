export default async function CreatePost() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "Hello from kalpan",
      body: "Next.js API test to create a post",
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
      <h1>/api/create — POST</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
