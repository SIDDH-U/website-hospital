import React from "react";
import type { Metadata } from "next";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Hospital Services & Facilities",
  description: `Discover comprehensive medical facilities at ${hospitalConfig.name}, Nanded - 24/7 Emergency Casualty, ICU Ambulances, Pathology Lab, Pharmacy, and Health Packages.`,
  alternates: {
    canonical: `${getSiteUrl()}/services`,
  },
  openGraph: {
    title: `Hospital Services & Facilities | ${hospitalConfig.name}`,
    description: `24/7 healthcare services, diagnostic labs, emergency trauma care, and pharmacy at ${hospitalConfig.name}, Nanded.`,
    url: `${getSiteUrl()}/services`,
    siteName: hospitalConfig.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `Services at ${hospitalConfig.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
