import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const routes = [
    { path: "/ko", priority: 1, changeFrequency: "weekly" as const },
    { path: "/en", priority: 0.9, changeFrequency: "weekly" as const },
    {
      path: "/ko/pdf-page-counter",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/en/pdf-page-counter",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/ko/pdf-text-cleaner",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/en/pdf-text-cleaner",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
