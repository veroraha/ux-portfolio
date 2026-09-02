import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Helper to write SVG and convert to PNG
async function createAsset(svgContent, outputPath, width = 1200, height = 800) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const buffer = Buffer.from(svgContent);
  await sharp(buffer)
    .resize(width, height)
    .png({ quality: 95 })
    .toFile(outputPath);
  console.log(`Created ${outputPath}`);
}

async function main() {
  // 1. Headshot (Portrait / Square 800x800)
  const headshotSvg = `
  <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="headshotBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="60%" stop-color="#F2EFEB"/>
        <stop offset="100%" stop-color="#E2DDD5"/>
      </linearGradient>
      <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#18191C"/>
        <stop offset="100%" stop-color="#121316"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#121316" flood-opacity="0.12"/>
      </filter>
    </defs>
    <!-- Background Frame -->
    <rect width="800" height="800" rx="400" fill="url(#headshotBg)"/>
    <circle cx="400" cy="400" r="380" fill="none" stroke="#E6E2D8" stroke-width="4" opacity="0.8"/>

    <!-- Avatar Illustration -->
    <g filter="url(#shadow)">
      <!-- Shoulders & Outfit -->
      <path d="M 220 740 C 220 580, 580 580, 580 740 Z" fill="#121316"/>
      <!-- Collar / Accent -->
      <path d="M 340 590 L 400 660 L 460 590 Z" fill="#E05A47"/>
      <circle cx="400" cy="685" r="8" fill="#F7F6F2"/>

      <!-- Neck -->
      <rect x="360" y="470" width="80" height="130" rx="15" fill="#8c5836"/>

      <!-- Face -->
      <ellipse cx="400" cy="420" rx="115" ry="140" fill="#a46942"/>

      <!-- Glasses / Specs -->
      <rect x="320" y="385" width="65" height="48" rx="12" fill="none" stroke="#121316" stroke-width="8"/>
      <rect x="415" y="385" width="65" height="48" rx="12" fill="none" stroke="#121316" stroke-width="8"/>
      <line x1="385" y1="405" x2="415" y2="405" stroke="#121316" stroke-width="8"/>

      <!-- Eyes & Smile -->
      <circle cx="352" cy="409" r="7" fill="#121316"/>
      <circle cx="447" cy="409" r="7" fill="#121316"/>
      <path d="M 365 480 Q 400 515 435 480" fill="none" stroke="#121316" stroke-width="7" stroke-linecap="round"/>

      <!-- Stylish Hair -->
      <path d="M 270 380 C 260 220, 540 220, 530 380 C 510 270, 290 270, 270 380 Z" fill="url(#hairGrad)"/>
      <path d="M 270 360 C 240 430, 260 520, 290 560 C 270 480, 280 400, 310 350 Z" fill="url(#hairGrad)"/>
      <path d="M 530 360 C 560 430, 540 520, 510 560 C 530 480, 520 400, 490 350 Z" fill="url(#hairGrad)"/>
      
      <!-- Earring -->
      <circle cx="280" cy="440" r="12" fill="none" stroke="#E05A47" stroke-width="4"/>
      <circle cx="520" cy="440" r="12" fill="none" stroke="#E05A47" stroke-width="4"/>
    </g>

    <!-- Decorative Badges -->
    <g transform="translate(110, 620)">
      <rect width="180" height="48" rx="6" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="1.5" filter="url(#shadow)"/>
      <text x="90" y="30" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="600" fill="#121316" text-anchor="middle" letter-spacing="0.5">UX DESIGN</text>
    </g>
    <g transform="translate(510, 620)">
      <rect width="180" height="48" rx="6" fill="#121316" filter="url(#shadow)"/>
      <text x="90" y="30" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">PRODUCT OWNER</text>
    </g>
  </svg>
  `;

  // 2. On The Way (otw) - 1200x800 with Ornate Baroque Golden Beveled Frame
  const otwSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Museum Lighting & Frame Drop Shadow -->
      <filter id="museumSpotlight" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#0a0a0c" flood-opacity="0.32"/>
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.2"/>
      </filter>
      <filter id="innerCanvasShadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#1a1508" flood-opacity="0.4"/>
      </filter>

      <!-- Rich Baroque Gold Gradients -->
      <linearGradient id="goldOuter1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCEBA2"/>
        <stop offset="25%" stop-color="#D4AF37"/>
        <stop offset="50%" stop-color="#996515"/>
        <stop offset="75%" stop-color="#E5C158"/>
        <stop offset="100%" stop-color="#6B4610"/>
      </linearGradient>
      <linearGradient id="goldBevel1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFF4B8"/>
        <stop offset="30%" stop-color="#DFB73D"/>
        <stop offset="70%" stop-color="#8A5A12"/>
        <stop offset="100%" stop-color="#F0D36D"/>
      </linearGradient>
      <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFF8D6"/>
        <stop offset="50%" stop-color="#C59B27"/>
        <stop offset="100%" stop-color="#5E3B06"/>
      </linearGradient>
      <linearGradient id="innerLinenMatte" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2D2214"/>
        <stop offset="50%" stop-color="#1A1309"/>
        <stop offset="100%" stop-color="#2A1F10"/>
      </linearGradient>
      <linearGradient id="mapBg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#F5F3ED"/>
      </linearGradient>
    </defs>

    <!-- Museum Wall Background (Transparent / Warm Alabaster) -->
    <rect width="1200" height="800" fill="#F7F6F2"/>

    <!-- ENTIRE GOLDEN FRAME ASSEMBLY -->
    <g filter="url(#museumSpotlight)">
      <!-- Tier 1: Heavy Ornate Outer Frame (Gold Leaf) -->
      <rect x="25" y="20" width="1150" height="760" rx="14" fill="url(#goldOuter1)"/>
      <rect x="35" y="30" width="1130" height="740" rx="10" fill="#6E4810"/>
      
      <!-- Tier 2: Deep Carved Moulding & Gold Highlights -->
      <rect x="42" y="37" width="1116" height="726" rx="8" fill="url(#goldBevel1)"/>
      
      <!-- Baroque Corner Cornerpieces (Acanthus / Rococo flourishes) -->
      <!-- Top-Left Corner Piece -->
      <g transform="translate(30, 25)">
        <path d="M 0 0 L 80 0 C 70 25, 60 40, 45 45 C 40 60, 25 70, 0 80 Z" fill="url(#goldFiligree)" stroke="#593905" stroke-width="1.5"/>
        <circle cx="28" cy="28" r="10" fill="#FFF4B8" stroke="#8A5A12" stroke-width="2"/>
        <circle cx="28" cy="28" r="4" fill="#6E4810"/>
        <path d="M 12 12 Q 40 18 55 5 M 12 12 Q 18 40 5 55" stroke="#FFF8D6" stroke-width="2" fill="none"/>
      </g>
      <!-- Top-Right Corner Piece -->
      <g transform="translate(1170, 25) scale(-1, 1)">
        <path d="M 0 0 L 80 0 C 70 25, 60 40, 45 45 C 40 60, 25 70, 0 80 Z" fill="url(#goldFiligree)" stroke="#593905" stroke-width="1.5"/>
        <circle cx="28" cy="28" r="10" fill="#FFF4B8" stroke="#8A5A12" stroke-width="2"/>
        <circle cx="28" cy="28" r="4" fill="#6E4810"/>
        <path d="M 12 12 Q 40 18 55 5 M 12 12 Q 18 40 5 55" stroke="#FFF8D6" stroke-width="2" fill="none"/>
      </g>
      <!-- Bottom-Left Corner Piece -->
      <g transform="translate(30, 775) scale(1, -1)">
        <path d="M 0 0 L 80 0 C 70 25, 60 40, 45 45 C 40 60, 25 70, 0 80 Z" fill="url(#goldFiligree)" stroke="#593905" stroke-width="1.5"/>
        <circle cx="28" cy="28" r="10" fill="#FFF4B8" stroke="#8A5A12" stroke-width="2"/>
        <circle cx="28" cy="28" r="4" fill="#6E4810"/>
        <path d="M 12 12 Q 40 18 55 5 M 12 12 Q 18 40 5 55" stroke="#FFF8D6" stroke-width="2" fill="none"/>
      </g>
      <!-- Bottom-Right Corner Piece -->
      <g transform="translate(1170, 775) scale(-1, -1)">
        <path d="M 0 0 L 80 0 C 70 25, 60 40, 45 45 C 40 60, 25 70, 0 80 Z" fill="url(#goldFiligree)" stroke="#593905" stroke-width="1.5"/>
        <circle cx="28" cy="28" r="10" fill="#FFF4B8" stroke="#8A5A12" stroke-width="2"/>
        <circle cx="28" cy="28" r="4" fill="#6E4810"/>
        <path d="M 12 12 Q 40 18 55 5 M 12 12 Q 18 40 5 55" stroke="#FFF8D6" stroke-width="2" fill="none"/>
      </g>

      <!-- Center Ornate Medallions (Top & Bottom) -->
      <g transform="translate(600, 30)">
        <ellipse cx="0" cy="0" rx="36" ry="12" fill="url(#goldFiligree)" stroke="#593905" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="5" fill="#FFF4B8"/>
      </g>
      <g transform="translate(600, 770)">
        <ellipse cx="0" cy="0" rx="36" ry="12" fill="url(#goldFiligree)" stroke="#593905" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="5" fill="#FFF4B8"/>
      </g>

      <!-- Tier 3: Inner Velvet/Linen Frame Liner (Museum Shadowbox Depth) -->
      <rect x="75" y="70" width="1050" height="660" rx="4" fill="url(#innerLinenMatte)"/>
      <rect x="85" y="80" width="1030" height="640" rx="3" fill="none" stroke="url(#goldOuter1)" stroke-width="4"/>

      <!-- Tier 4: The Artwork Canvas Surface -->
      <rect x="92" y="87" width="1016" height="626" rx="2" fill="#FAF9F5" filter="url(#innerCanvasShadow)"/>
    </g>

    <!-- ARTWORK CONTENT: On The Way -->
    <g transform="translate(130, 115)">
      <text x="0" y="26" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="24" font-weight="700" fill="#121316" letter-spacing="-0.3">ON THE WAY — Transit &amp; Route UX</text>
      <text x="0" y="50" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="500" fill="#5F6A54">Multimodal Wayfinding • Smart Pitstops • Commuter Safety</text>

      <!-- Search Bar UI -->
      <rect x="0" y="70" width="560" height="46" rx="6" fill="#FFFFFF" stroke="#D8D4C8" stroke-width="1.5"/>
      <circle cx="24" cy="93" r="6" fill="#E05A47"/>
      <text x="42" y="98" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" fill="#717680">Search destination or add a stop along route...</text>
      <rect x="475" y="76" width="75" height="34" rx="4" fill="#121316"/>
      <text x="512" y="98" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="600" fill="#FFF" text-anchor="middle" letter-spacing="0.5">SEARCH</text>

      <!-- Map Mockup Container -->
      <g transform="translate(0, 130)">
        <rect width="560" height="375" rx="6" fill="url(#mapBg1)" stroke="#E2DFD7" stroke-width="1.5"/>
        <!-- Map Grid Lines -->
        <path d="M 0 75 Q 180 115 560 65 M 0 190 Q 280 230 560 170 M 0 305 Q 320 270 560 315" stroke="#E8E5DD" stroke-width="9" fill="none"/>
        <path d="M 130 0 Q 165 190 120 375 M 290 0 Q 265 190 320 375 M 440 0 Q 470 170 430 375" stroke="#E8E5DD" stroke-width="9" fill="none"/>
        
        <!-- Active Route Line -->
        <path d="M 70 280 C 160 260, 220 170, 290 180 S 380 105, 470 95" stroke="#E05A47" stroke-width="6" stroke-linecap="round" fill="none" stroke-dasharray="2 1"/>
        
        <!-- Pins -->
        <circle cx="70" cy="280" r="11" fill="#121316"/>
        <circle cx="70" cy="280" r="4" fill="#FFFFFF"/>
        <circle cx="290" cy="180" r="10" fill="#5F6A54"/>
        <circle cx="290" cy="180" r="4" fill="#FFF"/>
        <circle cx="470" cy="95" r="13" fill="#E05A47"/>
        <circle cx="470" cy="95" r="5" fill="#FFF"/>

        <!-- Route Callout Card -->
        <g transform="translate(220, 225)">
          <rect width="250" height="80" rx="6" fill="#FFF" stroke="#E2DFD7" stroke-width="1" filter="url(#innerCanvasShadow)"/>
          <rect x="0" y="0" width="5" height="80" rx="2" fill="#5F6A54"/>
          <text x="16" y="26" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="700" fill="#121316">Recommended Pitstop</text>
          <text x="16" y="45" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#5C6068">+4 mins • Highly Rated Coffee</text>
          <text x="16" y="65" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="600" fill="#E05A47">Add to Route →</text>
        </g>
      </g>

      <!-- Right Side Mobile Mockup Phone -->
      <g transform="translate(600, 10)">
        <rect width="310" height="500" rx="30" fill="#121316" filter="url(#innerCanvasShadow)"/>
        <rect x="10" y="10" width="290" height="480" rx="24" fill="#FFFFFF"/>
        
        <!-- Phone Notch -->
        <rect x="95" y="15" width="115" height="17" rx="8.5" fill="#121316"/>
        
        <!-- Phone Content -->
        <text x="22" y="62" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="16" font-weight="700" fill="#121316">Active Trip</text>
        <text x="22" y="80" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="500" fill="#5F6A54">Arriving in 18 mins (5.2 mi)</text>
        
        <rect x="18" y="96" width="254" height="175" rx="8" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
        <circle cx="42" cy="130" r="12" fill="#F4D5CE"/>
        <text x="42" y="135" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="700" fill="#E05A47" text-anchor="middle">1</text>
        <text x="64" y="127" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="700" fill="#121316">Turn right on Market St</text>
        <text x="64" y="142" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#6B7280">In 400 feet • Light traffic</text>

        <circle cx="42" cy="186" r="12" fill="#E5E8DF"/>
        <text x="42" y="191" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="700" fill="#5F6A54" text-anchor="middle">2</text>
        <text x="64" y="183" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="700" fill="#121316">Stop at Blue Bottle</text>
        <text x="64" y="198" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#6B7280">Order ahead is ready</text>

        <!-- Safety Card -->
        <rect x="18" y="285" width="254" height="86" rx="8" fill="#121316"/>
        <text x="32" y="312" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF">Live ETA Shared</text>
        <text x="32" y="332" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#C2C6CF">Location shared with 2 emergency contacts</text>
        <text x="32" y="352" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="600" fill="#E05A47">Manage Safety Settings ›</text>
        
        <rect x="18" y="385" width="254" height="44" rx="6" fill="#E05A47"/>
        <text x="145" y="412" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.3">End Trip &amp; Feedback</text>
      </g>
    </g>
  </svg>
  `;

  // 3. Back to the Future (bttf) - 1200x800 with Renaissance Beaded & Fluted Antique Gold Frame
  const bttfSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Shadow -->
      <filter id="museumSpotlight2" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#0a0a0c" flood-opacity="0.32"/>
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.2"/>
      </filter>
      <filter id="innerCanvasShadow2" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0e0a05" flood-opacity="0.45"/>
      </filter>

      <!-- Renaissance Antique Brass & Rich Gold Gradients -->
      <linearGradient id="renaissanceGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EED68B"/>
        <stop offset="20%" stop-color="#C99E32"/>
        <stop offset="45%" stop-color="#78500C"/>
        <stop offset="70%" stop-color="#DFC168"/>
        <stop offset="90%" stop-color="#9C6B17"/>
        <stop offset="100%" stop-color="#543606"/>
      </linearGradient>
      <linearGradient id="flutedGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFE899"/>
        <stop offset="50%" stop-color="#80540F"/>
        <stop offset="100%" stop-color="#FFE899"/>
      </linearGradient>
      <linearGradient id="cyberBg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#18191D"/>
        <stop offset="100%" stop-color="#0E0F12"/>
      </linearGradient>
      <pattern id="beadedPattern" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="4.5" fill="#FFE899" stroke="#66430B" stroke-width="1"/>
        <circle cx="8" cy="8" r="1.5" fill="#FFF"/>
      </pattern>
    </defs>

    <!-- Museum Wall Mat -->
    <rect width="1200" height="800" fill="#F7F6F2"/>

    <!-- ENTIRE GOLDEN FRAME ASSEMBLY -->
    <g filter="url(#museumSpotlight2)">
      <!-- Tier 1: Heavy Classical Outer Ogee Profile (Antique Gold) -->
      <rect x="25" y="20" width="1150" height="760" rx="6" fill="url(#renaissanceGold)"/>
      <rect x="34" y="29" width="1132" height="742" rx="4" fill="#472C04"/>

      <!-- Tier 2: Continuous Beaded Pearl Border -->
      <rect x="42" y="37" width="1116" height="726" rx="3" fill="url(#beadedPattern)" stroke="#66430B" stroke-width="1.5"/>

      <!-- Tier 3: Fluted Cove Moulding -->
      <rect x="62" y="57" width="1076" height="686" rx="2" fill="url(#flutedGold)"/>
      
      <!-- Tier 4: Dark Walnut Inset Mat with Gilded Bevel -->
      <rect x="76" y="71" width="1048" height="658" rx="2" fill="#241B10"/>
      <rect x="86" y="81" width="1028" height="638" fill="none" stroke="url(#renaissanceGold)" stroke-width="3.5"/>

      <!-- Tier 5: Canvas Surface -->
      <rect x="92" y="87" width="1016" height="626" fill="#121316" filter="url(#innerCanvasShadow2)"/>
    </g>

    <!-- Content: Back to the Future Platform -->
    <g transform="translate(125, 115)">
      <text x="0" y="26" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">BACK TO THE FUTURE — Interactive Research Platform</text>
      <text x="0" y="50" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="500" fill="#E05A47">Temporal User Flows • Historical UX Benchmarks • Predictive Prototyping</text>

      <!-- Main Dashboard Frame -->
      <g transform="translate(0, 75)">
        <rect width="950" height="480" rx="8" fill="url(#cyberBg2)" stroke="#2E3138" stroke-width="1.5"/>
        
        <!-- Timeline Bar -->
        <g transform="translate(40, 40)">
          <text x="0" y="0" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">TEMPORAL TIMELINE SIMULATION</text>
          
          <rect x="0" y="22" width="870" height="6" rx="3" fill="#2E3138"/>
          <rect x="0" y="22" width="510" height="6" rx="3" fill="#E05A47"/>
          
          <!-- Timeline Points -->
          <circle cx="110" cy="25" r="9" fill="#E05A47"/>
          <text x="110" y="54" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#9DA3AF" text-anchor="middle">1985 (Past)</text>
          
          <circle cx="340" cy="25" r="9" fill="#E05A47"/>
          <text x="340" y="54" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#9DA3AF" text-anchor="middle">2015 (Future Era)</text>

          <circle cx="510" cy="25" r="13" fill="#FFFFFF" stroke="#E05A47" stroke-width="4"/>
          <text x="510" y="56" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#E05A47" text-anchor="middle">Present (Active)</text>

          <circle cx="740" cy="25" r="8" fill="#2E3138"/>
          <text x="740" y="54" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#656B77" text-anchor="middle">2045 (Forecast)</text>
        </g>

        <!-- 3 Insight Cards -->
        <g transform="translate(40, 135)">
          <!-- Card 1 -->
          <rect x="0" y="0" width="270" height="260" rx="6" fill="#141519" stroke="#2E3138" stroke-width="1.5"/>
          <text x="22" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">User Retention</text>
          <text x="22" y="56" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#9DA3AF">Comparative Study N=140</text>
          
          <!-- Bar chart graphic -->
          <rect x="22" y="180" width="42" height="35" rx="3" fill="#5F6A54"/>
          <rect x="76" y="140" width="42" height="75" rx="3" fill="#8E97A6"/>
          <rect x="130" y="90" width="42" height="125" rx="3" fill="#E05A47"/>
          <text x="151" y="80" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#E05A47" text-anchor="middle">+84%</text>
          <text x="22" y="240" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#D0D4DC">Affinity Matrix Synthesized</text>

          <!-- Card 2 -->
          <rect x="298" y="0" width="270" height="260" rx="6" fill="#141519" stroke="#2E3138" stroke-width="1.5"/>
          <text x="320" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">Interaction Friction</text>
          <text x="320" y="56" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#9DA3AF">Task Success Probability</text>
          
          <!-- Circular score -->
          <circle cx="433" cy="145" r="50" fill="none" stroke="#2E3138" stroke-width="9"/>
          <circle cx="433" cy="145" r="50" fill="none" stroke="#5F6A54" stroke-width="9" stroke-dasharray="260 320" stroke-linecap="round"/>
          <text x="433" y="152" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" text-anchor="middle">92%</text>
          <text x="320" y="240" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#D0D4DC">Zero Critical Blockers</text>

          <!-- Card 3 -->
          <rect x="596" y="0" width="274" height="260" rx="6" fill="#141519" stroke="#2E3138" stroke-width="1.5"/>
          <text x="618" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">Persona: Dr. E. Brown</text>
          <text x="618" y="56" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#9DA3AF">Mental Model Mapping</text>
          
          <rect x="618" y="80" width="230" height="32" rx="4" fill="#22242B"/>
          <text x="630" y="101" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" fill="#E2E4E9">Goal: Temporal route entry</text>
          
          <rect x="618" y="120" width="230" height="32" rx="4" fill="#22242B"/>
          <text x="630" y="141" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" fill="#E2E4E9">Pain Point: Power surges</text>

          <rect x="618" y="160" width="230" height="32" rx="4" fill="#22242B"/>
          <text x="630" y="181" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" fill="#E2E4E9">Outcome: Zero latency sync</text>
          
          <text x="618" y="240" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="600" fill="#E05A47">Validated with 42 testers ›</text>
        </g>
      </g>
    </g>
  </svg>
  `;

  // 4. Flixtape (flix) - 1200x800 with Rococo Swept Scroll Vintage Gold Leaf Frame
  const flixSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Shadows -->
      <filter id="museumSpotlight3" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#0a0a0c" flood-opacity="0.32"/>
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.2"/>
      </filter>
      <filter id="innerCanvasShadow3" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#121316" flood-opacity="0.15"/>
      </filter>

      <!-- Rococo Bright Gilded Gold Gradients -->
      <linearGradient id="rococoGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF5C2"/>
        <stop offset="25%" stop-color="#E8C346"/>
        <stop offset="50%" stop-color="#8F5E0C"/>
        <stop offset="75%" stop-color="#FCE179"/>
        <stop offset="100%" stop-color="#5E3800"/>
      </linearGradient>
      <linearGradient id="rococoScroll" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFBE3"/>
        <stop offset="40%" stop-color="#E5BE3B"/>
        <stop offset="100%" stop-color="#734B09"/>
      </linearGradient>
      <linearGradient id="tapeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E05A47"/>
        <stop offset="50%" stop-color="#F4A596"/>
        <stop offset="100%" stop-color="#E05A47"/>
      </linearGradient>
    </defs>

    <!-- Museum Wall Background -->
    <rect width="1200" height="800" fill="#F7F6F2"/>

    <!-- ENTIRE GOLDEN FRAME ASSEMBLY -->
    <g filter="url(#museumSpotlight3)">
      <!-- Tier 1: Swept Rococo Outer Contoured Frame -->
      <rect x="25" y="20" width="1150" height="760" rx="20" fill="url(#rococoGold)"/>
      <rect x="36" y="31" width="1128" height="738" rx="14" fill="#5E3800"/>

      <!-- Swept Corner Crests & Shells (Rococo Ribbon Ornaments) -->
      <!-- Top-Left Crest -->
      <g transform="translate(25, 20)">
        <path d="M 0 0 C 40 10, 80 0, 110 0 C 90 35, 75 55, 40 75 C 20 95, 0 110, 0 110 Z" fill="url(#rococoScroll)" stroke="#4A2C00" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="12" fill="#FFFBE3" stroke="#8F5E0C" stroke-width="2"/>
        <path d="M 20 20 Q 50 25 70 10 M 20 20 Q 25 50 10 70" stroke="#FFFFFF" stroke-width="2" fill="none"/>
      </g>
      <!-- Top-Right Crest -->
      <g transform="translate(1175, 20) scale(-1, 1)">
        <path d="M 0 0 C 40 10, 80 0, 110 0 C 90 35, 75 55, 40 75 C 20 95, 0 110, 0 110 Z" fill="url(#rococoScroll)" stroke="#4A2C00" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="12" fill="#FFFBE3" stroke="#8F5E0C" stroke-width="2"/>
        <path d="M 20 20 Q 50 25 70 10 M 20 20 Q 25 50 10 70" stroke="#FFFFFF" stroke-width="2" fill="none"/>
      </g>
      <!-- Bottom-Left Crest -->
      <g transform="translate(25, 780) scale(1, -1)">
        <path d="M 0 0 C 40 10, 80 0, 110 0 C 90 35, 75 55, 40 75 C 20 95, 0 110, 0 110 Z" fill="url(#rococoScroll)" stroke="#4A2C00" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="12" fill="#FFFBE3" stroke="#8F5E0C" stroke-width="2"/>
        <path d="M 20 20 Q 50 25 70 10 M 20 20 Q 25 50 10 70" stroke="#FFFFFF" stroke-width="2" fill="none"/>
      </g>
      <!-- Bottom-Right Crest -->
      <g transform="translate(1175, 780) scale(-1, -1)">
        <path d="M 0 0 C 40 10, 80 0, 110 0 C 90 35, 75 55, 40 75 C 20 95, 0 110, 0 110 Z" fill="url(#rococoScroll)" stroke="#4A2C00" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="12" fill="#FFFBE3" stroke="#8F5E0C" stroke-width="2"/>
        <path d="M 20 20 Q 50 25 70 10 M 20 20 Q 25 50 10 70" stroke="#FFFFFF" stroke-width="2" fill="none"/>
      </g>

      <!-- Center Cartouche Top & Bottom -->
      <g transform="translate(600, 22)">
        <path d="M -50 0 Q 0 18 50 0 Q 30 25 0 28 Q -30 25 -50 0 Z" fill="url(#rococoScroll)" stroke="#4A2C00" stroke-width="1.5"/>
        <circle cx="0" cy="14" r="6" fill="#FFFBE3"/>
      </g>
      <g transform="translate(600, 778) scale(1, -1)">
        <path d="M -50 0 Q 0 18 50 0 Q 30 25 0 28 Q -30 25 -50 0 Z" fill="url(#rococoScroll)" stroke="#4A2C00" stroke-width="1.5"/>
        <circle cx="0" cy="14" r="6" fill="#FFFBE3"/>
      </g>

      <!-- Tier 2: Beveled Gold Inset Rim -->
      <rect x="65" y="60" width="1070" height="680" rx="10" fill="url(#rococoGold)"/>
      
      <!-- Tier 3: Museum Velvet Shadow Mat (Deep Burgundy/Black) -->
      <rect x="76" y="71" width="1048" height="658" rx="6" fill="#1C1814"/>
      <rect x="85" y="80" width="1030" height="640" rx="4" fill="none" stroke="url(#rococoGold)" stroke-width="3"/>

      <!-- Tier 4: Artwork Canvas -->
      <rect x="92" y="87" width="1016" height="626" rx="2" fill="#FAF8F5" filter="url(#innerCanvasShadow3)"/>
    </g>

    <!-- Content: Flixtape -->
    <g transform="translate(125, 115)">
      <text x="0" y="26" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="24" font-weight="700" fill="#121316">FLIXTAPE — Social Film Discovery &amp; Mixtapes</text>
      <text x="0" y="50" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="500" fill="#5F6A54">Curated Movie Playlists • Mood-Based Matching • Cross-Platform Queueing</text>

      <!-- App Mockup -->
      <g transform="translate(0, 70)">
        <!-- Left Mixtape Cassette Graphic -->
        <g transform="translate(0, 0)">
          <!-- Cassette Tape Container -->
          <rect width="440" height="280" rx="14" fill="#121316" filter="url(#innerCanvasShadow3)"/>
          <rect x="16" y="16" width="408" height="248" rx="8" fill="#F7F6F2"/>
          
          <!-- Cassette Label -->
          <rect x="34" y="34" width="372" height="135" rx="6" fill="url(#tapeGrad2)"/>
          <text x="52" y="68" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" letter-spacing="0.4">SIDE A: "LATE NIGHT THRILLERS"</text>
          <text x="52" y="90" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="500" fill="#FFFFFF">Curated by Vanessa • 5 Films • 9h 42m</text>

          <!-- Tape Spools -->
          <rect x="70" y="112" width="300" height="44" rx="22" fill="#121316"/>
          <circle cx="130" cy="134" r="14" fill="#FFFFFF"/>
          <circle cx="130" cy="134" r="5" fill="#121316"/>
          <circle cx="310" cy="134" r="14" fill="#FFFFFF"/>
          <circle cx="310" cy="134" r="5" fill="#121316"/>
          <rect x="160" y="124" width="120" height="20" fill="#2E3138" rx="4"/>
          
          <!-- Bottom Notch -->
          <path d="M 120 264 L 160 224 L 280 224 L 320 264 Z" fill="#E2DFD7"/>
          <circle cx="175" cy="242" r="5" fill="#121316"/>
          <circle cx="265" cy="242" r="5" fill="#121316"/>
        </g>

        <!-- Player controls below Cassette -->
        <g transform="translate(0, 305)">
          <rect width="440" height="150" rx="8" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="1.5"/>
          <text x="22" y="34" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14.5" font-weight="700" fill="#121316">Now Playing Preview: Knives Out (2019)</text>
          <text x="22" y="55" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="500" fill="#5F6A54">Directing • Murder Mystery • 97% Match</text>
          
          <!-- Audio wave / scrubbing -->
          <rect x="22" y="76" width="396" height="6" rx="3" fill="#E2DFD7"/>
          <rect x="22" y="76" width="245" height="6" rx="3" fill="#E05A47"/>
          <circle cx="267" cy="79" r="7" fill="#E05A47"/>
          
          <text x="22" y="112" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#6B7280">01:42 / 02:30</text>
          <text x="418" y="112" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="700" fill="#E05A47" text-anchor="end">Stream on Hulu ›</text>
        </g>

        <!-- Right Side: Curated Movie Grid list -->
        <g transform="translate(470, 0)">
          <rect width="485" height="455" rx="8" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="1.5"/>
          <text x="26" y="38" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="16" font-weight="700" fill="#121316">Mixtape Tracklist (5 Titles)</text>
          <text x="26" y="60" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="500" fill="#5F6A54">Drag to reorder • Export to Letterboxd &amp; Netflix</text>
          
          <!-- Movie 1 -->
          <g transform="translate(26, 80)">
            <rect width="433" height="62" rx="6" fill="#F7F6F2" stroke="#E05A47" stroke-width="1.5"/>
            <rect x="10" y="9" width="44" height="44" rx="4" fill="#121316"/>
            <text x="32" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="700" fill="#E05A47" text-anchor="middle">#1</text>
            <text x="66" y="26" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#121316">Knives Out (2019)</text>
            <text x="66" y="45" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#6B7280">Whodunnit • 2h 10m • ★ 4.1</text>
            <text x="405" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Movie 2 -->
          <g transform="translate(26, 152)">
            <rect width="433" height="62" rx="6" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
            <rect x="10" y="9" width="44" height="44" rx="4" fill="#121316"/>
            <text x="32" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="700" fill="#9DA3AF" text-anchor="middle">#2</text>
            <text x="66" y="26" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#121316">Prisoners (2013)</text>
            <text x="66" y="45" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#6B7280">Psychological Thriller • 2h 33m • ★ 4.2</text>
            <text x="405" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Movie 3 -->
          <g transform="translate(26, 224)">
            <rect width="433" height="62" rx="6" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
            <rect x="10" y="9" width="44" height="44" rx="4" fill="#121316"/>
            <text x="32" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="700" fill="#9DA3AF" text-anchor="middle">#3</text>
            <text x="66" y="26" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#121316">Gone Girl (2014)</text>
            <text x="66" y="45" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#6B7280">Mystery / Drama • 2h 29m • ★ 4.0</text>
            <text x="405" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Movie 4 -->
          <g transform="translate(26, 296)">
            <rect width="433" height="62" rx="6" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
            <rect x="10" y="9" width="44" height="44" rx="4" fill="#121316"/>
            <text x="32" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="700" fill="#9DA3AF" text-anchor="middle">#4</text>
            <text x="66" y="26" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#121316">Shutter Island (2010)</text>
            <text x="66" y="45" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#6B7280">Mind-Bending • 2h 18m • ★ 4.1</text>
            <text x="405" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Share Button -->
          <g transform="translate(26, 376)">
            <rect width="433" height="46" rx="6" fill="#121316"/>
            <text x="216" y="29" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.4">Share Mixtape Link &amp; QR Code</text>
          </g>
        </g>
      </g>
    </g>
  </svg>
  `;

  // Keep the photographed framed portrait in me/sample-headshot.png.
  await createAsset(otwSvg, './otw/framed-otw.png', 1200, 800);
  await createAsset(bttfSvg, './bttf/framed-bttf.png', 1200, 800);
  await createAsset(flixSvg, './flix/framed-flix.png', 1200, 800);
  
  // Also create public copy for direct access
  // Headshot is the real portrait; do not regenerate the illustrated placeholder.
  await createAsset(otwSvg, './public/otw/framed-otw.png', 1200, 800);
  await createAsset(bttfSvg, './public/bttf/framed-bttf.png', 1200, 800);
  await createAsset(flixSvg, './public/flix/framed-flix.png', 1200, 800);

  console.log('All ornate museum golden frames created successfully!');
}

main().catch(console.error);
