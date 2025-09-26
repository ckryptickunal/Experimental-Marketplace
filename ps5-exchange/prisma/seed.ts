import { PrismaClient } from "@prisma/client";
import { slugify } from "@/lib/utils";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      verified: true,
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
      verified: false,
    },
  });

  const listings = [
    {
      title: "God of War Ragnarök",
      priceCents: 4999,
      condition: "LIKE_NEW",
      description: "First-class condition with original case.",
      sellerId: alice.id,
    },
    {
      title: "Horizon Forbidden West",
      priceCents: 3999,
      condition: "VERY_GOOD",
      description: "Includes map and art booklet.",
      sellerId: bob.id,
    },
  ];

  for (const l of listings) {
    await prisma.listing.upsert({
      where: { slug: slugify(l.title) },
      update: {},
      create: {
        title: l.title,
        slug: slugify(l.title),
        priceCents: l.priceCents,
        condition: l.condition,
        description: l.description,
        sellerId: l.sellerId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

