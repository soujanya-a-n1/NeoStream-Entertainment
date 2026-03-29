// Verification script to check all imports
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const files = [
  'src/App.jsx',
  'src/main.jsx',
  'src/services/api.js',
  'src/utils/constants.js',
  'src/components/Navbar.jsx',
  'src/components/Banner.jsx',
  'src/components/Row.jsx',
  'src/components/TrailerModal.jsx',
  'src/components/Skeleton.jsx',
  'src/pages/Home.jsx',
  'src/pages/Browse.jsx',
  'src/pages/Login.jsx',
  'src/pages/Register.jsx',
  'src/pages/Search.jsx',
  'src/pages/MyList.jsx',
  'src/pages/Trending.jsx',
];

console.log('Checking files...\n');

files.forEach(file => {
  const exists = existsSync(file);
  const status = exists ? '✓' : '✗';
  console.log(`${status} ${file}`);
  
  if (exists) {
    const content = readFileSync(file, 'utf8');
    if (content.includes('export default')) {
      console.log('  → Has default export');
    } else {
      console.log('  ⚠ Missing default export!');
    }
  }
});

console.log('\n✅ Verification complete!');
