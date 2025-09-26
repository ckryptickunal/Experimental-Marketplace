import Link from "next/link";
import ListingsGrid from "./ListingsGrid";
import Filters from "./Filters";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Browse listings</h2>
        <Link href="/listings/new" className="text-brand-700 hover:underline">
          Sell a game
        </Link>
      </div>
      <Filters />
      {/* @ts-expect-error Async Server Component */}
      <ListingsGrid searchParams={searchParams} />
    </div>
  );
}

