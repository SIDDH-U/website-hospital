import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { hospitalConfig, getSiteUrl } from "@/config/hospital";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { CtaBanner } from "@/components/CtaBanner";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Health & Wellness Blog",
  description: `Read verified health tips, disease prevention guidance, and medical articles written by doctors and specialists at ${hospitalConfig.name}, Nanded.`,
  alternates: {
    canonical: `${getSiteUrl()}/blog`,
  },
  openGraph: {
    title: `Health & Wellness Blog | ${hospitalConfig.name}`,
    description: `Practical healthcare articles and wellness guides from the medical faculty at ${hospitalConfig.name}, Nanded.`,
    url: `${getSiteUrl()}/blog`,
    siteName: hospitalConfig.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `Health Blog at ${hospitalConfig.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function BlogIndexPage() {
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
              <span className="text-white/60">Health Blog</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#CDEBD8]/20 text-[#CDEBD8] border border-[#CDEBD8]/30 mb-3">
              WELLNESS & MEDICAL INSIGHTS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              LifeCare Health & Wellness Blog
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Practical health advice, preventive wellness guides, and expert perspectives written by our senior medical faculty in Nanded.
            </p>
          </div>
        </section>

        {/* 3 Blog Article Cards */}
        <section className="py-12 sm:py-16 lg:py-20 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {hospitalConfig.blogArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-3xl bg-[#F7F5EF] border border-[#EBE7DC] p-5 sm:p-6 card-press card-hover-shadow"
              >
                <div>
                  {/* Article Photo (16:10) */}
                  <Link
                    href={`/blog/${article.slug}`}
                    className="block relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#E2EBE5] mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FBFA3]"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover hover-img-zoom"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex items-center gap-3 text-xs text-[#536462] font-semibold mb-2.5">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link href={`/blog/${article.slug}`}>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#0F3D3E] group-hover:text-[#2DA870] transition-colors leading-snug">
                      {article.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#536462] mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EBE7DC] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F3D3E]">
                    By {article.author}
                  </span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-bold text-[#2DA870] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-[#2DA870]" />
                  </Link>
                </div>
              </article>
            ))}
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
