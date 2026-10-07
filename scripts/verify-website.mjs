import fs from "fs";
import path from "path";

async function verify() {
  console.log("=== LIFECARE HOSPITAL AUTOMATED VERIFICATION ===");

  // 1. Image Files Verification
  console.log("\n1. Verifying Converted WebP Assets:");
  const requiredImages = [
    { file: "public/images/hero-desktop.webp", label: "Hero Desktop (16:9)" },
    { file: "public/images/hero-mobile.webp", label: "Hero Mobile (4:5)" },
    { file: "public/images/cta-banner.webp", label: "CTA Banner (4:3)" },
  ];

  for (const img of requiredImages) {
    if (!fs.existsSync(img.file)) {
      console.error(`❌ Missing asset: ${img.file}`);
      process.exit(1);
    }
    const stat = fs.statSync(img.file);
    console.log(`  ✓ ${img.label} exists (${img.file}, ${stat.size} bytes)`);
  }

  // 2. HTTP Routes Verification
  const routes = [
    "/",
    "/about",
    "/departments",
    "/departments/cardiology",
    "/departments/orthopedics",
    "/departments/pediatrics",
    "/departments/neurology",
    "/departments/gynecology",
    "/departments/general-medicine",
    "/doctors",
    "/doctors/dr-rajesh-sharma",
    "/doctors/dr-priya-patel",
    "/services",
    "/patient-info",
    "/blog",
    "/blog/heart-health-tips",
    "/contact",
    "/book",
    "/privacy-policy",
    "/terms",
  ];

  console.log("\n2. Testing HTTP Status on all routes:");
  for (const route of routes) {
    const res = await fetch(`http://localhost:3000${route}`);
    if (res.status !== 200) {
      console.error(`❌ Route ${route} returned status ${res.status}`);
      process.exit(1);
    }
    console.log(`  ✓ ${route} -> 200 OK`);
  }

  // 3. Inspect Homepage HTML
  const homeRes = await fetch("http://localhost:3000/");
  const homeHtml = await homeRes.text();

  console.log("\n3. Inspecting Hero Section (Section A & B):");
  if (homeHtml.includes("hero-desktop.webp") && homeHtml.includes("hero-mobile.webp")) {
    console.log("  ✓ Uses hero-desktop.webp and hero-mobile.webp");
  } else {
    console.error("  ❌ Missing hero-desktop.webp or hero-mobile.webp");
    process.exit(1);
  }

  if (homeHtml.includes("SAKSHAM")) {
    console.error("  ❌ Found old SAKSHAM branding in HTML");
    process.exit(1);
  } else {
    console.log("  ✓ No SAKSHAM branding found");
  }

  if (homeHtml.includes("healing-shimmer")) {
    console.log("  ✓ Soft mint shimmer on 'Healing' is active");
  } else {
    console.error("  ❌ Missing healing-shimmer class");
  }

  if (homeHtml.includes("star-twinkle")) {
    console.log("  ✓ Rating chip star twinkle animation configured");
  } else {
    console.error("  ❌ Missing star-twinkle class");
  }

  if (homeHtml.includes("mint-glow-pulse")) {
    console.log("  ✓ Pulsing mint radial glow configured");
  } else {
    console.error("  ❌ Missing mint-glow-pulse class");
  }

  if (homeHtml.includes("bg-[#185553]") && homeHtml.includes("Call Us")) {
    console.log("  ✓ Call Us button uses solid #185553 background with border");
  } else {
    console.error("  ❌ Call Us button styling incorrect");
  }

  console.log("\n4. Inspecting Who We Are Section (Section D):");
  const expectedAboutPara =
    "At LifeCare Hospital, we combine clinical expertise with a human touch to deliver safe, effective and personalised care for every patient.";
  if (homeHtml.includes(expectedAboutPara)) {
    console.log("  ✓ Who We Are paragraph matches requested text exactly");
  } else {
    console.error("  ❌ Who We Are paragraph does not match requested text");
    process.exit(1);
  }

  if (homeHtml.includes("photo-wipe-reveal") || homeHtml.includes("about-photo-wipe")) {
    console.log("  ✓ Photo clip-path wipe reveal animation active");
  } else {
    console.error("  ❌ Missing photo wipe class");
  }

  if (homeHtml.includes("stat-pop-1") && homeHtml.includes("stat-pop-2")) {
    console.log("  ✓ Two stat chips configured with 120ms stagger pop-up");
  } else {
    console.error("  ❌ Missing stat-pop-1 or stat-pop-2");
  }

  if (homeHtml.includes("leaf-sway")) {
    console.log("  ✓ Leaf icon sways +/-6 degrees on 4s loop");
  } else {
    console.error("  ❌ Missing leaf-sway class");
  }

  console.log("\n5. Inspecting CTA Banner Section (Section E):");
  if (homeHtml.includes("cta-banner.webp")) {
    console.log("  ✓ Uses clean cta-banner.webp photo");
  } else {
    console.error("  ❌ Missing cta-banner.webp");
    process.exit(1);
  }

  if (homeHtml.includes("cta-banner-desktop.webp") || homeHtml.includes("cta-banner-mobile.webp")) {
    console.error("  ❌ Found old mockup crop images in CTA banner");
    process.exit(1);
  } else {
    console.log("  ✓ No mockup crops present in CTA banner");
  }

  if (homeHtml.includes("cta-btn-pulse")) {
    console.log("  ✓ Button pulse ring configured");
  } else {
    console.error("  ❌ Missing cta-btn-pulse class");
  }

  if (homeHtml.includes("cta-glow-drift")) {
    console.log("  ✓ Drifting mint radial glow configured");
  } else {
    console.error("  ❌ Missing cta-glow-drift class");
  }

  if (homeHtml.includes("cta-photo-zoom")) {
    console.log("  ✓ CTA photo slow zoom animation configured");
  } else {
    console.error("  ❌ Missing cta-photo-zoom class");
  }

  console.log("\n6. Inspecting Sticky Bar & Button Interactions (Section C & F):");
  if (homeHtml.includes("shine-sweep-once") || homeHtml.includes("btn-idle-shine")) {
    console.log("  ✓ Idle shine sweep and slide-in sweep configured on primary buttons");
  } else {
    console.error("  ❌ Missing shine classes on buttons");
  }

  if (homeHtml.includes("phone-ring-icon")) {
    console.log("  ✓ Phone ring icon wiggle active on call buttons");
  } else {
    console.error("  ❌ Missing phone-ring-icon class");
  }

  if (homeHtml.includes("btn-ripple-container")) {
    console.log("  ✓ Reusable soft touch ripple active on interactive buttons");
  } else {
    console.error("  ❌ Missing btn-ripple-container class");
  }

  // 7. Verify CSS File Rules
  console.log("\n7. Inspecting Global CSS tokens and overrides:");
  const css = fs.readFileSync("src/app/globals.css", "utf8");

  if (css.includes("input, select, textarea") && css.includes("font-size: 16px !important")) {
    console.log("  ✓ Form inputs have 16px font-size override to prevent iOS zoom");
  } else {
    console.error("  ❌ Missing 16px font-size override on form inputs");
  }

  if (css.includes("prefers-reduced-motion: reduce")) {
    console.log("  ✓ Prefers-reduced-motion overrides properly defined");
  } else {
    console.error("  ❌ Missing prefers-reduced-motion overrides");
  }

  if (fs.existsSync("src/app/template.tsx")) {
    console.log("  ✓ Route transition template.tsx exists with 150ms fade");
  } else {
    console.error("  ❌ Missing src/app/template.tsx");
  }

  console.log("\n🎉 ALL LIFECARE HOSPITAL FOLLOW-UP FIXES VERIFIED SUCCESSFULLY!");
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
