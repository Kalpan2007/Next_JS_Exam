import { getUser } from "@/lib/api";

export default async function UserPage({ params }) {
  const user = await getUser(params.id);

  return (
    <div className="max-w-lg mx-auto bg-slate-800 p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">{user.name.firstname} {user.name.lastname}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p className="mt-2">Address: {user.address.city}, {user.address.street}</p>
    </div>
  );
}
