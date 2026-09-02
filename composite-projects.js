import sharp from 'sharp';
import fs from 'fs';

// Helper to composite artwork inside the genuine ornate golden frame
async function buildFramedProjectArtwork({
  contentSvg,
  outputPath,
  width = 900,
  height = 1350,
  landscape = false
}) {
  // 1. Frame source
  let frame = sharp('/workspace/gold-frame-cutout.png');
  
  if (landscape) {
    // Rotate 90 degrees or 270 degrees
    frame = frame.rotate(90);
  }

  // Target dimensions
  const finalW = landscape ? 1350 : 900;
  const finalH = landscape ? 900 : 1350;

  const resizedFrameBuf = await frame.resize(finalW, finalH).toBuffer();

  // In portrait (408x612 scaled to 900x1350):
  // left inner = 74 / 408 * 900 = 163
  // top inner = 89 / 612 * 1350 = 196
  // inner width = 260 / 408 * 900 = 573
  // inner height = 437 / 612 * 1350 = 964

  // In landscape (612x408 scaled to 1350x900):
  // inner width = 437 / 612 * 1350 = 964
  // inner height = 260 / 408 * 900 = 573
  // inner left = 89 / 612 * 1350 = 196
  // inner top = 74 / 408 * 900 = 163

  const innerW = landscape ? 964 : 573;
  const innerH = landscape ? 573 : 964;
  const innerLeft = landscape ? 193 : 163;
  const innerTop = landscape ? 163 : 193;

  // Render content SVG to buffer matching inner canvas dimensions
  const artworkBuf = await sharp(Buffer.from(contentSvg))
    .resize(innerW, innerH)
    .png()
    .toBuffer();

  // Create composite
  // Base gallery wall mat or transparent backdrop
  await sharp({
    create: {
      width: finalW,
      height: finalH,
      channels: 4,
      background: { r: 247, g: 246, b: 242, alpha: 1 } // Gallery Alabaster wall
    }
  })
  .composite([
    // First: The artwork inside the window
    {
      input: artworkBuf,
      top: innerTop,
      left: innerLeft
    },
    // Second: The ornate gold frame overlay on top
    {
      input: resizedFrameBuf,
      top: 0,
      left: 0
    }
  ])
  .png({ quality: 95 })
  .toFile(outputPath);

  console.log(`Generated framed project at ${outputPath}`);
}

