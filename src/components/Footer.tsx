import React from "react";
import Link from "next/link";
import { LifeCareLogo } from "./LifeCareLogo";
import { hospitalConfig } from "@/config/hospital";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./Icons";

export function Footer() {
  return (
    <footer className="bg-[#0F3D3E] text-white pt-12 sm:pt-16 lg:pt-20 pb-28 lg:pb-12 border-t border-[#184E4F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            DESKTOP 4-COLUMN LAYOUT (1024px+)
           ======================================================== */}
        <div className="hidden lg:grid grid-cols-12 gap-8 mb-12">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="col-span-4 flex flex-col items-start pr-6">
            <LifeCareLogo variant="light" />
            <p className="mt-4 text-sm text-white/75 leading-relaxed max-w-sm">
              {hospitalConfig.footer.description}
            </p>
            {/* Social Icons (Only render if any social URL is configured) */}
            {Boolean(
              hospitalConfig.socials.facebook ||
                hospitalConfig.socials.instagram ||
                hospitalConfig.socials.linkedin ||
                hospitalConfig.socials.youtube
            ) && (
              <div className="flex items-center gap-4 mt-6">
                {hospitalConfig.socials.facebook && (
                  <a
                    href={hospitalConfig.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LifeCare on Facebook"
                    className="w-9 h-9 rounded-full bg-[#184E4F] hover:bg-[#CDEBD8] hover:text-[#0F3D3E] text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {hospitalConfig.socials.instagram && (
                  <a
                    href={hospitalConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LifeCare on Instagram"
                    className="w-9 h-9 rounded-full bg-[#184E4F] hover:bg-[#CDEBD8] hover:text-[#0F3D3E] text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {hospitalConfig.socials.linkedin && (
                  <a
                    href={hospitalConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LifeCare on LinkedIn"
                    className="w-9 h-9 rounded-full bg-[#184E4F] hover:bg-[#CDEBD8] hover:text-[#0F3D3E] text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {hospitalConfig.socials.youtube && (
                  <a
                    href={hospitalConfig.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LifeCare on YouTube"
                    className="w-9 h-9 rounded-full bg-[#184E4F] hover:bg-[#CDEBD8] hover:text-[#0F3D3E] text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#CDEBD8] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-[#CDEBD8] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-[#CDEBD8] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/departments" className="text-white/80 hover:text-[#CDEBD8] transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-white/80 hover:text-[#CDEBD8] transition-colors">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-[#CDEBD8] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Departments (2 cols) */}
          <div className="col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#CDEBD8] mb-4">
              Departments
            </h4>
            <ul className="space-y-2.5 text-sm">
              {hospitalConfig.departments.slice(0, 5).map((dept) => (
                <li key={dept.id}>
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="text-white/80 hover:text-[#CDEBD8] transition-colors"
                  >
                    {dept.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us (4 cols) */}
          <div className="col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#CDEBD8] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-[#8FBFA3] shrink-0 mt-0.5" />
                <a
                  href={hospitalConfig.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 hover:text-white transition-colors"
                >
                  {hospitalConfig.location.fullAddress}
                </a>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 text-[#8FBFA3] shrink-0" />
                <a
                  href={`tel:${hospitalConfig.contact.phoneRaw}`}
                  className="text-white/85 hover:text-white transition-colors"
                >
                  {hospitalConfig.contact.phone}
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <MailIcon className="w-4 h-4 text-[#8FBFA3] shrink-0" />
                <a
                  href={`mailto:${hospitalConfig.contact.email}`}
                  className="text-white/85 hover:text-white transition-colors"
                >
                  {hospitalConfig.contact.email}
                </a>
              </li>

              {/* Hours */}
              <li className="flex items-center gap-3">
                <ClockIcon className="w-4 h-4 text-[#8FBFA3] shrink-0" />
                <span className="text-white/85">
                  {hospitalConfig.hours.regular}
                </span>
              </li>

              {/* Emergency */}
              <li className="flex items-center gap-3 pt-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#E53E3E] animate-pulse" />
                <a
                  href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
                  className="font-bold text-[#E53E3E] hover:underline"
                >
                  Emergency: 24/7 Available
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================
            MOBILE LAYOUT (< 1024px)
            Matches Reference Image 2 (Right Phone Footer)
            NO ARROWS on contact rows (Requirement 9)
           ======================================================== */}
        <div className="lg:hidden flex flex-col space-y-8 mb-8">
          {/* Logo & Description */}
          <div>
            <LifeCareLogo variant="light" />
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              {hospitalConfig.footer.description}
            </p>
          </div>

          {/* Contact Details Rows (Tappable links, NO ARROWS) */}
          <div className="space-y-3 text-sm border-t border-[#184E4F] pt-6">
            <a
              href={hospitalConfig.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3.5 rounded-xl bg-[#144748] text-white hover:bg-[#195657] transition-colors card-press"
            >
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-[#8FBFA3] shrink-0" />
                <span className="text-xs sm:text-sm font-medium">
                  {hospitalConfig.location.fullAddress}
                </span>
              </div>
            </a>

            <a
              href={`tel:${hospitalConfig.contact.phoneRaw}`}
              className="flex items-center p-3.5 rounded-xl bg-[#144748] text-white hover:bg-[#195657] transition-colors card-press"
            >
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-[#8FBFA3] shrink-0" />
                <span className="text-sm font-semibold">
                  {hospitalConfig.contact.phone}
                </span>
              </div>
            </a>

            <a
              href={`mailto:${hospitalConfig.contact.email}`}
              className="flex items-center p-3.5 rounded-xl bg-[#144748] text-white hover:bg-[#195657] transition-colors card-press"
            >
              <div className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-[#8FBFA3] shrink-0" />
                <span className="text-sm font-medium">
                  {hospitalConfig.contact.email}
                </span>
              </div>
            </a>

            <div className="flex items-center p-3.5 rounded-xl bg-[#144748] text-white">
              <div className="flex items-center gap-3">
                <ClockIcon className="w-5 h-5 text-[#8FBFA3] shrink-0" />
                <span className="text-sm font-medium">
                  {hospitalConfig.hours.display}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links in 2 Columns */}
          <div className="pt-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#CDEBD8] mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              <Link href="/" className="text-white/80 hover:text-white py-1">
                Home
              </Link>
              <Link href="/about" className="text-white/80 hover:text-white py-1">
                About Us
              </Link>
              <Link href="/departments" className="text-white/80 hover:text-white py-1">
                Departments
              </Link>
              <Link href="/doctors" className="text-white/80 hover:text-white py-1">
                Our Doctors
              </Link>
              <Link href="/services" className="text-white/80 hover:text-white py-1">
                Services
              </Link>
              <Link href="/patient-info" className="text-white/80 hover:text-white py-1">
                Patient Info
              </Link>
              <Link href="/blog" className="text-white/80 hover:text-white py-1">
                Health Blog
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white py-1">
                Contact Us
              </Link>
              <Link href="/about#our-approach" className="text-white/80 hover:text-white py-1">
                Our Approach
              </Link>
            </div>
          </div>

          {/* Follow Us / Social Icons (Only render if any social URL is configured) */}
          {Boolean(
            hospitalConfig.socials.facebook ||
              hospitalConfig.socials.instagram ||
              hospitalConfig.socials.linkedin ||
              hospitalConfig.socials.youtube
          ) && (
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#CDEBD8] mb-3">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {hospitalConfig.socials.instagram && (
                  <a
                    href={hospitalConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-[#184E4F] text-white flex items-center justify-center hover:bg-[#CDEBD8] hover:text-[#0F3D3E] transition-all card-press"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {hospitalConfig.socials.facebook && (
                  <a
                    href={hospitalConfig.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-full bg-[#184E4F] text-white flex items-center justify-center hover:bg-[#CDEBD8] hover:text-[#0F3D3E] transition-all card-press"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {hospitalConfig.socials.youtube && (
                  <a
                    href={hospitalConfig.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-full bg-[#184E4F] text-white flex items-center justify-center hover:bg-[#CDEBD8] hover:text-[#0F3D3E] transition-all card-press"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                )}
                {hospitalConfig.socials.linkedin && (
                  <a
                    href={hospitalConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full bg-[#184E4F] text-white flex items-center justify-center hover:bg-[#CDEBD8] hover:text-[#0F3D3E] transition-all card-press"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Thin Divider & Bottom Legal Row */}
        <div className="pt-8 border-t border-[#1C5051] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>{hospitalConfig.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
