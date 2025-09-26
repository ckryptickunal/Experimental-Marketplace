#!/usr/bin/env node

/**
 * Quick Test Script for PS5 Game Exchange
 * Run with: node quick-test.js
 */

const http = require('http');

console.log('🧪 PS5 Game Exchange - Quick Test\n');
console.log('================================\n');

// Check if server is running
const checkServer = () => {
  return new Promise((resolve) => {
    http.get('http://localhost:3000', (res) => {
      if (res.statusCode === 200 || res.statusCode === 304) {
        console.log('✅ Server is running on http://localhost:3000');
        resolve(true);
      } else {
        console.log('⚠️  Server responded with status:', res.statusCode);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log('❌ Server is not running. Please run: npm run dev');
      console.log('   Error:', err.message);
      resolve(false);
    });
  });
};

// Test API endpoints
const testAPI = async () => {
  const tests = [
    {
      name: 'Get Listings',
      url: 'http://localhost:3000/api/listings',
      method: 'GET'
    },
    {
      name: 'Check Auth',
      url: 'http://localhost:3000/api/auth/me',
      method: 'GET'
    }
  ];

  for (const test of tests) {
    await new Promise((resolve) => {
      http.get(test.url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log(`✅ API Test: ${test.name} - OK`);
            try {
              const json = JSON.parse(data);
              if (test.name === 'Get Listings' && json.listings) {
                console.log(`   Found ${json.listings.length} listings`);
              }
            } catch (e) {
              // Ignore parse errors
            }
          } else {
            console.log(`⚠️  API Test: ${test.name} - Status ${res.statusCode}`);
          }
          resolve();
        });
      }).on('error', (err) => {
        console.log(`❌ API Test: ${test.name} - Failed`);
        console.log(`   Error: ${err.message}`);
        resolve();
      });
    });
  }
};

// Main test runner
const runTests = async () => {
  const serverOk = await checkServer();
  
  if (!serverOk) {
    console.log('\n📝 To start testing:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000');
    console.log('3. Follow the testing guide in TESTING.md\n');
    return;
  }

  console.log('\n🔍 Testing API Endpoints...\n');
  await testAPI();

  console.log('\n================================');
  console.log('📋 Manual Testing Steps:\n');
  console.log('1. Open http://localhost:3000 in your browser');
  console.log('2. Click "Sign Up" to create an account');
  console.log('3. Browse games in the listings page');
  console.log('4. Try creating a new listing');
  console.log('5. Check your dashboard\n');
  
  console.log('📖 For detailed testing instructions, see TESTING.md');
  console.log('\n✨ Quick test complete!\n');
};

runTests();