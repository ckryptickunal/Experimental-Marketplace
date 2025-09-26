#!/bin/bash

# Test API endpoints
echo "🧪 Testing PS5 Game Exchange API..."
echo ""

# Test registration
echo "1. Testing Registration..."
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}' \
  -s | head -c 100
echo ""
echo ""

# Test login
echo "2. Testing Login..."
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  -s | head -c 100
echo ""
echo ""

# Test listings
echo "3. Testing Get Listings..."
curl http://localhost:3000/api/listings?limit=5 \
  -s | head -c 200
echo ""
echo ""

echo "✅ API tests complete!"