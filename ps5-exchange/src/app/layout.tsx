import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "PS5 Game Exchange",
  description: "Buy and sell PS5 games from trusted players.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Providers>
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
          <main className="container py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

