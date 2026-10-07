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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Photos & Stats Column: Renders after text on mobile (order-2), left column on desktop (order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-6 grid grid-cols-2 gap-3.5 sm:gap-4">
            {/* Primary Consultation Photo (Rendered ONCE for both mobile and desktop) */}
            <div
              className={`col-span-2 relative rounded-[22px] lg:rounded-3xl overflow-hidden border border-gray-100 shadow-md lg:shadow-lg group ${
                inView ? "photo-wipe-reveal" : "about-photo-wipe"
              }`}
            >
              <Image
                src="/images/about-consulting.webp"
                alt="Experienced medical doctors consulting at LifeCare Hospital Nanded"
                width={650}
                height={420}
                sizes="(max-width: 1024px) 100vw, 650px"
                placeholder="blur"
                blurDataURL={ABOUT_CONSULTING_BLUR}
                loading="lazy"
                className="w-full h-auto lg:h-[260px] object-cover transition-transform duration-500 lg:group-hover:scale-105"
              />
            </div>

            {/* Stat 1: 25+ Years of Care (Rendered ONCE with server-rendered final value) */}
            <div
              className={`stat-pop-1 ${
                inView ? "is-popped" : ""
              } p-4 sm:p-5 lg:p-6 rounded-2xl lg:rounded-3xl bg-[#EBF7F0] border border-[#D8EDE0] flex flex-col justify-center items-center lg:items-start text-center lg:text-left`}
            >
              <div className="flex items-center gap-1.5 lg:gap-2">
                <span className="text-2xl lg:text-4xl font-extrabold text-[#0F3D3E]">
                  <span aria-label="25+ Years of Care">
                    <span aria-hidden="true">{yearsCount}+</span>
                    <span className="sr-only">25+</span>
                  </span>
                </span>
                <span className={`inline-flex items-center text-[#2DA870] ${inView ? "leaf-sway" : ""}`}>
                  <LeafIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                </span>
              </div>
              <span className="text-xs lg:text-sm font-bold text-[#0F3D3E] mt-1 lg:mt-2">
                Years of Care
              </span>
              <p className="hidden lg:block text-xs text-[#536462] mt-1">
                Serving families across Marathwada with trust since 2001.
              </p>
            </div>

            {/* Mobile Stat 2: 4.9/5 Patient Rating (hidden on lg, desktop uses the dedicated card in right column) */}
            <div
              className={`lg:hidden stat-pop-2 ${
                inView ? "is-popped" : ""
              } p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col items-center text-center justify-center`}
            >
              <div className="flex items-center gap-1.5">
                <StarIcon className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" />
                <span className="text-2xl font-extrabold text-[#0F3D3E]">
                  <span aria-label="4.9 out of 5 Patient Rating">
                    <span aria-hidden="true">{ratingCount.toFixed(1)}</span>
                    <span className="sr-only">4.9</span>
                  </span>
                </span>
                <span className="text-xs text-gray-400">/{hospitalConfig.about.ratingMax}</span>
              </div>
              <span className="text-xs font-semibold text-[#536462] mt-1">
                Patient Rating
              </span>
            </div>

            {/* Desktop Secondary Photo (hidden on mobile to preserve lightweight mobile payload) */}
            <div
              className={`hidden lg:block stat-pop-2 ${
                inView ? "is-popped" : ""
              } relative rounded-3xl overflow-hidden shadow-md border border-gray-100 group`}
            >
              <Image
                src="/images/about-patient-care.webp"
                alt="Compassionate patient care by LifeCare nurse"
                width={350}
                height={240}
                sizes="(min-width: 1024px) 350px, 0vw"
                placeholder="blur"
                blurDataURL={ABOUT_PATIENT_CARE_BLUR}
                loading="lazy"
                className="w-full h-full min-h-[170px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Text & Actions Column: Order 1 on mobile, Order 2 on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-start space-y-4 lg:space-y-6">
            <div className="reveal-on-scroll">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
                {hospitalConfig.about.badge}
              </span>
              <h2
                id="about-heading"
                className="font-extrabold text-[#1F2D2B] tracking-tight text-balance text-[clamp(1.5rem,6.5vw,1.75rem)] lg:text-3xl xl:text-4xl leading-[1.2] lg:leading-tight"
              >
                {hospitalConfig.about.titleStart}
                <span className="text-[#2DA870]">
                  {hospitalConfig.about.titleHighlight}
                </span>
              </h2>
              <p className="mt-3 lg:mt-4 text-[15px] max-[360px]:text-[14.5px] lg:text-base leading-[1.6] text-[#536462] text-balance">
                {hospitalConfig.about.paragraph}
              </p>
            </div>

            {/* Actions Row: Button + Medical Director Card */}
            <div className="reveal-on-scroll w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <Link
                href="/about"
                prefetch={true}
                className="w-full lg:w-auto min-h-[48px] py-3.5 lg:py-3 px-6 lg:px-7 rounded-full bg-[#0F3D3E] lg:bg-[#CDEBD8] lg:hover:bg-[#bfe4cc] text-white lg:text-[#0F3D3E] font-bold lg:font-extrabold text-sm btn-press btn-teal lg:btn-mint flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3] transition-all"
              >
                <span>{hospitalConfig.about.buttonText}</span>
                <ArrowRightIcon className="w-4 h-4 text-[#CDEBD8] lg:text-[#0F3D3E]" />
              </Link>

              {/* Medical Director Card Linking to Doctor Profile (Desktop only) */}
              <Link
                href="/doctors/dr-rajesh-sharma"
                prefetch={true}
                className="hidden lg:flex card-press items-center gap-3 p-2 pr-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-[#8FBFA3] transition-colors"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#CDEBD8] shrink-0">
                  <Image
                    src={hospitalConfig.about.medicalDirector.image}
                    alt={hospitalConfig.about.medicalDirector.name}
                    width={48}
                    height={48}
                    sizes="48px"
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

            {/* Desktop Bottom Cards: Patient Rating & Specialties */}
            <div className="hidden lg:grid reveal-on-scroll w-full grid-cols-2 gap-4 pt-2">
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
