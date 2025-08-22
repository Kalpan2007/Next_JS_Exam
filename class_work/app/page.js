export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-500 via-sky-700 to-gray-900 text-white flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-sky-100">
          Welcome to Next.js 15 🚀
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Explore Data Fetching methods: CSR, SSR, ISR, and useEffect (CSR).
        </p>
      </section>

      {/* Navigation Buttons */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <a
          href="/csr"
          className="p-6 rounded-2xl bg-gray-800 hover:bg-sky-600 transition shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold">CSR</h2>
          <p className="text-gray-300">Client-Side Rendering Example</p>
        </a>

        <a
          href="/ssr"
          className="p-6 rounded-2xl bg-gray-800 hover:bg-sky-600 transition shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold">SSR</h2>
          <p className="text-gray-300">Server-Side Rendering Example</p>
        </a>

        <a
          href="/isr"
          className="p-6 rounded-2xl bg-gray-800 hover:bg-sky-600 transition shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold">ISR</h2>
          <p className="text-gray-300">Incremental Static Regeneration</p>
        </a>

        <a
          href="/useeffect-csr"
          className="p-6 rounded-2xl bg-gray-800 hover:bg-sky-600 transition shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold">useEffect + CSR</h2>
          <p className="text-gray-300">CSR with useEffect Hook</p>
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-gray-400 text-sm">
        Built with ❤️ using Next.js 15 & Tailwind CSS
      </footer>
    </main>
  );
}
