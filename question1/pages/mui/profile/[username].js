import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  return (
    <div style={{ padding: 24 }}>
      <h1>Profile Page: {username}</h1>
    </div>
  );
}
