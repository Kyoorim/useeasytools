import type { Metadata } from "next";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "UseEasyTools",
    template: "%s | UseEasyTools",
  },
  description:
    "Secure browser-based utilities for PDF and file workflows. Your files never leave your browser.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(
              clarityId
            )});`}
          </Script>
        )}
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
