import React from "react";
import type { Metadata } from "next";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";
import { DoctorsContent } from "./DoctorsContent";

export const metadata: Metadata = {
  title: "Our Doctors & Specialists",
  description: `Meet the expert doctors, surgeons, and medical consultants at ${hospitalConfig.name}, Nanded across Cardiology, Orthopedics, Pediatrics, Neurology, Gynecology, and General Medicine.`,
  alternates: {
    canonical: `${getSiteUrl()}/doctors`,
  },
  openGraph: {
    title: `Our Doctors & Specialists | ${hospitalConfig.name}`,
    description: `Experienced senior doctors and board-certified consultants at ${hospitalConfig.name}, Nanded.`,
    url: `${getSiteUrl()}/doctors`,
    siteName: hospitalConfig.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `Doctors at ${hospitalConfig.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function DoctorsPage() {
  return <DoctorsContent />;
}
