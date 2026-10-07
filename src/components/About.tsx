"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { hospitalConfig } from "@/config/hospital";
import { StarIcon, ArrowRightIcon, StethoscopeIcon, LeafIcon } from "./Icons";
import { useCountUp } from "./useScrollAnimation";

const ABOUT_CONSULTING_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAA5ElEQVQImQHZACb/AMiihrqlj6aklZ6npLK4tNPZ2e3w7enq4/b29Nzi3gDLnHzFqoy6sp55Y1GainmptKyMjIrGy8vu8fDX39oAxJd0sKmevLu0gYKIpqWeq7WvlW9alY+Kyce4vMG9AL2KZ72llNXb4qq5y7jEzZufoo14bMjFyKmvspGamwCTYUC6sqvb4OjW1dqhmJlwb2uLiIvM0NXa4OKiqakAUTEYk46Ar7G1vcLJiI+cbGpofnBp2N7l197guL27AE0wHJSOgMHDxM7V3nh7g5qZnGVvetzk6tfb3LS5tbTdi953WisYAAAAAElFTkSuQmCC";

const ABOUT_PATIENT_CARE_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAA5ElEQVQImQHZACb/AL/Auc7Lw5OXkaafkeng0e3l08zBrrSrnuPe0uDd1QC6vbmwraCmo5miknjp4NHn4ta7qZprVEj9/PP8+/IAzsvBwsG4pKCblH1j59rM4N3VjpmlM01wqcLV+PbmALW6try/vKGjpX9cSLSsmsnAs4KPnTRTeJKkt9fTzgBxcm2rrKd/jpl4iZqnq6yyloKFd3A6T2htj6+nr7YAU1ZTpKWgdX+HVVBPdnJxkZ6je46aaX2PjpWVlJOLAElIP3NyaaGkoWx4doiFeWx9hXGCiomYnqqvra+1tSO8gzCUCqvMAAAAAElFTkSuQmCC";

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const yearsCount = useCountUp(25, inView, 1200);
  const ratingCount = useCountUp(4.9, inView, 1200, 1);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="py-10 sm:py-16 lg:py-24 bg-white overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            MOBILE & TABLET VIEW (< 1024px)
            Matches Section D specifications exactly
           ======================================================== */}
        <div className="lg:hidden flex flex-col space-y-6">
          {/* Heading and Paragraph Fade up first */}
          <div className="reveal-on-scroll">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
              {hospitalConfig.about.badge}
            </span>
            <h2
              id="about-heading"
              className="font-extrabold text-[#1F2D2B] tracking-tight text-balance text-[clamp(1.5rem,6.5vw,1.75rem)] leading-[1.2]"
            >
              {hospitalConfig.about.titleStart}
              <span className="text-[#2DA870]">
                {hospitalConfig.about.titleHighlight}
              </span>
            </h2>
            {/* Exactly 15px (14.5px below 360px), line-height 1.6, max 3 lines at 390px */}
            <p className="mt-3 text-[15px] max-[360px]:text-[14.5px] leading-[1.6] text-[#536462] line-clamp-3 text-balance">
              At LifeCare Hospital, we combine clinical expertise with a human touch to deliver safe, effective and personalised care for every patient.
            </p>
          </div>

          {/* Consultation Photo with bottom-to-top clip-path wipe & scale */}
          <div
            className={`relative rounded-[22px] overflow-hidden border border-gray-100 shadow-md ${
              inView ? "photo-wipe-reveal" : "about-photo-wipe"
            }`}
          >
            <Image
              src="/images/about-consulting.webp"
              alt="Experienced medical doctors consulting at LifeCare Hospital Nanded"
              width={700}
              height={500}
              placeholder="blur"
              blurDataURL={ABOUT_CONSULTING_BLUR}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Two Stat Chips: pop up 120ms apart with leaf sway & count up */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* 25+ Years of Care (stat-pop-1) */}
            <div
              className={`stat-pop-1 ${
                inView ? "is-popped" : ""
              } p-4 rounded-2xl bg-[#EBF7F0] border border-[#D8EDE0] flex flex-col items-center text-center justify-center`}
            >
              <div className="flex items-center gap-1.5 text-2xl font-extrabold text-[#0F3D3E]">
                <span>{yearsCount}+</span>
                <span className="inline-flex items-center leaf-sway">
                  <LeafIcon className="w-5 h-5 text-[#2DA870]" />
                </span>
              </div>
              <span className="text-xs font-bold text-[#2DA870] mt-1">
                Years of Care
              </span>
            </div>

            {/* 4.9/5 Patient Rating (stat-pop-2, 120ms later) */}
            <div
              className={`stat-pop-2 ${
                inView ? "is-popped" : ""
              } p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col items-center text-center justify-center`}
            >
              <div className="flex items-center gap-1.5">
                <StarIcon className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" />
                <span className="text-2xl font-extrabold text-[#0F3D3E]">
                  {ratingCount.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">/{hospitalConfig.about.ratingMax}</span>
              </div>
              <span className="text-xs font-semibold text-[#536462] mt-1">
                Patient Rating
              </span>
            </div>
          </div>

          {/* More About Us Button (Secondary: no idle animation to keep page calm) */}
          <div className="pt-2">
            <Link
              href="/about"
              prefetch={true}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-[#0F3D3E] text-white font-bold text-sm btn-press btn-teal flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
            >
              <span>{hospitalConfig.about.buttonText}</span>
              <ArrowRightIcon className="w-4 h-4 text-[#CDEBD8]" />
            </Link>
          </div>
        </div>

        {/* ========================================================
            DESKTOP VIEW (1024px+)
           ======================================================== */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
          {/* Left Column: Photo & Stat Grid */}
          <div className="col-span-6 grid grid-cols-2 gap-4">
            <div
              className={`col-span-2 relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 group ${
                inView ? "photo-wipe-reveal" : "opacity-0"
              }`}
            >
              <Image
                src="/images/about-consulting.webp"
                alt="Doctors reviewing clinical records at LifeCare Hospital"
                width={650}
                height={420}
                placeholder="blur"
                blurDataURL={ABOUT_CONSULTING_BLUR}
                loading="lazy"
                className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div
              className={`stat-pop-1 ${
                inView ? "is-popped" : ""
              } p-6 rounded-3xl bg-[#EBF7F0] border border-[#D8EDE0] flex flex-col justify-center items-start`}
            >
              <div className="flex items-center gap-2">
                <span className="text-4xl font-extrabold text-[#0F3D3E]">
                  {yearsCount}+
                </span>
                <span className={`text-2xl ${inView ? "leaf-sway" : ""}`}>🌿</span>
              </div>
              <span className="text-sm font-bold text-[#0F3D3E]/90 mt-2">
                Years of Care
              </span>
              <p className="text-xs text-[#536462] mt-1">
                Serving families across Marathwada with trust since 2001.
              </p>
            </div>

            <div
              className={`stat-pop-2 ${
                inView ? "is-popped" : ""
              } relative rounded-3xl overflow-hidden shadow-md border border-gray-100 group`}
            >
              <Image
                src="/images/about-patient-care.webp"
                alt="Compassionate patient care by LifeCare nurse"
                width={350}
                height={240}
                placeholder="blur"
                blurDataURL={ABOUT_PATIENT_CARE_BLUR}
                loading="lazy"
                className="w-full h-full min-h-[170px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Copy, Button, Medical Director & Cards */}
          <div className="col-span-6 flex flex-col items-start space-y-6">
            <div className="reveal-on-scroll">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
                {hospitalConfig.about.badge}
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1F2D2B] tracking-tight leading-tight text-balance">
                {hospitalConfig.about.titleStart}
                <span className="text-[#2DA870]">
                  {hospitalConfig.about.titleHighlight}
                </span>
              </h2>
              <p className="mt-4 text-base text-[#536462] leading-relaxed text-balance">
                At LifeCare Hospital, we combine clinical expertise with a human touch to deliver safe, effective and personalised care for every patient.
              </p>
            </div>

            {/* More About Us Pill Button & Medical Director Row */}
            <div className="reveal-on-scroll w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <Link
                href="/about"
                prefetch={true}
                className="min-h-[48px] px-7 py-3 rounded-full bg-[#CDEBD8] hover:bg-[#bfe4cc] text-[#0F3D3E] font-extrabold text-sm btn-press btn-mint flex items-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3] transition-all"
              >
                <span>{hospitalConfig.about.buttonText}</span>
                <ArrowRightIcon className="w-4 h-4 text-[#0F3D3E]" />
              </Link>

              {/* Medical Director Card Linking to Doctor Profile */}
              <Link
                href="/doctors/dr-rajesh-sharma"
                prefetch={true}
                className="card-press flex items-center gap-3 p-2 pr-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-[#8FBFA3] transition-colors"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#CDEBD8] shrink-0">
                  <Image
                    src={hospitalConfig.about.medicalDirector.image}
                    alt={hospitalConfig.about.medicalDirector.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F3D3E] leading-tight">
                    {hospitalConfig.about.medicalDirector.name}
                  </h4>
                  <p className="text-xs text-[#536462] mt-0.5">
                    {hospitalConfig.about.medicalDirector.role}
                  </p>
                  <div className="w-8 h-0.5 bg-[#CDEBD8] mt-1 rounded-full" />
                </div>
              </Link>
            </div>

            {/* Desktop Two Cards: Patient Rating & Our Specialities */}
            <div className="reveal-on-scroll w-full grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#E9E5D9] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F2D2B]">
                    <StarIcon className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                    <span>Patient Rating</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-[#0F3D3E]">
                      {ratingCount.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">/{hospitalConfig.about.ratingMax}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#FBBF24] mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-3.5 h-3.5 fill-[#FBBF24]" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[#536462] mt-2 font-medium">
                  Based on {hospitalConfig.about.ratingCount} from our patients.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F2D2B]">
                  <StethoscopeIcon className="w-4 h-4 text-[#2DA870]" />
                  <span>Our Specialities</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hospitalConfig.about.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EBF7F0] text-[#0F3D3E]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
