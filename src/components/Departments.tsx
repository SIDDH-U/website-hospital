import React from "react";
import Link from "next/link";
import { hospitalConfig, Department } from "@/config/hospital";
import {
  HeartPulseIcon,
  BoneIcon,
  PediatricsIcon,
  BrainIcon,
  GynecologyIcon,
  MedicineIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "./Icons";

export function Departments() {
  const getDepartmentIcon = (iconName: Department["icon"]) => {
    switch (iconName) {
      case "cardiology":
        return <HeartPulseIcon className="w-6 h-6 text-[#2DA870] group-hover:text-[#0F3D3E] transition-colors" />;
      case "orthopedics":
        return <BoneIcon className="w-6 h-6 text-[#2DA870] group-hover:text-[#0F3D3E] transition-colors" />;
      case "pediatrics":
        return <PediatricsIcon className="w-6 h-6 text-[#2DA870] group-hover:text-[#0F3D3E] transition-colors" />;
      case "neurology":
        return <BrainIcon className="w-6 h-6 text-[#2DA870] group-hover:text-[#0F3D3E] transition-colors" />;
      case "gynecology":
        return <GynecologyIcon className="w-6 h-6 text-[#2DA870] group-hover:text-[#0F3D3E] transition-colors" />;
      case "general-medicine":
        return <MedicineIcon className="w-6 h-6 text-[#2DA870] group-hover:text-[#0F3D3E] transition-colors" />;
      default:
        return <HeartPulseIcon className="w-6 h-6 text-[#2DA870]" />;
    }
  };

  return (
    <section
      id="departments"
      aria-labelledby="departments-heading"
      className="py-10 sm:py-16 lg:py-24 bg-[#F7F5EF]/80"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
              OUR DEPARTMENTS
            </span>
            <h2
              id="departments-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2D2B] tracking-tight text-balance"
            >
              Our Departments
            </h2>
          </div>

          <p className="text-xs sm:text-sm lg:text-base text-[#536462] max-w-md leading-relaxed lg:text-right text-balance">
            Comprehensive care across multiple specialities, all under one roof.
          </p>
        </div>

        {/* 6 Departments Grid: 2-Columns on Mobile, 3-Columns on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
          {hospitalConfig.departments.map((dept, idx) => (
            <Link
              key={dept.id}
              href={`/departments/${dept.slug}`}
              prefetch={true}
              className={`reveal-on-scroll stagger-${(idx % 3) + 1} touch-card-observer group bg-white rounded-[20px] sm:rounded-3xl p-4 sm:p-7 border border-gray-100 flex flex-col items-center text-center justify-between card-press card-hover-shadow card-soft-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]`}
            >
              <div className="w-full flex flex-col items-center">
                {/* Circular Icon Container */}
                <div className="touch-icon-fill w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EBF7F0] flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#CDEBD8]">
                  {getDepartmentIcon(dept.icon)}
                </div>

                {/* Department Name */}
                <h3 className="text-sm sm:text-lg font-extrabold text-[#1F2D2B] group-hover:text-[#0F3D3E] transition-colors leading-snug text-balance">
                  {dept.name}
                </h3>

                {/* Short Subtitle (Desktop Only) */}
                <p className="hidden md:block mt-2 text-xs text-[#536462] leading-relaxed line-clamp-2">
                  {dept.description}
                </p>
              </div>

              {/* View link indicator */}
              <div className="mt-3 sm:mt-4 text-[11px] sm:text-xs font-bold text-[#2DA870] flex items-center gap-1 card-arrow-icon group-hover:translate-x-0.5 transition-transform">
                <span className="hidden sm:inline">Learn more</span>
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Departments Button */}
        <div className="reveal-on-scroll mt-8 sm:mt-12 text-center">
          <Link
            href="/departments"
            prefetch={true}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#CDEBD8] hover:bg-[#bfe4cc] text-[#0F3D3E] font-extrabold text-sm btn-press btn-mint shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3] transition-all"
          >
            <span>View All Departments</span>
            <ArrowRightIcon className="w-4 h-4 text-[#0F3D3E]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
