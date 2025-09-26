"use server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createListing(form: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { ok: false, error: "Please sign in to create a listing" } as const;
  }
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const price = Number(form.get("price") || 0);
  const condition = String(form.get("condition") || "LIKE_NEW");
  if (!title || !price) return { ok: false, error: "Missing fields" } as const;

  const slug = slugify(title);
  const exists = await prisma.listing.findUnique({ where: { slug } });
  if (exists) return { ok: false, error: "A listing with this title already exists" } as const;

  const l = await prisma.listing.create({
    data: {
      title,
      slug,
      description,
      priceCents: Math.round(price * 100),
      condition,
      sellerId: session.user.id,
    },
  });

  revalidatePath("/browse");
  return { ok: true, slug: l.slug } as const;
}

