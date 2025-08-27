import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "MF Dual Router Dashboard",
  description: "Next.js 15 App + Pages Router demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
          {children}
        </main>
      </body>
    </html>
  );
}
