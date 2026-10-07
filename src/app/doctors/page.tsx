"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { hospitalConfig, Doctor } from "@/config/hospital";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { CtaBanner } from "@/components/CtaBanner";
import {
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@/components/Icons";

export default function DoctorsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const departments = [
    { id: "all", name: "All Specialists" },
    ...hospitalConfig.departments.map((d) => ({ id: d.id, name: d.name })),
  ];

  const filteredDoctors =
    activeFilter === "all"
      ? hospitalConfig.doctors
      : hospitalConfig.doctors.filter((d) => d.departmentId === activeFilter);

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
              <span className="text-white/60">Our Doctors</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/20 text-[#CDEBD8] border border-[#CDEBD8]/30 mb-3">
              SENIOR MEDICAL FACULTY
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Find Your Specialist Doctor
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Meet our board-certified surgeons and consultant physicians delivering specialized medical care at LifeCare Hospital in Nanded.
            </p>
          </div>
        </section>

        {/* Filter Chips Bar */}
        <section className="pt-8 sm:pt-10 pb-4 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none">
            {departments.map((dept) => {
              const isActive = activeFilter === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setActiveFilter(dept.id)}
                  className={`min-h-[44px] px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap btn-press transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3] ${
                    isActive
                      ? "bg-[#0F3D3E] text-[#CDEBD8] shadow-md"
                      : "bg-[#F7F5EF] text-[#536462] hover:bg-[#EBE7DC] hover:text-[#0F3D3E] border border-[#EBE7DC]"
                  }`}
                >
                  {dept.name}
                  {dept.id === "all" ? ` (${hospitalConfig.doctors.length})` : ""}
                </button>
              );
            })}
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="py-6 sm:py-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="group flex flex-col justify-between p-4 sm:p-5 rounded-3xl bg-[#F7F5EF] border border-[#EBE7DC] card-press card-hover-shadow"
              >
                <div>
                  {/* Portrait 4:5 Photo */}
                  <Link
                    href={`/doctors/${doc.slug}`}
                    className="block relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#E2EBE5] mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                  >
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top hover-img-zoom"
                      loading="lazy"
                    />
                  </Link>

                  {/* Doctor Info */}
                  <Link href={`/doctors/${doc.slug}`} className="block group">
                    <h2 className="font-extrabold text-lg text-[#0F3D3E] group-hover:text-[#2DA870] transition-colors leading-snug">
                      {doc.name}
                    </h2>
                    <p className="text-xs text-[#536462] font-semibold mt-1">
                      {doc.speciality}
                    </p>
                    <p className="text-xs text-[#2DA870] font-bold mt-0.5">
                      {doc.qualifications}
                    </p>
                  </Link>

                  <div className="mt-3 pt-3 border-t border-[#EBE7DC] space-y-1.5 text-xs text-[#536462]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-[#2DA870] shrink-0" />
                      <span>{doc.experience}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5 text-[#2DA870] shrink-0" />
                      <span className="truncate">{doc.opdTimings}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-4 border-t border-[#EBE7DC] flex items-center gap-2">
                  <Link
                    href={`/book?doctor=${encodeURIComponent(doc.slug)}&dept=${encodeURIComponent(doc.departmentId)}`}
                    className="flex-1 min-h-[44px] py-2 px-3 rounded-full bg-[#0F3D3E] text-white text-xs font-bold btn-press btn-teal flex items-center justify-center gap-1.5 shadow"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-[#CDEBD8]" />
                    <span>Book OPD</span>
                  </Link>
                  <Link
                    href={`/doctors/${doc.slug}`}
                    className="min-h-[44px] px-3.5 py-2 rounded-full bg-white text-[#0F3D3E] text-xs font-bold border border-gray-200 hover:bg-[#F7F5EF] flex items-center justify-center"
                    aria-label={`View profile of ${doc.name}`}
                  >
                    <span>Profile</span>
                  </Link>
                </div>
              </div>
            ))}
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
