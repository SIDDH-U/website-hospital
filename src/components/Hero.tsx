"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { hospitalConfig } from "@/config/hospital";
import { StarIcon, CalendarIcon, PhoneIcon, ArrowRightIcon } from "./Icons";
import { useRipple, useIdleAnimationObserver } from "./useRipple";

interface HeroProps {
  onOpenBooking?: () => void;
}

const HERO_MOBILE_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAIAAAAGpYjXAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAA/klEQVQImSXJ30rCUACA8fMAvVB3vYC3QeBVj5DXZkEUYUOCIpASMRG9mDikZohGiVvsbHM7/3WzdEet423QdYjwu/n4gMuFS7nLhSfGPhM+26SDCUBxAtl4s7mAjG85RID3EXF4bCP6gdmWhekgoMCPvizMm2a3/FgJOB8GoRWigT8CWK7IfHl9ln0qHDPBi4XLPvSmSoFc+ar+1ms9d5u1Ss00WudHVdN4RS640XU2/xGf33oHti0vn8+m7xudoQ1KejsksVysZaKmmKW04t5+Onf7AGyRuGy2UL9USDSRd9pF5iD10u8BOElQtKKRWq7/TqvGzmFm90Sj0ewfIAm0DoM3+yIAAAAASUVORK5CYII=";

const HERO_DESKTOP_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAxUlEQVQImQG6AEX/AODp7b7Q07HCwaOvrbG4trW4s4yAdqKsp6u4sY6jnADS39bP397F1di1wMHJzsi1tKufemuqubGJe3CkubYAhp6IlrGkrMXGjaOZlqaluMPIqq+5o7i1rZB8iqmgALTEwZSspqS+w5ahpLG4uOLn8czV4trc4laOlEaCiwC7yM2xwsjC1Nm7xMPS1dLW3OPY1drk5eumqKpbVlMAxtHWxtbax9TYwcjIxsjFytLb2uLtuMjVIV9saoqK2ZV+0sRmXvcAAAAASUVORK5CYII=";

