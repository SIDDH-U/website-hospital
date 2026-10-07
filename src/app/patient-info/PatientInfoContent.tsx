"use client";

import React, { useState } from "react";
import Link from "next/link";
import { hospitalConfig } from "@/config/hospital";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { CtaBanner } from "@/components/CtaBanner";
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@/components/Icons";

const faqs = [
  {
    q: "How early should I arrive before my scheduled OPD consultation?",
    a: "We recommend arriving 15 to 20 minutes prior to your appointment time to complete registration and initial vital signs checks at the nursing station.",
  },
  {
    q: "Do you accept cashless health insurance policies?",
    a: "Yes. LifeCare Hospital is empaneled with leading public and private TPAs including Star Health, ICICI Lombard, HDFC ERGO, Care Insurance, and national insurance schemes.",
  },
  {
    q: "Is emergency casualty admission open 24/7?",
    a: "Yes, our Emergency and Trauma Centre is operational 24 hours a day, 365 days a year with on-duty emergency physicians and round-the-clock lab/pharmacy access.",
  },
  {
    q: "Can I get my diagnostic reports online or via WhatsApp?",
    a: "Yes. Once processed by our pathology or radiology lab, digital PDF reports are automatically sent to your registered mobile number via SMS and WhatsApp.",
  },
];

export function PatientInfoContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2D2B]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Header Hero */}
        <section className="bg-[#0F3D3E] text-white py-12 lg:py-16 rounded-b-[36px] lg:rounded-b-[48px]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-[#CDEBD8] mb-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/60">Patient Info</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/20 text-[#CDEBD8] border border-[#CDEBD8]/30 mb-3">
              HELPFUL GUIDE FOR VISITORS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Patient Information & Hospital Guide
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about booking appointments, admission documents, visiting schedules, and insurance coverage.
            </p>
          </div>
        </section>

        {/* 1. How to Book & Documents to Bring */}
        <section className="py-12 sm:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* How to Book */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F5EF] border border-[#EBE7DC]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
                STEP-BY-STEP
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F3D3E] mb-6">
                How to Book an Appointment
              </h2>

              <ol className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Select Department or Doctor",
                    desc: "Explore our specialties or select your preferred consultant physician.",
                  },
                  {
                    step: "2",
                    title: "Submit Online Request or Call",
                    desc: (
                      <span>
                        Use our simple booking form or call our front desk helpline at{" "}
                        <a
                          href={`tel:${hospitalConfig.contact.tel}`}
                          className="text-[#0F3D3E] font-bold underline hover:text-[#2DA870]"
                        >
                          {hospitalConfig.contact.display}
                        </a>.
                      </span>
                    ),
                  },
                  {
                    step: "3",
                    title: "Confirm Your Time Slot",
                    desc: "Our receptionist will verify availability and send an SMS confirmation.",
                  },
                  {
                    step: "4",
                    title: "Visit OPD Reception",
                    desc: "Check in 15 minutes before your slot for registration and vitals screening.",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-xl bg-[#0F3D3E] text-[#CDEBD8] font-black text-sm flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-[#0F3D3E]">{item.title}</h3>
                      <p className="text-xs text-[#536462] mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 pt-4 border-t border-[#EBE7DC]">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0F3D3E] text-white text-xs font-bold btn-press btn-teal shadow"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#CDEBD8]" />
                  <span>Book Appointment Now</span>
                </Link>
              </div>
            </div>

            {/* Documents to Bring */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#EBF7F0] border border-[#D8EDE0]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
                CHECKLIST
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F3D3E] mb-6">
                Documents to Bring With You
              </h2>

              <ul className="space-y-4">
                {[
                  {
                    title: "Government Photo ID",
                    desc: "Aadhaar Card, PAN Card, Voter ID, or Driving License for registration.",
                  },
                  {
                    title: "Past Medical Records",
                    desc: "Previous diagnosis files, discharge summaries, X-rays, MRI, or lab reports.",
                  },
                  {
                    title: "Current Medication List",
                    desc: "Names and dosages of regular medications you are currently taking.",
                  },
                  {
                    title: "Health Insurance Card",
                    desc: "TPA membership card, policy document, or employer cashless approval letter.",
                  },
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <CheckCircleIcon className="w-5 h-5 text-[#2DA870] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-[#0F3D3E]">{doc.title}</h3>
                      <p className="text-xs text-[#536462] mt-0.5">{doc.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Visiting Hours & Insurance Billing */}
        <section className="py-12 bg-[#F7F5EF]/60">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Visiting Hours */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBE7DC] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F3D3E] text-[#CDEBD8] flex items-center justify-center">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0F3D3E]">
                      Visiting Hours & Rules
                    </h2>
                    <p className="text-xs text-[#536462]">
                      Designed to safeguard patient rest and prevent infection
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-5">
                  <div className="p-3.5 rounded-xl bg-[#F7F5EF] flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-[#0F3D3E]">General & Private Wards</span>
                    <span className="text-[#536462] font-semibold">04:00 PM – 07:00 PM</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F7F5EF] flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-[#0F3D3E]">ICU & Critical Care</span>
                    <span className="text-[#536462] font-semibold">11:00 AM – 12:00 PM · 05:00 PM – 06:00 PM</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#EBF7F0] text-xs text-[#1F2D2B] font-medium">
                    Note: Maximum 1 attendant badge permitted at bedside to ensure quiet healing environment. Children under 12 are not permitted in ICU wards.
                  </div>
                </div>
              </div>

              {/* Insurance & Cashless Desk */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBE7DC] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#CDEBD8] text-[#0F3D3E] flex items-center justify-center font-bold">
                    ₹
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0F3D3E]">
                      Insurance & Cashless Desk
                    </h2>
                    <p className="text-xs text-[#536462]">
                      Hassle-free pre-authorization & claims processing
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#536462] leading-relaxed mt-4">
                  Our dedicated TPA Insurance desk assists with instantaneous pre-authorization for planned procedures as well as emergency hospitalizations.
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[#0F3D3E]">
                  {["Star Health", "ICICI Lombard", "HDFC ERGO", "Care Health", "Bajaj Allianz", "New India"].map(
                    (tpa) => (
                      <span key={tpa} className="px-3 py-1 rounded-lg bg-[#F7F5EF] border border-[#EBE7DC]">
                        {tpa}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Frequently Asked Questions */}
        <section className="py-12 sm:py-16 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
              FREQUENTLY ASKED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F3D3E]">
              Patient & Visitor FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#EBE7DC] overflow-hidden bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#0F3D3E] flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-[#2DA870] font-mono shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#536462] leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing CTA */}
        <CtaBanner />
      </main>

      <Footer />
      <StickyActionBar />
    </div>
  );
}
