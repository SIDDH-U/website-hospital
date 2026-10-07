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
  CheckCircleIcon,
  ArrowRightIcon,
  StethoscopeIcon,
  ClockIcon,
} from "@/components/Icons";

export function generateStaticParams() {
  return hospitalConfig.departments.map((dept) => ({
    slug: dept.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dept = hospitalConfig.departments.find((d) => d.slug === slug);

  if (!dept) {
    return notFound();
  }

  // Doctors belonging to this department
  const deptDoctors = hospitalConfig.doctors.filter(
    (d) => d.departmentId === dept.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2D2B]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* ========================================================
            INTEGRATED DEPARTMENT HERO
            Matches Point 2 Hero technique:
            Full-width #0F3D3E base, integrated photo background,
            desktop horizontal gradient & mobile vertical gradient
           ======================================================== */}
        <section className="relative w-full bg-[#0F3D3E] text-white rounded-b-[36px] lg:rounded-b-[48px] overflow-hidden">
          {/* Integrated Background Photo */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Desktop: Photo on right with left-to-right teal gradient */}
            <div className="hidden lg:block absolute inset-y-0 right-0 w-[55%]">
              <Image
                src={`/images/departments/${dept.slug}.jpg`}
                alt={`${dept.name} department facility at LifeCare Hospital`}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D3E] via-[#0F3D3E]/85 to-transparent" />
            </div>

            {/* Mobile: Photo on bottom with top-to-bottom teal gradient */}
            <div className="lg:hidden absolute inset-0">
              <Image
                src={`/images/departments/${dept.slug}.jpg`}
                alt={`${dept.name} department facility at LifeCare Hospital`}
                fill
                priority
                className="object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F3D3E] via-[#0F3D3E]/90 to-[#0F3D3E]/70" />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-2xl">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#CDEBD8] mb-4">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <span>/</span>
                <Link href="/departments" className="hover:underline">
                  Departments
                </Link>
                <span>/</span>
                <span className="text-white/60">{dept.name}</span>
              </nav>

              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/20 text-[#CDEBD8] border border-[#CDEBD8]/30 mb-3">
                DEPARTMENT OF {dept.name.toUpperCase()}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
                {dept.tagline}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
                {dept.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href={`/book?dept=${encodeURIComponent(dept.slug)}`}
                  className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#CDEBD8] hover:bg-[#B2E0C2] text-[#0F3D3E] font-extrabold text-sm btn-press btn-mint flex items-center justify-center gap-2 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                >
                  <CalendarIcon className="w-4 h-4 text-[#0F3D3E]" />
                  <span>Book Appointment</span>
                </Link>

                <a
                  href={`tel:${hospitalConfig.contact.emergencyPhoneRaw}`}
                  className="min-h-[48px] px-6 py-3.5 rounded-full border border-white/30 text-white font-bold text-sm btn-press flex items-center justify-center gap-2 hover:bg-white/10"
                >
                  <PhoneIcon className="w-4 h-4 text-[#CDEBD8]" />
                  <span>Call {hospitalConfig.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            OVERVIEW & TWO SHORT LISTS
            1. Conditions We Treat
            2. Treatments & Facilities
           ======================================================== */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Overview Paragraph */}
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block mb-2">
                CLINICAL EXCELLENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F3D3E] tracking-tight">
                Compassionate & Specialized Care in Nanded
              </h2>
              <p className="mt-3.5 text-base sm:text-lg text-[#536462] leading-relaxed">
                Our Department of {dept.name} offers comprehensive medical management and surgical therapies backed by certified specialists and cutting-edge diagnostics. We prioritize minimally invasive techniques, rapid recovery, and patient-first protocols.
              </p>
            </div>

            {/* Two Lists with Icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* List 1: Conditions We Treat */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F5EF] border border-[#EBE7DC]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#CDEBD8] text-[#0F3D3E] flex items-center justify-center font-bold">
                    <CheckCircleIcon className="w-5 h-5 text-[#2DA870]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0F3D3E]">
                      Conditions We Treat
                    </h3>
                    <p className="text-xs text-[#536462]">
                      Common & complex disorders diagnosed and managed
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {dept.conditionsTreat.map((condition, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#1F2D2B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2DA870] mt-2 shrink-0" />
                      <span className="font-medium leading-relaxed">{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* List 2: Treatments and Facilities */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#EBF7F0] border border-[#D8EDE0]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#0F3D3E] text-[#CDEBD8] flex items-center justify-center font-bold">
                    <StethoscopeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0F3D3E]">
                      Treatments & Facilities
                    </h3>
                    <p className="text-xs text-[#536462]">
                      State-of-the-art procedures and equipment
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {dept.treatmentsFacilities.map((treatment, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#1F2D2B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D3E] mt-2 shrink-0" />
                      <span className="font-medium leading-relaxed">{treatment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3-IMAGE PHOTO STRIP OF THE FACILITIES
           ======================================================== */}
        <section className="py-8 sm:py-12 bg-[#F7F5EF]/60">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block mb-1">
                FACILITY TOUR
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F3D3E]">
                {dept.name} Specialized Facilities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E2EBE5] shadow-sm border border-[#EBE7DC]"
                >
                  <Image
                    src={`/images/departments/${dept.slug}-${num}.jpg`}
                    alt={`${dept.name} clinical facility area ${num}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-white">
                      {num === 1
                        ? "Modern Clinical Suite"
                        : num === 2
                        ? "Diagnostic & Monitoring Wing"
                        : "Advanced Patient Care Station"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            "OUR [DEPARTMENT] DOCTORS"
            Using the standard doctor card format
           ======================================================== */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2DA870] block mb-1">
                EXPERT TEAM
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F3D3E]">
                Our {dept.name} Doctors
              </h2>
              <p className="text-sm text-[#536462] mt-1">
                Consult with our senior specialists for personalized treatment plans.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(deptDoctors.length > 0 ? deptDoctors : hospitalConfig.doctors.slice(0, 2)).map(
                (doc) => (
                  <Link
                    key={doc.id}
                    href={`/doctors/${doc.slug}`}
                    className="group block p-4 sm:p-5 rounded-3xl bg-[#F7F5EF] border border-[#EBE7DC] card-press card-hover-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                  >
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#E2EBE5] mb-4">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-top hover-img-zoom"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="font-extrabold text-lg text-[#0F3D3E] group-hover:text-[#2DA870] transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-[#536462] font-medium mt-0.5">
                      {doc.speciality}
                    </p>
                    <p className="text-xs text-[#2DA870] font-semibold mt-1">
                      {doc.qualifications}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#EBE7DC] flex items-center justify-between text-xs font-semibold text-[#0F3D3E]">
                      <span className="text-[#536462]">{doc.experience}</span>
                      <span className="text-[#2DA870] flex items-center gap-1">
                        View Profile →
                      </span>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* Closing CTA Banner */}
        <CtaBanner />
      </main>

      <Footer />
      <StickyActionBar />
    </div>
  );
}
