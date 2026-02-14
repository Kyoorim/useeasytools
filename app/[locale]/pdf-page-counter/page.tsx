import type { Metadata } from "next";
import PdfPageCounterTool from "@/components/pdf-page-counter/pdf-page-counter-tool";
import { getSiteUrl } from "@/lib/site-url";

type Locale = "ko" | "en";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const SEO_BY_LOCALE: Record<
  Locale,
  { title: string; description: string; appName: string; appDescription: string }
> = {
  ko: {
    title: "무료 온라인 PDF 페이지 수 세기 - 설치 없는 안전한 보안 카운터",
    description:
      "브라우저에서 PDF 페이지 수를 즉시 확인하세요. 업로드 없이 안전하게 동작하는 무료 온라인 페이지 카운터입니다.",
    appName: "PDF 페이지 수 세기",
    appDescription:
      "설치 없이 브라우저에서 PDF 페이지 수를 분석하는 무료 온라인 도구",
  },
  en: {
    title: "Free Online PDF Page Counter - Secure & No Upload Required",
    description:
      "Count PDF pages instantly in your browser. A free and secure online page counter with no upload required.",
    appName: "PDF Page Counter",
    appDescription:
      "Free online tool to count PDF pages directly in your browser with no upload required",
  },
};

const getLocale = (locale: string): Locale => (locale === "en" ? "en" : "ko");

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocale(locale);
  const seo = SEO_BY_LOCALE[currentLocale];

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      absolute: seo.title,
    },
    description: seo.description,
    alternates: {
      canonical: `/${currentLocale}/pdf-page-counter`,
      languages: {
        ko: "/ko/pdf-page-counter",
        en: "/en/pdf-page-counter",
        "x-default": "/ko/pdf-page-counter",
      },
    },
    openGraph: {
      type: "website",
      siteName: "UseEasyTools",
      title: seo.title,
      description: seo.description,
      url: `/${currentLocale}/pdf-page-counter`,
      locale: currentLocale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function PdfPageCounterPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = getLocale(locale);
  const seo = SEO_BY_LOCALE[currentLocale];
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${currentLocale}/pdf-page-counter`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: seo.appName,
    description: seo.appDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    inLanguage: currentLocale,
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript. Runs in modern browsers.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Count pages from multiple PDF files",
      "Client-side processing in the browser",
      "No file upload required",
    ],
    url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PdfPageCounterTool />
    </>
  );
}
