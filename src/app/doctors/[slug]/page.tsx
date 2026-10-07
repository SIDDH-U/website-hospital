import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hospitalConfig } from "@/config/hospital";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { CtaBanner } from "@/components/CtaBanner";
import {
  CalendarIcon,
  PhoneIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StethoscopeIcon,
} from "@/components/Icons";

export function generateStaticParams() {
  return hospitalConfig.doctors.map((doc) => ({
    slug: doc.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doctor = hospitalConfig.doctors.find((d) => d.slug === slug);

  if (!doctor) {
    return notFound();
  }

  const department = hospitalConfig.departments.find(
    (dept) => dept.id === doctor.departmentId
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2D2B]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Profile Header */}
        <section className="bg-[#0F3D3E] text-white py-12 lg:py-16 rounded-b-[36px] lg:rounded-b-[48px]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#CDEBD8] mb-6">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <Link href="/doctors" className="hover:underline">
                Doctors
              </Link>
              <span>/</span>
              <span className="text-white/60">{doctor.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Doctor Portrait Photo (4:5 aspect ratio) */}
              <div className="md:col-span-5 lg:col-span-4">
                <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-[#144748]">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Doctor Details */}
              <div className="md:col-span-7 lg:col-span-8">
                {department && (
                  <Link
                    href={`/departments/${department.slug}`}
                    className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/20 text-[#CDEBD8] border border-[#CDEBD8]/30 mb-3 hover:bg-[#CDEBD8]/30 transition-colors"
                  >
                    Department of {department.name}
                  </Link>
                )}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  {doctor.name}
                </h1>
                <p className="mt-2 text-lg sm:text-xl font-bold text-[#CDEBD8]">
                  {doctor.speciality}
                </p>
                <p className="mt-1 text-sm font-semibold text-white/80">
                  {doctor.qualifications}
                </p>

                {/* Key Badges */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-white backdrop-blur-sm">
                    <CheckCircleIcon className="w-4 h-4 text-[#2DA870]" />
                    <span>{doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-white backdrop-blur-sm">
                    <ClockIcon className="w-4 h-4 text-[#2DA870]" />
                    <span>{doctor.opdTimings}</span>
                  </div>
                </div>

                {/* Pre-filled "Book Appointment" Button */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href={`/book?doctor=${encodeURIComponent(doctor.slug)}&dept=${encodeURIComponent(doctor.departmentId)}`}
                    className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#CDEBD8] hover:bg-[#B2E0C2] text-[#0F3D3E] font-extrabold text-sm btn-press btn-mint flex items-center justify-center gap-2 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                  >
                    <CalendarIcon className="w-4 h-4 text-[#0F3D3E]" />
                    <span>Book Appointment with {doctor.name.split(" ")[1] || "Doctor"}</span>
                  </Link>

                  <a
                    href={`tel:${hospitalConfig.contact.phoneRaw}`}
                    className="min-h-[48px] px-6 py-3.5 rounded-full border border-white/30 text-white font-bold text-sm btn-press flex items-center justify-center gap-2 hover:bg-white/10"
                  >
                    <PhoneIcon className="w-4 h-4 text-[#CDEBD8]" />
                    <span>Call OPD: {hospitalConfig.contact.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor Bio and Clinical Schedule */}
        <section className="py-12 sm:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 space-y-8">
              {/* Short Bio */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#0F3D3E] mb-3">
                  About {doctor.name}
                </h2>
                <p className="text-base sm:text-lg text-[#536462] leading-relaxed">
                  {doctor.shortBio}
                </p>
                <p className="mt-4 text-sm text-[#536462] leading-relaxed">
                  As part of the senior clinical faculty at LifeCare Hospital in Nanded, {doctor.name} is committed to evidence-based practice, personalized patient consultations, and comprehensive treatment planning.
                </p>
              </div>

              {/* Consultation Timings Box */}
              <div className="p-6 rounded-3xl bg-[#F7F5EF] border border-[#EBE7DC]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F3D3E] text-[#CDEBD8] flex items-center justify-center font-bold">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0F3D3E]">
                      Outpatient (OPD) Schedule
                    </h3>
                    <p className="text-xs text-[#536462]">
                      Appointments are scheduled in 15-minute consultation slots
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EBE7DC] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1F2D2B]">Regular Consultation Hours</span>
                  <span className="text-sm font-bold text-[#2DA870]">{doctor.opdTimings}</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-3xl bg-[#EBF7F0] border border-[#D8EDE0] sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <StethoscopeIcon className="w-6 h-6 text-[#2DA870]" />
                  <h3 className="text-base font-extrabold text-[#0F3D3E]">
                    Need Immediate Care?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#536462] leading-relaxed mb-4">
                  For acute symptoms or emergency admissions, our 24/7 Casualty and Trauma wing is always staffed with critical care officers.
                </p>
                <a
                  href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-full bg-[#E53E3E] text-white text-xs font-bold btn-press flex items-center justify-center gap-2 shadow"
                >
                  <PhoneIcon className="w-4 h-4 text-white" />
                  <span>Emergency: {hospitalConfig.contact.emergencyPhone}</span>
                </a>
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
