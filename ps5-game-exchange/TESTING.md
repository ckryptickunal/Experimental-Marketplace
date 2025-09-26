# 🧪 Testing Guide for PS5 Game Exchange

## 🚀 Quick Start Testing

### 1. Initial Setup

First, make sure the application is running:

```bash
# If not already running, start the dev server
npm run dev
```

The application will be available at: **http://localhost:3000**

### 2. Database Setup (Required)

Since we're using PostgreSQL, you have a few options:

#### Option A: Use Docker (Easiest)
```bash
# Run PostgreSQL in Docker
docker run --name ps5-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=ps5_exchange -p 5432:5432 -d postgres

# Update your .env.local file with:
DATABASE_URL="postgresql://postgres:password@localhost:5432/ps5_exchange"

# Run migrations
npx prisma migrate dev

# Seed with test data
npm run db:seed
```

#### Option B: Use Local PostgreSQL
```bash
# Create database
createdb ps5_exchange

# Update .env.local with your PostgreSQL credentials
DATABASE_URL="postgresql://yourusername:yourpassword@localhost:5432/ps5_exchange"

# Run migrations
npx prisma migrate dev

# Seed with test data
npm run db:seed
```

#### Option C: Use a Cloud Database (Supabase/Neon)
1. Create a free account at [Supabase](https://supabase.com) or [Neon](https://neon.tech)
2. Create a new database
3. Copy the connection string to your .env.local
4. Run migrations: `npx prisma migrate dev`
5. Seed data: `npm run db:seed`

---

## 📝 Test Scenarios

### Test 1: Homepage & Navigation
1. **Open http://localhost:3000**
   - ✅ Should see hero section with "Your Trusted PS5 Game Marketplace"
   - ✅ Should see "Browse Games" and "Start Selling" buttons
   - ✅ Should see featured listings (if database is seeded)
   - ✅ Navigation bar should be visible

### Test 2: User Registration
1. **Click "Sign Up" in navigation**
2. **Fill in the registration form:**
   - Display Name: `TestGamer`
   - Email: `testgamer@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. **Click "Create Account"**
   - ✅ Should redirect to dashboard
   - ✅ Should see welcome message

### Test 3: User Login/Logout
1. **Click user icon → Logout**
2. **Click "Login" in navigation**
3. **Enter credentials:**
   - Email: `testgamer@example.com`
   - Password: `password123`
4. **Click "Login"**
   - ✅ Should redirect to dashboard
   - ✅ User menu should show your name

### Test 4: Browse Listings
1. **Click "Browse Games" in navigation**
   - ✅ Should see grid of game listings
   - ✅ Should see search bar and filters
2. **Test Search:**
   - Type "Spider" in search
   - Press Enter
   - ✅ Should filter results
3. **Test Filters:**
   - Click "Filters" button
   - Set Min Price: 20
   - Set Max Price: 40
   - ✅ Should update results

### Test 5: View Listing Details
1. **Click on any game listing**
   - ✅ Should see game details
   - ✅ Should see price and condition
   - ✅ Should see seller information
   - ✅ "Buy Now" and "Add to Cart" buttons visible

### Test 6: Create a Listing
1. **Click "Sell Game" button** (must be logged in)
2. **Fill in the form:**
   - Game Title: `The Last of Us Part I`
   - Condition: `Like New`
   - Price: `35.99`
   - Description: `Excellent condition, played once. Includes all original materials.`
3. **Click "Create Listing"**
   - ✅ Should redirect to listing detail page
   - ✅ Should see success message

### Test 7: User Dashboard
1. **Click user icon → "My Listings"**
   - ✅ Should see dashboard with stats
   - ✅ Should see your created listing
   - ✅ Should have Edit/Delete options

### Test 8: Edit/Delete Listing
1. **In dashboard, click Edit icon on your listing**
   - Update price to `32.99`
   - Save changes
   - ✅ Should update successfully
2. **Click Delete icon**
   - Confirm deletion
   - ✅ Listing should be removed

---

## 🧪 API Testing

### Using cURL (Command Line)

```bash
# Test Registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"apitest@example.com","password":"test123","name":"API Tester"}'

# Test Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"apitest@example.com","password":"test123"}'

# Get Listings
curl http://localhost:3000/api/listings

# Get Listings with Filters
curl "http://localhost:3000/api/listings?search=spider&minPrice=20&maxPrice=50"
```

### Using Browser DevTools

1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Perform actions in the app
4. Check the API calls and responses

---

## 🔍 Database Testing

### View Database Content

```bash
# Open Prisma Studio (GUI for database)
npm run db:studio
```

This opens a web interface at http://localhost:5555 where you can:
- View all tables
- See user accounts
- Check listings
- Modify data directly

---

## ✅ Test Checklist

### Essential Features
- [ ] Homepage loads correctly
- [ ] Can create a new account
- [ ] Can log in and log out
- [ ] Can browse all listings
- [ ] Can search for games
- [ ] Can filter by price and condition
- [ ] Can view listing details
- [ ] Can create a new listing (when logged in)
- [ ] Dashboard shows user's listings
- [ ] Can edit own listings
- [ ] Can delete own listings
- [ ] Responsive on mobile devices

### Test Accounts (After Seeding)
If you ran `npm run db:seed`, you can use these accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@ps5exchange.com | password123 | Admin |
| john@example.com | password123 | User |
| sarah@example.com | password123 | User |
| mike@example.com | password123 | User |

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
pg_isready

# Test database connection
npx prisma db pull

# Reset database (if needed)
npx prisma migrate reset
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma client
npx prisma generate
```

---

## 🎮 Sample Test Flow

1. **Start fresh:**
   ```bash
   npm run db:migrate
   npm run db:seed
   npm run dev
   ```

2. **Test as a buyer:**
   - Browse listings without logging in
   - Search for "Spider-Man"
   - Filter by price $20-40
   - View a game's details
   - Try to buy (should prompt login)

3. **Test as a seller:**
   - Register new account
   - List a game for sale
   - View your dashboard
   - Edit your listing
   - Delete your listing

4. **Test as admin:**
   - Login as admin@ps5exchange.com
   - Access admin features (when implemented)

---

## 📊 Performance Testing

```bash
# Build for production
npm run build

# Start production server
npm start

# The production build should be faster and optimized
```

---

## 🎯 Expected Results

When everything is working correctly:
- Pages load quickly (< 2 seconds)
- No console errors in browser DevTools
- Forms validate input properly
- Success/error messages appear as toasts
- Data persists after page refresh
- Responsive design works on mobile

---

## 📝 Notes

- The shopping cart and payment features are prepared but not fully implemented
- Messaging system is planned for Phase 2
- Image uploads currently use base64 (for demo); production should use Cloudinary
- Some features like reviews are in the database schema but not yet in the UI

Happy Testing! 🚀