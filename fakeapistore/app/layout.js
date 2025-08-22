import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "FakeStore Dashboard",
  description: "Next.js + TailwindCSS FakeStoreAPI Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        {/* Navbar */}
        <nav className="backdrop-blur-md bg-slate-900/70 border-b border-slate-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
                MyStore
              </span>
            </Link>

            {/* Links */}
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/products" className="hover:text-sky-400 transition">
                Products
              </Link>
              <Link href="/carts" className="hover:text-sky-400 transition">
                Carts
              </Link>
              <Link href="/users" className="hover:text-sky-400 transition">
                Users
              </Link>
            </div>

            {/* Right side */}
            <div className="flex gap-4 items-center">
              <Link
                href="/auth/login"
                className="text-sm font-medium hover:text-sky-400 transition"
              >
                Sign in
              </Link>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main className="max-w-7xl mx-auto px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
