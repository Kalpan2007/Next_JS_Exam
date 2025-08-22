import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-900 to-slate-950 pointer-events-none"></div>

      {/* Hero */}
      <section className="relative z-10 text-center py-28">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          My First Next.js Project 🚀
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          A modern demo app using{" "}
          <span className="text-sky-400 font-semibold">Next.js 15</span> +
          <span className="text-indigo-400 font-semibold"> TailwindCSS</span>,
          fetching data from{" "}
          <span className="text-purple-400 font-semibold">FakeStore API</span>.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="/products"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-semibold shadow-lg transition"
          >
            Browse Products
          </Link>
          <Link
            href="/users"
            className="px-6 py-3 rounded-full border border-slate-700 hover:border-sky-500 text-gray-300 hover:text-sky-400 font-semibold transition"
          >
            Explore Users
          </Link>
        </div>
      </section>
    </div>
  );
}
