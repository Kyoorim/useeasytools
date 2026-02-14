import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-8">
        <p className="text-sm text-muted-foreground">
          {t("copyright", { year })}
        </p>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="transition-colors hover:text-foreground">
            {t("privacy")}
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground">
            {t("terms")}
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground">
            {t("contact")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
