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
              RESPONSIVE BACKGROUND PHOTO
              Mobile (< 768px): Aspect 16:9 at top with bottom fade mask
              Tablet/Desktop (768px+): Absolute right 45% with left fade mask
              Rendered ONCE with responsive classes
             ======================================================== */}
          <div
            className="relative w-full aspect-[16/9] md:aspect-auto md:absolute md:inset-y-0 md:right-0 md:w-[45%] pointer-events-none overflow-hidden cta-photo-mask"
            aria-hidden="true"
          >
            <div className="relative w-full h-full cta-photo-zoom">
              <Image
                src="/images/cta-banner.webp"
                alt="Compassionate medical team at LifeCare Hospital"
                fill
                sizes="(max-width: 768px) 100vw, (min-width: 1024px) 540px, 450px"
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
              CARD CONTENT
              Staggered words in heading, real spaces, idle shine + pulse ring button
             ======================================================== */}
          <div className="relative z-10 p-6 pt-3 pb-8 sm:p-10 lg:p-14 md:max-w-[55%] flex flex-col items-start justify-center">
            <h2
              aria-label={hospitalConfig.ctaBanner.title}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance"
            >
              <span aria-hidden="true">
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
                    {word}{" "}
                  </span>
                ))}
              </span>
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
