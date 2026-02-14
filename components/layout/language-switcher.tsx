"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

const locales = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createHref = (nextLocale: string) => {
    const segments = pathname.split("/");
    if (segments.length < 2 || !segments[1]) {
      return `/${nextLocale}`;
    }

    segments[1] = nextLocale;
    const basePath = segments.join("/") || `/${nextLocale}`;
    const query = searchParams.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      {locales.map((item) => {
        const active = item.code === locale;
        return (
          <Button
            key={item.code}
            asChild
            size="sm"
            variant={active ? "default" : "ghost"}
            className="h-8 px-3 text-xs font-semibold"
          >
            <Link href={createHref(item.code)}>{item.label}</Link>
          </Button>
        );
      })}
    </div>
  );
}
