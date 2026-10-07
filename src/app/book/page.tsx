"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { hospitalConfig, Doctor, buildWhatsAppLink } from "@/config/hospital";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { useRipple, useIdleAnimationObserver } from "@/components/useRipple";
import {
  CalendarIcon,
  PhoneIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
} from "@/components/Icons";

function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const deptParam = searchParams.get("dept") || "";
  const doctorParam = searchParams.get("doctor") || "";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [minDate, setMinDate] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { ripples, createRipple } = useRipple("teal");
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  useIdleAnimationObserver(submitBtnRef);

  // Initialize department and doctor from URL query parameters
  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);

    // Match department by slug or name
    let matchedDept = hospitalConfig.departments.find(
      (d) => d.slug.toLowerCase() === deptParam.toLowerCase() || d.name.toLowerCase() === deptParam.toLowerCase()
    );
    if (!matchedDept && hospitalConfig.departments.length > 0) {
      matchedDept = hospitalConfig.departments[0];
    }

    if (matchedDept) {
      setSelectedDeptId(matchedDept.id);
    }

    // Match doctor by slug or id
    if (doctorParam) {
      const matchedDoc = hospitalConfig.doctors.find(
        (doc) => doc.slug.toLowerCase() === doctorParam.toLowerCase() || doc.id.toLowerCase() === doctorParam.toLowerCase()
      );
      if (matchedDoc) {
        setSelectedDoctorId(matchedDoc.id);
        if (!deptParam && matchedDoc.departmentId) {
          setSelectedDeptId(matchedDoc.departmentId);
        }
      }
    }
  }, [deptParam, doctorParam]);

  // Available doctors for the selected department
  const filteredDoctors = selectedDeptId
    ? hospitalConfig.doctors.filter((doc) => doc.departmentId === selectedDeptId)
    : hospitalConfig.doctors;

  const handleDeptChange = (newDeptId: string) => {
    setSelectedDeptId(newDeptId);
    // Reset or update doctor if not in this department
    const docInDept = hospitalConfig.doctors.find((doc) => doc.departmentId === newDeptId);
    setSelectedDoctorId(docInDept ? docInDept.id : "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!name.trim()) {
      setErrorMsg("Please enter patient name.");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!date) {
      setErrorMsg("Please select a preferred appointment date.");
      return;
    }

    const currentDept = hospitalConfig.departments.find((d) => d.id === selectedDeptId);
    const currentDoc = hospitalConfig.doctors.find((d) => d.id === selectedDoctorId);
    const deptName = currentDept ? currentDept.name : "";
    const docName = currentDoc ? currentDoc.name : "";
    const trimmedName = name.trim();
    const trimmedDate = date.trim();
    const trimmedMsg = message.trim().slice(0, 500);

    // Build WhatsApp message format:
    // New Appointment Request - LifeCare Hospital
    // Name: {name}
    // Phone: {phone}
    // Department: {department}
    // Doctor: {doctor}
    // Preferred date: {date}
    // Message: {message}
    const lines: string[] = [
      "New Appointment Request - LifeCare Hospital",
      `Name: ${trimmedName}`,
      `Phone: ${cleanPhone}`,
    ];
    if (deptName) lines.push(`Department: ${deptName}`);
    if (docName) lines.push(`Doctor: ${docName}`);
    if (trimmedDate) lines.push(`Preferred date: ${trimmedDate}`);
    if (trimmedMsg) lines.push(`Message: ${trimmedMsg}`);

    const fullMessage = lines.join("\n");
    const link = buildWhatsAppLink(fullMessage);
    setWaLink(link);

    // Open WhatsApp synchronously inside click/submit event so browser doesn't block it
    window.open(link, "_blank");

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
      {!isSubmitted ? (
        <>
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8] text-[#0F3D3E] mb-3">
              <CalendarIcon className="w-3.5 h-3.5" /> Book Consultation
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F3D3E] tracking-tight">
              Schedule Your Appointment
            </h1>
            <p className="text-sm text-[#536462] mt-2">
              Fast-track doctor appointment at LifeCare Hospital, Nanded.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="book-name" className="block text-sm font-semibold mb-1 text-[#1F2D2B]">
                Patient Full Name *
              </label>
              <input
                id="book-name"
                type="text"
                required
                placeholder="Enter patient full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8FBFA3] text-base"
              />
            </div>

            <div>
              <label htmlFor="book-phone" className="block text-sm font-semibold mb-1 text-[#1F2D2B]">
                Mobile Phone Number *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#536462] font-semibold">
                  +91
                </span>
                <input
                  id="book-phone"
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="80800 76322"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8FBFA3] text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="book-dept" className="block text-sm font-semibold mb-1 text-[#1F2D2B]">
                  Department *
                </label>
                <select
                  id="book-dept"
                  value={selectedDeptId}
                  onChange={(e) => handleDeptChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8FBFA3] bg-white text-base cursor-pointer"
                >
                  {hospitalConfig.departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="book-doctor" className="block text-sm font-semibold mb-1 text-[#1F2D2B]">
                  Doctor (Optional)
                </label>
                <select
                  id="book-doctor"
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8FBFA3] bg-white text-base cursor-pointer"
                >
                  <option value="">Any Available Specialist</option>
                  {filteredDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="book-date" className="block text-sm font-semibold mb-1 text-[#1F2D2B]">
                Preferred Date *
              </label>
              <input
                id="book-date"
                type="date"
                required
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8FBFA3] text-base"
              />
            </div>

            <div>
              <label htmlFor="book-message" className="block text-sm font-semibold mb-1 text-[#1F2D2B]">
                Symptoms or Message (Optional)
              </label>
              <textarea
                id="book-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe health symptoms or previous medical history..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8FBFA3] text-base"
              />
            </div>

            <button
              ref={submitBtnRef}
              type="submit"
              onPointerDown={createRipple}
              style={{ "--shine-delay": "1.8s" } as React.CSSProperties}
              className="btn-ripple-container btn-idle-shine w-full min-h-[50px] py-3.5 px-6 rounded-full bg-[#0F3D3E] text-white font-bold text-base btn-press btn-teal flex items-center justify-center gap-2 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
            >
              <CalendarIcon className="w-5 h-5 text-[#CDEBD8]" />
              <span>Confirm Appointment Request</span>

              {/* Teal ripples */}
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
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#CDEBD8] text-[#0F3D3E] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0F3D3E]">
            Almost done!
          </h2>
          <p className="text-base text-[#1F2D2B] font-semibold mt-2">
            Tap Send in WhatsApp to confirm your request.
          </p>
          <p className="text-sm text-[#536462] mt-1 leading-relaxed">
            We&apos;ll call you to confirm your slot.
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
  );
}

export default function BookPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF]/60 text-[#1F2D2B]">
      <TopStrip />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-12">
        <Suspense
          fallback={
            <div className="max-w-xl mx-auto p-12 text-center text-sm text-[#536462] bg-white rounded-3xl shadow">
              Loading appointment form...
            </div>
          }
        >
          <BookAppointmentForm />
        </Suspense>
      </main>

      <Footer />
      <StickyActionBar />
    </div>
  );
}
