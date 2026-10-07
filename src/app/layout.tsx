import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { hospitalConfig, getSiteUrl, isProductionDomain } from "@/config/hospital";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F3D3E",
};

const siteUrl = getSiteUrl();
const isProd = isProductionDomain();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${hospitalConfig.name} - Multi-Speciality Healthcare in Nanded, Maharashtra`,
    template: `%s | ${hospitalConfig.name}, Nanded`,
  },
  description:
    "LifeCare Hospital in Nanded provides 24/7 emergency care, expert doctors, advanced medical treatments, and compassionate patient care across Cardiology, Orthopedics, Pediatrics, Neurology, and more.",
  keywords: [
    "LifeCare Hospital",
    "Hospital in Nanded",
    "Multi-speciality hospital Nanded",
    "Best doctors in Nanded",
    "24/7 Emergency hospital Nanded",
    "Cardiology Nanded",
    "Orthopedic hospital Nanded",
    "Healthcare Maharashtra",
  ],
  authors: [{ name: hospitalConfig.name }],
  creator: hospitalConfig.name,
  publisher: hospitalConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${hospitalConfig.name} - Healing Begins The Moment You Walk In`,
    description:
      "Expert care. Modern treatment. Compassionate healthcare for you and your family in Nanded, Maharashtra.",
    url: "/",
    siteName: hospitalConfig.name,
    images: [
      {
        url: "/images/hero-desktop.webp",
        width: 1200,
        height: 675,
        alt: `${hospitalConfig.name} Medical Team`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${hospitalConfig.name} - Multi-Speciality Hospital in Nanded`,
    description:
      "24/7 Emergency care, modern facilities, and experienced medical specialists in Nanded.",
    images: ["/images/hero-desktop.webp"],
  },
  robots: isProd
    ? {
        index: true,
        follow: true,
      }
    : {
        index: false,
        follow: false,
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-white text-charcoal font-sans flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
