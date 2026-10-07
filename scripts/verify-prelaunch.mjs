import fs from "fs";

async function runVerification() {
  console.log("=== PRE-LAUNCH POLISH VERIFICATION ===");
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`  ✓ ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAILED: ${message}`);
      process.exitCode = 1;
    }
  }

  // 1. Config & URLs
  console.log("\n1. SEO & Config Defaults:");
  const configContent = fs.readFileSync("src/config/hospital.ts", "utf8");
  assert(configContent.includes('DEFAULT_SITE_URL = "https://website-hospital-nine.vercel.app"'), "Default site URL is https://website-hospital-nine.vercel.app");
  assert(configContent.includes('CALLBACK_TEXT = "We\'ll call you shortly to confirm"'), "CALLBACK_TEXT is 'We\'ll call you shortly to confirm'");
  assert(
    configContent.includes('facebook: ""') &&
    configContent.includes('instagram: ""') &&
    configContent.includes('linkedin: ""') &&
    configContent.includes('youtube: ""'),
    "All social URLs in config are set to empty strings"
  );

  // 2. Next Config
  console.log("\n2. Image Performance Configuration (next.config.ts):");
  const nextConfigContent = fs.readFileSync("next.config.ts", "utf8");
  assert(nextConfigContent.includes("360, 414, 640, 750, 828, 1080, 1200, 1920"), "next.config.ts contains exact deviceSizes");
  assert(nextConfigContent.includes("image/avif") && nextConfigContent.includes("image/webp"), "next.config.ts includes image/avif and image/webp formats");

  // 3. Robots & Sitemap
  console.log("\n3. Robots.ts & Sitemap.ts:");
  const robotsContent = fs.readFileSync("src/app/robots.ts", "utf8");
  assert(robotsContent.includes("isProductionDomain"), "robots.ts uses isProductionDomain check");
  assert(robotsContent.includes("disallow: '/'") || robotsContent.includes('disallow: "/"'), "robots.ts disallows indexing on non-production domains");

  const sitemapContent = fs.readFileSync("src/app/sitemap.ts", "utf8");
  assert(sitemapContent.includes("departments") && sitemapContent.includes("doctors") && sitemapContent.includes("blog"), "sitemap.ts generates static and dynamic routes");

  // 4. Logo Link Accessibility
  console.log("\n4. Accessibility & Headings:");
  const logoContent = fs.readFileSync("src/components/LifeCareLogo.tsx", "utf8");
  assert(logoContent.includes('aria-label="LifeCare Hospital home"'), "Logo link has aria-label='LifeCare Hospital home'");

  const heroContent = fs.readFileSync("src/components/Hero.tsx", "utf8");
  assert(heroContent.includes('aria-label={`${hospitalConfig.hero.headingPrefix} ${hospitalConfig.hero.headingRest}`}') || heroContent.includes('aria-label="Healing Begins The Moment You Walk In"'), "Hero animated heading has aria-label with full text and real spaces");
  assert(heroContent.includes("<picture"), "Hero uses single responsive <picture> art-direction");

  const ctaContent = fs.readFileSync("src/components/CtaBanner.tsx", "utf8");
  assert(ctaContent.includes('aria-label={hospitalConfig.ctaBanner.title}') || ctaContent.includes('aria-label="Ready to feel better?"'), "CTA Banner animated heading has aria-label with full text");

  // 5. Stats SSR Count-up
  console.log("\n5. Stats SSR count-up hook:");
  const scrollHookContent = fs.readFileSync("src/components/useScrollAnimation.ts", "utf8");
  assert(scrollHookContent.includes("useState(target)"), "useCountUp initializes state with target value for SSR");

  // 6. Merged markup
  console.log("\n6. Merged Markup in About.tsx:");
  const aboutComponentContent = fs.readFileSync("src/components/About.tsx", "utf8");
  const aboutConsultingMatches = (aboutComponentContent.match(/\/images\/about-consulting\.webp/g) || []).length;
  assert(aboutConsultingMatches === 1, "About.tsx renders exactly 1 main consultation photo instance with responsive classes");

  // 7. /book page
  console.log("\n7. Book Page (/book):");
  const bookPageContent = fs.readFileSync("src/app/book/page.tsx", "utf8");
  assert(bookPageContent.includes("BookFormSkeleton"), "Book page uses BookFormSkeleton fallback");
  assert(bookPageContent.includes("Book an Appointment"), "Book page contains server-side h1 'Book an Appointment'");
  assert(bookPageContent.includes("<noscript>"), "Book page contains <noscript> fallback with phone");

  const bookFormContent = fs.readFileSync("src/app/book/BookForm.tsx", "utf8");
  assert(!bookFormContent.includes("Emergency Consultation"), "BookForm removed 'Emergency Consultation' from department dropdown");
  assert(bookFormContent.includes("hospitalConfig.callbackText"), "BookForm uses hospitalConfig.callbackText");

  // 8. Placeholders in README
  console.log("\n8. Placeholders Section in README.md:");
  const readmeContent = fs.readFileSync("README.md", "utf8");
  assert(readmeContent.includes("Pre-Launch Checklist: Placeholders to Replace"), "README.md contains Pre-Launch Checklist: Placeholders to Replace section");
  assert(readmeContent.includes("Doctor Profiles") && readmeContent.includes("Ratings & Review Count"), "README.md lists specific placeholders to replace");

  console.log(`\n========================================`);
  console.log(`TOTAL CHECKS: ${total} | PASSED: ${passed}`);
  console.log(`========================================\n`);
}

runVerification();
