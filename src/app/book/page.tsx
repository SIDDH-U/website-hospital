import React, { Suspense } from "react";
import type { Metadata } from "next";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { BookAppointmentForm, BookFormSkeleton } from "./BookForm";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: `Schedule an outpatient consultation or specialist doctor appointment at ${hospitalConfig.name}, ${hospitalConfig.location.city}. ${hospitalConfig.callbackText}.`,
  alternates: {
    canonical: `${getSiteUrl()}/book`,
  },
  openGraph: {
    title: `Book an Appointment | ${hospitalConfig.name}`,
    description: `Book a doctor consultation online at ${hospitalConfig.name}, ${hospitalConfig.location.city}. Fast-track appointments with leading medical specialists.`,
    url: `${getSiteUrl()}/book`,
    siteName: hospitalConfig.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `Book an Appointment at ${hospitalConfig.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function BookPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF]/60 text-[#1F2D2B]">
      <TopStrip />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-12">
        {/* Server-side h1 for SEO & accessibility */}
        <h1 className="sr-only">Book an Appointment | {hospitalConfig.name}</h1>

        {/* Noscript fallback */}
        <noscript>
          <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-[#EBF7F0] border border-[#D8EDE0] text-center text-sm text-[#0F3D3E] font-medium">
            Please call{" "}
            <a
              href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
              className="font-bold underline text-[#0F3D3E]"
            >
              {hospitalConfig.contact.emergencyPhone}
            </a>{" "}
            to book an appointment.
          </div>
        </noscript>

        <Suspense fallback={<BookFormSkeleton />}>
          <BookAppointmentForm />
        </Suspense>
      </main>

      <Footer />
      <StickyActionBar />
    </div>
  );
}
