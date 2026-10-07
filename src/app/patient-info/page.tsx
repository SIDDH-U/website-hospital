import React from "react";
import type { Metadata } from "next";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";
import { PatientInfoContent } from "./PatientInfoContent";

export const metadata: Metadata = {
  title: "Patient & Visitor Information",
  description: `Essential guide for patients and visitors at ${hospitalConfig.name}, Nanded - booking steps, required documents, visiting hours, and cashless TPA insurance.`,
  alternates: {
    canonical: `${getSiteUrl()}/patient-info`,
  },
  openGraph: {
    title: `Patient & Visitor Information | ${hospitalConfig.name}`,
    description: `Complete guide for visiting, appointments, and insurance policies at ${hospitalConfig.name}, Nanded.`,
    url: `${getSiteUrl()}/patient-info`,
    siteName: hospitalConfig.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `Patient Info at ${hospitalConfig.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function PatientInfoPage() {
  return <PatientInfoContent />;
}
