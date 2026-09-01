import PDFDocument from 'pdfkit';
import fs from 'fs';

function generateResume(outputPath) {
  const doc = new PDFDocument({ margin: 40, size: 'LETTER' });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Colors
  const darkBrown = '#321F12';
  const coral = '#FF5A5A';
  const mutedGreen = '#808249';
  const lightBg = '#FFFBF1';

  // Header
  doc.rect(0, 0, 612, 110).fill('#FFF2D0');
  
  doc.fillColor(darkBrown)
     .fontSize(24)
     .font('Helvetica-Bold')
     .text('Vanessa Eroraha', 40, 30);
  
  doc.fillColor(coral)
     .fontSize(12)
     .font('Helvetica-Bold')
     .text('UX DESIGNER & PRODUCT OWNER', 40, 60);

  doc.fillColor(mutedGreen)
     .fontSize(10)
     .font('Helvetica')
     .text('linkedin.com/in/vanessa-eroraha  •  Virginia Tech CS & HCI', 40, 78);

  let y = 130;

  // Summary
  doc.fillColor(darkBrown).fontSize(14).font('Helvetica-Bold').text('Professional Summary', 40, y);
  y += 20;
  doc.fillColor('#444').fontSize(10).font('Helvetica')
     .text("Multi-disciplinary UX designer and product owner with a strong technical background in Computer Science and Human-Computer Interaction. Passionate about bridging the gap between design and engineering, designing scalable design systems, and building intuitive user experiences.", 40, y, { width: 532, lineGap: 3 });
  
  y += 50;

  // Experience
  doc.fillColor(darkBrown).fontSize(14).font('Helvetica-Bold').text('Experience', 40, y);
  y += 20;

  doc.fillColor(coral).fontSize(11).font('Helvetica-Bold').text('UX Designer & Product Owner', 40, y);
  doc.fillColor(mutedGreen).fontSize(10).font('Helvetica').text('Booz Allen Hamilton  |  2021 – Present', 380, y, { align: 'right' });
  y += 16;
  doc.fillColor('#444').fontSize(9.5).font('Helvetica')
     .text('• Lead UX discovery, user research, wireframing, and interactive prototyping for mission-critical client platforms.', 50, y, { width: 522 })
     .text('• Architect and scale design systems ensuring consistency, high accessibility compliance (WCAG AA), and seamless developer handoff.', 50, y + 14, { width: 522 })
     .text('• Act as Product Owner collaborating with cross-functional engineering and stakeholder teams to translate complex requirements into prioritized product backlogs.', 50, y + 28, { width: 522 });

  y += 60;

  // Key Projects
  doc.fillColor(darkBrown).fontSize(14).font('Helvetica-Bold').text('Selected UX Projects', 40, y);
  y += 20;

  // Project 1
  doc.fillColor(coral).fontSize(11).font('Helvetica-Bold').text('On The Way', 40, y);
  doc.fillColor(mutedGreen).fontSize(10).font('Helvetica').text('Transit & Wayfinding UX (2021)', 380, y, { align: 'right' });
  y += 15;
  doc.fillColor('#444').fontSize(9.5).font('Helvetica')
     .text('• Researched, wireframed, and designed an interactive multimodal route planning app featuring custom pitstop recommendations and real-time safety tracking.', 50, y, { width: 522 })
     .text('• Tools & Skills: Sketch, HTML/CSS, JavaScript, Angular, Google Maps API.', 50, y + 14, { width: 522 });

  y += 38;

  // Project 2
  doc.fillColor(coral).fontSize(11).font('Helvetica-Bold').text('Back to the Future', 40, y);
  doc.fillColor(mutedGreen).fontSize(10).font('Helvetica').text('UX Research & Temporal Platform (2021)', 380, y, { align: 'right' });
  y += 15;
  doc.fillColor('#444').fontSize(9.5).font('Helvetica')
     .text('• Executed end-to-end user testing (N=140) and synthesized affinity diagrams to prototype historical benchmark comparisons and interactive timelines.', 50, y, { width: 522 })
     .text('• Tools & Skills: Adobe XD, Google Forms, User Flow Analysis, Heuristic Evaluation.', 50, y + 14, { width: 522 });

  y += 38;

  // Project 3
  doc.fillColor(coral).fontSize(11).font('Helvetica-Bold').text('Flixtapes', 40, y);
  doc.fillColor(mutedGreen).fontSize(10).font('Helvetica').text('Social Film Discovery App (2020)', 380, y, { align: 'right' });
  y += 15;
  doc.fillColor('#444').fontSize(9.5).font('Helvetica')
     .text('• Designed a playful, cassette-inspired social film sharing app with mood-based tagging, collaborative playlists, and streaming integrations.', 50, y, { width: 522 })
     .text('• Tools & Skills: Sketch, Miro, Affinity Diagramming, Rapid Prototyping.', 50, y + 14, { width: 522 });

  y += 50;

  // Education & Skills
  doc.fillColor(darkBrown).fontSize(14).font('Helvetica-Bold').text('Education & Skills', 40, y);
  y += 20;

  doc.fillColor(coral).fontSize(11).font('Helvetica-Bold').text('Virginia Tech', 40, y);
  doc.fillColor(mutedGreen).fontSize(10).font('Helvetica').text('Blacksburg, VA', 380, y, { align: 'right' });
  y += 15;
  doc.fillColor('#444').fontSize(9.5).font('Helvetica')
     .text('B.S. in Computer Science  |  Minors: Human-Computer Interaction (HCI) & Psychology', 50, y, { width: 522 });

  y += 22;
  doc.fillColor('#444').fontSize(9.5).font('Helvetica')
     .text('• Core Skills: UI/UX Design, Interaction Design, User Research, Usability Testing, Design Systems, Information Architecture, Wireframing, Agile / Scrum.', 50, y, { width: 522 })
     .text('• Technical & Tools: Figma, Sketch, Adobe XD, HTML5/CSS3, JavaScript, Git, Miro, Jira.', 50, y + 14, { width: 522 });

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

async function run() {
  await generateResume('./Eroraha Resume.pdf');
  await generateResume('./public/Eroraha Resume.pdf');
  console.log('Generated Eroraha Resume.pdf');
}

run();
