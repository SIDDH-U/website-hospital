import sharp from "sharp";
import fs from "fs";
import path from "path";

const baseDir = path.join(process.cwd(), "public", "images");

// Ensure directories
const dirs = [
  path.join(baseDir, "departments"),
  path.join(baseDir, "doctors"),
  path.join(baseDir, "blog"),
  path.join(baseDir, "services"),
  path.join(baseDir, "gallery"),
];

dirs.forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Helper to create beautiful branded medical image cards
async function createMedicalImage(outPath, width, height, title, subtitle, colorScheme = "teal") {
  const bgColors = {
    teal: ["#0F3D3E", "#184E4F", "#0A2B2C"],
    mint: ["#1A514D", "#2DA870", "#133D3E"],
    sage: ["#144344", "#3D7A6F", "#0F3233"],
    coral: ["#234B4C", "#26605A", "#123738"],
  };

  const [c1, c2, c3] = bgColors[colorScheme] || bgColors.teal;

  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${c1}" />
          <stop offset="60%" stop-color="${c2}" />
          <stop offset="100%" stop-color="${c3}" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="#CDEBD8" fill-opacity="0.1" />
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#grad)" />
      <rect width="100%" height="100%" fill="url(#grid)" />

      <!-- Subtle ambient glow circles -->
      <circle cx="${width * 0.8}" cy="${height * 0.2}" r="${height * 0.4}" fill="#2DA870" fill-opacity="0.15" filter="blur(40px)" />
      <circle cx="${width * 0.2}" cy="${height * 0.8}" r="${height * 0.3}" fill="#CDEBD8" fill-opacity="0.08" filter="blur(30px)" />
      
      <!-- Hospital Cross / Stethoscope Graphic -->
      <g transform="translate(${width / 2}, ${height * 0.45})">
        <circle cx="0" cy="0" r="44" fill="#CDEBD8" fill-opacity="0.15" />
        <rect x="-6" y="-24" width="12" height="48" rx="4" fill="#CDEBD8" />
        <rect x="-24" y="-6" width="48" height="12" rx="4" fill="#CDEBD8" />
      </g>

      <!-- Clean Typography -->
      <text x="${width / 2}" y="${height * 0.72}" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.5px">
        ${escapeXml(title)}
      </text>
      <text x="${width / 2}" y="${height * 0.82}" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#CDEBD8" text-anchor="middle" letter-spacing="1px">
        ${escapeXml(subtitle.toUpperCase())}
      </text>
    </svg>
  `);

  await sharp(svg).jpeg({ quality: 88 }).toFile(outPath);
}

// Helper for portrait doctor photos
async function createDoctorPortrait(outPath, name, specialty, initials) {
  const width = 600;
  const height = 750; // 4:5 ratio

  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#184E4F" />
          <stop offset="50%" stop-color="#0F3D3E" />
          <stop offset="100%" stop-color="#082324" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#docGrad)" />

      <!-- Soft background glow -->
      <circle cx="300" cy="280" r="180" fill="#CDEBD8" fill-opacity="0.1" filter="blur(50px)" />

      <!-- Doctor Avatar Silhouette / Initial Badge -->
      <circle cx="300" cy="270" r="110" fill="#CDEBD8" fill-opacity="0.2" stroke="#CDEBD8" stroke-width="3" />
      <text x="300" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="800" fill="#FFFFFF" text-anchor="middle">
        ${escapeXml(initials)}
      </text>

      <!-- Doctor Stethoscope Accent -->
      <path d="M 230 420 C 230 500, 370 500, 370 420" stroke="#8FBFA3" stroke-width="8" stroke-linecap="round" fill="none" />
      <circle cx="300" cy="480" r="14" fill="#CDEBD8" />

      <!-- Typography -->
      <text x="300" y="580" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="800" fill="#FFFFFF" text-anchor="middle">
        ${escapeXml(name)}
      </text>
      <text x="300" y="625" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#CDEBD8" text-anchor="middle" letter-spacing="1px">
        ${escapeXml(specialty.toUpperCase())}
      </text>
      <text x="300" y="665" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#8FBFA3" text-anchor="middle">
        LifeCare Hospital · Nanded
      </text>
    </svg>
  `);

  await sharp(svg).jpeg({ quality: 88 }).toFile(outPath);
}

