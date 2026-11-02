import fs from 'node:fs';
import path from 'node:path';

const src = path.resolve('dist');
const dest = path.resolve('frontend', 'dist');

if (fs.existsSync(src)) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log('✓ Copied dist to frontend/dist for Render deployment compatibility');
}
