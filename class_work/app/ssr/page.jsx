export const dynamic = "force-dynamic"; // Ensures SSR

export default async function SSRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // No caching → SSR
  });
  const posts = await res.json();

  return (
    <div>
      <h2 className="text-xl font-semibold">Server-Side Rendering (SSR)</h2>
      <ul className="mt-4 space-y-2">
        {posts.slice(0, 5).map((p) => (
          <li key={p.id} className="p-2 border rounded">{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
