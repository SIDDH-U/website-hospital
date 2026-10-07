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
import { ArrowRightIcon, CalendarIcon } from "@/components/Icons";

export function generateStaticParams() {
  return hospitalConfig.blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = hospitalConfig.blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2D2B]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Article Header */}
        <section className="bg-[#0F3D3E] text-white py-12 lg:py-16 rounded-b-[36px] lg:rounded-b-[48px]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-[#CDEBD8] mb-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white/60 truncate max-w-[200px]">{article.title}</span>
            </nav>

            <div className="flex items-center justify-center gap-3 text-xs text-[#CDEBD8] font-bold mb-3 uppercase tracking-wider">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <span>•</span>
              <span>By {article.author}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance leading-tight">
              {article.title}
            </h1>
          </div>
        </section>

        {/* Article Body */}
        <article className="py-12 sm:py-16 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Feature Image */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-[#E2EBE5] mb-8 shadow-md">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          {/* Lead Excerpt */}
          <p className="text-lg sm:text-xl font-semibold text-[#0F3D3E] leading-relaxed mb-6 pb-6 border-b border-[#EBE7DC]">
            {article.excerpt}
          </p>

          {/* Body Paragraphs */}
          <div className="space-y-5 text-base sm:text-lg text-[#536462] leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <p>
              At LifeCare Hospital, our multidisciplinary team is dedicated to preventive medicine and educating our patients. If you or your family members experience concerning symptoms, early clinical consultation ensures the best long-term outcome.
            </p>
          </div>

          {/* Author Box */}
          <div className="mt-10 p-6 rounded-3xl bg-[#F7F5EF] border border-[#EBE7DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase font-extrabold tracking-widest text-[#2DA870]">
                ARTICLE CONTRIBUTOR
              </p>
              <h3 className="font-extrabold text-base text-[#0F3D3E]">
                {article.author}
              </h3>
              <p className="text-xs text-[#536462]">
                Senior Specialist · LifeCare Multi-Speciality Hospital, Nanded
              </p>
            </div>
            <Link
              href="/book"
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#0F3D3E] text-white text-xs font-bold btn-press btn-teal flex items-center gap-1.5 shadow"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-[#CDEBD8]" />
              <span>Book Consultation</span>
            </Link>
          </div>
        </article>

        {/* Closing CTA */}
        <CtaBanner />
      </main>

      <Footer />
      <StickyActionBar />
    </div>
  );
}
