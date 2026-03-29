// Quick test script to verify TMDB API key
// Run with: node test-tmdb.js

require('dotenv').config();
const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

console.log('\n🔍 Testing TMDB API Configuration...\n');

if (!TMDB_API_KEY) {
  console.error('❌ ERROR: TMDB_API_KEY not found in .env file!');
  console.error('\n📝 Please create a .env file in the backend folder with:');
  console.error('   TMDB_API_KEY=your_api_key_here\n');
  console.error('🔑 Get your API key from: https://www.themoviedb.org/settings/api\n');
  process.exit(1);
}

console.log('✅ TMDB_API_KEY found in .env file');
console.log(`📋 API Key: ${TMDB_API_KEY.substring(0, 8)}...${TMDB_API_KEY.substring(TMDB_API_KEY.length - 4)}\n`);

// Test API call
const testUrl = `https://api.themoviedb.org/3/movie/550?api_key=${TMDB_API_KEY}`;

console.log('🌐 Testing API call to TMDB...\n');

axios.get(testUrl)
  .then(response => {
    console.log('✅ SUCCESS! TMDB API is working correctly!\n');
    console.log(`📽️  Test Movie: ${response.data.title}`);
    console.log(`⭐ Rating: ${response.data.vote_average}/10`);
    console.log(`📅 Release: ${response.data.release_date}\n`);
    console.log('🎉 Your TMDB API key is valid and working!\n');
    console.log('✅ You can now start the backend server with: npm run dev\n');
  })
  .catch(error => {
    console.error('❌ ERROR: TMDB API call failed!\n');
    
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Message: ${error.response.data.status_message || 'Unknown error'}\n`);
      
      if (error.response.status === 401) {
        console.error('🔑 Your API key is INVALID or EXPIRED!');
        console.error('   Please check your API key at: https://www.themoviedb.org/settings/api\n');
      }
    } else {
      console.error('Network error:', error.message);
      console.error('Check your internet connection\n');
    }
    
    process.exit(1);
  });
