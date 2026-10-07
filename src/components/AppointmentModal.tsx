"use client";

import React, { useEffect, useRef, useState } from "react";
import { hospitalConfig, buildWhatsAppLink } from "@/config/hospital";
import { CalendarIcon, CloseIcon, CheckCircleIcon, PhoneIcon } from "./Icons";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDepartment?: string;
}

export function AppointmentModal({
  isOpen,
  onClose,
  defaultDepartment = "",
}: AppointmentModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: defaultDepartment || hospitalConfig.departments[0]?.name || "General Medicine",
    date: "",
    time: "Morning (09:00 AM - 01:00 PM)",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (defaultDepartment) {
      setFormData((prev) => ({ ...prev, department: defaultDepartment }));
    }
  }, [defaultDepartment]);

  // Sync isOpen with native <dialog> methods
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        setIsSubmitted(false);
        // Lock body scroll
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fallback light-dismiss for browsers without closedby support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    const handleClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInside) {
        onClose();
      }
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter the patient's full name.";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }
    if (!formData.date) {
      errs.date = "Please select a preferred appointment date.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Placeholder submission handler: Ready to connect to API, CRM, or WhatsApp webhook
    console.log("Appointment Booked Successfully:", formData);
    setIsSubmitted(true);
  };

  const handleWhatsAppShare = () => {
    const rawMessage = `Hello LifeCare Hospital, I would like to confirm my appointment:\n\nPatient Name: ${formData.name}\nPhone: ${formData.phone}\nDepartment: ${formData.department}\nPreferred Date: ${formData.date}\nTime Slot: ${formData.time}\nNotes: ${formData.notes || "None"}`;
    const link = buildWhatsAppLink(rawMessage);
    window.open(link, "_blank");
  };

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as React.HTMLAttributes<HTMLDialogElement>)}
      aria-labelledby="appointment-dialog-title"
      className="m-auto p-0 rounded-3xl bg-white shadow-2xl max-w-lg w-[calc(100%-2rem)] backdrop:bg-[#0F3D3E]/60 backdrop:backdrop-blur-sm focus:outline-none overflow-hidden"
    >
      <div className="relative p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-charcoal flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3E]"
          aria-label="Close appointment modal"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="pr-10 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8] text-[#0F3D3E] mb-2">
                <CalendarIcon className="w-3.5 h-3.5" /> Book Consultation
              </span>
              <h2
                id="appointment-dialog-title"
                className="text-2xl sm:text-3xl font-extrabold text-[#0F3D3E] tracking-tight"
              >
                Schedule An Appointment
              </h2>
              <p className="text-sm text-[#536462] mt-1">
                Fill out the quick form below. Our reception desk will call back within 15 minutes to confirm.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Name */}
              <div>
                <label
                  htmlFor="patient-name"
                  className="block text-sm font-semibold text-[#1F2D2B] mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="patient-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-[#0F3D3E] focus:ring-[#CDEBD8]"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1 font-medium">{errors.name}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="patient-phone"
                  className="block text-sm font-semibold text-[#1F2D2B] mb-1.5"
                >
                  Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#536462] font-medium">
                    +91
                  </span>
                  <input
                    id="patient-phone"
                    type="tel"
                    required
                    placeholder="80800 76322"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className={`w-full pl-14 pr-4 py-3 rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-[#0F3D3E] focus:ring-[#CDEBD8]"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Department */}
              <div>
                <label
                  htmlFor="patient-dept"
                  className="block text-sm font-semibold text-[#1F2D2B] mb-1.5"
                >
                  Select Department *
                </label>
                <select
                  id="patient-dept"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F3D3E] focus:ring-2 focus:ring-[#CDEBD8] text-sm sm:text-base bg-white focus:outline-none transition-all cursor-pointer"
                >
                  {hospitalConfig.departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                  <option value="General Health Checkup">General Health Checkup</option>
                  <option value="Emergency Consultation">Emergency Consultation</option>
                </select>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="patient-date"
                    className="block text-sm font-semibold text-[#1F2D2B] mb-1.5"
                  >
                    Preferred Date *
                  </label>
                  <input
                    id="patient-date"
                    type="date"
                    required
                    min={minDate}
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      if (errors.date) setErrors({ ...errors, date: "" });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                      errors.date
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-[#0F3D3E] focus:ring-[#CDEBD8]"
                    }`}
                  />
                  {errors.date && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="patient-time"
                    className="block text-sm font-semibold text-[#1F2D2B] mb-1.5"
                  >
                    Time Slot
                  </label>
                  <select
                    id="patient-time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 focus:border-[#0F3D3E] focus:ring-2 focus:ring-[#CDEBD8] text-sm bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Morning (09:00 AM - 01:00 PM)">Morning (9 AM - 1 PM)</option>
                    <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (04:00 PM - 08:00 PM)">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              {/* Message / Symptoms */}
              <div>
                <label
                  htmlFor="patient-notes"
                  className="block text-sm font-semibold text-[#1F2D2B] mb-1.5"
                >
                  Symptoms or Notes <span className="font-normal text-gray-500">(Optional)</span>
                </label>
                <textarea
                  id="patient-notes"
                  rows={2}
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0F3D3E] focus:ring-2 focus:ring-[#CDEBD8] text-sm focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-[50px] py-3.5 px-6 rounded-full bg-[#0F3D3E] text-white font-bold text-base hover:bg-[#0A2B2C] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F3D3E]"
                >
                  <CalendarIcon className="w-5 h-5 text-[#CDEBD8]" />
                  Confirm Appointment Request
                </button>
              </div>

              <p className="text-center text-xs text-gray-500 pt-1">
                For immediate life-threatening emergencies, call{" "}
                <a
                  href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
                  className="font-bold text-red-600 underline hover:text-red-700"
                >
                  {hospitalConfig.contact.emergencyPhone}
                </a>
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#CDEBD8] text-[#0F3D3E] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0F3D3E]">
              Appointment Request Sent!
            </h3>
            <p className="text-sm text-[#536462] mt-2 max-w-sm mx-auto">
              Thank you, <strong className="text-charcoal">{formData.name}</strong>. We have received your booking request for the{" "}
              <strong className="text-[#0F3D3E]">{formData.department}</strong> department on{" "}
              <strong className="text-[#0F3D3E]">{formData.date}</strong> ({formData.time}).
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-[#F7F5EF] text-left text-xs sm:text-sm space-y-1.5 border border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking Ref:</span>
                <span className="font-mono font-bold text-[#0F3D3E]">
                  LC-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Contact Number:</span>
                <span className="font-semibold text-charcoal">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hospital Desk:</span>
                <span className="font-semibold text-charcoal">
                  {hospitalConfig.contact.phone}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full min-h-[48px] py-3 px-6 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Chat on WhatsApp to Fast-Track
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[48px] py-3 px-6 rounded-full border border-gray-300 text-charcoal font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
