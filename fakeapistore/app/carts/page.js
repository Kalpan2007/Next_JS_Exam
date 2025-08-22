import Link from "next/link";
import { getCarts } from "@/lib/api";

export default async function CartsPage() {
  const carts = await getCarts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Carts</h1>
      <div className="space-y-4">
        {carts.slice(0, 10).map((cart) => (
          <Link
            key={cart.id}
            href={`/carts/${cart.id}`}
            className="block bg-slate-800 p-4 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition"
          >
            <p className="font-semibold">Cart #{cart.id}</p>
            <p className="text-gray-400 text-sm">
              User: {cart.userId} | Products: {cart.products.length}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
