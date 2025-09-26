import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PS5 Game Exchange - Buy & Sell PS5 Games",
  description: "The trusted marketplace for buying and selling PS5 games in first-class condition. Connect with gamers, find great deals, and give your games a new home.",
  keywords: "PS5 games, buy PS5 games, sell PS5 games, PlayStation 5, game marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/about" className="hover:text-gray-900">About Us</a></li>
                  <li><a href="/how-it-works" className="hover:text-gray-900">How It Works</a></li>
                  <li><a href="/trust-safety" className="hover:text-gray-900">Trust & Safety</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/help" className="hover:text-gray-900">Help Center</a></li>
                  <li><a href="/contact" className="hover:text-gray-900">Contact Us</a></li>
                  <li><a href="/faq" className="hover:text-gray-900">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/terms" className="hover:text-gray-900">Terms of Service</a></li>
                  <li><a href="/privacy" className="hover:text-gray-900">Privacy Policy</a></li>
                  <li><a href="/cookies" className="hover:text-gray-900">Cookie Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                  <li><a href="#" className="hover:text-gray-900">Discord</a></li>
                  <li><a href="#" className="hover:text-gray-900">Reddit</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
              <p>© 2025 PS5 Game Exchange. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}