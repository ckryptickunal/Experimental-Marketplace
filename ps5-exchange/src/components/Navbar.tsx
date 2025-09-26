import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-6 w-6 rounded bg-brand-600" />
          <span>PS5 Exchange</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/browse" className="hover:text-gray-900 text-gray-600">
            Browse
          </Link>
          <Link href="/listings/new" className="hover:text-gray-900 text-gray-600">
            Sell
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <form action="/api/auth/signout" method="post">
                <button className="rounded-md bg-white px-3 py-1.5 ring-1 ring-gray-300 hover:bg-gray-50">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/auth/login" className="rounded-md bg-brand-600 px-3 py-1.5 text-white hover:bg-brand-700">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