export function Hero({ onOpenBooking }: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const bookBtnRef = useRef<HTMLAnchorElement | null>(null);
  const callBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Ripple handlers for primary and call button
  const { ripples: bookRipples, createRipple: createBookRipple } = useRipple("mint");
  const { ripples: callRipples, createRipple: createCallRipple } = useRipple("teal");

  // Idle animation viewport observer (max 2 on screen)
  useIdleAnimationObserver(bookBtnRef);
  useIdleAnimationObserver(callBtnRef);

  // Track if hero is in viewport / tab is visible to pause animations
  const [isHeroActive, setIsHeroActive] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroActive(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    const handleVisibility = () => {
      if (document.hidden) {
        setIsHeroActive(false);
      } else {
        setIsHeroActive(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-heading"
      className={`relative bg-[#0F3D3E] text-white rounded-b-[36px] sm:rounded-b-[48px] lg:rounded-b-[60px] overflow-hidden flex flex-col lg:block ${
        !isHeroActive ? "hero-paused" : ""
      }`}
    >
      {/* ========================================================
          RESPONSIVE HERO BACKGROUND PHOTO
          Mobile (< 1024px): Sits at bottom with vertical mask fade
          Desktop (1024px+): Covers right 60% with horizontal mask fade
          Picture element ensures ONLY ONE image is downloaded based on viewport width
         ======================================================== */}
      <div
        className="relative w-full aspect-[4/5] -mt-8 overflow-hidden z-0 order-2 lg:order-none lg:mt-0 lg:aspect-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-[60%] lg:pointer-events-none"
        aria-hidden="true"
      >
        {/* Soft mint radial glow pulsing behind doctors */}
        <div
          className="mint-glow-pulse absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(205,235,216,0.3)_0%,transparent_65%)] lg:bg-[radial-gradient(circle_at_65%_35%,rgba(205,235,216,0.35)_0%,transparent_70%)] pointer-events-none z-10"
        />

        {/* Masked photo container with responsive gradient mask */}
        <div className="relative w-full h-full hero-photo-zoom hero-photo-mask">
          <picture className="w-full h-full">
            <source
              media="(min-width: 1024px)"
              srcSet="/images/hero-desktop.webp"
              width={1200}
              height={675}
            />
            <img
              src="/images/hero-mobile.webp"
              alt="LifeCare Hospital senior doctors and medical team"
              width={800}
              height={1000}
              fetchPriority="high"
              loading="eager"
              className="w-full h-full object-cover object-top lg:object-[65%_30%]"
              style={{ filter: "saturate(0.9)" }}
            />
          </picture>

          {/* Teal tint overlay */}
          <div
            className="absolute inset-0 bg-[#0F3D3E]/[0.28] pointer-events-none"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>

      {/* ========================================================
          HERO CONTENT CONTAINER
          Mobile: Top block in column layout
          Desktop: Left column over solid teal
         ======================================================== */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-10 lg:py-24 order-1 lg:order-none">
        {/* Text Block on Solid Teal */}
        <div className="max-w-xl lg:max-w-2xl flex flex-col items-start">
          {/* 1. Rating Chip (Load sequence 1) */}
          <div className="hero-seq-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold text-white mb-4 sm:mb-5 shadow-sm">
            <span className="font-bold text-[#CDEBD8]">{hospitalConfig.hero.badgeRating}</span>
            <div className="flex items-center text-[#FBBF24]">
              <span className="star-twinkle">
                <StarIcon className="w-3.5 h-3.5 fill-[#FBBF24]" />
              </span>
            </div>
            <span className="text-white/40">|</span>
            <span className="text-white/90">{hospitalConfig.hero.badgePatients}</span>
          </div>

          {/* 2 & 3. Headline with 2 staggered lines (Load sequence 2 & 3) */}
          <h1
            id="hero-heading"
            aria-label={`${hospitalConfig.hero.headingPrefix} ${hospitalConfig.hero.headingRest}`}
            className="hero-h1 font-extrabold text-white tracking-tight text-left max-w-xl drop-shadow-sm text-balance"
          >
            <span aria-hidden="true">
              {/* Headline Line 1 */}
              <span className="hero-seq-2 block">
                <span className="healing-shimmer">{hospitalConfig.hero.headingPrefix}</span>{" "}
                Begins
              </span>
              {/* Headline Line 2 */}
              <span className="hero-seq-3 block">
                The Moment You Walk In
              </span>
            </span>
          </h1>

          {/* 4. Subtext (Load sequence 4) */}
          <p className="hero-seq-4 mt-3.5 sm:mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-lg text-left drop-shadow-sm text-balance">
            <span className="lg:hidden">{hospitalConfig.hero.subtext}</span>
            <span className="hidden lg:inline">{hospitalConfig.hero.desktopSubtext}</span>
          </p>

          {/* 5. Buttons (Load sequence 5) */}
          <div
            id="hero-cta-buttons"
            className="hero-seq-5 mt-6 sm:mt-7 w-full flex flex-row max-[359px]:flex-col items-stretch sm:items-center gap-3"
          >
            {/* Primary Book Appointment Button */}
            <Link
              ref={bookBtnRef}
              href="/book"
              onClick={onOpenBooking}
              onPointerDown={createBookRipple}
              style={{ "--shine-delay": "0.4s" } as React.CSSProperties}
              className="btn-idle-shine btn-ripple-container flex-1 h-[48px] px-6 rounded-full bg-[#CDEBD8] hover:bg-[#B2E0C2] text-[#0F3D3E] font-extrabold text-sm sm:text-base btn-press btn-mint flex items-center justify-center gap-2 shadow-lg shadow-[#0F3D3E]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8FBFA3] transition-all whitespace-nowrap"
            >
              <CalendarIcon className="w-5 h-5 text-[#0F3D3E] shrink-0" />
              <span>{hospitalConfig.hero.ctaPrimary}</span>
              <ArrowRightIcon className="hidden sm:inline w-4 h-4 text-[#0F3D3E]" />

              {/* Touch Ripples */}
              {bookRipples.map((r) => (
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

            {/* Call Us Button */}
            <a
              ref={callBtnRef}
              href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
              onPointerDown={createCallRipple}
              className="btn-ripple-container w-auto max-[359px]:w-auto shrink-0 h-[48px] px-5 rounded-full bg-[#185553] hover:bg-[#1f6664] text-white border border-[#CDEBD8]/35 font-bold text-sm sm:text-base btn-press flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3] transition-all shadow-sm whitespace-nowrap"
              aria-label={`Call LifeCare Hospital at ${hospitalConfig.contact.emergencyPhone}`}
            >
              <span className="phone-ring-icon">
                <PhoneIcon className="w-4 h-4 text-[#CDEBD8]" />
              </span>
              <span>{hospitalConfig.hero.ctaSecondary}</span>

              {/* Touch Ripples */}
              {callRipples.map((r) => (
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
