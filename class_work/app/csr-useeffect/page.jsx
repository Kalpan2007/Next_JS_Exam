"use client";

import { useState, useEffect } from "react";

export default function UseEffectCSRPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    }
    loadUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">CSR using useEffect Hook</h2>
      <ul className="mt-4 space-y-2">
        {users.map((u) => (
          <li key={u.id} className="p-2 border rounded">
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
