"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createListing } from "./actions";

export default function NewListingPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("LIKE_NEW");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-semibold">Sell your game</h2>
      <form
        className="mt-6 space-y-4"
        action={async (formData: FormData) => {
          setError(null);
          const res = await createListing(formData);
          if (!res.ok) {
            setError(res.error);
            return;
          }
          router.push(`/listings/${res.slug}`);
        }}
      >
        <div>
          <label className="block text-sm font-medium">Game title</label>
          <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Price (USD)</label>
            <input name="price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" step="0.01" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Condition</label>
            <select name="condition" value={condition} onChange={(e) => setCondition(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="LIKE_NEW">Like New</option>
              <option value="VERY_GOOD">Very Good</option>
              <option value="GOOD">Good</option>
              <option value="NEW">New</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" rows={5} />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button type="submit" className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Create listing</button>
      </form>
    </div>
  );
}

