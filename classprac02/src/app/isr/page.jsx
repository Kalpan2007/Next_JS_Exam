// This is an Incrementally Statically Regenerated (ISR) component.
// The data for this page will be fetched at build time, and then
// re-fetched in the background at most every 30 seconds.
export default async function BlogsPage() {
  // Fetch posts from the JSONPlaceholder API.
  // The `next: { revalidate: 30 }` option enables ISR, telling Next.js
  // to regenerate the page if a request comes in after 30 seconds.
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 30 },
  });
  const posts = await res.json();

  return (
    <main className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">ISR Posts Example</h1>
        <p className="text-sm text-gray-600">This page revalidates every 30 seconds.</p>
        <ul className="space-y-3 mt-4">
          {/* We slice the first 5 posts and map over them to render list items. */}
          {/* In JSX, we remove the TypeScript type annotation `: any` from the parameter `p`. */}
          {posts.slice(0, 5).map((p) => (
            <li key={p.id} className="p-3 bg-gray-100 rounded-md text-gray-700">
              {p.title}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
