"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { hospitalConfig } from "@/config/hospital";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { CtaBanner } from "@/components/CtaBanner";
import {
  CheckCircleIcon,
  PhoneIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import { useScrollAnimation } from "@/components/useScrollAnimation";

export default function ServicesPage() {
  useScrollAnimation();

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
              <span className="text-white/60">Services</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/20 text-[#CDEBD8] border border-[#CDEBD8]/30 mb-3">
              ROUND-THE-CLOCK HEALTHCARE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Hospital Services & Facilities
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              From our 24/7 Trauma Emergency and ICU Ambulances to automated diagnostic pathology and pharmacy support, our comprehensive services ensure complete patient care.
            </p>
          </div>
        </section>

        {/* 6 Image-Led Service Cards */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {hospitalConfig.services.map((srv, idx) => (
                <div
                  key={srv.id}
                  className="group flex flex-col justify-between rounded-3xl bg-[#F7F5EF] border border-[#EBE7DC] p-5 sm:p-6 card-press card-hover-shadow touch-card-observer reveal-on-scroll"
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  <div>
                    {/* 16:10 Photo */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#E2EBE5] mb-5">
                      <Image
                        src={srv.image}
                        alt={srv.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover hover-img-zoom touch-img-zoom"
                        loading="lazy"
                      />
                    </div>

                    <h2 className="text-xl font-extrabold text-[#0F3D3E] group-hover:text-[#2DA870] transition-colors leading-snug">
                      {srv.title}
                    </h2>
                    <p className="text-sm text-[#536462] mt-2 leading-relaxed">
                      {srv.shortDesc}
                    </p>

                    {/* Features list */}
                    <ul className="mt-4 pt-4 border-t border-[#EBE7DC] space-y-2">
                      {srv.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1F2D2B]">
                          <CheckCircleIcon className="w-4 h-4 text-[#2DA870] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action */}
                  <div className="mt-6 pt-4 border-t border-[#EBE7DC] flex items-center justify-between">
                    <Link
                      href="/book"
                      className="text-xs sm:text-sm font-bold text-[#0F3D3E] hover:text-[#2DA870] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Inquire Service</span>
                      <ArrowRightIcon className="w-3.5 h-3.5 text-[#2DA870]" />
                    </Link>
                    <a
                      href={`tel:${hospitalConfig.contact.phoneRaw}`}
                      className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-white text-[#0F3D3E] text-xs font-bold border border-gray-200 hover:bg-[#EBF7F0] flex items-center gap-1.5 transition-colors"
                    >
                      <PhoneIcon className="w-3 h-3 text-[#2DA870]" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
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
