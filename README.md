# LifeCare Hospital — Multi-Speciality Website

A responsive, touch-first, mobile-optimized website for **LifeCare Hospital**, a multi-speciality medical institution in **Nanded, Maharashtra**.

Built with **Next.js 16 (App Router)**, **Tailwind CSS**, and **TypeScript**. Over 80% of hospital visitors browse from mobile phones, so the entire user experience is built mobile-first (tested at 390px and scaled up to 1280px desktop) with touch feedback, scroll-driven interactions, and zero-delay navigation.

---

## ⚠️ Pre-Launch Checklist: Placeholders to Replace

Before pointing the live production domain (`lifecarehospital-nanded.com`) to this codebase, the following placeholder and invented demo items must be reviewed and replaced with genuine hospital credentials and information in `src/config/hospital.ts` and `public/images/`:

| Item / Category | Current Demo Placeholder | Where to Update | Notes & Replacement Requirement |
|---|---|---|---|
| **Doctor Profiles** | 8 simulated doctors (`Dr. Rajesh Sharma`, `Dr. Priya Patel`, etc.) | `src/config/hospital.ts` (`doctors` array) | Replace names, qualifications, department IDs, OPD timings, and short bios with actual hospital doctors. |
| **Doctor Photos** | Demo portraits in `/public/images/doctors/` | `public/images/doctors/` & `src/config/hospital.ts` | Replace with authentic, high-resolution portrait photographs (4:5 aspect ratio) of real hospital staff. |
| **Years of Experience** | `"25+"` years of healthcare excellence | `src/config/hospital.ts` (`about.yearsOfCare`) | Update to reflect the actual founding year and operational history. |
| **Establishment Claims** | "More Than Two Decades", "since 2001" | `src/config/hospital.ts` (`about.paragraph`, `hero`) | Align with actual hospital accreditation and incorporation history. |
| **Patient Volume Count** | `"10K+ Happy Patients"` / `"10,000+ families"` | `src/config/hospital.ts` (`hero.badgePatients`, `about`) | Update with actual verified patient footfall / registration records. |
| **Ratings & Review Count** | `"4.9/5"` from `"10,000+ reviews"` | `src/config/hospital.ts` (`about.ratingScore`, `about.ratingCount`) | Connect to real Google Business Profile or Practo rating stats. |
| **Department Facility Claims** | Specific equipment (Digital Cath Lab, Level III NICU, Computer-Navigated Ortho) | `src/config/hospital.ts` (`departments` array) | Verify conditions treated and specific facilities/machines available in each department. |
| **Hospital Physical Address** | `123 Healthcare Road, Nanded, Maharashtra 431601` | `src/config/hospital.ts` (`location` object) | Replace with real physical hospital premises address, pincode, and Google Maps CID URL. |
| **Contact Phone & Hotlines** | `+91 80800 76322` | `src/config/hospital.ts` (`contact` object) | Verify front desk reception, ambulance hotline, and casualty numbers. |
| **Official Email Address** | `info@lifecarehospital.com` | `src/config/hospital.ts` (`contact.email`) | Update to genuine hospital domain email inbox. |
| **Social Media URLs** | Currently set to empty strings (`""`) | `src/config/hospital.ts` (`socials` object) | Add verified Facebook, Instagram, LinkedIn, and YouTube profile URLs once created. |
| **Blog Articles** | 3 demo health articles and author attributions | `src/config/hospital.ts` (`blogArticles` array) | Replace with real articles written or medically reviewed by hospital consultants. |
| **Site URL & Domain** | `NEXT_PUBLIC_SITE_URL` env variable | Vercel Environment Variables & DNS | Set `NEXT_PUBLIC_SITE_URL=https://lifecarehospital-nanded.com` to enable search indexing (`robots.ts`). |

---

## 📄 Complete Page Directory & Routes

All routes are fully implemented with zero dead links or broken placeholders:

