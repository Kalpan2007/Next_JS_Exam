import { useRouter } from "next/router";

export default function BlogPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
      <h1>Blog Post ID: {id}</h1>
  );
}
