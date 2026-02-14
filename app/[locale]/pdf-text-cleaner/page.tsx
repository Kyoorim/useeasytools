import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PdfTextCleanerTool from "@/components/pdf-text-cleaner/pdf-text-cleaner-tool";
import { getSiteUrl } from "@/lib/site-url";

type Locale = "ko" | "en";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const getLocale = (locale: string): Locale => (locale === "en" ? "en" : "ko");

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocale(locale);
  const imageUrl = `/${currentLocale}/opengraph-image`;
  const t = await getTranslations({
    locale: currentLocale,
    namespace: "PdfTextCleanerPage",
  });

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      absolute: t("seoTitle"),
    },
    description: t("seoDescription"),
    alternates: {
      canonical: `/${currentLocale}/pdf-text-cleaner`,
      languages: {
        ko: "/ko/pdf-text-cleaner",
        en: "/en/pdf-text-cleaner",
        "x-default": "/ko/pdf-text-cleaner",
      },
    },
    openGraph: {
      type: "website",
      siteName: "UseEasyTools",
      title: t("seoTitle"),
      description: t("seoDescription"),
      url: `/${currentLocale}/pdf-text-cleaner`,
      locale: currentLocale === "ko" ? "ko_KR" : "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "UseEasyTools",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: t("seoTitle"),
      description: t("seoDescription"),
      images: [imageUrl],
    },
  };
}

export default function PdfTextCleanerPage() {
  return <PdfTextCleanerTool />;
}
