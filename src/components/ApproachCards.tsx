import React from "react";
import Link from "next/link";
import { hospitalConfig } from "@/config/hospital";
import {
  DoctorTeamIcon,
  HeartCareIcon,
  TechGearIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "./Icons";

export function ApproachCards() {
  const getIcon = (id: string) => {
    switch (id) {
      case "expert-doctors":
        return <DoctorTeamIcon className="w-6 h-6 transition-colors" />;
      case "patient-first":
        return <HeartCareIcon className="w-6 h-6 transition-colors" />;
      case "advanced-treatment":
        return <TechGearIcon className="w-6 h-6 transition-colors" />;
      default:
        return <DoctorTeamIcon className="w-6 h-6" />;
    }
  };

  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="py-10 sm:py-14 lg:py-20 bg-[#F7F5EF]/60"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 sm:mb-10 lg:mb-12">
          <div>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
              {hospitalConfig.approach.badge}
            </span>
            <h2
              id="approach-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2D2B] tracking-tight text-balance"
            >
              {hospitalConfig.approach.titleStart}
              <span className="text-[#2DA870]">
                {hospitalConfig.approach.titleHighlight}
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#536462] max-w-lg leading-relaxed lg:text-right text-balance">
            {hospitalConfig.approach.description}
          </p>
        </div>

        {/* 3 Approach Cards: Stacked on Mobile, 3 in a Row on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {hospitalConfig.approach.cards.map((card, index) => {
            const isWhite = card.theme === "white";
            const isMint = card.theme === "mint";
            const isTeal = card.theme === "teal";

            let cardBg = "bg-white text-charcoal border border-gray-100";
            let iconBg = "bg-[#EBF7F0] text-[#2DA870]";
            let titleColor = "text-[#1F2D2B]";
            let descColor = "text-[#536462]";
            let arrowCircle = "bg-[#EBF7F0] text-[#0F3D3E]";

            if (isMint) {
              cardBg = "bg-[#CDEBD8] text-[#0F3D3E] border border-[#BCE1C9]";
              iconBg = "bg-white text-[#0F3D3E]";
              titleColor = "text-[#0F3D3E]";
              descColor = "text-[#0F3D3E]/80";
              arrowCircle = "bg-white text-[#0F3D3E]";
            } else if (isTeal) {
              cardBg = "bg-[#0F3D3E] text-white border border-[#174B4C]";
              iconBg = "bg-[#184E4F] text-[#CDEBD8]";
              titleColor = "text-white";
              descColor = "text-white/80";
              arrowCircle = "bg-[#184E4F] text-[#CDEBD8]";
            }

            return (
              <Link
                key={card.id}
                href={card.href}
                prefetch={true}
                className={`reveal-on-scroll stagger-${index + 1} touch-card-observer group rounded-[22px] sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between card-press card-hover-shadow card-soft-shadow ${cardBg} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]`}
              >
                {/* Header Icon & Mobile Arrow */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`touch-icon-fill w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${iconBg}`}
                  >
                    {getIcon(card.id)}
                  </div>

                  <div
                    className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center shrink-0 self-center card-arrow-icon ${arrowCircle}`}
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex-1">
                  <h3 className={`text-lg sm:text-xl font-extrabold ${titleColor} text-balance`}>
                    {card.title}
                  </h3>
                  <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${descColor}`}>
                    {card.description}
                  </p>
                </div>

                {/* Desktop Arrow Circle */}
                <div className="hidden md:flex justify-end mt-6">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center card-arrow-icon ${arrowCircle}`}
                  >
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
