import React from "react";
import Link from "next/link";
import Image from "next/image";
import { hospitalConfig } from "@/config/hospital";
import { ArrowRightIcon } from "./Icons";

export function DoctorsMarquee() {
  const doctors = hospitalConfig.doctors;
  // Duplicate doctors for seamless infinite marquee loop
  const marqueeDoctors = [...doctors, ...doctors];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden reveal-on-scroll">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/50 text-[#0F3D3E] border border-[#8FBFA3]/30 mb-3">
          MEET OUR DOCTORS
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F3D3E] tracking-tight text-balance">
          Experienced Specialists Dedicated to Your Health
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-[#536462] max-w-2xl mx-auto">
          Our senior medical consultants bring decades of clinical excellence and compassionate patient care.
        </p>
      </div>

      {/* Marquee Row with Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden doctors-marquee-container py-3">
        {/* Left Fade Mask */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
          aria-hidden="true"
        />
        {/* Right Fade Mask */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Continuous Scrolling Track */}
        <div
          className="doctors-marquee-track flex gap-4 sm:gap-6 px-4"
          style={{ "--doctors-scroll-duration": "32s" } as React.CSSProperties}
        >
          {marqueeDoctors.map((doc, idx) => (
            <Link
              key={`${doc.id}-${idx}`}
              href={`/doctors/${doc.slug}`}
              className="doctors-marquee-card group block w-[210px] sm:w-[240px] shrink-0 p-3 sm:p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#EBE7DC] card-press card-hover-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
            >
              {/* Portrait Photo 4:5 */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#E2EBE5] mb-3">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  sizes="(max-width: 640px) 210px, 240px"
                  className="object-cover object-top hover-img-zoom"
                  loading="lazy"
                />
              </div>

              {/* Doctor Details */}
              <div className="text-left">
                <h3 className="font-extrabold text-sm sm:text-base text-[#0F3D3E] truncate group-hover:text-[#2DA870] transition-colors">
                  {doc.name}
                </h3>
                <p className="text-xs text-[#536462] truncate mt-0.5">
                  {doc.speciality}
                </p>
                <div className="mt-2 pt-2 border-t border-[#EBE7DC] flex items-center justify-between text-[11px] font-semibold text-[#0F3D3E]">
                  <span className="truncate text-[#536462]">{doc.experience}</span>
                  <span className="text-[#2DA870] ml-1 shrink-0 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* "View All Doctors" Pill Button */}
      <div className="mt-8 sm:mt-10 text-center">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F3D3E] text-white font-bold text-sm btn-press btn-teal shadow-md hover:bg-[#175354] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
        >
          <span>View All Doctors ({doctors.length})</span>
          <ArrowRightIcon className="w-4 h-4 text-[#CDEBD8]" />
        </Link>
      </div>
    </section>
  );
}
