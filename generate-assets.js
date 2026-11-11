const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const PDFDocument = require('pdfkit');

const assetDir = path.join(__dirname, 'assets');
fs.mkdirSync(assetDir, { recursive: true });

const svgToJpg = async (fileName, svgMarkup) => {
  await sharp(Buffer.from(svgMarkup)).jpeg({ quality: 88 }).toFile(path.join(assetDir, fileName));
};

const svgToPng = async (fileName, svgMarkup) => {
  await sharp(Buffer.from(svgMarkup)).png().toFile(path.join(assetDir, fileName));
};

(async () => {
  const profileSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#142e52"/>
          <stop offset="100%" stop-color="#1b4d7a"/>
        </linearGradient>
        <linearGradient id="glow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#7dd3fc" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#c4b5fd" stop-opacity="0.65"/>
        </linearGradient>
      </defs>
      <rect width="900" height="1100" fill="url(#bg)"/>
      <circle cx="430" cy="260" r="220" fill="url(#glow)" opacity="0.7"/>
      <circle cx="450" cy="310" r="180" fill="#dbeafe" opacity="0.12"/>
      <rect x="190" y="130" width="520" height="780" rx="60" fill="rgba(16,24,40,0.28)"/>
      <circle cx="450" cy="402" r="160" fill="#edf6ff"/>
      <path d="M330 650 C390 560, 510 560, 570 650 L570 850 L330 850 Z" fill="#e2e8f0"/>
      <path d="M355 345 C355 272, 395 230, 450 230 C505 230, 545 272, 545 345 L545 414 C545 469, 505 520, 450 520 C395 520, 355 469, 355 414 Z" fill="#dbeafe"/>
      <path d="M480 430 L610 510 L480 650 L350 510 Z" fill="#93c5fd" opacity="0.85"/>
    </svg>
  `;

  const projectSvg = (title, accentA, accentB, accentC) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
      <defs>
        <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${accentA}"/>
          <stop offset="100%" stop-color="${accentB}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#grad)"/>
      <rect x="90" y="90" width="1020" height="580" rx="26" fill="rgba(10,15,24,0.15)"/>
      <rect x="150" y="150" width="900" height="440" rx="18" fill="#111827"/>
      <rect x="200" y="220" width="790" height="48" rx="10" fill="#1f2937"/>
      <rect x="200" y="308" width="610" height="16" rx="8" fill="${accentC}"/>
      <rect x="200" y="350" width="710" height="16" rx="8" fill="#94a3b8"/>
      <rect x="200" y="392" width="540" height="16" rx="8" fill="#94a3b8"/>
      <rect x="200" y="468" width="220" height="80" rx="14" fill="${accentC}"/>
      <rect x="470" y="468" width="180" height="80" rx="14" fill="#5eead4" opacity="0.9"/>
      <rect x="700" y="468" width="190" height="80" rx="14" fill="#cbd5e1" opacity="0.8"/>
      <text x="200" y="660" fill="#e2e8f0" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700">${title}</text>
    </svg>
  `;

  await svgToJpg('profile.jpg', profileSvg);
  await svgToPng('project1.png', projectSvg('FPGA System', '#1d4ed8', '#0f766e', '#60a5fa'));
  await svgToPng('project2.png', projectSvg('Embedded System', '#0ea5e9', '#1d4ed8', '#67e8f9'));
  await svgToPng('project3.png', projectSvg('Logic Design', '#0f766e', '#14b8a6', '#9ae6b4'));

  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  const pdfPath = path.join(assetDir, 'cv.pdf');
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.fontSize(18).text('Alex Morgan', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text('Electrical Engineering Student', { align: 'center' });
  doc.moveDown();
  doc.fontSize(11).text('Hardware design • Embedded firmware • Digital logic');
  doc.moveDown();
  doc.text('Email: YOUR_EMAIL@gmail.com');
  doc.text('GitHub: github.com/YOUR_GITHUB_USERNAME');
  doc.text('LinkedIn: linkedin.com/in/YOUR_LINKEDIN_USERNAME');
  doc.end();

  console.log('Asset files created:', fs.readdirSync(assetDir).sort());
})();
