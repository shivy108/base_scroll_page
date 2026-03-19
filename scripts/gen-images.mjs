import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');

// --- OG Image (1200x630) ---
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#12121a"/>
    </linearGradient>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <radialGradient id="glow1" cx="20%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="85%" cy="65%" r="50%">
      <stop offset="0%" stop-color="#ec4899" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow3" cx="60%" cy="20%" r="40%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect width="1200" height="630" fill="url(#glow3)"/>

  <!-- Dot grid -->
  <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.12)"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <!-- Outer border -->
  <rect x="20" y="20" width="1160" height="590" rx="20" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

  <!-- Corner accent top-left -->
  <line x1="20" y1="20" x2="90" y2="20" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
  <line x1="20" y1="20" x2="20" y2="90" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
  <!-- Corner accent bottom-right -->
  <line x1="1180" y1="610" x2="1110" y2="610" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/>
  <line x1="1180" y1="610" x2="1180" y2="540" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/>
  <!-- Corner accent top-right -->
  <line x1="1180" y1="20" x2="1110" y2="20" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  <line x1="1180" y1="20" x2="1180" y2="90" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>

  <!-- Glitch offset layers -->
  <text x="80" y="310" font-family="Georgia, serif" font-weight="900" font-size="140" fill="#ff0040" opacity="0.2" dx="-5" dy="3">shiv.rocks</text>
  <text x="80" y="310" font-family="Georgia, serif" font-weight="900" font-size="140" fill="#00c8ff" opacity="0.15" dx="4" dy="-3">shiv.rocks</text>

  <!-- Main title -->
  <text x="80" y="310" font-family="Georgia, serif" font-weight="900" font-size="140" fill="url(#grad)">shiv.rocks</text>

  <!-- Horizontal rule -->
  <line x1="80" y1="340" x2="600" y2="340" stroke="url(#grad)" stroke-width="1.5" opacity="0.4"/>

  <!-- Tagline -->
  <text x="80" y="390" font-family="monospace" font-size="22" fill="#a0a0b0" letter-spacing="10">BESPOKE  SOFTWARE  STUDIO</text>

  <!-- Slogan -->
  <text x="80" y="435" font-family="monospace" font-size="15" fill="#505060" letter-spacing="5">ENGINEERING TOMORROW, TODAY</text>

  <!-- Right side orb decoration -->
  <circle cx="1060" cy="280" r="120" fill="none" stroke="#a855f7" stroke-width="0.5" opacity="0.2"/>
  <circle cx="1060" cy="280" r="80" fill="none" stroke="#a855f7" stroke-width="0.5" opacity="0.3"/>
  <circle cx="1060" cy="280" r="40" fill="#a855f7" opacity="0.08"/>
  <circle cx="1060" cy="280" r="15" fill="#a855f7" opacity="0.2"/>

  <!-- Scan line accent -->
  <rect x="20" y="480" width="1160" height="1" fill="rgba(99,102,241,0.15)"/>

  <!-- URL hint bottom -->
  <text x="80" y="565" font-family="monospace" font-size="14" fill="#404050" letter-spacing="3">https://shiv.rocks</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .resize(1200, 630)
  .jpeg({ quality: 95 })
  .toFile(join(publicDir, 'images/og.jpg'));

console.log('✅ OG image generated: public/images/og.jpg');

// --- Favicon PNG (512x512 for apple-touch-icon etc.) ---
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <radialGradient id="glow" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="clip"><rect width="512" height="512" rx="112"/></clipPath>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="112" fill="#0a0a0f"/>
  <rect width="512" height="512" rx="112" fill="url(#glow)"/>

  <!-- Dot grid -->
  <g clip-path="url(#clip)" opacity="0.07">
    <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="#a855f7"/>
    </pattern>
    <rect width="512" height="512" fill="url(#dots)"/>
  </g>

  <!-- Corner accents -->
  <line x1="16" y1="60" x2="16" y2="16" stroke="#6366f1" stroke-width="6" stroke-linecap="round" clip-path="url(#clip)"/>
  <line x1="16" y1="16" x2="60" y2="16" stroke="#6366f1" stroke-width="6" stroke-linecap="round" clip-path="url(#clip)"/>
  <line x1="496" y1="452" x2="496" y2="496" stroke="#ec4899" stroke-width="6" stroke-linecap="round" clip-path="url(#clip)"/>
  <line x1="496" y1="496" x2="452" y2="496" stroke="#ec4899" stroke-width="6" stroke-linecap="round" clip-path="url(#clip)"/>

  <!-- Glitch red layer -->
  <text x="62" y="355" font-family="Georgia, serif" font-weight="900" font-size="290" fill="#ff0040" opacity="0.25" dx="-8" dy="4" clip-path="url(#clip)">S</text>
  <!-- Glitch cyan layer -->
  <text x="62" y="355" font-family="Georgia, serif" font-weight="900" font-size="290" fill="#00c8ff" opacity="0.2" dx="6" dy="-4" clip-path="url(#clip)">S</text>
  <!-- Main S -->
  <text x="62" y="355" font-family="Georgia, serif" font-weight="900" font-size="290" fill="url(#grad)" clip-path="url(#clip)">S</text>

  <!-- Dot in bottom right -->
  <circle cx="420" cy="400" r="38" fill="url(#grad2)" opacity="0.9"/>
  <circle cx="420" cy="400" r="24" fill="#0a0a0f" opacity="0.5"/>
  <circle cx="420" cy="400" r="12" fill="url(#grad2)"/>

  <!-- Scan line -->
  <rect x="0" y="380" width="512" height="1.5" fill="rgba(99,102,241,0.2)" clip-path="url(#clip)"/>
</svg>`;

await sharp(Buffer.from(faviconSvg))
  .resize(512, 512)
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'));

await sharp(Buffer.from(faviconSvg))
  .resize(192, 192)
  .png()
  .toFile(join(publicDir, 'icon-192.png'));

await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, 'favicon-32.png'));

console.log('✅ Favicon PNGs generated');
