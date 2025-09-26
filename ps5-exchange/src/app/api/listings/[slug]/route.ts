import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params { params: { slug: string } }

export async function GET(_: Request, { params }: Params) {
  const listing = await prisma.listing.findUnique({ where: { slug: params.slug } });
  if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(listing);
}

