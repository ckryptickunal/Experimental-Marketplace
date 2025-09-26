"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function Filters() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const set = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params?.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router]
  );

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-600">Search</label>
        <input
          defaultValue={params?.get("q") ?? ""}
          onChange={(e) => set("q", e.target.value)}
          placeholder="Game title"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600">Min price</label>
        <input defaultValue={params?.get("min") ?? ""} onChange={(e) => set("min", e.target.value)} type="number" step="0.01" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600">Max price</label>
        <input defaultValue={params?.get("max") ?? ""} onChange={(e) => set("max", e.target.value)} type="number" step="0.01" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600">Condition</label>
        <select defaultValue={params?.get("condition") ?? ""} onChange={(e) => set("condition", e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
          <option value="">Any</option>
          <option value="NEW">New</option>
          <option value="LIKE_NEW">Like New</option>
          <option value="VERY_GOOD">Very Good</option>
          <option value="GOOD">Good</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600">Sort</label>
        <select defaultValue={params?.get("sort") ?? "newest"} onChange={(e) => set("sort", e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

