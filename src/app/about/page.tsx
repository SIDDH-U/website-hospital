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
  CalendarIcon,
  ArrowRightIcon,
  StethoscopeIcon,
} from "@/components/Icons";
import { useScrollAnimation } from "@/components/useScrollAnimation";

export default function AboutPage() {
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
              <span className="text-white/60">About Us</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/20 text-[#CDEBD8] border border-[#CDEBD8]/30 mb-3">
              ABOUT LIFECARE HOSPITAL
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Healing Begins The Moment You Walk In
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Serving Nanded and the Marathwada region with advanced clinical infrastructure, trusted specialists, and compassionate, patient-first care.
            </p>
          </div>
        </section>

        {/* Story and Mission Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block">
                  OUR STORY & MISSION
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F3D3E] tracking-tight text-balance">
                  More Than Two Decades of Dedicated Healthcare
                </h2>
                <p className="text-base text-[#536462] leading-relaxed">
                  Founded with the vision to deliver metropolitan-grade healthcare to Nanded, LifeCare Hospital has grown into a trusted multi-speciality medical institution. Over the past 25 years, we have treated more than 10,000 families with clinical precision and humane understanding.
                </p>
                <p className="text-base text-[#536462] leading-relaxed">
                  Our mission is to provide affordable, transparent, and ethically grounded medical treatment across Cardiology, Orthopedics, Pediatrics, Neurology, Gynecology, and Internal Medicine.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#EBE7DC] flex-1 min-w-[200px]">
                    <span className="block text-2xl font-black text-[#0F3D3E]">25+</span>
                    <span className="text-xs text-[#536462] font-semibold">Years of Healthcare Excellence</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#EBE7DC] flex-1 min-w-[200px]">
                    <span className="block text-2xl font-black text-[#0F3D3E]">10K+</span>
                    <span className="text-xs text-[#536462] font-semibold">Treated & Healthy Patients</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#EBE7DC] flex-1 min-w-[200px]">
                    <span className="block text-2xl font-black text-[#0F3D3E]">24/7</span>
                    <span className="text-xs text-[#536462] font-semibold">Emergency & Critical Trauma Care</span>
                  </div>
                </div>
              </div>

              {/* Story Feature Image */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#E2EBE5] shadow-xl border border-gray-100">
                  <Image
                    src="/images/gallery/gallery-1.jpg"
                    alt="LifeCare Hospital Clinical Team"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section (id="our-approach") */}
        <section id="our-approach" className="py-12 sm:py-16 bg-[#F7F5EF]/70 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8] text-[#0F3D3E] border border-[#8FBFA3]/30 mb-3">
                OUR APPROACH
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F3D3E] tracking-tight text-balance">
                Care That Puts You First
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#536462]">
                Every clinical protocol and patient interaction is designed around 3 non-negotiable core pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {hospitalConfig.approach.cards.map((card, idx) => (
                <div
                  key={card.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBE7DC] shadow-sm card-press flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#CDEBD8] text-[#0F3D3E] flex items-center justify-center font-bold text-lg mb-5">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-extrabold text-[#0F3D3E] mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#536462] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      href={card.href}
                      className="text-xs font-bold text-[#2DA870] hover:underline flex items-center gap-1"
                    >
                      <span>Explore this pillar</span>
                      <ArrowRightIcon className="w-3.5 h-3.5 text-[#2DA870]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Medical Director Message */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0F3D3E] text-white">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 lg:col-span-3">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#144748] shadow-lg border-2 border-white/20">
                    <Image
                      src={hospitalConfig.about.medicalDirector.image}
                      alt={hospitalConfig.about.medicalDirector.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="md:col-span-8 lg:col-span-9 space-y-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#CDEBD8] block">
                    LEADERSHIP PERSPECTIVE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-balance">
                    Message from the Medical Director
                  </h2>
                  <blockquote className="text-base sm:text-lg text-white/90 italic leading-relaxed">
                    &ldquo;Medicine is not merely about tests and prescriptions; it is fundamentally about listening to people, understanding their fears, and walking with them on their road to recovery. At LifeCare Hospital, our doctors treat every patient like family.&rdquo;
                  </blockquote>
                  <div className="pt-2">
                    <p className="font-extrabold text-lg text-[#CDEBD8]">
                      {hospitalConfig.about.medicalDirector.name}
                    </p>
                    <p className="text-xs text-white/70">
                      {hospitalConfig.about.medicalDirector.role} · Senior Interventional Cardiologist
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery (3-4 images) */}
        <section className="py-12 sm:py-16 bg-[#F7F5EF]/60">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
                CAMPUS & FACILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F3D3E]">
                Inside LifeCare Hospital
              </h2>
              <p className="text-sm text-[#536462] mt-1">
                A look at our hygienic wards, consultation chambers, and critical care units.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { src: "/images/gallery/gallery-1.jpg", caption: "Outpatient Consulting Wing" },
                { src: "/images/gallery/gallery-2.jpg", caption: "Advanced Diagnostic Suites" },
                { src: "/images/gallery/gallery-3.jpg", caption: "Private Inpatient Rooms" },
                { src: "/images/gallery/gallery-4.jpg", caption: "24/7 Critical Emergency Bay" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E2EBE5] border border-[#EBE7DC] shadow-sm"
                >
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3.5">
                    <span className="text-xs font-bold text-white">{item.caption}</span>
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
