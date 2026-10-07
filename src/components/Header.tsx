"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { LifeCareLogo } from "./LifeCareLogo";
import { MenuIcon, CloseIcon, ArrowRightIcon, CalendarIcon, PhoneIcon } from "./Icons";
import { hospitalConfig } from "@/config/hospital";
import { useHeaderScroll } from "./useScrollAnimation";
import { useRipple, useIdleAnimationObserver } from "./useRipple";

interface HeaderProps {
  onOpenBooking?: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isScrolled = useHeaderScroll();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const desktopBtnRef = useRef<HTMLAnchorElement>(null);
  useIdleAnimationObserver(desktopBtnRef);

  const { ripples: desktopRipples, createRipple: createDesktopRipple } = useRipple("mint");
  const { ripples: mobileBookRipples, createRipple: createMobileBookRipple } = useRipple("teal");
  const { ripples: mobileCallRipples, createRipple: createMobileCallRipple } = useRipple("mint");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu immediately on route change and scroll to top
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Lock body scroll and toggle class to hide sticky bottom bar
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
      document.body.style.overflow = "hidden";
      // Focus the close button when opened
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle Escape key and Tab focus trap inside mobile drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Departments", href: "/departments" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-30 bg-white/95 backdrop-blur-md transition-all duration-200 ${
        isScrolled
          ? "shadow-[0_4px_20px_rgba(15,61,62,0.08)] border-b border-transparent h-16 sm:h-18"
          : "border-b border-gray-100 h-20"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Left */}
          <div className="shrink-0">
            <LifeCareLogo variant="dark" />
          </div>

          {/* Desktop Nav Center (1024px+) */}
          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-8"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3] rounded ${
                    active
                      ? "text-[#0F3D3E] font-bold"
                      : "text-[#536462] hover:text-[#0F3D3E]"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F3D3E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right: Book Appointment Pill Button */}
          <div className="hidden lg:flex items-center">
            <Link
              ref={desktopBtnRef}
              href="/book"
              onClick={onOpenBooking}
              onPointerDown={createDesktopRipple}
              style={{ "--shine-delay": "0.4s" } as React.CSSProperties}
              className="btn-ripple-container btn-idle-shine min-h-[44px] px-6 py-2.5 rounded-full bg-[#CDEBD8] hover:bg-[#B2E0C2] text-[#0F3D3E] font-bold text-sm btn-press btn-mint flex items-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8FBFA3] transition-all"
            >
              <span>Book Appointment</span>
              <ArrowRightIcon className="w-4 h-4 text-[#0F3D3E]" />

              {/* Mint ripples */}
              {desktopRipples.map((r) => (
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

          {/* Mobile Right: Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-[#0F3D3E] hover:bg-gray-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer Rendered Outside Header in Portal to avoid backdrop-filter trapping */}
      {mounted &&
        isMobileMenuOpen &&
        createPortal(
          <div
            id="mobile-nav-drawer"
            className="fixed inset-0 z-[9999] lg:hidden flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            {/* Dim Overlay */}
            <div
              className="fixed inset-0 bg-[#0F3D3E]/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Panel from Right */}
            <div
              ref={drawerRef}
              className="relative w-full max-w-[340px] h-full bg-white shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-300 z-10"
            >
              <div>
                {/* Header of Drawer */}
                <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                  <LifeCareLogo variant="dark" />
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 text-[#0F3D3E] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                    aria-label="Close navigation menu"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Large Navigation Links with staggered animation */}
                <nav className="mt-6 flex flex-col space-y-1.5" aria-label="Mobile Menu Links">
                  {navLinks.map((link, idx) => {
                    const active = isLinkActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ animationDelay: `${idx * 40}ms` }}
                        className={`text-lg sm:text-xl font-bold py-2.5 px-3 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] ${
                          active
                            ? "bg-[#EBF7F0] text-[#0F3D3E]"
                            : "text-[#1F2D2B] hover:bg-gray-50 hover:text-[#0F3D3E]"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                      </Link>
                    );
                  })}
                </nav>

                {/* Emergency Hotline Card */}
                <div className="mt-5 p-4 rounded-2xl bg-[#EBF7F0] border border-[#D8EDE0]">
                  <p className="text-xs uppercase font-extrabold tracking-wider text-[#2DA870]">
                    24/7 Emergency Helpline
                  </p>
                  <a
                    href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
                    className="mt-1 flex items-center gap-2 text-base font-extrabold text-[#E53E3E] hover:underline"
                  >
                    <PhoneIcon className="w-4 h-4 text-[#E53E3E] shrink-0" />
                    <span>{hospitalConfig.contact.emergencyPhone}</span>
                  </a>
                  <p className="text-[11px] text-[#536462] mt-0.5">
                    Casualty & Critical Trauma Unit in Nanded
                  </p>
                </div>
              </div>

              {/* Bottom Action Buttons: Book Appointment & Call Us */}
              <div className="pt-5 border-t border-gray-100 space-y-2.5">
                <Link
                  href="/book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  onPointerDown={createMobileBookRipple}
                  style={{ "--shine-delay": "0.6s" } as React.CSSProperties}
                  className="btn-ripple-container btn-idle-shine w-full min-h-[48px] py-3.5 px-6 rounded-full bg-[#0F3D3E] text-white font-bold text-base btn-press btn-teal flex items-center justify-center gap-2 shadow-md hover:bg-[#0A2B2C] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                >
                  <CalendarIcon className="w-5 h-5 text-[#CDEBD8]" />
                  <span>Book Appointment</span>

                  {/* Teal ripples */}
                  {mobileBookRipples.map((r) => (
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

                <a
                  href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
                  onPointerDown={createMobileCallRipple}
                  className="btn-ripple-container w-full min-h-[48px] py-3.5 px-6 rounded-full bg-[#CDEBD8] text-[#0F3D3E] font-bold text-base btn-press btn-mint flex items-center justify-center gap-2 border border-[#BCE1C9] hover:bg-[#B2E0C2] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                >
                  <PhoneIcon className="w-5 h-5 text-[#0F3D3E] phone-ring-icon" />
                  <span>Call Us</span>

                  {/* Mint ripples */}
                  {mobileCallRipples.map((r) => (
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
          </div>,
          document.body
        )}
    </header>
  );
}
