import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <h1 className="text-3xl font-semibold tracking-tight">PS5 Game Exchange</h1>
        <p className="mt-2 text-gray-600">
          Looking to give this game a new home? Browse, buy, and sell PS5 games with
          ease and confidence.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/browse"
            className="rounded-md bg-brand-600 px-4 py-2 text-white shadow hover:bg-brand-700"
          >
            Browse listings
          </Link>
          <Link
            href="/listings/new"
            className="rounded-md bg-white px-4 py-2 ring-1 ring-gray-300 hover:bg-gray-50"
          >
            Sell a game
          </Link>
        </div>
      </section>
    </div>
  );
}

