"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { hospitalConfig } from "@/config/hospital";
import { CalendarIcon, ArrowRightIcon } from "./Icons";
import { useRipple, useIdleAnimationObserver } from "./useRipple";

interface CtaBannerProps {
  onOpenBooking?: () => void;
}

export function CtaBanner({ onOpenBooking }: CtaBannerProps) {
  const { ripples, createRipple } = useRipple("mint");
  const btnRef = useRef<HTMLAnchorElement | null>(null);
  useIdleAnimationObserver(btnRef);

  const titleWords = hospitalConfig.ctaBanner.title.split(" ");

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white reveal-on-scroll">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[24px] sm:rounded-3xl lg:rounded-[36px] bg-[#0F3D3E] text-white overflow-hidden shadow-xl">
          {/* Drifting soft mint radial glow behind the heading */}
          <div
            className="absolute -top-12 -left-12 w-96 h-96 bg-[#2DA870]/20 rounded-full blur-3xl pointer-events-none cta-glow-drift"
            aria-hidden="true"
          />

          {/* ========================================================
              TABLET & DESKTOP BACKGROUND PHOTO (768px and up)
              Right 45% with horizontal mask fade from the left
             ======================================================== */}
          <div
            className="hidden md:block absolute inset-y-0 right-0 w-[45%] pointer-events-none overflow-hidden"
            aria-hidden="true"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 12%, rgba(0,0,0,0.65) 26%, #000 45%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 12%, rgba(0,0,0,0.65) 26%, #000 45%)",
            }}
          >
            <div className="relative w-full h-full cta-photo-zoom">
              <Image
                src="/images/cta-banner.webp"
                alt="Compassionate medical team at LifeCare Hospital"
                fill
                sizes="(min-width: 1024px) 540px, 450px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAPoAAAD6AG1e1JrAAABA0lEQVQImQH4AAf/ALC4sJOponyZkbq+s8TIwL29r8XAsquuptne3MO+sgDZ2tOrvriJpJums6fQ2NWosZfCu62De3U8MiyblIsA5u3vrcfFhaijw8e95unkcW5jd1hFsox5WUAwXVFIANbl6ZS3tFBtVJ+qn5enm4JpWqp8ZaR2X0YvIEA0LQCfxcqyvrpnemapq52DiITKw8O5qKBmTTyai4VTQjgAvMG/tLe0qq2lsLCjlIyI3tPUtpiJzqGDvpZ4iWZLAMe8sM3PzsbHws7Lw7y0sNbGxdC+vsizqLKWgpKBdQCmm4rJxr7TyLfh0cLavrPXycfFsqm/qp22oZi4qJvVKpfhwWXXkwAAAABJRU5ErkJggg=="
                className="object-cover object-center"
                style={{ filter: "saturate(0.95)" }}
              />
              {/* Teal tint */}
              <div className="absolute inset-0 bg-[#0F3D3E]/20 mix-blend-multiply" />
            </div>
          </div>

          {/* ========================================================
              MOBILE VIEW PHOTO (< 768px)
              Sits at the top of the card and bleeds to card edges (16:9),
              with mask-image fading bottom 40% into the card's teal
             ======================================================== */}
          <div
            className="md:hidden relative w-full aspect-[16/9] overflow-hidden"
            aria-hidden="true"
            style={{
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 60%, rgba(0,0,0,0.75) 72%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.12) 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 60%, rgba(0,0,0,0.75) 72%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.12) 94%, transparent 100%)",
            }}
          >
            <div className="relative w-full h-full cta-photo-zoom">
              <Image
                src="/images/cta-banner.webp"
                alt="Compassionate patient care at LifeCare Hospital"
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAPoAAAD6AG1e1JrAAABA0lEQVQImQH4AAf/ALC4sJOponyZkbq+s8TIwL29r8XAsquuptne3MO+sgDZ2tOrvriJpJums6fQ2NWosZfCu62De3U8MiyblIsA5u3vrcfFhaijw8e95unkcW5jd1hFsox5WUAwXVFIANbl6ZS3tFBtVJ+qn5enm4JpWqp8ZaR2X0YvIEA0LQCfxcqyvrpnemapq52DiITKw8O5qKBmTTyai4VTQjgAvMG/tLe0qq2lsLCjlIyI3tPUtpiJzqGDvpZ4iWZLAMe8sM3PzsbHws7Lw7y0sNbGxdC+vsizqLKWgpKBdQCmm4rJxr7TyLfh0cLavrPXycfFsqm/qp22oZi4qJvVKpfhwWXXkwAAAABJRU5ErkJggg=="
                className="object-cover object-center"
                style={{ filter: "saturate(0.95)" }}
              />
              <div className="absolute inset-0 bg-[#0F3D3E]/20 mix-blend-multiply" />
            </div>
          </div>

          {/* ========================================================
              CARD CONTENT
              Staggered words in heading, clear text, idle shine + pulse ring button
             ======================================================== */}
          <div className="relative z-10 p-6 pt-3 pb-8 sm:p-10 lg:p-14 md:max-w-[55%] flex flex-col items-start justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
              {titleWords.map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block"
                  style={{
                    opacity: 0,
                    animation: "heroFadeUp14 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    animationDelay: `${150 + idx * 55}ms`,
                    marginRight: "0.28em",
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
              {hospitalConfig.ctaBanner.subtext}
            </p>

            <Link
              ref={btnRef}
              href="/book"
              onClick={onOpenBooking}
              onPointerDown={createRipple}
              style={{ "--shine-delay": "0.9s" } as React.CSSProperties}
              className="btn-ripple-container btn-idle-shine cta-btn-pulse mt-6 w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-full bg-[#CDEBD8] hover:bg-[#B2E0C2] text-[#0F3D3E] font-extrabold text-base btn-press btn-mint flex items-center justify-center gap-2.5 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8FBFA3] transition-all"
            >
              <CalendarIcon className="w-5 h-5 text-[#0F3D3E] shrink-0" />
              <span>{hospitalConfig.ctaBanner.buttonText}</span>
              <ArrowRightIcon className="w-4 h-4 text-[#0F3D3E] shrink-0 hidden sm:inline" />

              {/* Touch ripples */}
              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="btn-ripple-circle"
                  style={{
                    left: r.x,
                    top: r.y,
                    width: r.size,
                    height: r.size,
                    backgroundColor: r.color,
                  }}
                />
              ))}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
