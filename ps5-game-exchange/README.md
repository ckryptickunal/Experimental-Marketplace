# 🎮 PS5 Game Exchange

A modern, secure marketplace for buying and selling PS5 games. Built with Next.js, TypeScript, Prisma, and PostgreSQL.

![PS5 Game Exchange](https://img.shields.io/badge/PS5-Game%20Exchange-blue?style=for-the-badge&logo=playstation)

## ✨ Features

### Core Features (Implemented)
- 🔐 **Authentication System** - Secure login/signup with JWT tokens
- 📝 **Game Listings** - Create, edit, and manage game listings
- 🔍 **Advanced Search & Filters** - Search by title, price range, condition
- 👤 **User Dashboard** - Manage listings, view purchases and sales
- 🏠 **Homepage** - Featured listings and marketplace stats
- 📱 **Responsive Design** - Beautiful UI that works on all devices

### Planned Features
- 🛒 **Shopping Cart** - Add multiple items before checkout
- 💳 **Stripe Payment Integration** - Secure payment processing
- 💬 **Messaging System** - Direct communication between buyers and sellers
- ⭐ **Reviews & Ratings** - Build trust with community feedback
- 👨‍💼 **Admin Panel** - Manage users and listings
- 📧 **Email Notifications** - Order updates and messages

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **File Upload**: Cloudinary (configured)
- **Payments**: Stripe (ready for integration)

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (for payments)
- Cloudinary account (for image uploads)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ps5-game-exchange.git
   cd ps5-game-exchange
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

   Update the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/ps5_exchange"

   # JWT Secret (generate a secure random string)
   JWT_SECRET="your-super-secret-jwt-key"

   # Stripe (get from https://dashboard.stripe.com)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."

   # Cloudinary (get from https://cloudinary.com/console)
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # (Optional) Seed the database with sample data
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
ps5-game-exchange/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── listings/     # Listing CRUD endpoints
│   ├── dashboard/        # User dashboard
│   ├── listings/         # Browse and view listings
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── sell/            # Create listing page
│   └── layout.tsx       # Root layout
├── components/            # React components
│   ├── ui/              # Reusable UI components
│   └── navbar.tsx       # Navigation component
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication helpers
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # General utilities
├── prisma/              # Database schema
│   └── schema.prisma    # Prisma schema definition
└── public/              # Static assets
```

## 🗄️ Database Schema

The application uses the following main models:

- **User** - User accounts with authentication
- **Listing** - Game listings with details and images
- **Order** - Purchase transactions
- **Message** - Communication between users
- **Review** - Ratings and feedback
- **Notification** - System notifications

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Listings
- `GET /api/listings` - Get all listings (with filters)
- `POST /api/listings` - Create new listing
- `GET /api/listings/[id]` - Get single listing
- `PUT /api/listings/[id]` - Update listing
- `DELETE /api/listings/[id]` - Delete listing

## 🎨 UI Components

The project uses a custom component library based on Radix UI:

- **Button** - Primary action component
- **Input** - Form input fields
- **Card** - Content containers
- **Label** - Form labels

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Set up PostgreSQL**
   - Use Vercel Postgres or Supabase
   - Update DATABASE_URL in environment variables

### Deploy to Railway

1. **Create new project on Railway**
2. **Add PostgreSQL service**
3. **Deploy from GitHub**
4. **Add environment variables**

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Check TypeScript
npm run type-check
```

## 📝 Environment Variables

Create a `.env.local` file with:

```env
# Required
DATABASE_URL=
JWT_SECRET=

# Optional (for full functionality)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Stripe for payment processing
- The gaming community for inspiration

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ by the PS5 Game Exchange Team