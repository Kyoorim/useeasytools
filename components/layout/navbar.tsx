import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar() {
  const t = useTranslations("Navbar");

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-blue-600 lg:text-xl"
          >
            {t("logo")}
          </Link>
          <p className="hidden text-sm text-muted-foreground lg:block">
            {t("tagline")}
          </p>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
