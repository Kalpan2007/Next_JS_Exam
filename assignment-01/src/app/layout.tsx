import { CssBaseline, Container } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech News",
  description: "Mini Assignment 1 - HN News",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          {children}
        </Container>
      </body>
    </html>
  );
}
