import "./globals.css";

export const metadata = {
  title: "Next.js 15 Data Fetching Demo",
  description: "CSR, SSR, ISR, and CSR with useEffect",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
