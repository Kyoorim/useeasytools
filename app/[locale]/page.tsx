import Link from "next/link";
import { useTranslations } from "next-intl";
import { SecurityBadge } from "@/components/layout/security-badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] lg:p-12">
        <p className="text-sm font-medium text-blue-600">{t("eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground lg:text-lg">
          {t("description")}
        </p>
        <div className="mt-7">
          <Button
            asChild
            className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700"
          >
            <Link href="pdf-page-counter">{t("cta")}</Link>
          </Button>
        </div>
      </div>
      <SecurityBadge />
    </section>
  );
}
