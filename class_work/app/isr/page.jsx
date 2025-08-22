export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function ISRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <div>
      <h2 className="text-xl font-semibold">Incremental Static Regeneration (ISR)</h2>
      <p className="text-sm text-gray-500">This page updates every 60 seconds.</p>
      <ul className="mt-4 space-y-2">
        {posts.slice(0, 5).map((p) => (
          <li key={p.id} className="p-2 border rounded">{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
