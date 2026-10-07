"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { hospitalConfig } from "@/config/hospital";
import { PhoneIcon, CalendarIcon } from "./Icons";
import { useRipple, useIdleAnimationObserver } from "./useRipple";

interface StickyActionBarProps {
  onOpenBooking?: () => void;
}

export function StickyActionBar({ onOpenBooking }: StickyActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  const { ripples: callRipples, createRipple: createCallRipple } = useRipple("mint");
  const { ripples: bookRipples, createRipple: createBookRipple } = useRipple("teal");

  const bookBtnRef = useRef<HTMLAnchorElement | null>(null);
  useIdleAnimationObserver(bookBtnRef);

  useEffect(() => {
    const heroButtons = document.getElementById("hero-cta-buttons");

    // If no hero buttons on page (subpages like /doctors, /services), always show
    if (!heroButtons) {
      setIsVisible(true);
      return;
    }

    // Observe hero buttons: when visible in viewport, hide sticky bar; when scrolled past, slide up sticky bar
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(heroButtons);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      id="sticky-bottom-bar"
      aria-label="Quick Actions"
      className={`fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(15,61,62,0.08)] px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] transition-all duration-300 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-md mx-auto flex items-center gap-2.5">
        {/* Left Action: Call Now (Mint Pill, flex-1) */}
        <a
          href={`tel:${hospitalConfig.contact.tel}`}
          onPointerDown={createCallRipple}
          className="btn-ripple-container flex-1 h-[44px] px-3 rounded-full bg-[#CDEBD8] hover:bg-[#bfe4cc] text-[#0F3D3E] font-semibold text-sm btn-press btn-mint flex items-center justify-center gap-1.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3] transition-all whitespace-nowrap"
          aria-label={`Call LifeCare Hospital at ${hospitalConfig.contact.display}`}
        >
          <PhoneIcon className="w-4 h-4 text-[#0F3D3E] shrink-0 phone-ring-icon" />
          <span>Call Now</span>

          {/* Mint ripples */}
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

        {/* Right Action: Book Appointment (Deep Teal Pill, flex-[1.25]) */}
        <Link
          ref={bookBtnRef}
          href="/book"
          onClick={onOpenBooking}
          onPointerDown={createBookRipple}
          style={{ "--shine-delay": "0.3s" } as React.CSSProperties}
          className={`btn-ripple-container btn-idle-shine ${
            !isVisible ? "anim-idle-disabled" : ""
          } flex-[1.25] h-[44px] px-3.5 rounded-full bg-[#0F3D3E] hover:bg-[#0A2B2C] text-white font-semibold text-[15px] btn-press btn-teal flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3] transition-all whitespace-nowrap`}
          aria-label="Book an Appointment"
        >
          <CalendarIcon className="w-[18px] h-[18px] text-[#CDEBD8] shrink-0" />
          <span className="hidden min-[360px]:inline">Book Appointment</span>
          <span className="inline min-[360px]:hidden">Book Now</span>

          {/* Teal ripples */}
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
      </div>
    </aside>
  );
}
