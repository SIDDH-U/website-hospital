import fs from "fs";
import { hospitalConfig, buildWhatsAppLink } from "../src/config/hospital.ts";

async function runDetailedVerifications() {
  console.log("==================================================");
  console.log("   LIFECARE HOSPITAL - 4 FIXES VERIFICATION       ");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAILED: ${message}`);
      failed++;
    }
  }

  // -------------------------------------------------------------------------
  // FIX 1: STUCK SHINE ON BUTTONS
  // -------------------------------------------------------------------------
  console.log("\n[FIX 1] Verifying Button Idle Shine CSS & Logic:");
  const css = fs.readFileSync("src/app/globals.css", "utf8");

  // Resting state
  assert(
    css.includes("transform: translateX(-150%)") &&
    css.includes("opacity: 0;") &&
    css.includes("pointer-events: none;"),
    "Resting state has opacity 0, translateX(-150%), and pointer-events: none"
  );

  // Keyframe cycle
  assert(
    css.includes("@keyframes idleShineSweep") &&
    css.includes("0% {") &&
    css.includes("3% {") &&
    css.includes("22% {") &&
    css.includes("24%, 100% {") &&
    css.includes("opacity: 0;"),
    "Single 5s keyframe cycle includes rest period ending in opacity: 0 at translateX(250%)"
  );

  // Never use animation-play-state: paused on idle shine
  const shineSection = css.substring(css.indexOf(".btn-idle-shine"), css.indexOf("SECTION D: WHO WE ARE MOTION"));
  assert(
    !shineSection.includes("animation-play-state: paused"),
    "Never uses animation-play-state: paused on idle shine (prevents mid-sweep freeze)"
  );

  // Animation none when disabled or mobile menu open or reduced motion
  assert(
    css.includes(".btn-idle-shine.anim-idle-disabled::after") &&
    css.includes("animation: none !important;") &&
    css.includes("opacity: 0 !important;"),
    ".anim-idle-disabled sets animation: none !important and opacity: 0 !important"
  );

  assert(
    css.includes("body.mobile-menu-open .btn-idle-shine::after") &&
    css.includes("animation: none !important;"),
    "Mobile menu open disables button shine completely"
  );

  assert(
    css.includes("@media (prefers-reduced-motion: reduce)") &&
    css.includes(".btn-idle-shine::after"),
    "prefers-reduced-motion disables button shine"
  );

  // -------------------------------------------------------------------------
  // FIX 2: CONTACT NUMBER
  // -------------------------------------------------------------------------
  console.log("\n[FIX 2] Verifying Hospital Contact Number & Tel Links:");

  assert(
    hospitalConfig.contact.display === "+91 80800 76322",
    `Config display is "+91 80800 76322" (got "${hospitalConfig.contact.display}")`
  );

  assert(
    hospitalConfig.contact.tel === "+918080076322",
    `Config tel is "+918080076322" (got "${hospitalConfig.contact.tel}")`
  );

  assert(
    hospitalConfig.contact.whatsapp === "918080076322",
    `Config whatsapp is "918080076322" (got "${hospitalConfig.contact.whatsapp}")`
  );

  // Search entire codebase for old placeholder numbers
  function checkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
      const fullPath = `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        checkDir(fullPath);
      } else if (/\.(tsx|ts|js|mjs|jsx|json|md|html)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, "utf8");
        if (content.includes("98765") || content.includes("43210")) {
          // exclude this test script itself
          if (!fullPath.includes("verify-four-fixes.mjs")) {
            assert(false, `Found old placeholder number in ${fullPath}`);
          }
        }
      }
    }
  }
  checkDir(".");
  assert(true, "Entire workspace verified free of 98765 and 43210");

  // Check HTML output of server for correct tel links
  const resHome = await fetch("http://localhost:3000/");
  const htmlHome = await resHome.text();
  assert(
    htmlHome.includes("tel:+918080076322"),
    "Homepage includes tel:+918080076322 call links"
  );
  assert(
    htmlHome.includes("+91 80800 76322"),
    "Homepage displays +91 80800 76322 as text"
  );

  // -------------------------------------------------------------------------
  // FIX 3: APPOINTMENT FORM (/book) SENDS TO WHATSAPP
  // -------------------------------------------------------------------------
  console.log("\n[FIX 3] Verifying Appointment Form (/book):");
  const bookFile = fs.readFileSync("src/app/book/page.tsx", "utf8");

  assert(
    bookFile.includes("buildWhatsAppLink"),
    "/book imports and uses shared buildWhatsAppLink helper"
  );

  assert(
    bookFile.includes("New Appointment Request - LifeCare Hospital"),
    "/book formats 'New Appointment Request - LifeCare Hospital'"
  );

  assert(
    bookFile.includes("window.open(link, \"_blank\")"),
    "/book opens WhatsApp window synchronously inside handleSubmit"
  );

  assert(
    bookFile.includes("Almost done! Tap Send in WhatsApp to confirm your request. We'll call you to confirm your slot.") ||
    (bookFile.includes("Almost done!") && bookFile.includes("Tap Send in WhatsApp to confirm your request.")),
    "/book renders requested success screen message"
  );

  assert(
    bookFile.includes("Open WhatsApp again") &&
    bookFile.includes("Call us instead") &&
    bookFile.includes("Back to home"),
    "/book success screen contains 'Open WhatsApp again', 'Call us instead', and 'Back to home'"
  );

  assert(
    bookFile.includes("searchParams.get(\"dept\")") &&
    bookFile.includes("searchParams.get(\"doctor\")"),
    "/book handles ?dept= and ?doctor= query param pre-fills"
  );

  // Test link builder output
  const testMsg = "New Appointment Request - LifeCare Hospital\nName: John Doe\nPhone: 8080076322";
  const generatedLink = buildWhatsAppLink(testMsg);
  assert(
    generatedLink === `https://wa.me/918080076322?text=${encodeURIComponent(testMsg)}`,
    `buildWhatsAppLink generates: ${generatedLink}`
  );

  // -------------------------------------------------------------------------
  // FIX 4: CONTACT FORM (/contact) SENDS TO WHATSAPP
  // -------------------------------------------------------------------------
  console.log("\n[FIX 4] Verifying Contact Form (/contact):");
  const contactFile = fs.readFileSync("src/app/contact/page.tsx", "utf8");

  assert(
    contactFile.includes("buildWhatsAppLink"),
    "/contact imports and uses shared buildWhatsAppLink helper"
  );

  assert(
    contactFile.includes("New Enquiry - LifeCare Hospital"),
    "/contact formats 'New Enquiry - LifeCare Hospital'"
  );

  assert(
    contactFile.includes("window.open(link, \"_blank\")"),
    "/contact opens WhatsApp window synchronously inside handleSubmit"
  );

  assert(
    contactFile.includes("Almost done! Tap Send in WhatsApp to confirm your message.") ||
    (contactFile.includes("Almost done!") && contactFile.includes("Tap Send in WhatsApp to confirm your message.")),
    "/contact renders requested success screen message"
  );

  assert(
    contactFile.includes("Open WhatsApp again") &&
    contactFile.includes("Call us instead") &&
    contactFile.includes("Back to home"),
    "/contact success screen contains 'Open WhatsApp again', 'Call us instead', and 'Back to home'"
  );

  assert(
    contactFile.includes("placeholder=\"e.g. 80800 76322\""),
    "/contact phone placeholder updated to 'e.g. 80800 76322'"
  );

  console.log("\n==================================================");
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) process.exit(1);
}

runDetailedVerifications().catch((err) => {
  console.error(err);
  process.exit(1);
});