| Route | Page Name | Description & Key Features |
|---|---|---|
| `/` | **Homepage** | Full-bleed integrated hero photo with art direction, 3 approach cards, stats with count-up, 6 department icon cards, infinite continuous auto-scrolling doctors marquee row, integrated CTA banner, and 4-column footer. |
| `/about` | **About Us** | Hospital history & 25-year mission, dedicated **"Our Approach"** section (`id="our-approach"` with 3 core pillars), clinical stats, Medical Director's personal message, and a 4-photo campus gallery. |
| `/departments` | **Departments Directory** | Image-led catalog of all 6 medical specialties with 16:10 photos, icon badges, descriptions, and touch/hover zoom effects. (1 col mobile, 2 cols tablet, 3 cols desktop). |
| `/departments/[slug]` | **Department Details** | 6 individual clinical department hubs (`cardiology`, `orthopedics`, `pediatrics`, `neurology`, `gynecology`, `general-medicine`). Includes full-width integrated hero photo, pre-filled "Book Appointment" button, overview, "Conditions We Treat", "Treatments & Facilities", 3-photo facility strip, specialist doctor cards, and closing CTA. |
| `/doctors` | **Our Doctors** | Comprehensive directory of all 8 senior consultants with interactive department filter chips ("All Specialists", "Cardiology", "Orthopedics", etc.), portrait 4:5 cards, OPD schedules, and direct booking links. |
| `/doctors/[slug]` | **Doctor Profile** | Dedicated specialist profile for each doctor: 4:5 portrait, credentials, clinical experience, biography, outpatient OPD timings, and a pre-filled "Book Appointment" button. |
| `/services` | **Hospital Services** | Image-led cards covering all 6 essential services: 24/7 Emergency & Casualty, OPD Consultations, Diagnostics & Pathology Lab, 24/7 In-House Pharmacy, Advanced ICU Ambulance, and Preventive Health Checkup Packages. |
| `/patient-info` | **Patient & Visitor Info** | Step-by-step booking guide, documents checklist to bring, visiting hours for general and ICU wards, cashless TPA insurance empaneled partners, and interactive FAQs. |
| `/blog` | **Health Blog** | Medical wellness insights written by hospital specialists, presented as 16:10 image cards with reading times and author credits. |
| `/blog/[slug]` | **Article Detail Pages** | Full readable articles for each topic (`heart-health-tips`, `understanding-joint-pain`, `pediatric-immunization`), with featured hero photo, doctor author card, and appointment CTA. |
| `/contact` | **Contact & Location** | Tappable address (direct Google Maps link), one-tap `tel:` emergency hotlines, email, OPD hours, contact form with instant validation, and interactive map placeholder. |
| `/book` | **Book Appointment** | Full-featured consultation booking form. Reads URL query params (`?dept=` and `?doctor=`) to pre-select specialist and department. Validates phone number and fields with submission confirmation. |
| `/privacy-policy` | **Privacy Policy** | Patient health data confidentiality, HIPAA/clinical standards compliance, and emergency contact disclaimers. |
| `/terms` | **Terms of Service** | Hospital guidelines, booking policy, and emergency medical disclaimer. |

---

## ⚙️ Centralized Configuration File

Every phone number, email, address, operating hour, doctor profile, department, and service is centralized in:
👉 **`src/config/hospital.ts`**

