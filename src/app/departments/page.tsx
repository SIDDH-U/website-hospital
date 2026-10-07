import React from "react";
import type { Metadata } from "next";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";
import { DepartmentsContent } from "./DepartmentsContent";

export const metadata: Metadata = {
  title: "Medical Departments & Specialties",
  description: `Explore medical departments and clinical centers of excellence at ${hospitalConfig.name}, Nanded - Cardiology, Orthopedics, Pediatrics, Neurology, Gynecology, and General Medicine.`,
  alternates: {
    canonical: `${getSiteUrl()}/departments`,
  },
  openGraph: {
    title: `Medical Departments | ${hospitalConfig.name}`,
    description: `Centres of clinical excellence and medical specialities at ${hospitalConfig.name}, Nanded.`,
    url: `${getSiteUrl()}/departments`,
    siteName: hospitalConfig.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `Medical Departments at ${hospitalConfig.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function DepartmentsPage() {
  return <DepartmentsContent />;
}
