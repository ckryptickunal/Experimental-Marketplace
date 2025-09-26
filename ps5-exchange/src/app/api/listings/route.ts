import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const min = Number(searchParams.get("min"));
  const max = Number(searchParams.get("max"));
  const condition = searchParams.get("condition") ?? undefined;
  const sort = searchParams.get("sort") ?? "newest";

  const where: any = { isActive: true };
  if (q) where.title = { contains: q, mode: "insensitive" };
  if (!Number.isNaN(min)) where.priceCents = { ...(where.priceCents || {}), gte: Math.round(min * 100) };
  if (!Number.isNaN(max)) where.priceCents = { ...(where.priceCents || {}), lte: Math.round(max * 100) };
  if (condition) where.condition = condition;

  const orderBy =
    sort === "price_asc" ? { priceCents: "asc" as const } :
    sort === "price_desc" ? { priceCents: "desc" as const } :
    sort === "oldest" ? { createdAt: "asc" as const } :
    { createdAt: "desc" as const };

  const listings = await prisma.listing.findMany({
    where,
    orderBy,
    take: 60,
  });
  return NextResponse.json(listings);
}

