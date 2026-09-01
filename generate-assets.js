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
        <stop offset="0%" stop-color="#FFFBF1"/>
        <stop offset="50%" stop-color="#FFB2B2"/>
        <stop offset="100%" stop-color="#FF5A5A"/>
      </linearGradient>
      <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e130b"/>
        <stop offset="100%" stop-color="#321F12"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#321F12" flood-opacity="0.15"/>
      </filter>
    </defs>
    <!-- Background Frame -->
    <rect width="800" height="800" rx="400" fill="url(#headshotBg)"/>
    <circle cx="400" cy="400" r="380" fill="none" stroke="#FFF2D0" stroke-width="8" opacity="0.6"/>

    <!-- Avatar Illustration -->
    <g filter="url(#shadow)">
      <!-- Shoulders & Outfit -->
      <path d="M 220 740 C 220 580, 580 580, 580 740 Z" fill="#321F12"/>
      <!-- Collar / Accent -->
      <path d="M 340 590 L 400 660 L 460 590 Z" fill="#FF5A5A"/>
      <circle cx="400" cy="685" r="8" fill="#FFF2D0"/>

      <!-- Neck -->
      <rect x="360" y="470" width="80" height="130" rx="15" fill="#8c5836"/>

      <!-- Face -->
      <ellipse cx="400" cy="420" rx="115" ry="140" fill="#a46942"/>

      <!-- Glasses / Specs -->
      <rect x="320" y="385" width="65" height="48" rx="12" fill="none" stroke="#321F12" stroke-width="8"/>
      <rect x="415" y="385" width="65" height="48" rx="12" fill="none" stroke="#321F12" stroke-width="8"/>
      <line x1="385" y1="405" x2="415" y2="405" stroke="#321F12" stroke-width="8"/>

      <!-- Eyes & Smile -->
      <circle cx="352" cy="409" r="7" fill="#321F12"/>
      <circle cx="447" cy="409" r="7" fill="#321F12"/>
      <path d="M 365 480 Q 400 515 435 480" fill="none" stroke="#321F12" stroke-width="7" stroke-linecap="round"/>

      <!-- Stylish Hair -->
      <path d="M 270 380 C 260 220, 540 220, 530 380 C 510 270, 290 270, 270 380 Z" fill="url(#hairGrad)"/>
      <path d="M 270 360 C 240 430, 260 520, 290 560 C 270 480, 280 400, 310 350 Z" fill="url(#hairGrad)"/>
      <path d="M 530 360 C 560 430, 540 520, 510 560 C 530 480, 520 400, 490 350 Z" fill="url(#hairGrad)"/>
      
      <!-- Earring -->
      <circle cx="280" cy="440" r="12" fill="none" stroke="#FF5A5A" stroke-width="5"/>
      <circle cx="520" cy="440" r="12" fill="none" stroke="#FF5A5A" stroke-width="5"/>
    </g>

    <!-- Decorative UX Badges -->
    <g transform="translate(110, 620)">
      <rect width="180" height="48" rx="24" fill="#FFFBF1" filter="url(#shadow)"/>
      <text x="90" y="30" font-family="'Avenir', sans-serif" font-size="18" font-weight="bold" fill="#321F12" text-anchor="middle">UX Design</text>
    </g>
    <g transform="translate(510, 620)">
      <rect width="180" height="48" rx="24" fill="#321F12" filter="url(#shadow)"/>
      <text x="90" y="30" font-family="'Avenir', sans-serif" font-size="18" font-weight="bold" fill="#FFF2D0" text-anchor="middle">Product Owner</text>
    </g>
  </svg>
  `;

  // 2. On The Way (otw) - 1200x800
  const otwSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="frameShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="20" stdDeviation="25" flood-color="#321F12" flood-opacity="0.2"/>
      </filter>
      <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fdfbf7"/>
        <stop offset="100%" stop-color="#f0ebe1"/>
      </linearGradient>
    </defs>
    <!-- Gallery Outer Background / Wall Mat -->
    <rect width="1200" height="800" fill="#FFF2D0"/>
    
    <!-- Gallery Art Frame -->
    <rect x="60" y="50" width="1080" height="700" rx="16" fill="#321F12" filter="url(#frameShadow)"/>
    <rect x="76" y="66" width="1048" height="668" rx="10" fill="#FFFBF1"/>
    
    <!-- App Canvas Header -->
    <g transform="translate(120, 100)">
      <text x="0" y="32" font-family="'Avenir', sans-serif" font-size="28" font-weight="900" fill="#321F12" letter-spacing="-0.5">ON THE WAY — Transit &amp; Route UX</text>
      <text x="0" y="60" font-family="'Avenir', sans-serif" font-size="16" fill="#808249">Multimodal Wayfinding • Smart Pitstops • Commuter Safety</text>

      <!-- Search Bar UI -->
      <rect x="0" y="80" width="600" height="52" rx="26" fill="#FFF" stroke="#E2D7BE" stroke-width="2"/>
      <circle cx="30" cy="106" r="8" fill="#FF5A5A"/>
      <text x="54" y="112" font-family="'Avenir', sans-serif" font-size="16" fill="#777">Search destination or add a stop along route...</text>
      <rect x="510" y="88" width="76" height="36" rx="18" fill="#FF5A5A"/>
      <text x="548" y="111" font-family="'Avenir', sans-serif" font-size="14" font-weight="bold" fill="#FFF" text-anchor="middle">GO</text>

      <!-- Map Mockup Container -->
      <g transform="translate(0, 155)">
        <rect width="600" height="390" rx="14" fill="url(#mapBg)" stroke="#E0D7C4" stroke-width="2"/>
        <!-- Map Grid Lines -->
        <path d="M 0 80 Q 200 120 600 70 M 0 200 Q 300 240 600 180 M 0 320 Q 350 280 600 330" stroke="#e3dcce" stroke-width="12" fill="none"/>
        <path d="M 140 0 Q 180 200 130 390 M 320 0 Q 290 200 350 390 M 480 0 Q 510 180 470 390" stroke="#e3dcce" stroke-width="12" fill="none"/>
        
        <!-- Active Route Line -->
        <path d="M 80 300 C 180 280, 240 180, 320 190 S 420 110, 520 100" stroke="#FF5A5A" stroke-width="8" stroke-linecap="round" fill="none" stroke-dasharray="2 1"/>
        
        <!-- Pins -->
        <circle cx="80" cy="300" r="14" fill="#321F12"/>
        <circle cx="80" cy="300" r="6" fill="#FFF2D0"/>
        <circle cx="320" cy="190" r="12" fill="#808249"/>
        <circle cx="320" cy="190" r="5" fill="#FFF"/>
        <circle cx="520" cy="100" r="16" fill="#FF5A5A"/>
        <circle cx="520" cy="100" r="7" fill="#FFF"/>

        <!-- Route Callout Card -->
        <g transform="translate(240, 230)">
          <rect width="260" height="90" rx="12" fill="#FFF" filter="url(#frameShadow)"/>
          <rect x="0" y="0" width="8" height="90" rx="4" fill="#808249"/>
          <text x="20" y="30" font-family="'Avenir', sans-serif" font-size="15" font-weight="bold" fill="#321F12">Recommended Pitstop</text>
          <text x="20" y="52" font-family="'Avenir', sans-serif" font-size="13" fill="#666">+4 mins • Highly Rated Coffee</text>
          <text x="20" y="74" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FF5A5A">Add to Route →</text>
        </g>
      </g>

      <!-- Right Side Mobile Mockup Phone -->
      <g transform="translate(640, 30)">
        <rect width="320" height="515" rx="36" fill="#321F12" filter="url(#frameShadow)"/>
        <rect x="12" y="12" width="296" height="491" rx="28" fill="#FFFBF1"/>
        
        <!-- Phone Notch -->
        <rect x="95" y="16" width="130" height="20" rx="10" fill="#321F12"/>
        
        <!-- Phone Content -->
        <text x="24" y="68" font-family="'Avenir', sans-serif" font-size="18" font-weight="bold" fill="#321F12">Active Trip</text>
        <text x="24" y="88" font-family="'Avenir', sans-serif" font-size="12" fill="#808249">Arriving in 18 mins (5.2 mi)</text>
        
        <rect x="24" y="105" width="272" height="180" rx="16" fill="#FFF" stroke="#E2D7BE" stroke-width="1.5"/>
        <circle cx="50" cy="140" r="14" fill="#FFB2B2"/>
        <text x="50" y="145" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FF5A5A" text-anchor="middle">1</text>
        <text x="76" y="136" font-family="'Avenir', sans-serif" font-size="14" font-weight="bold" fill="#321F12">Turn right on Market St</text>
        <text x="76" y="152" font-family="'Avenir', sans-serif" font-size="11" fill="#777">In 400 feet • Light traffic</text>

        <circle cx="50" cy="200" r="14" fill="#808249"/>
        <text x="50" y="205" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FFF" text-anchor="middle">2</text>
        <text x="76" y="196" font-family="'Avenir', sans-serif" font-size="14" font-weight="bold" fill="#321F12">Stop at Blue Bottle</text>
        <text x="76" y="212" font-family="'Avenir', sans-serif" font-size="11" fill="#777">Order ahead is ready</text>

        <!-- Safety Card -->
        <rect x="24" y="300" width="272" height="90" rx="16" fill="#FF5A5A"/>
        <text x="40" y="332" font-family="'Avenir', sans-serif" font-size="15" font-weight="bold" fill="#FFF">Live ETA Shared</text>
        <text x="40" y="354" font-family="'Avenir', sans-serif" font-size="12" fill="#FFF2D0">Location shared with 2 emergency contacts</text>
        <text x="40" y="374" font-family="'Avenir', sans-serif" font-size="11" font-weight="bold" fill="#FFF">Manage Safety Settings ›</text>
        
        <rect x="24" y="405" width="272" height="48" rx="24" fill="#321F12"/>
        <text x="160" y="435" font-family="'Avenir', sans-serif" font-size="14" font-weight="bold" fill="#FFF2D0" text-anchor="middle">End Trip &amp; Feedback</text>
      </g>
    </g>
  </svg>
  `;

  // 3. Back to the Future (bttf) - 1200x800
  const bttfSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="frameShadow3" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="20" stdDeviation="25" flood-color="#321F12" flood-opacity="0.2"/>
      </filter>
      <linearGradient id="cyberBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#321F12"/>
        <stop offset="100%" stop-color="#190F09"/>
      </linearGradient>
    </defs>
    <!-- Gallery Outer Background -->
    <rect width="1200" height="800" fill="#FFF2D0"/>
    
    <!-- Gallery Art Frame -->
    <rect x="60" y="50" width="1080" height="700" rx="16" fill="#321F12" filter="url(#frameShadow3)"/>
    <rect x="76" y="66" width="1048" height="668" rx="10" fill="#FFFBF1"/>

    <!-- Content -->
    <g transform="translate(120, 100)">
      <text x="0" y="32" font-family="'Avenir', sans-serif" font-size="28" font-weight="900" fill="#321F12">BACK TO THE FUTURE — Interactive Research Platform</text>
      <text x="0" y="60" font-family="'Avenir', sans-serif" font-size="16" fill="#808249">Temporal User Flows • Historical UX Benchmarks • Predictive Prototyping</text>

      <!-- Main Dashboard Frame -->
      <g transform="translate(0, 90)">
        <rect width="960" height="460" rx="20" fill="url(#cyberBg)" filter="url(#frameShadow3)"/>
        
        <!-- Timeline Bar -->
        <g transform="translate(40, 40)">
          <text x="0" y="0" font-family="'Avenir', sans-serif" font-size="18" font-weight="bold" fill="#FFB2B2">TEMPORAL TIMELINE SIMULATION</text>
          
          <rect x="0" y="20" width="880" height="8" rx="4" fill="#4a3120"/>
          <rect x="0" y="20" width="520" height="8" rx="4" fill="#FF5A5A"/>
          
          <!-- Timeline Points -->
          <circle cx="120" cy="24" r="12" fill="#FF5A5A"/>
          <text x="120" y="58" font-family="'Avenir', sans-serif" font-size="12" fill="#FFF2D0" text-anchor="middle">1985 (Past)</text>
          
          <circle cx="360" cy="24" r="12" fill="#FF5A5A"/>
          <text x="360" y="58" font-family="'Avenir', sans-serif" font-size="12" fill="#FFF2D0" text-anchor="middle">2015 (Future Era)</text>

          <circle cx="520" cy="24" r="16" fill="#FFF2D0" stroke="#FF5A5A" stroke-width="4"/>
          <text x="520" y="60" font-family="'Avenir', sans-serif" font-size="13" font-weight="bold" fill="#FF5A5A" text-anchor="middle">Present (Active)</text>

          <circle cx="760" cy="24" r="10" fill="#4a3120"/>
          <text x="760" y="58" font-family="'Avenir', sans-serif" font-size="12" fill="#999" text-anchor="middle">2045 (Forecast)</text>
        </g>

        <!-- 3 Insight Cards -->
        <g transform="translate(40, 140)">
          <!-- Card 1 -->
          <rect x="0" y="0" width="275" height="260" rx="14" fill="#24150b" stroke="#FF5A5A" stroke-width="1.5"/>
          <text x="24" y="38" font-family="'Avenir', sans-serif" font-size="16" font-weight="bold" fill="#FFF2D0">User Retention</text>
          <text x="24" y="60" font-family="'Avenir', sans-serif" font-size="12" fill="#808249">Comparative Study N=140</text>
          
          <!-- Bar chart graphic -->
          <rect x="24" y="180" width="40" height="40" rx="4" fill="#808249"/>
          <rect x="74" y="140" width="40" height="80" rx="4" fill="#FFB2B2"/>
          <rect x="124" y="90" width="40" height="130" rx="4" fill="#FF5A5A"/>
          <text x="144" y="80" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FF5A5A" text-anchor="middle">+84%</text>
          <text x="24" y="244" font-family="'Avenir', sans-serif" font-size="12" fill="#FFF2D0">Affinity Matrix Synthesized</text>

          <!-- Card 2 -->
          <rect x="300" y="0" width="275" height="260" rx="14" fill="#24150b" stroke="#808249" stroke-width="1.5"/>
          <text x="324" y="38" font-family="'Avenir', sans-serif" font-size="16" font-weight="bold" fill="#FFF2D0">Interaction Friction</text>
          <text x="324" y="60" font-family="'Avenir', sans-serif" font-size="12" fill="#808249">Task Success Probability</text>
          
          <!-- Circular score -->
          <circle cx="437" cy="145" r="55" fill="none" stroke="#4a3120" stroke-width="12"/>
          <circle cx="437" cy="145" r="55" fill="none" stroke="#808249" stroke-width="12" stroke-dasharray="280 345" stroke-linecap="round"/>
          <text x="437" y="152" font-family="'Avenir', sans-serif" font-size="28" font-weight="bold" fill="#FFF2D0" text-anchor="middle">92%</text>
          <text x="324" y="244" font-family="'Avenir', sans-serif" font-size="12" fill="#FFF2D0">Zero Critical Blockers</text>

          <!-- Card 3 -->
          <rect x="600" y="0" width="275" height="260" rx="14" fill="#24150b" stroke="#FFB2B2" stroke-width="1.5"/>
          <text x="624" y="38" font-family="'Avenir', sans-serif" font-size="16" font-weight="bold" fill="#FFF2D0">UX Persona: Dr. E. Brown</text>
          <text x="624" y="60" font-family="'Avenir', sans-serif" font-size="12" fill="#808249">Mental Model Mapping</text>
          
          <rect x="624" y="85" width="227" height="32" rx="6" fill="#321F12"/>
          <text x="636" y="106" font-family="'Avenir', sans-serif" font-size="11" fill="#FFB2B2">Goal: High-speed temporal entry</text>
          
          <rect x="624" y="125" width="227" height="32" rx="6" fill="#321F12"/>
          <text x="636" y="146" font-family="'Avenir', sans-serif" font-size="11" fill="#FFB2B2">Pain Point: 1.21 GW power surges</text>

          <rect x="624" y="165" width="227" height="32" rx="6" fill="#321F12"/>
          <text x="636" y="186" font-family="'Avenir', sans-serif" font-size="11" fill="#FFB2B2">Outcome: Instant flux capacitor sync</text>
          
          <text x="624" y="244" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FF5A5A">Validated with 42 testers ›</text>
        </g>
      </g>
    </g>
  </svg>
  `;

  // 4. Flixtapes (flix) - 1200x800
  const flixSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="frameShadow4" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="20" stdDeviation="25" flood-color="#321F12" flood-opacity="0.2"/>
      </filter>
      <linearGradient id="tapeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FF5A5A"/>
        <stop offset="50%" stop-color="#FFB2B2"/>
        <stop offset="100%" stop-color="#FF5A5A"/>
      </linearGradient>
    </defs>
    <!-- Gallery Outer Background -->
    <rect width="1200" height="800" fill="#FFF2D0"/>
    
    <!-- Gallery Art Frame -->
    <rect x="60" y="50" width="1080" height="700" rx="16" fill="#321F12" filter="url(#frameShadow4)"/>
    <rect x="76" y="66" width="1048" height="668" rx="10" fill="#FFFBF1"/>

    <!-- Content -->
    <g transform="translate(120, 100)">
      <text x="0" y="32" font-family="'Avenir', sans-serif" font-size="28" font-weight="900" fill="#321F12">FLIXTAPES — Social Film Discovery &amp; Mixtapes</text>
      <text x="0" y="60" font-family="'Avenir', sans-serif" font-size="16" fill="#808249">Curated Movie Playlists • Mood-Based Matching • Cross-Platform Queueing</text>

      <!-- App Mockup -->
      <g transform="translate(0, 85)">
        <!-- Left Mixtape Cassette Graphic -->
        <g transform="translate(0, 0)">
          <!-- Cassette Tape Container -->
          <rect width="440" height="280" rx="20" fill="#321F12" filter="url(#frameShadow4)"/>
          <rect x="20" y="20" width="400" height="240" rx="12" fill="#FFFBF1"/>
          
          <!-- Cassette Label -->
          <rect x="40" y="40" width="360" height="130" rx="8" fill="url(#tapeGrad)"/>
          <text x="60" y="75" font-family="'Avenir', sans-serif" font-size="18" font-weight="bold" fill="#321F12">SIDE A: "LATE NIGHT THRILLERS"</text>
          <text x="60" y="98" font-family="'Avenir', sans-serif" font-size="13" fill="#321F12">Curated by Vanessa • 5 Films • 9h 42m</text>

          <!-- Tape Spools -->
          <rect x="80" y="115" width="280" height="46" rx="23" fill="#321F12"/>
          <circle cx="140" cy="138" r="16" fill="#FFF2D0"/>
          <circle cx="140" cy="138" r="6" fill="#321F12"/>
          <circle cx="300" cy="138" r="16" fill="#FFF2D0"/>
          <circle cx="300" cy="138" r="6" fill="#321F12"/>
          <rect x="170" y="128" width="100" height="20" fill="#FFB2B2" rx="4"/>
          
          <!-- Bottom Notch -->
          <path d="M 120 260 L 160 220 L 280 220 L 320 260 Z" fill="#E2D7BE"/>
          <circle cx="180" cy="240" r="6" fill="#321F12"/>
          <circle cx="260" cy="240" r="6" fill="#321F12"/>
        </g>

        <!-- Player controls below Cassette -->
        <g transform="translate(0, 310)">
          <rect width="440" height="150" rx="16" fill="#FFF" stroke="#E2D7BE" stroke-width="1.5"/>
          <text x="24" y="36" font-family="'Avenir', sans-serif" font-size="15" font-weight="bold" fill="#321F12">Now Playing Preview: Knives Out (2019)</text>
          <text x="24" y="58" font-family="'Avenir', sans-serif" font-size="12" fill="#808249">Directing • Murder Mystery • 97% Match</text>
          
          <!-- Audio wave / scrubbing -->
          <rect x="24" y="80" width="392" height="6" rx="3" fill="#E2D7BE"/>
          <rect x="24" y="80" width="240" height="6" rx="3" fill="#FF5A5A"/>
          <circle cx="264" cy="83" r="8" fill="#FF5A5A"/>
          
          <text x="24" y="115" font-family="'Avenir', sans-serif" font-size="12" fill="#777">01:42 / 02:30</text>
          <text x="416" y="115" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FF5A5A" text-anchor="end">Stream on Hulu ›</text>
        </g>

        <!-- Right Side: Curated Movie Grid list -->
        <g transform="translate(480, 0)">
          <rect width="480" height="460" rx="16" fill="#FFF" stroke="#E2D7BE" stroke-width="1.5"/>
          <text x="28" y="42" font-family="'Avenir', sans-serif" font-size="18" font-weight="bold" fill="#321F12">Mixtape Tracklist (5 Titles)</text>
          <text x="28" y="65" font-family="'Avenir', sans-serif" font-size="13" fill="#808249">Drag to reorder • Export to Letterboxd &amp; Netflix</text>
          
          <!-- Movie 1 -->
          <g transform="translate(28, 85)">
            <rect width="424" height="64" rx="10" fill="#FFFBF1" stroke="#FF5A5A" stroke-width="1"/>
            <rect x="12" y="10" width="44" height="44" rx="6" fill="#321F12"/>
            <text x="34" y="36" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FF5A5A" text-anchor="middle">#1</text>
            <text x="68" y="28" font-family="'Avenir', sans-serif" font-size="14" font-weight="bold" fill="#321F12">Knives Out (2019)</text>
            <text x="68" y="48" font-family="'Avenir', sans-serif" font-size="12" fill="#777">Whodunnit • 2h 10m • ★ 4.1</text>
            <text x="395" y="38" font-family="'Avenir', sans-serif" font-size="14" fill="#808249">✓ Queued</text>
          </g>

          <!-- Movie 2 -->
          <g transform="translate(28, 160)">
            <rect width="424" height="64" rx="10" fill="#FFFBF1" stroke="#E2D7BE" stroke-width="1"/>
            <rect x="12" y="10" width="44" height="44" rx="6" fill="#321F12"/>
            <text x="34" y="36" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FFB2B2" text-anchor="middle">#2</text>
            <text x="68" y="28" font-family="'Avenir', sans-serif" font-size="14" font-weight="bold" fill="#321F12">Prisoners (2013)</text>
            <text x="68" y="48" font-family="'Avenir', sans-serif" font-size="12" fill="#777">Psychological Thriller • 2h 33m • ★ 4.2</text>
            <text x="395" y="38" font-family="'Avenir', sans-serif" font-size="14" fill="#808249">✓ Queued</text>
          </g>

          <!-- Movie 3 -->
          <g transform="translate(28, 235)">
            <rect width="424" height="64" rx="10" fill="#FFFBF1" stroke="#E2D7BE" stroke-width="1"/>
            <rect x="12" y="10" width="44" height="44" rx="6" fill="#321F12"/>
            <text x="34" y="36" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FFB2B2" text-anchor="middle">#3</text>
            <text x="68" y="28" font-family="'Avenir', sans-serif" font-size="14" font-weight="bold" fill="#321F12">Gone Girl (2014)</text>
            <text x="68" y="48" font-family="'Avenir', sans-serif" font-size="12" fill="#777">Mystery / Drama • 2h 29m • ★ 4.0</text>
            <text x="395" y="38" font-family="'Avenir', sans-serif" font-size="14" fill="#808249">✓ Queued</text>
          </g>

          <!-- Movie 4 -->
          <g transform="translate(28, 310)">
            <rect width="424" height="64" rx="10" fill="#FFFBF1" stroke="#E2D7BE" stroke-width="1"/>
            <rect x="12" y="10" width="44" height="44" rx="6" fill="#321F12"/>
            <text x="34" y="36" font-family="'Avenir', sans-serif" font-size="12" font-weight="bold" fill="#FFB2B2" text-anchor="middle">#4</text>
            <text x="68" y="28" font-family="'Avenir', sans-serif" font-size="14" font-weight="bold" fill="#321F12">Shutter Island (2010)</text>
            <text x="68" y="48" font-family="'Avenir', sans-serif" font-size="12" fill="#777">Mind-Bending • 2h 18m • ★ 4.1</text>
            <text x="395" y="38" font-family="'Avenir', sans-serif" font-size="14" fill="#808249">✓ Queued</text>
          </g>

          <!-- Share Button -->
          <g transform="translate(28, 390)">
            <rect width="424" height="48" rx="24" fill="#FF5A5A"/>
            <text x="212" y="29" font-family="'Avenir', sans-serif" font-size="15" font-weight="bold" fill="#FFF" text-anchor="middle">Share Mixtape Link &amp; QR Code</text>
          </g>
        </g>
      </g>
    </g>
  </svg>
  `;

  await createAsset(headshotSvg, './me/sample-headshot.png', 800, 800);
  await createAsset(otwSvg, './otw/framed-otw.png', 1200, 800);
  await createAsset(bttfSvg, './bttf/framed-bttf.png', 1200, 800);
  await createAsset(flixSvg, './flix/framed-flix.png', 1200, 800);
  
  // Also create public copy for direct access
  await createAsset(headshotSvg, './public/me/sample-headshot.png', 800, 800);
  await createAsset(otwSvg, './public/otw/framed-otw.png', 1200, 800);
  await createAsset(bttfSvg, './public/bttf/framed-bttf.png', 1200, 800);
  await createAsset(flixSvg, './public/flix/framed-flix.png', 1200, 800);

  console.log('All image assets created successfully!');
}

main().catch(console.error);
