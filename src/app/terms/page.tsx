import React from "react";
import Link from "next/link";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { hospitalConfig } from "@/config/hospital";

export default function TermsPage() {
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
          <span className="text-[#536462]">Terms of Service</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-[#0F3D3E] mb-6">
          Terms of Service
        </h1>
        <div className="prose text-sm text-[#536462] space-y-4 leading-relaxed">
          <p>
            Welcome to {hospitalConfig.legalName}. By browsing this website or scheduling consultations through our online booking desk, you agree to comply with the terms and guidelines detailed below.
          </p>
          <h2 className="text-xl font-bold text-[#0F3D3E] pt-4">
            Medical Disclaimer
          </h2>
          <p>
            Content on this website is provided for educational and appointment coordination purposes only. For acute medical emergencies, please immediately visit our Casualty & Emergency Ward at {hospitalConfig.location.fullAddress} or call our 24/7 hotline at {hospitalConfig.contact.emergencyPhone}.
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
