import { getCart } from "@/lib/api";

export default async function CartPage({ params }) {
  const cart = await getCart(params.id);

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Cart #{cart.id}</h1>
      <p className="text-gray-300 mb-2">User ID: {cart.userId}</p>
      <ul className="space-y-2">
        {cart.products.map((p, idx) => (
          <li key={idx} className="flex justify-between bg-slate-700 p-3 rounded">
            <span>Product ID: {p.productId}</span>
            <span>Qty: {p.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
