import type { MetadataRoute } from "next";
import { getSiteUrl, isProductionDomain } from "@/config/hospital";

export default function robots(): MetadataRoute.Robots {
  const isProd = isProductionDomain();
  const siteUrl = getSiteUrl();

  if (!isProd) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