async function run() {
  console.log("Generating Department images...");
  const depts = [
    { slug: "cardiology", title: "Cardiology Unit", sub: "Advanced Heart Care" },
    { slug: "orthopedics", title: "Orthopedics & Spine", sub: "Joint & Trauma Center" },
    { slug: "pediatrics", title: "Pediatric Clinic", sub: "NICU & Child Health" },
    { slug: "neurology", title: "Neuroscience Lab", sub: "Brain & Spine Care" },
    { slug: "gynecology", title: "Women's Health", sub: "Maternity & OBG Suite" },
    { slug: "general-medicine", title: "General Medicine", sub: "Primary & Chronic Care" },
  ];

  for (const d of depts) {
    // 16:10 main department image
    await createMedicalImage(
      path.join(baseDir, "departments", `${d.slug}.jpg`),
      800,
      500,
      d.title,
      d.sub,
      "teal"
    );
    // 3 facility strip images
    await createMedicalImage(
      path.join(baseDir, "departments", `${d.slug}-1.jpg`),
      600,
      400,
      `${d.title} - Suite A`,
      "Diagnostic Wing",
      "mint"
    );
    await createMedicalImage(
      path.join(baseDir, "departments", `${d.slug}-2.jpg`),
      600,
      400,
      `${d.title} - Care Unit`,
      "Advanced ICU / OT",
      "sage"
    );
    await createMedicalImage(
      path.join(baseDir, "departments", `${d.slug}-3.jpg`),
      600,
      400,
      `${d.title} - Patient Lounge`,
      "Recovery & Therapy",
      "teal"
    );
  }

  console.log("Generating 8 Doctor portraits...");
  const doctors = [
    { slug: "dr-rajesh-sharma", name: "Dr. Rajesh Sharma", spec: "Senior Cardiologist", init: "RS" },
    { slug: "dr-priya-patel", name: "Dr. Priya Patel", spec: "Chief Gynecologist", init: "PP" },
    { slug: "dr-amit-deshmukh", name: "Dr. Amit Deshmukh", spec: "Joint & Spine Surgeon", init: "AD" },
    { slug: "dr-sunita-kulkarni", name: "Dr. Sunita Kulkarni", spec: "Senior Pediatrician", init: "SK" },
    { slug: "dr-vikram-joshi", name: "Dr. Vikram Joshi", spec: "Consultant Neurologist", init: "VJ" },
    { slug: "dr-sanjay-patil", name: "Dr. Sanjay Patil", spec: "Chief Medical Specialist", init: "SP" },
    { slug: "dr-ananya-iyer", name: "Dr. Ananya Iyer", spec: "Interventional Cardiologist", init: "AI" },
    { slug: "dr-rohit-mehta", name: "Dr. Rohit Mehta", spec: "Sports Medicine Specialist", init: "RM" },
  ];

  for (const doc of doctors) {
    await createDoctorPortrait(
      path.join(baseDir, "doctors", `${doc.slug}.jpg`),
      doc.name,
      doc.spec,
      doc.init
    );
  }

  console.log("Generating Blog, Services, and Gallery images...");
  const blogs = [
    { slug: "heart-health-tips", title: "Heart Health Guide", sub: "Preventive Care" },
    { slug: "understanding-joint-pain", title: "Joint & Spine Wellness", sub: "Orthopedic Insights" },
    { slug: "pediatric-immunization", title: "Child Vaccination Schedule", sub: "Pediatric Care" },
  ];
  for (const b of blogs) {
    await createMedicalImage(
      path.join(baseDir, "blog", `${b.slug}.jpg`),
      800,
      500,
      b.title,
      b.sub,
      "mint"
    );
  }

  const services = [
    { slug: "emergency-24-7", title: "24/7 Emergency & Trauma", sub: "Critical Care" },
    { slug: "opd-consultations", title: "Outpatient Department", sub: "Specialist Clinics" },
    { slug: "diagnostics-lab", title: "Modern Pathology & Radiology", sub: "Accredited Lab" },
    { slug: "pharmacy", title: "24/7 In-House Pharmacy", sub: "Genuine Medicines" },
    { slug: "ambulance", title: "Advanced ICU Ambulance", sub: "Rapid Response" },
    { slug: "health-checkups", title: "Executive Health Packages", sub: "Preventive Screenings" },
  ];
  for (const s of services) {
    await createMedicalImage(
      path.join(baseDir, "services", `${s.slug}.jpg`),
      800,
      500,
      s.title,
      s.sub,
      "teal"
    );
  }

  for (let i = 1; i <= 4; i++) {
    await createMedicalImage(
      path.join(baseDir, "gallery", `gallery-${i}.jpg`),
      800,
      600,
      `LifeCare Wing 0${i}`,
      "Modern Facilities",
      i % 2 === 0 ? "mint" : "teal"
    );
  }

  console.log("Asset generation complete!");
}

run().catch(console.error);
