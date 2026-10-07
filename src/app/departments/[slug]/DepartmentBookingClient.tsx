"use client";

import React, { useState } from "react";
import { AppointmentModal } from "@/components/AppointmentModal";
import { CalendarIcon, PhoneIcon } from "@/components/Icons";

interface DepartmentBookingClientProps {
  departmentName: string;
  emergencyPhone: string;
  emergencyPhoneRaw: string;
}

export function DepartmentBookingClient({
  departmentName,
  emergencyPhone,
  emergencyPhoneRaw,
}: DepartmentBookingClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#CDEBD8] hover:bg-[#bfe4cc] text-[#0F3D3E] font-extrabold text-sm btn-press flex items-center justify-center gap-2 shadow-lg"
        >
          <CalendarIcon className="w-4 h-4 text-[#0F3D3E]" />
          <span>Book {departmentName} Consultation</span>
        </button>

        <a
          href={`tel:${emergencyPhoneRaw}`}
          className="min-h-[48px] px-6 py-3.5 rounded-full border border-white/30 text-white font-bold text-sm btn-press flex items-center justify-center gap-2 hover:bg-white/10"
        >
          <PhoneIcon className="w-4 h-4 text-[#CDEBD8]" />
          <span>24/7 Helpline: {emergencyPhone}</span>
        </a>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultDepartment={departmentName}
      />
    </>
  );
}
