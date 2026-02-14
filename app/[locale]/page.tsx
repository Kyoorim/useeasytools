import Link from "next/link";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { SecurityBadge } from "@/components/layout/security-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] lg:p-12">
        <p className="text-sm font-medium text-blue-600">{t("eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground lg:text-lg">
          {t("description")}
        </p>
        <div className="mt-8">
          <h2 className="text-base font-semibold text-foreground lg:text-lg">
            {t("toolsHeading")}
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Card className="border-border/80 bg-white shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]">
              <CardHeader className="pb-0">
                <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText className="size-5" />
                </div>
                <CardTitle>{t("tools.pageCounter.title")}</CardTitle>
                <CardDescription>{t("tools.pageCounter.description")}</CardDescription>
              </CardHeader>
              <CardContent />
              <CardFooter>
                <Button
                  asChild
                  className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700"
                >
                  <Link href="pdf-page-counter">
                    {t("tools.openTool")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-border/80 bg-white shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]">
              <CardHeader className="pb-0">
                <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles className="size-5" />
                </div>
                <CardTitle>{t("tools.textCleaner.title")}</CardTitle>
                <CardDescription>{t("tools.textCleaner.description")}</CardDescription>
              </CardHeader>
              <CardContent />
              <CardFooter>
                <Button
                  asChild
                  className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700"
                >
                  <Link href="pdf-text-cleaner">
                    {t("tools.openTool")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <SecurityBadge />
    </section>
  );
}