### Contact & Location
- **Address**: `123 Healthcare Road, Nanded, Maharashtra 431601`
- **Phone**: `+91 80800 76322` (`tel:+918080076322`)
- **WhatsApp**: `918080076322`
- **Email**: `info@lifecarehospital.com`
- **Working Hours**: `Mon - Sat: 8 AM - 8 PM · Emergency 24/7`
- **Google Maps**: [Direct Google Maps Link](https://www.google.com/maps/search/?api=1&query=LifeCare+Hospital+123+Healthcare+Road+Nanded+Maharashtra+431601)

### Configuration Schema
```typescript
export interface HospitalConfig {
  name: string;
  legalName: string;
  tagline: string;
  location: { address; city; state; pincode; fullAddress; mapUrl };
  contact: { phone; phoneRaw; emergencyPhone; emergencyPhoneRaw; email };
  hours: { regular; emergency; display };
  socials: { facebook; instagram; linkedin; youtube };
  hero: { badgeRating; badgePatients; headingPrefix; headingRest; subtext; desktopSubtext; ctaPrimary; ctaSecondary };
  approach: { badge; titleStart; titleHighlight; description; cards: ApproachCard[] };
  about: { badge; titleStart; titleHighlight; paragraph; buttonText; yearsOfCare; ratingScore; ratingMax; ratingCount; medicalDirector; specialties };
  departments: Department[]; // 6 departments
  doctors: Doctor[];         // 8 doctors
  services: ServiceItem[];   // 6 services
  blogArticles: BlogArticle[];
  ctaBanner: { title; subtext; buttonText };
  footer: { description; quickLinksCol1; quickLinksCol2; legalLinks; copyright };
}
```

---

## 👨‍⚕️ How to Add, Edit, or Reorder Doctors

To update the doctors list, open **`src/config/hospital.ts`** and modify the `doctors` array:

```typescript
{
  id: "dr-rajesh-sharma",
  slug: "dr-rajesh-sharma",
  name: "Dr. Rajesh Sharma",
  speciality: "Senior Cardiologist & Medical Director",
  departmentId: "cardiology", // Must match department id
  qualifications: "MD, DM (Cardiology), FACC",
  experience: "25+ Years of Clinical Excellence",
  shortBio: "Dr. Sharma is a renowned cardiologist with over two decades of experience in interventional cardiology.",
  opdTimings: "Mon - Sat: 10:00 AM - 02:00 PM",
  image: "/images/doctors/dr-rajesh-sharma.jpg", // 4:5 aspect ratio
}
```

Updating this array automatically updates:
1. The **auto-scrolling doctors marquee** on the homepage (`/`).
2. The **doctors directory and department filter chips** at `/doctors`.
3. The **department-specific doctor listings** at `/departments/[slug]`.
4. The individual **profile pages** generated at `/doctors/[slug]`.
5. The **doctor dropdown** on the booking page (`/book`).

---

## 🖼️ Expected Image Filenames & Directory Structure

All images are clean, high-resolution, and contain **no readable signage, logos, or competitor hospital names**.

```
public/images/
├── hero-desktop.webp              # 1920x1080 (16:9 landscape, medical team on right 45%, soft left)
├── hero-mobile.webp               # 1080x1350 (4:5 portrait, doctors in lower half, soft top 40%)
├── cta-banner-desktop.webp        # 1920x1080 (clean medical team on right, teal gradient on left)
├── cta-banner-mobile.webp         # 1080x1350 (clean 16:9 strip photo for mobile banner)
├── dr-rajesh-sharma.webp          # Medical Director avatar
│
├── departments/                   # Department feature photos (16:10) and facility strips
│   ├── cardiology.jpg
│   ├── cardiology-1.jpg
│   ├── cardiology-2.jpg
│   ├── cardiology-3.jpg
│   ├── orthopedics.jpg
│   ├── orthopedics-1.jpg
│   ├── orthopedics-2.jpg
│   ├── orthopedics-3.jpg
│   ├── pediatrics.jpg
│   ├── pediatrics-1.jpg
│   ├── pediatrics-2.jpg
│   ├── pediatrics-3.jpg
│   ├── neurology.jpg
│   ├── neurology-1.jpg
│   ├── neurology-2.jpg
│   ├── neurology-3.jpg
│   ├── gynecology.jpg
│   ├── gynecology-1.jpg
│   ├── gynecology-2.jpg
│   ├── gynecology-3.jpg
│   ├── general-medicine.jpg
│   ├── general-medicine-1.jpg
│   ├── general-medicine-2.jpg
│   └── general-medicine-3.jpg
│
├── doctors/                       # 4:5 portrait photos of all 8 doctors
│   ├── dr-rajesh-sharma.jpg
│   ├── dr-priya-patel.jpg
│   ├── dr-amit-deshmukh.jpg
│   ├── dr-sunita-kulkarni.jpg
│   ├── dr-vikram-joshi.jpg
│   ├── dr-sanjay-patil.jpg
│   ├── dr-ananya-iyer.jpg
│   └── dr-rohit-mehta.jpg
│
├── services/                      # 16:10 photos for the 6 services
│   ├── emergency-24-7.jpg
│   ├── opd-consultations.jpg
│   ├── diagnostics-lab.jpg
│   ├── pharmacy.jpg
│   ├── ambulance.jpg
│   └── health-checkups.jpg
│
├── blog/                          # 16:10 photos for blog articles
│   ├── heart-health-tips.jpg
│   ├── understanding-joint-pain.jpg
│   └── pediatric-immunization.jpg
│
└── gallery/                       # Campus and facility photos for /about
    ├── gallery-1.jpg
    ├── gallery-2.jpg
    ├── gallery-3.jpg
    └── gallery-4.jpg
```

---

## 🛠️ Key Technical Solutions Implemented

### 1. Mobile Menu Bug Root Cause & Fix
- **Root Cause**: The `<header>` element utilized `backdrop-filter: blur(...)` combined with sticky positioning. In CSS specifications (WebKit and Blink engines), applying a `backdrop-filter` creates a new stacking and containing block for any descendant elements with `position: fixed`. This trapped the slide-in drawer inside the 80px header boundary.
- **Fix**: Re-rendered the mobile drawer using React `createPortal(..., document.body)`. The drawer slides in from the right with a dim backdrop overlay, traps keyboard Tab focus, handles Escape and route changes, locks body scroll, and toggles `body.mobile-menu-open` which cleanly hides the sticky bottom bar.

### 2. Integrated Hero Photo Background (Point 2)
- Replaced separate box with full-bleed `<picture>` element with art direction (`hero-desktop.webp` and `hero-mobile.webp`).
- **Desktop (1024px+)**: Photo fills right 60%, horizontal gradient overlay fades from solid deep teal `#0F3D3E` at 0%, ~92% opacity at 35%, to transparent at 65%.
- **Mobile (<1024px)**: Single block where doctors' upper bodies emerge from the bottom edge; vertical gradient overlay fades from solid teal at the top to transparent at 55%.
- `min-height: calc(100svh - 7rem)` ensures the rating chip, headline, subtext, both buttons, and doctors' heads are visible without scrolling.

### 3. Sticky Bottom Action Bar (Point 3)
- Total height is 60px (44px buttons, 8px vertical padding + `env(safe-area-inset-bottom)`).
- Flex ratio is 1.25 : 1 favoring **"Book Appointment"** (`whitespace-nowrap`, 15px semibold, 18px icon).
- Uses responsive label: shows **"Book Now"** on `<360px` screens, and **"Book Appointment"** on `≥360px`.
- Attached to an `IntersectionObserver` observing `#hero-cta-buttons`: slides up into view only after hero buttons scroll out of view, and slides down when hero buttons are visible.

### 4. Touch-First Feedback (Point 4)
- **Instant Press**: `:active` scales buttons to `0.97` (with tint shifts: mint buttons to deeper mint `#B2E0C2`, teal buttons to `#175354`), cards to `0.98`, and shifts arrows 3px right with `120ms` in and `200ms` out transitions.
- **Hover Isolation**: All hover effects (`translateY(-2px)`, shadow lift, image zooms) are strictly enclosed within `@media (hover: hover) and (pointer: fine)` so they never stick on touchscreen devices.
- **Touch Middle-Band Observer**: On touch devices (`@media (hover: none)`), an `IntersectionObserver` with `rootMargin: "-35% 0px -35% 0px"` activates card icon fills and slow zooms when cards scroll through the middle of the screen.
- **iOS Safari Support**: Transparent tap highlight (`-webkit-tap-highlight-color: transparent`), `touch-action: manipulation` (no 300ms tap delay), and a no-op passive touchstart listener on the document.

### 5. Auto-Scrolling Doctors Marquee (Point 7)
- Pure CSS continuous marquee animation (`scrollDoctors`) running at ~60px/s (32s loop).
- Gradient fade masks on both left and right edges.
- Seamless infinite loop using duplicated card track.
- Automatically pauses on hover, focus-within, and active touch tap-and-hold.
- Fallback under `prefers-reduced-motion`: animation is disabled and converts into a horizontally scrollable snap strip.

### 6. Seamless Hero Blending & Calm Motion Sequence
- **Mobile Hero Column**: Text sits strictly on solid `#0F3D3E`, photo sits below buttons with `aspect-[4/5]` and `-mt-8` margin.
- **Eased Mask**: 7-stop linear gradient (`linear-gradient(to bottom, transparent 0% ... #000 45%)`) with `-webkit-` prefix fades photo into teal with zero hard lines.
- **Teal Palette Tint**: `rgba(15,61,62,0.28)` multiply layer and `saturate(0.9)` filter match doctor skin tones and scrubs seamlessly into the brand palette.
- **Desktop Art Direction**: Photo covers right 60% with horizontal eased mask fade.
- **Motion Sequence**: 14px fade-up sequence (rating chip, headline 1, headline 2, subtext, buttons 90ms apart), mint shimmer on "Healing" every 8s, star twinkle every 5s, slow photo zoom (1.0 to 1.06 over 20s alternate), and pulsing mint radial glow (15-25% opacity over 6s).
- **Interactive Button Effects**:
  - Soft shine sweep on primary CTAs every 5s with randomized 0-2s offset (`--shine-delay`).
  - Phone ring wiggle on call buttons (`+/-10deg` 3 times every 6s).
  - Single shine sweep on slide-in for sticky bottom bar Book Appointment button.
  - Soft pointerdown ripple effect expanding from exact touch point.
  - Viewport concurrency governor: max 2 idle animations active concurrently.
- **Clean CTA Banner**: Replaced mockup crop with high-res `/public/images/cta-banner.webp`, bleeding 16:9 on mobile with bottom 40% mask fade, right 45% on desktop, drifting mint glow, and pulse ring on booking button.
- **Who We Are Optimization**: Paragraph strictly capped at 3 lines at 390px (14.5px below 360px), bottom-to-top clip wipe reveal, stat chip pop-ups, count-up numbers, and swaying SVG leaf icon.
- **Accessibility & Mobile UX**: Form inputs fixed at 16px to prevent iOS auto-zoom, tap targets >= 44px, full `prefers-reduced-motion` override suite.

---

## 🚀 Development & Build Commands

```bash
# Start development server
npm run dev

# Run comprehensive automated verification test
node scripts/verify-website.mjs

# Build for production
npm run build

# Start production server
npm start
```
