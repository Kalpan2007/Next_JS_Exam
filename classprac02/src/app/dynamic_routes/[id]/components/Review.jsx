"use client";

import React from "react";

// This is a dedicated Client Component for reviews.
export default function Reviews({ productId }) {
  // State to store the review items.
  const [items, setItems] = React.useState([]);

  // useEffect hook to fetch reviews when the component mounts or productId changes.
  React.useEffect(() => {
    // This fetch happens on the client's browser.
    fetch(`https://fakestoreapi.com/products/${productId}/reviews`)
      .then(res => {
        // The API might not return valid JSON if there are no reviews
        if (res.ok) {
          return res.json();
        }
        return []; // Return an empty array on failure
      })
      .then(data => {
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch(error => console.error("Failed to fetch reviews:", error));
  }, [productId]); // Dependency array ensures this runs when productId changes.

  return (
    <section className="mt-8">
      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 border-b pb-2">Reviews</h3>
      {items.length > 0 ? (
        <div className="space-y-4 mt-4">
          {items.map((r, i) => (
            <p key={i} className="p-3 bg-gray-100 rounded-md text-gray-700">{r.comment || "No comment text."}</p>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading reviews...</p>
      )}
    </section>
  );
}
