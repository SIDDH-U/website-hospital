"use client";

import React, { useState } from "react";
import Link from "next/link";
import { hospitalConfig, buildWhatsAppLink } from "@/config/hospital";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { CtaBanner } from "@/components/CtaBanner";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/Icons";

export function ContactContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const cleanPhone = formData.phone.replace(/\D/g, "").trim();
    const trimmedMsg = formData.message.trim().slice(0, 500);

    const lines: string[] = [
      "New Enquiry - LifeCare Hospital",
      `Name: ${trimmedName}`,
      `Phone: ${cleanPhone}`,
    ];
    if (trimmedMsg) {
      lines.push(`Message: ${trimmedMsg}`);
    }

    const fullMessage = lines.join("\n");
    const link = buildWhatsAppLink(fullMessage);
    setWaLink(link);

    // Open WhatsApp directly inside submit handler synchronously
    window.open(link, "_blank");

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2D2B]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Header Hero */}
        <section className="bg-[#0F3D3E] text-white py-12 lg:py-16 rounded-b-[36px] lg:rounded-b-[48px]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-[#CDEBD8] mb-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/60">Contact Us</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/20 text-[#CDEBD8] border border-[#CDEBD8]/30 mb-3">
              WE ARE HERE FOR YOU
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Get in Touch with LifeCare Hospital
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Have questions about doctor consultations, hospital admissions, or diagnostic reports? Reach out to our 24/7 support desk in Nanded.
            </p>
          </div>
        </section>

        {/* Contact Info & Interactive Form */}
        <section className="py-12 sm:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block mb-1">
                  DIRECT CONTACT
                </span>
                <h2 className="text-2xl font-extrabold text-[#0F3D3E]">
                  Hospital Information
                </h2>
              </div>

              {/* Tappable Address */}
              <a
                href={hospitalConfig.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border border-[#EBE7DC] hover:border-[#8FBFA3] card-press group transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0F3D3E] text-[#CDEBD8] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#536462] uppercase tracking-wider">
                      Hospital Location (Open in Maps)
                    </span>
                    <p className="text-sm font-extrabold text-[#0F3D3E] mt-0.5 group-hover:text-[#2DA870] transition-colors">
                      {hospitalConfig.location.fullAddress}
                    </p>
                  </div>
                </div>
              </a>

              {/* Tappable Phone */}
              <a
                href={`tel:${hospitalConfig.contact.tel}`}
                className="block p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border border-[#EBE7DC] hover:border-[#8FBFA3] card-press group transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#CDEBD8] text-[#0F3D3E] flex items-center justify-center shrink-0 mt-0.5">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#536462] uppercase tracking-wider">
                      Call Front Desk
                    </span>
                    <p className="text-sm font-extrabold text-[#0F3D3E] mt-0.5 group-hover:text-[#2DA870] transition-colors">
                      {hospitalConfig.contact.display}
                    </p>
                  </div>
                </div>
              </a>

              {/* Tappable Email */}
              <a
                href={`mailto:${hospitalConfig.contact.email}`}
                className="block p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border border-[#EBE7DC] hover:border-[#8FBFA3] card-press group transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F5F2] text-[#0F3D3E] flex items-center justify-center shrink-0 mt-0.5">
                    <MailIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#536462] uppercase tracking-wider">
                      Email Inquiries
                    </span>
                    <p className="text-sm font-extrabold text-[#0F3D3E] mt-0.5 group-hover:text-[#2DA870] transition-colors">
                      {hospitalConfig.contact.email}
                    </p>
                  </div>
                </div>
              </a>

              {/* Working Hours */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF7F0] border border-[#D8EDE0]">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0F3D3E] text-[#CDEBD8] flex items-center justify-center shrink-0 mt-0.5">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0F3D3E] uppercase tracking-wider">
                      Working & Emergency Hours
                    </span>
                    <p className="text-sm font-extrabold text-[#0F3D3E] mt-0.5">
                      {hospitalConfig.hours.regular}
                    </p>
                    <p className="text-xs font-bold text-[#E53E3E] mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E53E3E] animate-pulse" />
                      Emergency & Casualty: 24/7 Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#F7F5EF] rounded-3xl p-6 sm:p-8 border border-[#EBE7DC] shadow-sm">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F3D3E] mb-2">
                      Send Us a Message
                    </h3>
                    <p className="text-xs sm:text-sm text-[#536462] mb-6">
                      Leave your details and our hospital reception will respond within 2 working hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-semibold mb-1 text-[#1F2D2B]">
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8FBFA3] text-base"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-semibold mb-1 text-[#1F2D2B]">
                          Phone Number *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder="e.g. 80800 76322"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8FBFA3] text-base"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-msg" className="block text-sm font-semibold mb-1 text-[#1F2D2B]">
                          Your Message *
                        </label>
                        <textarea
                          id="contact-msg"
                          rows={4}
                          required
                          placeholder="How can we assist you with appointments or hospital services?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8FBFA3] text-base"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-[#0F3D3E] text-white font-bold text-sm btn-press btn-teal flex items-center justify-center gap-2 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                      >
                        <span>Send Message</span>
                        <ArrowRightIcon className="w-4 h-4 text-[#CDEBD8]" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#CDEBD8] text-[#0F3D3E] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircleIcon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0F3D3E]">
                      Almost done!
                    </h3>
                    <p className="text-base text-[#1F2D2B] font-semibold mt-2">
                      Tap Send in WhatsApp to confirm your message.
                    </p>
                    <p className="text-sm text-[#536462] mt-1 leading-relaxed">
                      Our front desk will review your enquiry and respond promptly.
                    </p>

                    <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                      {waLink && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all btn-press"
                        >
                          <span>Open WhatsApp again</span>
                        </a>
                      )}

                      <a
                        href={`tel:${hospitalConfig.contact.tel}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0F3D3E] hover:bg-[#0A2B2C] text-white font-bold text-sm shadow-md transition-all btn-press"
                      >
                        <PhoneIcon className="w-4 h-4 text-[#CDEBD8]" />
                        <span>Call us instead</span>
                      </a>
                    </div>

                    <div className="mt-5">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F3D3E] hover:text-[#2DA870] transition-colors"
                      >
                        <ArrowRightIcon className="w-4 h-4 rotate-180" />
                        <span>Back to home</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Map Section */}
        <section className="py-6 sm:py-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#EBE7DC] overflow-hidden bg-[#F7F5EF] shadow-sm">
            <div className="p-4 sm:p-6 border-b border-[#EBE7DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
              <div>
                <h3 className="text-lg font-extrabold text-[#0F3D3E]">
                  Find Us in Nanded, Maharashtra
                </h3>
                <p className="text-xs text-[#536462]">
                  {hospitalConfig.location.fullAddress}
                </p>
              </div>
              <a
                href={hospitalConfig.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F3D3E] text-white text-xs font-bold btn-press btn-teal shadow shrink-0"
              >
                <MapPinIcon className="w-3.5 h-3.5 text-[#CDEBD8]" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Styled Map Canvas */}
            <div className="relative w-full h-[280px] sm:h-[360px] bg-[#E2EBE5] flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(#0F3D3E 1px, transparent 1px), linear-gradient(90deg, #0F3D3E 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white max-w-sm">
                <div className="w-12 h-12 rounded-full bg-[#E53E3E] text-white flex items-center justify-center mb-3 shadow-lg animate-bounce">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-[#0F3D3E] text-base">
                  LifeCare Hospital Nanded
                </h4>
                <p className="text-xs text-[#536462] mt-1">
                  123 Healthcare Road, Nanded 431601
                </p>
                <span className="mt-2 text-[11px] font-bold text-[#2DA870]">
                  Convenient Ambulance & Patient Parking On-Site
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <CtaBanner />
      </main>

      <Footer />
      <StickyActionBar />
    </div>
  );
}
