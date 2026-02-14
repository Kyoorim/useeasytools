"use client";

import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type PageCountItem = {
  fileName: string;
  pageCount: number;
  fileSize: number;
};

type ResultCardProps = {
  items: PageCountItem[];
  totalPages: number;
  onReset: () => void;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return `${Math.ceil(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function ResultCard({ items, totalPages, onReset }: ResultCardProps) {
  const t = useTranslations("PdfPageCounterPage");

  return (
    <Card className="border-border/80 bg-white shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{t("resultTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-2xl bg-blue-50 px-6 py-7 text-center">
          <p className="text-sm font-medium text-blue-700">{t("resultCountLabel")}</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-blue-700 lg:text-5xl">
            {totalPages}
          </p>
          <p className="text-sm text-blue-700">{t("resultCountUnit")}</p>
          <p className="mt-2 text-xs font-medium text-blue-700">
            {t("resultFileCount", { count: items.length })}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">{t("resultFileList")}</p>
          <div className="max-h-72 overflow-auto rounded-xl border border-border">
            <ul className="divide-y divide-border">
              {items.map((item, index) => (
                <li
                  key={`${item.fileName}-${index}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-foreground">
                      <FileText className="size-4 shrink-0 text-blue-600" />
                      <span className="truncate">{item.fileName}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatSize(item.fileSize)}
                    </p>
                  </div>
                  <span className="shrink-0 font-semibold text-blue-700">
                    {t("resultItemPages", { count: item.pageCount })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={onReset}
        >
          {t("reset")}
        </Button>
      </CardContent>
    </Card>
  );
}