async function createAsset(svgContent, outputPath, width = 800, height = 800) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const buffer = Buffer.from(svgContent);
  await sharp(buffer)
    .resize(width, height)
    .png({ quality: 95 })
    .toFile(outputPath);
}
async function renderAll() {
  // PROJECT 1: ON THE WAY (Landscape 964x573 inner artwork)
  const otwSvg = `
  <svg width="964" height="573" viewBox="0 0 964 573" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="otwBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#F5F3EC"/>
      </linearGradient>
      <filter id="shadowBox" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#121316" flood-opacity="0.12"/>
      </filter>
    </defs>
    <!-- Background Canvas -->
    <rect width="964" height="573" fill="url(#otwBg)"/>

    <!-- Header Section -->
    <g transform="translate(45, 38)">
      <text x="0" y="24" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="22" font-weight="700" fill="#121316" letter-spacing="-0.3">ON THE WAY — Transit &amp; Route UX</text>
      <text x="0" y="46" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="500" fill="#5F6A54">Multimodal Wayfinding • Smart Pitstops • Commuter Safety</text>

      <!-- Search Bar -->
      <g transform="translate(0, 62)">
        <rect width="480" height="42" rx="6" fill="#FFFFFF" stroke="#D8D4C8" stroke-width="1.5"/>
        <circle cx="20" cy="21" r="6" fill="#E05A47"/>
        <text x="36" y="25" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" fill="#717680">Search destination or add pitstop...</text>
        <rect x="405" y="5" width="70" height="32" rx="4" fill="#121316"/>
        <text x="440" y="24" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="600" fill="#FFF" text-anchor="middle" letter-spacing="0.5">SEARCH</text>
      </g>

      <!-- Map View -->
      <g transform="translate(0, 118)">
        <rect width="480" height="325" rx="6" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="1.5"/>
        <!-- Road Grid -->
        <path d="M 0 65 Q 160 100 480 55 M 0 160 Q 240 200 480 145 M 0 255 Q 280 225 480 265" stroke="#E8E5DD" stroke-width="8" fill="none"/>
        <path d="M 110 0 Q 140 160 100 325 M 250 0 Q 230 160 270 325 M 380 0 Q 405 140 370 325" stroke="#E8E5DD" stroke-width="8" fill="none"/>

        <!-- Active Route Path -->
        <path d="M 60 240 C 140 220, 190 145, 250 155 S 330 90, 410 80" stroke="#E05A47" stroke-width="5.5" stroke-linecap="round" fill="none" stroke-dasharray="2 1"/>
        
        <circle cx="60" cy="240" r="10" fill="#121316"/>
        <circle cx="60" cy="240" r="3.5" fill="#FFFFFF"/>
        <circle cx="250" cy="155" r="9" fill="#5F6A54"/>
        <circle cx="250" cy="155" r="3.5" fill="#FFF"/>
        <circle cx="410" cy="80" r="12" fill="#E05A47"/>
        <circle cx="410" cy="80" r="4.5" fill="#FFF"/>

        <!-- Route Callout -->
        <g transform="translate(190, 190)">
          <rect width="220" height="70" rx="6" fill="#FFF" stroke="#E2DFD7" stroke-width="1" filter="url(#shadowBox)"/>
          <rect x="0" y="0" width="4" height="70" rx="2" fill="#5F6A54"/>
          <text x="14" y="22" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="700" fill="#121316">Recommended Pitstop</text>
          <text x="14" y="39" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#5C6068">+4 mins • Highly Rated Coffee</text>
          <text x="14" y="56" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10" font-weight="600" fill="#E05A47">Add to Route →</text>
        </g>
      </g>

      <!-- Right Side Mobile UI Mockup -->
      <g transform="translate(520, 10)">
        <rect width="350" height="435" rx="24" fill="#121316" filter="url(#shadowBox)"/>
        <rect x="8" y="8" width="334" height="419" rx="18" fill="#FFFFFF"/>
        
        <text x="20" y="44" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="15" font-weight="700" fill="#121316">Active Trip</text>
        <text x="20" y="62" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="500" fill="#5F6A54">Arriving in 18 mins (5.2 mi)</text>
        
        <!-- Step 1 -->
        <rect x="16" y="78" width="302" height="68" rx="8" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
        <circle cx="40" cy="112" r="11" fill="#F4D5CE"/>
        <text x="40" y="116" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="700" fill="#E05A47" text-anchor="middle">1</text>
        <text x="62" y="105" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#121316">Turn right on Market St</text>
        <text x="62" y="120" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10" fill="#6B7280">In 400 feet • Light traffic</text>

        <!-- Step 2 -->
        <rect x="16" y="156" width="302" height="68" rx="8" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
        <circle cx="40" cy="190" r="11" fill="#E5E8DF"/>
        <text x="40" y="194" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="700" fill="#5F6A54" text-anchor="middle">2</text>
        <text x="62" y="183" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#121316">Stop at Blue Bottle</text>
        <text x="62" y="198" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10" fill="#6B7280">Order ahead is ready</text>

        <!-- Safety Card -->
        <rect x="16" y="234" width="302" height="74" rx="8" fill="#121316"/>
        <text x="30" y="258" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="700" fill="#FFFFFF">Live ETA Shared</text>
        <text x="30" y="275" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10" fill="#C2C6CF">Location shared with 2 emergency contacts</text>
        <text x="30" y="293" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10" font-weight="600" fill="#E05A47">Manage Safety Settings ›</text>

        <!-- End Button -->
        <rect x="16" y="320" width="302" height="40" rx="6" fill="#E05A47"/>
        <text x="167" y="344" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.3">End Trip &amp; Feedback</text>
      </g>
    </g>
  </svg>
  `;

  // PROJECT 2: BACK TO THE FUTURE (Landscape 964x573 inner artwork)
  const bttfSvg = `
  <svg width="964" height="573" viewBox="0 0 964 573" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bttfDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#191B20"/>
        <stop offset="100%" stop-color="#0E0F12"/>
      </linearGradient>
    </defs>
    <!-- Background Canvas -->
    <rect width="964" height="573" fill="url(#bttfDark)"/>

    <g transform="translate(45, 36)">
      <text x="0" y="24" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">BACK TO THE FUTURE — Interactive Research Platform</text>
      <text x="0" y="46" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="500" fill="#E05A47">Temporal User Flows • Historical UX Benchmarks • Predictive Prototyping</text>

      <!-- Main Interface Platform -->
      <g transform="translate(0, 68)">
        <rect width="874" height="415" rx="8" fill="#141519" stroke="#2E3138" stroke-width="1.5"/>

        <!-- Timeline Simulation Bar -->
        <g transform="translate(35, 35)">
          <text x="0" y="0" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">TEMPORAL TIMELINE SIMULATION</text>
          
          <rect x="0" y="18" width="804" height="6" rx="3" fill="#2E3138"/>
          <rect x="0" y="18" width="480" height="6" rx="3" fill="#E05A47"/>
          
          <circle cx="100" cy="21" r="8" fill="#E05A47"/>
          <text x="100" y="48" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" fill="#9DA3AF" text-anchor="middle">1985 (Past)</text>
          
          <circle cx="310" cy="21" r="8" fill="#E05A47"/>
          <text x="310" y="48" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" fill="#9DA3AF" text-anchor="middle">2015 (Future Era)</text>

          <circle cx="480" cy="21" r="12" fill="#FFFFFF" stroke="#E05A47" stroke-width="3.5"/>
          <text x="480" y="50" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11.5" font-weight="700" fill="#E05A47" text-anchor="middle">Present (Active)</text>

          <circle cx="700" cy="21" r="7" fill="#2E3138"/>
          <text x="700" y="48" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" fill="#656B77" text-anchor="middle">2045 (Forecast)</text>
        </g>

        <!-- 3 Insight Cards -->
        <g transform="translate(35, 120)">
          <!-- Card 1 -->
          <rect x="0" y="0" width="250" height="235" rx="6" fill="#1B1D23" stroke="#2E3138" stroke-width="1.5"/>
          <text x="20" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">User Retention</text>
          <text x="20" y="50" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#9DA3AF">Comparative Study N=140</text>
          
          <rect x="20" y="160" width="38" height="30" rx="3" fill="#5F6A54"/>
          <rect x="68" y="125" width="38" height="65" rx="3" fill="#8E97A6"/>
          <rect x="116" y="80" width="38" height="110" rx="3" fill="#E05A47"/>
          <text x="135" y="70" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="700" fill="#E05A47" text-anchor="middle">+84%</text>
          <text x="20" y="215" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#D0D4DC">Affinity Matrix Synthesized</text>

          <!-- Card 2 -->
          <rect x="277" y="0" width="250" height="235" rx="6" fill="#1B1D23" stroke="#2E3138" stroke-width="1.5"/>
          <text x="297" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Interaction Friction</text>
          <text x="297" y="50" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#9DA3AF">Task Success Probability</text>
          
          <circle cx="402" cy="130" r="45" fill="none" stroke="#2E3138" stroke-width="8"/>
          <circle cx="402" cy="130" r="45" fill="none" stroke="#5F6A54" stroke-width="8" stroke-dasharray="230 285" stroke-linecap="round"/>
          <text x="402" y="137" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle">92%</text>
          <text x="297" y="215" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#D0D4DC">Zero Critical Blockers</text>

          <!-- Card 3 -->
          <rect x="554" y="0" width="250" height="235" rx="6" fill="#1B1D23" stroke="#2E3138" stroke-width="1.5"/>
          <text x="574" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Persona: Dr. Brown</text>
          <text x="574" y="50" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#9DA3AF">Mental Model Mapping</text>
          
          <rect x="574" y="70" width="210" height="28" rx="4" fill="#262932"/>
          <text x="584" y="89" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#E2E4E9">Goal: Temporal entry</text>
          
          <rect x="574" y="106" width="210" height="28" rx="4" fill="#262932"/>
          <text x="584" y="125" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#E2E4E9">Pain Point: Power surges</text>

          <rect x="574" y="142" width="210" height="28" rx="4" fill="#262932"/>
          <text x="584" y="161" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#E2E4E9">Outcome: Zero latency</text>
          
          <text x="574" y="215" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="600" fill="#E05A47">Validated with 42 testers ›</text>
        </g>
      </g>
    </g>
  </svg>
  `;

  // PROJECT 3: FLIXTAPE (Landscape 964x573 inner artwork)
  const flixSvg = `
  <svg width="964" height="573" viewBox="0 0 964 573" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="flixMatte" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#F4F2EB"/>
      </linearGradient>
      <linearGradient id="tapeGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E05A47"/>
        <stop offset="50%" stop-color="#F4A596"/>
        <stop offset="100%" stop-color="#E05A47"/>
      </linearGradient>
    </defs>
    <!-- Background Canvas -->
    <rect width="964" height="573" fill="url(#flixMatte)"/>

    <g transform="translate(45, 36)">
      <text x="0" y="24" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="22" font-weight="700" fill="#121316">FLIXTAPE — Social Film Discovery &amp; Mixtapes</text>
      <text x="0" y="46" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12.5" font-weight="500" fill="#5F6A54">Curated Movie Playlists • Mood-Based Matching • Cross-Platform Queueing</text>

      <g transform="translate(0, 68)">
        <!-- Left Cassette -->
        <g transform="translate(0, 0)">
          <rect width="390" height="240" rx="12" fill="#121316"/>
          <rect x="14" y="14" width="362" height="212" rx="6" fill="#F7F6F2"/>
          
          <rect x="28" y="28" width="334" height="110" rx="6" fill="url(#tapeGrad3)"/>
          <text x="44" y="58" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="14.5" font-weight="700" fill="#FFFFFF" letter-spacing="0.3">SIDE A: "LATE NIGHT THRILLERS"</text>
          <text x="44" y="78" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="500" fill="#FFFFFF">Curated by Vanessa • 5 Films • 9h 42m</text>

          <!-- Tape Spools -->
          <rect x="60" y="94" width="270" height="38" rx="19" fill="#121316"/>
          <circle cx="115" cy="113" r="12" fill="#FFFFFF"/>
          <circle cx="115" cy="113" r="4" fill="#121316"/>
          <circle cx="275" cy="113" r="12" fill="#FFFFFF"/>
          <circle cx="275" cy="113" r="4" fill="#121316"/>
          <rect x="140" y="104" width="110" height="18" fill="#2E3138" rx="3"/>
          
          <path d="M 110 226 L 145 194 L 245 194 L 280 226 Z" fill="#E2DFD7"/>
          <circle cx="155" cy="210" r="4" fill="#121316"/>
          <circle cx="235" cy="210" r="4" fill="#121316"/>
        </g>

        <!-- Player controls -->
        <g transform="translate(0, 255)">
          <rect width="390" height="150" rx="8" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="1.5"/>
          <text x="20" y="30" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="13" font-weight="700" fill="#121316">Now Playing: Knives Out (2019)</text>
          <text x="20" y="48" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="500" fill="#5F6A54">Directing • Murder Mystery • 97% Match</text>
          
          <rect x="20" y="68" width="350" height="5" rx="2.5" fill="#E2DFD7"/>
          <rect x="20" y="68" width="220" height="5" rx="2.5" fill="#E05A47"/>
          <circle cx="240" cy="70.5" r="6" fill="#E05A47"/>
          
          <text x="20" y="100" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" fill="#6B7280">01:42 / 02:30</text>
          <text x="370" y="100" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="700" fill="#E05A47" text-anchor="end">Stream on Hulu ›</text>
        </g>

        <!-- Right Side Tracklist -->
        <g transform="translate(420, 0)">
          <rect width="454" height="405" rx="8" fill="#FFFFFF" stroke="#E2DFD7" stroke-width="1.5"/>
          <text x="24" y="34" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="15" font-weight="700" fill="#121316">Mixtape Tracklist (5 Titles)</text>
          <text x="24" y="54" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="500" fill="#5F6A54">Drag to reorder • Export to Letterboxd &amp; Netflix</text>
          
          <!-- Movie 1 -->
          <g transform="translate(24, 72)">
            <rect width="406" height="54" rx="6" fill="#F7F6F2" stroke="#E05A47" stroke-width="1.5"/>
            <rect x="8" y="8" width="38" height="38" rx="4" fill="#121316"/>
            <text x="27" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="700" fill="#E05A47" text-anchor="middle">#1</text>
            <text x="56" y="24" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#121316">Knives Out (2019)</text>
            <text x="56" y="40" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10" fill="#6B7280">Whodunnit • 2h 10m • ★ 4.1</text>
            <text x="380" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Movie 2 -->
          <g transform="translate(24, 136)">
            <rect width="406" height="54" rx="6" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
            <rect x="8" y="8" width="38" height="38" rx="4" fill="#121316"/>
            <text x="27" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="700" fill="#9DA3AF" text-anchor="middle">#2</text>
            <text x="56" y="24" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#121316">Prisoners (2013)</text>
            <text x="56" y="40" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10" fill="#6B7280">Psychological Thriller • 2h 33m • ★ 4.2</text>
            <text x="380" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Movie 3 -->
          <g transform="translate(24, 200)">
            <rect width="406" height="54" rx="6" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
            <rect x="8" y="8" width="38" height="38" rx="4" fill="#121316"/>
            <text x="27" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="700" fill="#9DA3AF" text-anchor="middle">#3</text>
            <text x="56" y="24" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#121316">Gone Girl (2014)</text>
            <text x="56" y="40" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10" fill="#6B7280">Mystery / Drama • 2h 29m • ★ 4.0</text>
            <text x="380" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Movie 4 -->
          <g transform="translate(24, 264)">
            <rect width="406" height="54" rx="6" fill="#F7F6F2" stroke="#E2DFD7" stroke-width="1"/>
            <rect x="8" y="8" width="38" height="38" rx="4" fill="#121316"/>
            <text x="27" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10.5" font-weight="700" fill="#9DA3AF" text-anchor="middle">#4</text>
            <text x="56" y="24" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#121316">Shutter Island (2010)</text>
            <text x="56" y="40" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="10" fill="#6B7280">Mind-Bending • 2h 18m • ★ 4.1</text>
            <text x="380" y="32" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="11" font-weight="600" fill="#5F6A54" text-anchor="end">✓ Queued</text>
          </g>

          <!-- Share Button -->
          <g transform="translate(24, 336)">
            <rect width="406" height="42" rx="6" fill="#121316"/>
            <text x="203" y="26" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.4">Share Mixtape Link &amp; QR Code</text>
          </g>
        </g>
      </g>
    </g>
  </svg>
  `;

  // Build framed artworks
  await buildFramedProjectArtwork({
    contentSvg: otwSvg,
    outputPath: './otw/framed-otw.png',
    landscape: true
  });
  await buildFramedProjectArtwork({
    contentSvg: bttfSvg,
    outputPath: './bttf/framed-bttf.png',
    landscape: true
  });
  await buildFramedProjectArtwork({
    contentSvg: flixSvg,
    outputPath: './flix/framed-flix.png',
    landscape: true
  });

  // Copy to public folder
  await buildFramedProjectArtwork({
    contentSvg: otwSvg,
    outputPath: './public/otw/framed-otw.png',
    landscape: true
  });
  await buildFramedProjectArtwork({
    contentSvg: bttfSvg,
    outputPath: './public/bttf/framed-bttf.png',
    landscape: true
  });
  await buildFramedProjectArtwork({
    contentSvg: flixSvg,
    outputPath: './public/flix/framed-flix.png',
    landscape: true
  });

  console.log('Successfully composited real ornate golden frame onto each project!');
}

renderAll().catch(console.error);
