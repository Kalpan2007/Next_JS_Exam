"use client";

import { useState, useEffect } from "react";

export default function CSRPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data.slice(0, 5));
    }
    loadData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Client-Side Rendering (CSR)</h2>
      <ul className="mt-4 space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="p-2 border rounded">{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
