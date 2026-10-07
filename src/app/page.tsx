"use client";

import React, { useState } from "react";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ApproachCards } from "@/components/ApproachCards";
import { About } from "@/components/About";
import { Departments } from "@/components/Departments";
import { DoctorsMarquee } from "@/components/DoctorsMarquee";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { AppointmentModal } from "@/components/AppointmentModal";
import { useScrollAnimation } from "@/components/useScrollAnimation";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");

  // Activate scroll-driven entrance and touch-first card observers
  useScrollAnimation();

  const handleOpenBooking = (departmentName?: string) => {
    setSelectedDept(departmentName || "");
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2D2B] selection:bg-[#CDEBD8] selection:text-[#0F3D3E]">
      {/* 1. Top Strip */}
      <TopStrip />

      {/* 2. Main Header & Mobile Nav Drawer */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* 3. Main Content with Bottom Padding matching the ~60px sticky bar */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Care that puts you first (Approach Cards) */}
        <ApproachCards />

        {/* Who We Are (About & Stats) */}
        <About />

        {/* Our Departments (6 Icon Cards) */}
        <Departments />

        {/* Meet Our Doctors (Seamless Auto-scrolling Row) */}
        <DoctorsMarquee />

        {/* Ready to feel better CTA Banner */}
        <CtaBanner onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* 4. Deep Teal Footer */}
      <Footer />

      {/* 5. Mobile Sticky Bottom Action Bar (Hidden on Desktop >= 1024px) */}
      <StickyActionBar onOpenBooking={() => handleOpenBooking()} />

      {/* 6. Native Dialog Appointment Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        defaultDepartment={selectedDept}
      />
    </div>
  );
}
