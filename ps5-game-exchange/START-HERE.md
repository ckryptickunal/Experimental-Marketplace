# 🎮 PS5 Game Exchange - Quick Start Guide

## 🚀 How to Test This Application

### Step 1: Start the Application

```bash
# Navigate to the project folder
cd /workspace/ps5-game-exchange

# Install dependencies (if not done already)
npm install

# Generate Prisma client
npx prisma generate

# Start the development server
npm run dev
```

The application will start at: **http://localhost:3000**

### Step 2: Set Up a Test Database (Choose One Option)

#### Option A: Use SQLite for Quick Testing (Easiest - No Setup!)

1. Change the database to SQLite in `/workspace/ps5-game-exchange/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. Update `.env.local`:
```
DATABASE_URL="file:./dev.db"
```

3. Run migrations:
```bash
npx prisma migrate dev --name init
```

#### Option B: Use Free Cloud Database (Recommended)

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Update `.env.local` with your connection string
6. Run: `npx prisma migrate dev`

### Step 3: Test the Application

Once the server is running, open your browser and go to: **http://localhost:3000**

#### 🧪 Test Flow (Without Database):

1. **Homepage** - You can view:
   - Hero section
   - Navigation
   - Static content
   - UI components

2. **Browse Listings** - You can:
   - See the listings page layout
   - Test search bar UI
   - Test filter UI
   - (Listings will be empty without database)

3. **Authentication Pages** - You can view:
   - Login page UI
   - Registration page UI
   - Form validation

#### 🧪 Test Flow (With Database):

1. **Create an Account:**
   - Click "Sign Up"
   - Fill in: email, password, name
   - Submit to create account

2. **Create a Listing:**
   - Click "Sell Game"
   - Fill in game details
   - Submit to create listing

3. **Browse & Search:**
   - Go to "Browse Games"
   - Search for games
   - Apply filters
   - Click on listings to view details

4. **Dashboard:**
   - View your listings
   - Edit or delete them
   - See statistics

### Step 4: Seed Sample Data (Optional)

If you want to see the app with sample data:

```bash
# First, create this file if using SQLite
touch prisma/dev.db

# Run the seed script
npm run db:seed
```

This will create:
- 4 test users
- 12 sample game listings
- Sample reviews and messages

Test accounts after seeding:
- admin@ps5exchange.com / password123
- john@example.com / password123

## 🎯 What You Can Test Right Now

### Without Database Setup:
✅ Homepage design and layout
✅ Navigation and routing
✅ Responsive design (resize browser)
✅ UI components and animations
✅ Form layouts and validation messages
✅ Page transitions

### With Database Setup:
✅ User registration and login
✅ Creating game listings
✅ Browsing and searching games
✅ Viewing listing details
✅ User dashboard
✅ Edit/delete listings
✅ Logout functionality

## 🔍 Quick Verification

To verify everything is working, check:

1. **Server Running:** Look for "✓ Ready" message in terminal
2. **Homepage Loads:** http://localhost:3000 shows the site
3. **API Working:** http://localhost:3000/api/listings returns JSON

## 🛠 Troubleshooting

### "Module not found" errors:
```bash
npm install
npx prisma generate
```

### Database connection errors:
- Use SQLite option above for quick testing
- Or check your DATABASE_URL in .env.local

### Port 3000 already in use:
```bash
# Use a different port
PORT=3001 npm run dev
```

### Build errors:
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 📝 Summary

This is a fully functional PS5 game marketplace with:
- 🔐 User authentication
- 📝 Game listing creation
- 🔍 Search and filters  
- 👤 User dashboards
- 💅 Modern, responsive UI

The core features are complete and working. Payment processing and messaging are prepared but not fully implemented (Phase 2 features).

**Start here:** http://localhost:3000

Enjoy testing! 🎮