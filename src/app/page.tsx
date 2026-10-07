import React from "react";
import type { Metadata } from "next";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";
import { HomeClient } from "@/components/HomeClient";

export const metadata: Metadata = {
  title: `${hospitalConfig.name} - Multi-Speciality Healthcare in Nanded, Maharashtra`,
  description: hospitalConfig.fullDescription,
  alternates: {
    canonical: `${getSiteUrl()}/`,
  },
  openGraph: {
    title: `${hospitalConfig.name} - Multi-Speciality Healthcare in Nanded`,
    description: hospitalConfig.description,
    url: `${getSiteUrl()}/`,
    siteName: hospitalConfig.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `${hospitalConfig.name} - Multi-Speciality Hospital in Nanded`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  const hospitalJsonLd = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: hospitalConfig.name,
    legalName: hospitalConfig.legalName,
    description: hospitalConfig.description,
    url: getSiteUrl(),
    telephone: hospitalConfig.contact.phoneRaw,
    emergencyTelephone: hospitalConfig.contact.emergencyPhoneRaw,
    email: hospitalConfig.contact.email,
    image: `${getSiteUrl()}/images/hero-desktop.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: hospitalConfig.location.address,
      addressLocality: hospitalConfig.location.city,
      addressRegion: hospitalConfig.location.state,
      postalCode: hospitalConfig.location.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.1383",
      longitude: "77.3210",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    medicalSpecialty: [
      "Cardiovascular",
      "Orthopedics",
      "Pediatrics",
      "Neurology",
      "Gynecology",
      "GeneralMedicine",
    ],
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
