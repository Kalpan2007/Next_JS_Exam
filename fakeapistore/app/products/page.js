import Link from "next/link";
import { getProducts } from "@/lib/api";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="bg-slate-800 rounded-xl shadow hover:shadow-lg hover:scale-105 transition p-4 flex flex-col"
          >
            <img
              src={p.image}
              alt={p.title}
              className="h-40 object-contain mx-auto"
            />
            <h2 className="mt-4 font-semibold line-clamp-2">{p.title}</h2>
            <p className="text-sky-400 font-bold mt-2">${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
