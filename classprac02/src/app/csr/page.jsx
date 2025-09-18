"use client";

import { useEffect, useState } from "react";

export default function CSRPostsPage() {
  // State to store the posts. Initialized as an empty array.
  // In JSX, we remove the TypeScript type annotation `<any[]>`.
  const [posts, setPosts] = useState([]);
  
  // State to handle the loading indicator.
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch data when the component mounts.
  useEffect(() => {
    async function load() {
      try {
        // Fetch posts from the JSONPlaceholder API.
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        
        // Store the first 10 posts in the state.
        setPosts(data.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        // Set loading to false after the fetch is complete (or fails).
        setLoading(false);
      }
    }
    
    // Call the async function.
    load();
  }, []); // The empty dependency array ensures this runs only once on mount.

  return (
    <main className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">CSR Posts Example</h1>
        {loading ? (
          <p className="text-gray-500">Loading posts...</p>
        ) : (
          <ul className="space-y-3">
            {posts.map(post => (
              <li key={post.id} className="p-3 bg-gray-100 rounded-md text-gray-700">
                {post.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
