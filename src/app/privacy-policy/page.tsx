import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy and health data confidentiality standards of ${hospitalConfig.name}, Nanded.`,
  alternates: {
    canonical: `${getSiteUrl()}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy | ${hospitalConfig.name}`,
    description: `Patient privacy and data protection policies at ${hospitalConfig.name}, Nanded.`,
    url: `${getSiteUrl()}/privacy-policy`,
    siteName: hospitalConfig.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2D2B]">
      <TopStrip />
      <Header />

      <main className="flex-1 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#2DA870] mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#536462]">Privacy Policy</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-[#0F3D3E] mb-6">
          Privacy Policy
        </h1>
        <div className="prose text-sm text-[#536462] space-y-4 leading-relaxed">
          <p>
            At {hospitalConfig.name}, accessible from our website, one of our main priorities is the privacy of our patients and visitors. This Privacy Policy outlines how your personal and health information is collected, safeguarded, and handled in compliance with applicable healthcare data protection standards.
          </p>
          <h2 className="text-xl font-bold text-[#0F3D3E] pt-4">
            Patient Data & Confidentiality
          </h2>
          <p>
            Any medical information, contact numbers, or appointment inquiries provided through this platform are used solely for arranging medical appointments, facilitating doctor consultations, and maintaining clinical records.
          </p>
          <h2 className="text-xl font-bold text-[#0F3D3E] pt-4">
            Emergency Hotline & Direct Communications
          </h2>
          <p>
            Phone numbers and messages submitted for emergency queries or hospital appointments are processed immediately by our front desk triage team located at {hospitalConfig.location.fullAddress}.
          </p>
          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0F3D3E] text-white font-bold text-sm btn-press btn-teal shadow"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <StickyActionBar />
    </div>
  );
}
