import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

export function SecurityBadge() {
  const t = useTranslations("SecurityBadge");

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] lg:p-6">
      <Badge
        variant="secondary"
        className="mb-3 rounded-full bg-blue-50 px-3 py-1 text-blue-700"
      >
        <ShieldCheck className="mr-1.5 size-4" />
        {t("label")}
      </Badge>
      <p className="text-base font-semibold text-foreground">{t("title")}</p>
      <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
    </div>
  );
}
