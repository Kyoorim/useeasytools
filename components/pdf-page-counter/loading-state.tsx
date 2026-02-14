"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

type LoadingStateProps = {
  fileCount?: number;
};

export function LoadingState({ fileCount }: LoadingStateProps) {
  const t = useTranslations("PdfPageCounterPage");

  return (
    <Card className="border-border/80 bg-white py-8 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]">
      <CardContent className="flex flex-col items-center justify-center gap-3 px-6 text-center">
        <Loader2 className="size-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-muted-foreground">
          {fileCount ? t("loadingWithCount", { count: fileCount }) : t("loading")}
        </p>
      </CardContent>
    </Card>
  );
}
