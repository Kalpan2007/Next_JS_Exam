import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 20, display: "grid", gap: 10 }}>
      <h1>Question 2: API Demo</h1>
      <Link href="/api/posts">/api/posts (GET)</Link>
      <Link href="/api/posts/3">/api/posts/3 (GET by ID)</Link>
      <Link href="/api/create">/api/create (POST)</Link>
      <Link href="/api/update/1">/api/update/1 (PUT)</Link>
      <Link href="/api/delete/1">/api/delete/1 (DELETE)</Link>
    </main>
  );
}
