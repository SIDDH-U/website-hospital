import React from "react";
import type { Metadata } from "next";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us & Location",
  description: `Contact ${hospitalConfig.name}, Nanded. Address: ${hospitalConfig.location.fullAddress}. Phone: ${hospitalConfig.contact.display}, Emergency 24/7: ${hospitalConfig.contact.emergencyPhone}.`,
  alternates: {
    canonical: `${getSiteUrl()}/contact`,
  },
  openGraph: {
    title: `Contact Us & Hospital Location | ${hospitalConfig.name}`,
    description: `Get in touch with ${hospitalConfig.name}, Nanded for appointments, emergency admissions, and directions.`,
    url: `${getSiteUrl()}/contact`,
    siteName: hospitalConfig.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `Contact ${hospitalConfig.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
