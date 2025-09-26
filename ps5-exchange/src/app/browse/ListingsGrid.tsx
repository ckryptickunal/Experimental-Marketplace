import Link from "next/link";
import { formatPriceFromCents } from "@/lib/utils";

type Listing = {
  id: string;
  title: string;
  slug: string;
  priceCents: number;
  condition: string;
  imageUrl: string | null;
};

export default async function ListingsGrid({ searchParams }: { searchParams?: { [k: string]: string | string[] | undefined } }) {
  const qs = new URLSearchParams();
  for (const key of Object.keys(searchParams || {})) {
    const value = searchParams?.[key];
    if (typeof value === "string") qs.set(key, value);
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/listings${qs.toString() ? `?${qs.toString()}` : ""}`, { cache: "no-store" });
  const listings: Listing[] = await res.json();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <Link key={l.id} href={`/listings/${l.slug}`} className="group rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.imageUrl ?? "/placeholder.png"} alt="Game" className="h-full w-full object-cover transition group-hover:scale-105" />
          </div>
          <div className="mt-3">
            <div className="font-medium">{l.title}</div>
            <div className="text-sm text-gray-600">{formatPriceFromCents(l.priceCents)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

