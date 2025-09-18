// This is a Server-Side Rendered (SSR) component.
// The `async` keyword on the function component is a Next.js feature
// that allows for fetching data directly within the component on the server.
export default async function SSRPostsPage() {
  // Fetch posts from the JSONPlaceholder API.
  // { cache: "no-store" } ensures that the data is fetched fresh on every request.
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  const posts = await res.json();

  return (
    <main className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">SSR Posts Example</h1>
        <ul className="space-y-3">
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
