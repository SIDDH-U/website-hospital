import React from "react";
import type { Metadata } from "next";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${hospitalConfig.name}, Nanded - our 25+ years history, mission, medical leadership, and multi-speciality clinical excellence.`,
  alternates: {
    canonical: `${getSiteUrl()}/about`,
  },
  openGraph: {
    title: `About Us | ${hospitalConfig.name}`,
    description: `Discover the story, clinical mission, and medical leadership behind ${hospitalConfig.name}, Nanded.`,
    url: `${getSiteUrl()}/about`,
    siteName: hospitalConfig.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `About ${hospitalConfig.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
