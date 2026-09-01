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

  // 2. On The Way (otw) - 1200x800
  const otwSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="frameShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#121316" flood-opacity="0.1"/>
      </filter>
      <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#F6F5F2"/>
      </linearGradient>
    </defs>
    <!-- Gallery Outer Background / Wall Mat -->
    <rect width="1200" height="800" fill="#F7F6F2"/>
    
    <!-- Gallery Art Frame -->
    <rect x="50" y="45" width="1100" height="710" rx="8" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="2" filter="url(#frameShadow)"/>
    
    <!-- App Canvas Header -->
    <g transform="translate(100, 90)">
      <text x="0" y="30" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="26" font-weight="700" fill="#121316" letter-spacing="-0.4">ON THE WAY — Transit &amp; Route UX</text>
      <text x="0" y="58" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="500" fill="#5F6A54">Multimodal Wayfinding • Smart Pitstops • Commuter Safety</text>

      <!-- Search Bar UI -->
      <rect x="0" y="80" width="620" height="50" rx="6" fill="#FFFFFF" stroke="#D8D4C8" stroke-width="1.5"/>
      <circle cx="28" cy="105" r="7" fill="#E05A47"/>
      <text x="48" y="111" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" fill="#717680">Search destination or add a stop along route...</text>
      <rect x="530" y="87" width="80" height="36" rx="4" fill="#121316"/>
      <text x="570" y="110" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="600" fill="#FFF" text-anchor="middle" letter-spacing="0.5">SEARCH</text>

      <!-- Map Mockup Container -->
      <g transform="translate(0, 150)">
        <rect width="620" height="400" rx="6" fill="url(#mapBg)" stroke="#E2DFD7" stroke-width="1.5"/>
        <!-- Map Grid Lines -->
        <path d="M 0 80 Q 200 120 620 70 M 0 200 Q 300 240 620 180 M 0 320 Q 350 280 620 330" stroke="#E8E5DD" stroke-width="10" fill="none"/>
        <path d="M 140 0 Q 180 200 130 400 M 320 0 Q 290 200 350 400 M 480 0 Q 510 180 470 400" stroke="#E8E5DD" stroke-width="10" fill="none"/>
        
        <!-- Active Route Line -->
        <path d="M 80 300 C 180 280, 240 180, 320 190 S 420 110, 520 100" stroke="#E05A47" stroke-width="6" stroke-linecap="round" fill="none" stroke-dasharray="2 1"/>
        
        <!-- Pins -->
        <circle cx="80" cy="300" r="12" fill="#121316"/>
        <circle cx="80" cy="300" r="5" fill="#FFFFFF"/>
        <circle cx="320" cy="190" r="10" fill="#5F6A54"/>
        <circle cx="320" cy="190" r="4" fill="#FFF"/>
        <circle cx="520" cy="100" r="14" fill="#E05A47"/>
        <circle cx="520" cy="100" r="6" fill="#FFF"/>

        <!-- Route Callout Card -->
        <g transform="translate(250, 240)">
          <rect width="270" height="86" rx="6" fill="#FFF" stroke="#E2DFD7" stroke-width="1" filter="url(#frameShadow)"/>
          <rect x="0" y="0" width="5" height="86" rx="2" fill="#5F6A54"/>
          <text x="18" y="28" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="700" fill="#121316">Recommended Pitstop</text>
          <text x="18" y="48" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#5C6068">+4 mins • Highly Rated Coffee</text>
          <text x="18" y="70" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="600" fill="#E05A47">Add to Route →</text>
        </g>
      </g>

      <!-- Right Side Mobile Mockup Phone -->
      <g transform="translate(660, 20)">
        <rect width="330" height="530" rx="32" fill="#121316" filter="url(#frameShadow)"/>
        <rect x="10" y="10" width="310" height="510" rx="26" fill="#FFFFFF"/>
        
        <!-- Phone Notch -->
        <rect x="105" y="16" width="120" height="18" rx="9" fill="#121316"/>
        
        <!-- Phone Content -->
        <text x="24" y="65" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="17" font-weight="700" fill="#121316">Active Trip</text>
        <text x="24" y="85" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="500" fill="#5F6A54">Arriving in 18 mins (5.2 mi)</text>
        
        <rect x="20" y="102" width="270" height="185" rx="8" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
        <circle cx="46" cy="138" r="13" fill="#F4D5CE"/>
        <text x="46" y="143" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#E05A47" text-anchor="middle">1</text>
        <text x="70" y="134" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#121316">Turn right on Market St</text>
        <text x="70" y="150" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#6B7280">In 400 feet • Light traffic</text>

        <circle cx="46" cy="198" r="13" fill="#E5E8DF"/>
        <text x="46" y="203" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#5F6A54" text-anchor="middle">2</text>
        <text x="70" y="194" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#121316">Stop at Blue Bottle</text>
        <text x="70" y="210" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#6B7280">Order ahead is ready</text>

        <!-- Safety Card -->
        <rect x="20" y="302" width="270" height="92" rx="8" fill="#121316"/>
        <text x="36" y="332" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14.5" font-weight="700" fill="#FFFFFF">Live ETA Shared</text>
        <text x="36" y="354" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#C2C6CF">Location shared with 2 emergency contacts</text>
        <text x="36" y="376" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="600" fill="#E05A47">Manage Safety Settings ›</text>
        
        <rect x="20" y="410" width="270" height="48" rx="6" fill="#E05A47"/>
        <text x="155" y="440" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.3">End Trip &amp; Feedback</text>
      </g>
    </g>
  </svg>
  `;

  // 3. Back to the Future (bttf) - 1200x800
  const bttfSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="frameShadow3" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#121316" flood-opacity="0.1"/>
      </filter>
      <linearGradient id="cyberBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#18191D"/>
        <stop offset="100%" stop-color="#0E0F12"/>
      </linearGradient>
    </defs>
    <!-- Gallery Outer Background -->
    <rect width="1200" height="800" fill="#F7F6F2"/>
    
    <!-- Gallery Art Frame -->
    <rect x="50" y="45" width="1100" height="710" rx="8" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="2" filter="url(#frameShadow3)"/>

    <!-- Content -->
    <g transform="translate(100, 90)">
      <text x="0" y="30" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="26" font-weight="700" fill="#121316">BACK TO THE FUTURE — Interactive Research Platform</text>
      <text x="0" y="58" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="500" fill="#5F6A54">Temporal User Flows • Historical UX Benchmarks • Predictive Prototyping</text>

      <!-- Main Dashboard Frame -->
      <g transform="translate(0, 85)">
        <rect width="1000" height="475" rx="10" fill="url(#cyberBg)" filter="url(#frameShadow3)"/>
        
        <!-- Timeline Bar -->
        <g transform="translate(45, 45)">
          <text x="0" y="0" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">TEMPORAL TIMELINE SIMULATION</text>
          
          <rect x="0" y="24" width="910" height="6" rx="3" fill="#2E3138"/>
          <rect x="0" y="24" width="540" height="6" rx="3" fill="#E05A47"/>
          
          <!-- Timeline Points -->
          <circle cx="120" cy="27" r="10" fill="#E05A47"/>
          <text x="120" y="58" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#9DA3AF" text-anchor="middle">1985 (Past)</text>
          
          <circle cx="360" cy="27" r="10" fill="#E05A47"/>
          <text x="360" y="58" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#9DA3AF" text-anchor="middle">2015 (Future Era)</text>

          <circle cx="540" cy="27" r="14" fill="#FFFFFF" stroke="#E05A47" stroke-width="4"/>
          <text x="540" y="60" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="700" fill="#E05A47" text-anchor="middle">Present (Active)</text>

          <circle cx="780" cy="27" r="9" fill="#2E3138"/>
          <text x="780" y="58" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#656B77" text-anchor="middle">2045 (Forecast)</text>
        </g>

        <!-- 3 Insight Cards -->
        <g transform="translate(45, 145)">
          <!-- Card 1 -->
          <rect x="0" y="0" width="285" height="270" rx="8" fill="#141519" stroke="#2E3138" stroke-width="1.5"/>
          <text x="24" y="38" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">User Retention</text>
          <text x="24" y="60" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#9DA3AF">Comparative Study N=140</text>
          
          <!-- Bar chart graphic -->
          <rect x="24" y="190" width="45" height="35" rx="3" fill="#5F6A54"/>
          <rect x="80" y="150" width="45" height="75" rx="3" fill="#8E97A6"/>
          <rect x="136" y="95" width="45" height="130" rx="3" fill="#E05A47"/>
          <text x="158" y="85" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="700" fill="#E05A47" text-anchor="middle">+84%</text>
          <text x="24" y="250" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#D0D4DC">Affinity Matrix Synthesized</text>

          <!-- Card 2 -->
          <rect x="312" y="0" width="285" height="270" rx="8" fill="#141519" stroke="#2E3138" stroke-width="1.5"/>
          <text x="336" y="38" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Interaction Friction</text>
          <text x="336" y="60" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#9DA3AF">Task Success Probability</text>
          
          <!-- Circular score -->
          <circle cx="454" cy="150" r="54" fill="none" stroke="#2E3138" stroke-width="10"/>
          <circle cx="454" cy="150" r="54" fill="none" stroke="#5F6A54" stroke-width="10" stroke-dasharray="275 340" stroke-linecap="round"/>
          <text x="454" y="157" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">92%</text>
          <text x="336" y="250" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#D0D4DC">Zero Critical Blockers</text>

          <!-- Card 3 -->
          <rect x="624" y="0" width="285" height="270" rx="8" fill="#141519" stroke="#2E3138" stroke-width="1.5"/>
          <text x="648" y="38" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Persona: Dr. E. Brown</text>
          <text x="648" y="60" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#9DA3AF">Mental Model Mapping</text>
          
          <rect x="648" y="85" width="237" height="34" rx="4" fill="#22242B"/>
          <text x="660" y="107" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#E2E4E9">Goal: Temporal route entry</text>
          
          <rect x="648" y="128" width="237" height="34" rx="4" fill="#22242B"/>
          <text x="660" y="150" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#E2E4E9">Pain Point: Power surges</text>

          <rect x="648" y="171" width="237" height="34" rx="4" fill="#22242B"/>
          <text x="660" y="193" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" fill="#E2E4E9">Outcome: Zero latency sync</text>
          
          <text x="648" y="250" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="600" fill="#E05A47">Validated with 42 testers ›</text>
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
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#121316" flood-opacity="0.1"/>
      </filter>
      <linearGradient id="tapeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E05A47"/>
        <stop offset="50%" stop-color="#F4A596"/>
        <stop offset="100%" stop-color="#E05A47"/>
      </linearGradient>
    </defs>
    <!-- Gallery Outer Background -->
    <rect width="1200" height="800" fill="#F7F6F2"/>
    
    <!-- Gallery Art Frame -->
    <rect x="50" y="45" width="1100" height="710" rx="8" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="2" filter="url(#frameShadow4)"/>

    <!-- Content -->
    <g transform="translate(100, 90)">
      <text x="0" y="30" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="26" font-weight="700" fill="#121316">FLIXTAPES — Social Film Discovery &amp; Mixtapes</text>
      <text x="0" y="58" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="500" fill="#5F6A54">Curated Movie Playlists • Mood-Based Matching • Cross-Platform Queueing</text>

      <!-- App Mockup -->
      <g transform="translate(0, 80)">
        <!-- Left Mixtape Cassette Graphic -->
        <g transform="translate(0, 0)">
          <!-- Cassette Tape Container -->
          <rect width="450" height="290" rx="14" fill="#121316" filter="url(#frameShadow4)"/>
          <rect x="18" y="18" width="414" height="254" rx="8" fill="#F7F6F2"/>
          
          <!-- Cassette Label -->
          <rect x="36" y="36" width="378" height="140" rx="6" fill="url(#tapeGrad)"/>
          <text x="56" y="72" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="17" font-weight="700" fill="#FFFFFF" letter-spacing="0.4">SIDE A: "LATE NIGHT THRILLERS"</text>
          <text x="56" y="96" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="500" fill="#FFFFFF">Curated by Vanessa • 5 Films • 9h 42m</text>

          <!-- Tape Spools -->
          <rect x="75" y="118" width="300" height="46" rx="23" fill="#121316"/>
          <circle cx="135" cy="141" r="15" fill="#FFFFFF"/>
          <circle cx="135" cy="141" r="5" fill="#121316"/>
          <circle cx="315" cy="141" r="15" fill="#FFFFFF"/>
          <circle cx="315" cy="141" r="5" fill="#121316"/>
          <rect x="165" y="131" width="120" height="20" fill="#2E3138" rx="4"/>
          
          <!-- Bottom Notch -->
          <path d="M 120 272 L 160 230 L 290 230 L 330 272 Z" fill="#E2DFD7"/>
          <circle cx="180" cy="250" r="5" fill="#121316"/>
          <circle cx="270" cy="250" r="5" fill="#121316"/>
        </g>

        <!-- Player controls below Cassette -->
        <g transform="translate(0, 315)">
          <rect width="450" height="155" rx="8" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="1.5"/>
          <text x="24" y="36" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="15" font-weight="700" fill="#121316">Now Playing Preview: Knives Out (2019)</text>
          <text x="24" y="58" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="500" fill="#5F6A54">Directing • Murder Mystery • 97% Match</text>
          
          <!-- Audio wave / scrubbing -->
          <rect x="24" y="80" width="402" height="6" rx="3" fill="#E2DFD7"/>
          <rect x="24" y="80" width="250" height="6" rx="3" fill="#E05A47"/>
          <circle cx="274" cy="83" r="7" fill="#E05A47"/>
          
          <text x="24" y="118" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#6B7280">01:42 / 02:30</text>
          <text x="426" y="118" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#E05A47" text-anchor="end">Stream on Hulu ›</text>
        </g>

        <!-- Right Side: Curated Movie Grid list -->
        <g transform="translate(485, 0)">
          <rect width="515" height="470" rx="8" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="1.5"/>
          <text x="28" y="40" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="17" font-weight="700" fill="#121316">Mixtape Tracklist (5 Titles)</text>
          <text x="28" y="64" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="500" fill="#5F6A54">Drag to reorder • Export to Letterboxd &amp; Netflix</text>
          
          <!-- Movie 1 -->
          <g transform="translate(28, 85)">
            <rect width="459" height="65" rx="6" fill="#F7F6F2" stroke="#E05A47" stroke-width="1.5"/>
            <rect x="12" y="10" width="45" height="45" rx="4" fill="#121316"/>
            <text x="34" y="37" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#E05A47" text-anchor="middle">#1</text>
            <text x="70" y="28" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="700" fill="#121316">Knives Out (2019)</text>
            <text x="70" y="48" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#6B7280">Whodunnit • 2h 10m • ★ 4.1</text>
            <text x="430" y="38" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Movie 2 -->
          <g transform="translate(28, 160)">
            <rect width="459" height="65" rx="6" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
            <rect x="12" y="10" width="45" height="45" rx="4" fill="#121316"/>
            <text x="34" y="37" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#9DA3AF" text-anchor="middle">#2</text>
            <text x="70" y="28" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="700" fill="#121316">Prisoners (2013)</text>
            <text x="70" y="48" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#6B7280">Psychological Thriller • 2h 33m • ★ 4.2</text>
            <text x="430" y="38" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Movie 3 -->
          <g transform="translate(28, 235)">
            <rect width="459" height="65" rx="6" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
            <rect x="12" y="10" width="45" height="45" rx="4" fill="#121316"/>
            <text x="34" y="37" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#9DA3AF" text-anchor="middle">#3</text>
            <text x="70" y="28" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="700" fill="#121316">Gone Girl (2014)</text>
            <text x="70" y="48" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#6B7280">Mystery / Drama • 2h 29m • ★ 4.0</text>
            <text x="430" y="38" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Movie 4 -->
          <g transform="translate(28, 310)">
            <rect width="459" height="65" rx="6" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
            <rect x="12" y="10" width="45" height="45" rx="4" fill="#121316"/>
            <text x="34" y="37" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#9DA3AF" text-anchor="middle">#4</text>
            <text x="70" y="28" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="700" fill="#121316">Shutter Island (2010)</text>
            <text x="70" y="48" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#6B7280">Mind-Bending • 2h 18m • ★ 4.1</text>
            <text x="430" y="38" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Share Button -->
          <g transform="translate(28, 395)">
            <rect width="459" height="48" rx="6" fill="#121316"/>
            <text x="229" y="30" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.4">Share Mixtape Link &amp; QR Code</text>
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
