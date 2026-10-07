import sharp from "sharp";
import fs from "fs";
import path from "path";

async function cleanHeroImage() {
  const src = "C:/Users/siddc/.gemini/antigravity-ide/brain/6fd0f8d3-f7a3-4159-873c-e7ac3456767b/hero_doctors_1791348698738.jpg";
  const outDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Blurred background patch for the wall logo (left: 800, top: 220, w: 400, h: 220)
  const wallPatch = await sharp(src)
    .extract({ left: 800, top: 220, width: 400, height: 220 })
    .blur(35)
    .toBuffer();

  // 2. Overhead ceiling signs (left: 420, top: 90, w: 200, h: 160)
  const ceilingPatch = await sharp(src)
    .extract({ left: 420, top: 90, width: 200, height: 160 })
    .blur(30)
    .toBuffer();

  // 3. Clean white coat patch to cover doctor's name badge (left: 380, top: 480, w: 90, h: 100)
  // Sample clean white fabric from doctor's coat at left: 230, top: 580
  const coatPatch = await sharp(src)
    .extract({ left: 230, top: 580, width: 90, height: 100 })
    .blur(1)
    .toBuffer();

  // 4. Clean teal scrubs patch to cover nurse embroidery (left: 520, top: 610, w: 90, h: 45)
  // Sample clean scrub fabric from left: 580, top: 720
  const scrubPatch1 = await sharp(src)
    .extract({ left: 580, top: 720, width: 90, height: 45 })
    .toBuffer();

  // 5. Clean teal scrubs patch for right embroidery (left: 665, top: 605, w: 95, h: 45)
  const scrubPatch2 = await sharp(src)
    .extract({ left: 580, top: 720, width: 95, height: 45 })
    .toBuffer();

  const cleaned = await sharp(src)
    .composite([
      { input: wallPatch, left: 800, top: 220 },
      { input: ceilingPatch, left: 420, top: 90 },
      { input: coatPatch, left: 380, top: 480 },
      { input: scrubPatch1, left: 520, top: 610 },
      { input: scrubPatch2, left: 665, top: 605 },
    ])
    .toBuffer();

  // Create hero-desktop.webp (16:9 - 1920x1080)
  // On desktop (1024px and up):
  // "the photo is on the right 60%, with the doctor and nurse fully inside the frame and nothing cropped at the edges.
  // A gradient overlay runs left to right: solid deep teal at 0%, about 92% opacity at 35%, fading to transparent by about 65%.
  // The text block sits on the solid teal part, so the doctor looks like they are standing in the same space as the headline."
  const desktopWidth = 1920;
  const desktopHeight = 1080;

  // Resize cleaned doctor & nurse so they fill the right side (e.g. width ~1200, height ~896 scaled to fit height 1080)
  const scaledDoctorWidth = Math.round(1080 * (1200 / 896)); // ~1446
  const scaledDoctors = await sharp(cleaned)
    .resize(scaledDoctorWidth, 1080, { fit: "cover", position: "right" })
    .toBuffer();

  // Create deep teal base 1920x1080 canvas and place scaledDoctors aligned right
  const desktopOffsetLeft = desktopWidth - scaledDoctorWidth;
  const desktopBase = await sharp({
    create: {
      width: desktopWidth,
      height: desktopHeight,
      channels: 4,
      background: { r: 15, g: 61, b: 62, alpha: 1 }, // #0F3D3E
    },
  })
    .composite([
      { input: scaledDoctors, left: Math.max(0, desktopOffsetLeft), top: 0 },
    ])
    .webp({ quality: 88 })
    .toFile(path.join(outDir, "hero-desktop.webp"));

  console.log("Created hero-desktop.webp successfully:", desktopBase);

  // Create hero-mobile.webp (4:5 - 1080x1350)
  // "Mobile (below 1024px): a single block. The text (rating chip, headline, subtext, the two buttons) sits at the top on solid teal.
  // The photo fills the bottom half of the hero, with the doctors' upper bodies emerging from the bottom edge.
  // A vertical gradient overlay fades from solid teal at the top to transparent at about 55% down, so there is no hard line between the text and the photo."
  const mobileWidth = 1080;
  const mobileHeight = 1350;

  // The doctors should fill the bottom half (height ~750, width ~1080)
  const mobDoctors = await sharp(cleaned)
    .resize(mobileWidth, 760, { fit: "cover", position: "top" })
    .toBuffer();

  const mobileBase = await sharp({
    create: {
      width: mobileWidth,
      height: mobileHeight,
      channels: 4,
      background: { r: 15, g: 61, b: 62, alpha: 1 }, // #0F3D3E
    },
  })
    .composite([
      { input: mobDoctors, left: 0, top: mobileHeight - 760 },
    ])
    .webp({ quality: 88 })
    .toFile(path.join(outDir, "hero-mobile.webp"));

  console.log("Created hero-mobile.webp successfully:", mobileBase);

  // Also clean the CTA banner family photo:
  // Requirement 9: "Remove the tiny squeezed thumbnail currently in the CTA banner (it contains cropped mockup text). Use a clean photo as described in point 2."
  // "Use the same technique for the CTA banner at the bottom (photo on the right, teal gradient fading in from the left on tablet and desktop; on mobile the photo is a rounded 16:9 strip above the text)."
  // Let's create a beautiful clean cta-banner-desktop.webp and cta-banner-mobile.webp
  const ctaSrc = path.join(process.cwd(), "public", "images", "cta-family.webp");
  if (fs.existsSync(ctaSrc)) {
    // Upscale/clean cta-family
    await sharp(ctaSrc)
      .resize(1200, 600, { fit: "cover" })
      .webp({ quality: 90 })
      .toFile(path.join(outDir, "cta-banner-desktop.webp"));
    
    await sharp(ctaSrc)
      .resize(800, 450, { fit: "cover" })
      .webp({ quality: 90 })
      .toFile(path.join(outDir, "cta-banner-mobile.webp"));
    console.log("Created CTA banner webp images");
  }
}

cleanHeroImage().catch(console.error);
