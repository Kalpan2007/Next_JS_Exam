import React, { Suspense } from "react";
import Reviews from "./components/Review"; // This import will now work correctly

// The main page component remains a Server Component.
// It fetches product data on the server.
export default async function ProductPage({ params }) {
  // Fetch product details with Incremental Static Regeneration (ISR).
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return <p>Product not found.</p>;
  }
  const product = await res.json();

  return (
    <main className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>
        
        {/* Suspense boundary still works perfectly for the imported client component */}
        <Suspense fallback={<p className="mt-8 text-gray-500">Loading reviews section...</p>}>
          <Reviews productId={params.id} />
        </Suspense>
      </div>
    </main>
  );
}

// This function for pre-generating pages remains unchanged in `page.jsx`.
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  
  return products.slice(0, 20).map((p) => ({ id: String(p.id) }));
}
