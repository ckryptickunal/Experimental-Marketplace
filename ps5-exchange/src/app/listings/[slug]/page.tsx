import { formatPriceFromCents } from "@/lib/utils";

async function getListing(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/listings/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ListingDetail({ params }: { params: { slug: string } }) {
  const listing = await getListing(params.slug);
  if (!listing) {
    return <div className="text-gray-600">Listing not found.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="overflow-hidden rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={listing.imageUrl ?? "/placeholder.png"} alt="Game" className="aspect-square w-full object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{listing.title}</h1>
        <div className="mt-2 text-2xl">{formatPriceFromCents(listing.priceCents)}</div>
        <div className="mt-4 text-gray-700 whitespace-pre-line">{listing.description}</div>
        <div className="mt-6 flex gap-3">
          <button className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Buy now</button>
          <button className="rounded-md bg-white px-4 py-2 ring-1 ring-gray-300 hover:bg-gray-50">Contact seller</button>
        </div>
      </div>
    </div>
  );
}

