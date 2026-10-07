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
  HeartPulseIcon,
  BoneIcon,
  PediatricsIcon,
  BrainIcon,
  GynecologyIcon,
  MedicineIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import { useScrollAnimation } from "@/components/useScrollAnimation";

function getDepartmentIcon(iconType: string) {
  switch (iconType) {
    case "cardiology":
      return <HeartPulseIcon className="w-5 h-5" />;
    case "orthopedics":
      return <BoneIcon className="w-5 h-5" />;
    case "pediatrics":
      return <PediatricsIcon className="w-5 h-5" />;
    case "neurology":
      return <BrainIcon className="w-5 h-5" />;
    case "gynecology":
      return <GynecologyIcon className="w-5 h-5" />;
    case "general-medicine":
    default:
      return <MedicineIcon className="w-5 h-5" />;
  }
}

export function DepartmentsContent() {
  useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2D2B]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Header Hero */}
        <section className="bg-[#0F3D3E] text-white py-12 lg:py-16 rounded-b-[36px] lg:rounded-b-[48px]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-[#CDEBD8] mb-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/60">Departments</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/20 text-[#CDEBD8] border border-[#CDEBD8]/30 mb-3">
              CENTRES OF EXCELLENCE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Medical Specialities & Clinical Departments
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Comprehensive inpatient and outpatient clinical care powered by renowned medical specialists, advanced diagnostics, and cutting-edge surgical infrastructure.
            </p>
          </div>
        </section>

        {/* Image-Led Department Cards Grid */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {hospitalConfig.departments.map((dept, index) => (
                <Link
                  key={dept.id}
                  href={`/departments/${dept.slug}`}
                  className="group block rounded-3xl bg-[#F7F5EF] border border-[#EBE7DC] p-4 sm:p-5 card-press card-hover-shadow touch-card-observer reveal-on-scroll focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  {/* Large 16:10 Rounded Photo on Top */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#E2EBE5] mb-4">
                    <Image
                      src={`/images/departments/${dept.slug}.jpg`}
                      alt={`LifeCare Hospital Department of ${dept.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover hover-img-zoom touch-img-zoom"
                      loading="lazy"
                    />
                  </div>

                  {/* Icon Chip & Department Details */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#CDEBD8] text-[#0F3D3E] flex items-center justify-center shrink-0 touch-icon-fill transition-colors">
                      {getDepartmentIcon(dept.icon)}
                    </div>
                    <h2 className="text-xl font-extrabold text-[#0F3D3E] group-hover:text-[#2DA870] transition-colors">
                      {dept.name}
                    </h2>
                  </div>

                  {/* One-line Description */}
                  <p className="text-sm text-[#536462] line-clamp-2 leading-relaxed mb-4">
                    {dept.description}
                  </p>

                  {/* "Learn More" Link */}
                  <div className="pt-3 border-t border-[#EBE7DC] flex items-center justify-between text-sm font-bold text-[#0F3D3E]">
                    <span className="text-[#2DA870] group-hover:underline">Learn more</span>
                    <ArrowRightIcon className="w-4 h-4 text-[#2DA870] card-arrow-icon" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA Banner */}
        <CtaBanner />
      </main>

      <Footer />
      <StickyActionBar />
    </div>
  );
}
