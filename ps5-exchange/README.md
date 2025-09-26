PS5 Game Exchange
=================

A modern marketplace to buy and sell PS5 games.

Tech Stack
----------

- Next.js App Router, React, TypeScript
- Tailwind CSS
- Prisma ORM (SQLite for local dev)
- NextAuth for authentication
- Stripe for payments

Getting Started
---------------

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Run the dev server:

```bash
npm run dev
```

Project Scripts
---------------

- `npm run dev` – start dev server
- `npm run build` – build production
- `npm run start` – start production server
- `npm run prisma:push` – push Prisma schema to DB
- `npm run prisma:generate` – generate Prisma client
- `npm run prisma:seed` – seed database

