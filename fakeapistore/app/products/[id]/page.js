"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-[#2a1e12] p-6 rounded-xl shadow-lg">
      <img src={product.image} alt={product.title} className="h-64 mx-auto object-contain mb-6" />
      <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{product.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
      <p className="text-2xl font-semibold text-orange-600 dark:text-orange-400">${product.price}</p>
    </div>
  );
}
