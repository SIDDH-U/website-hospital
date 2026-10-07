import React from "react";
import { hospitalConfig } from "@/config/hospital";
import {
  PhoneIcon,
  MailIcon,
  CheckCircleIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "./Icons";

export function TopStrip() {
  return (
    <div className="bg-[#EBF7F0] border-b border-[#D8EDE0] text-xs font-medium text-charcoal">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile View: Centered high-priority emergency tap target */}
        <div className="lg:hidden flex items-center justify-center py-2">
          <a
            href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
            className="inline-flex items-center gap-1.5 font-bold text-[#E53E3E] hover:text-[#C53030] transition-colors py-0.5 px-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53E3E]"
            aria-label={`Emergency Call: ${hospitalConfig.contact.emergencyPhone}`}
          >
            <PhoneIcon className="w-3.5 h-3.5 text-[#E53E3E] shrink-0" />
            <span>24/7 Emergency: {hospitalConfig.contact.emergencyPhone}</span>
          </a>
        </div>

        {/* Desktop View (1024px+): Left Info & Right Emergency + Socials */}
        <div className="hidden lg:flex items-center justify-between py-2">
          {/* Left Side */}
          <div className="flex items-center gap-6 text-[#1F2D2B]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#1F2D2B]">
              <CheckCircleIcon className="w-4 h-4 text-[#2DA870]" />
              Trusted multi-speciality care
            </span>
            <span className="text-[#8FBFA3]">|</span>
            <a
              href={`mailto:${hospitalConfig.contact.email}`}
              className="inline-flex items-center gap-1.5 text-[#1F2D2B] hover:text-[#0F3D3E] transition-colors"
            >
              <MailIcon className="w-3.5 h-3.5 text-[#0F3D3E]" />
              {hospitalConfig.contact.email}
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <a
              href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
              className="inline-flex items-center gap-1.5 font-bold text-[#E53E3E] hover:text-[#C53030] transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#E53E3E]" />
              <span>24/7 Emergency: {hospitalConfig.contact.emergencyPhone}</span>
            </a>
            <span className="text-[#8FBFA3]">|</span>
            <div className="flex items-center gap-3 text-[#1F2D2B]">
              <a
                href={hospitalConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[#0F3D3E] transition-colors p-1"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={hospitalConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#0F3D3E] transition-colors p-1"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={hospitalConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#0F3D3E] transition-colors p-1"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
