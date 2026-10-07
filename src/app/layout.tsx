import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { hospitalConfig } from "@/config/hospital";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F3D3E",
};

export const metadata: Metadata = {
  title: `${hospitalConfig.name} - Multi-Speciality Healthcare in Nanded, Maharashtra`,
  description:
    "LifeCare Hospital in Nanded provides 24/7 emergency care, expert doctors, advanced medical treatments, and compassionate patient care across Cardiology, Orthopedics, Pediatrics, Neurology, and more.",
  keywords: [
    "LifeCare Hospital",
    "Hospital in Nanded",
    "Multi-speciality hospital Nanded",
    "Best doctors in Nanded",
    "24/7 Emergency hospital Nanded",
    "Cardiology Nanded",
    "Orthopedic hospital Nanded",
    "Healthcare Maharashtra",
  ],
  authors: [{ name: "LifeCare Hospital" }],
  creator: "LifeCare Hospital",
  publisher: "LifeCare Hospital",
  metadataBase: new URL("https://lifecarehospital-nanded.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${hospitalConfig.name} - Healing Begins The Moment You Walk In`,
    description:
      "Expert care. Modern treatment. Compassionate healthcare for you and your family in Nanded, Maharashtra.",
    url: "https://lifecarehospital-nanded.com",
    siteName: hospitalConfig.name,
    images: [
      {
        url: "/images/hero-desktop.webp",
        width: 1200,
        height: 675,
        alt: "LifeCare Hospital Medical Team",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${hospitalConfig.name} - Multi-Speciality Hospital in Nanded`,
    description:
      "24/7 Emergency care, modern facilities, and experienced medical specialists in Nanded.",
    images: ["/images/hero-desktop.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Hospital Schema
  const hospitalJsonLd = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": hospitalConfig.name,
    "legalName": hospitalConfig.legalName,
    "description": hospitalConfig.fullDescription,
    "url": "https://lifecarehospital-nanded.com",
    "logo": "https://lifecarehospital-nanded.com/images/logo.svg",
    "image": "https://lifecarehospital-nanded.com/images/hero-desktop.webp",
    "telephone": hospitalConfig.contact.phoneRaw,
    "emergencyTelephone": hospitalConfig.contact.emergencyPhoneRaw,
    "email": hospitalConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hospitalConfig.location.address,
      "addressLocality": hospitalConfig.location.city,
      "addressRegion": hospitalConfig.location.state,
      "postalCode": hospitalConfig.location.pincode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.1383",
      "longitude": "77.3210"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "priceRange": "$$",
    "medicalSpecialty": [
      "Cardiovascular",
      "Orthopedics",
      "Pediatrics",
      "Neurology",
      "Gynecology",
      "PrimaryCare"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Medical Services",
      "itemListElement": hospitalConfig.departments.map((dept, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": dept.name,
          "description": dept.description
        },
        "position": index + 1
      }))
    }
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-charcoal font-sans flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
