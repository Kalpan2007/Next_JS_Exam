import Link from "next/link";
import { getUsers } from "@/lib/api";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((u) => (
          <Link
            key={u.id}
            href={`/users/${u.id}`}
            className="bg-slate-800 rounded-xl p-4 shadow hover:scale-[1.02] transition"
          >
            <h2 className="font-bold">{u.name.firstname} {u.name.lastname}</h2>
            <p className="text-gray-400 text-sm">{u.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
