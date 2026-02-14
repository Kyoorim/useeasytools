"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Lock, Sparkles, WrapText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type CleanerOptions = {
  removeLineBreaks: boolean;
  mergeParagraphs: boolean;
  removeDoubleSpaces: boolean;
  keepSentenceBreaks: boolean;
};

const SENTENCE_BREAK_TOKEN = "__KEEP_SENTENCE_BREAK__";

function cleanText(text: string, options: CleanerOptions) {
  let output = text.replace(/\r\n?/g, "\n");

  if (options.removeLineBreaks) {
    if (options.keepSentenceBreaks) {
      output = output.replace(/([.!?])\n+/g, `$1${SENTENCE_BREAK_TOKEN}`);
      output = output.replace(/\n+/g, " ");
      output = output.replace(new RegExp(SENTENCE_BREAK_TOKEN, "g"), "\n");
    } else {
      output = output.replace(/\n+/g, " ");
    }
  }

  if (options.mergeParagraphs) {
    output = output.replace(/\n{2,}/g, " ");
  }

  if (options.removeDoubleSpaces) {
    output = output.replace(/[ \t]{2,}/g, " ");
    output = output.replace(/ *\n */g, "\n");
  }

  return output.trim();
}

export default function PdfTextCleanerTool() {
  const t = useTranslations("PdfTextCleanerPage");

  const [sourceText, setSourceText] = useState("");
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<CleanerOptions>({
    removeLineBreaks: true,
    mergeParagraphs: true,
    removeDoubleSpaces: true,
    keepSentenceBreaks: false,
  });

  const cleanedText = useMemo(
    () => cleanText(sourceText, options),
    [sourceText, options]
  );

  const toggle = (key: keyof CleanerOptions) => {
    setOptions((prev) => {
      if (key === "keepSentenceBreaks" && !prev.removeLineBreaks) {
        return prev;
      }
      return { ...prev, [key]: !prev[key] };
    });
  };

  const copyResult = async () => {
    if (!cleanedText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(cleanedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:gap-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs text-muted-foreground">
          <Lock className="size-3.5 text-blue-600" />
          <span className="font-medium text-foreground">{t("securityLabel")}</span>
          <span>{t("securityText")}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground lg:text-base">
          {t("heroDescription")}
        </p>
      </div>

      <Card className="border-border/80 bg-white py-0 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]">
        <CardContent className="grid gap-4 p-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-5 lg:p-6">
          <div className="space-y-2">
            <label
              htmlFor="source-text"
              className="text-sm font-semibold text-foreground"
            >
              {t("sourceLabel")}
            </label>
            <textarea
              id="source-text"
              value={sourceText}
              onChange={(event) => setSourceText(event.target.value)}
              placeholder={t("sourcePlaceholder")}
              className="min-h-[280px] w-full rounded-xl border border-input bg-muted/30 p-4 text-sm leading-6 text-foreground outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:min-h-[420px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:w-[220px] lg:flex-col lg:justify-center">
            <Button
              type="button"
              variant={options.removeLineBreaks ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => toggle("removeLineBreaks")}
            >
              <WrapText className="size-4" />
              {t("actions.removeLineBreaks")}
            </Button>
            <Button
              type="button"
              variant={options.mergeParagraphs ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => toggle("mergeParagraphs")}
            >
              <Sparkles className="size-4" />
              {t("actions.mergeParagraphs")}
            </Button>
            <Button
              type="button"
              variant={options.removeDoubleSpaces ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => toggle("removeDoubleSpaces")}
            >
              <Sparkles className="size-4" />
              {t("actions.removeDoubleSpaces")}
            </Button>
            <Button
              type="button"
              variant={options.keepSentenceBreaks ? "secondary" : "outline"}
              className="w-full justify-start"
              onClick={() => toggle("keepSentenceBreaks")}
              disabled={!options.removeLineBreaks}
            >
              <Sparkles className="size-4" />
              {t("actions.keepSentenceBreaks")}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start"
              onClick={copyResult}
              disabled={!cleanedText}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? t("actions.copied") : t("actions.copy")}
            </Button>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="cleaned-text"
              className="text-sm font-semibold text-foreground"
            >
              {t("resultLabel")}
            </label>
            <textarea
              id="cleaned-text"
              value={cleanedText}
              readOnly
              placeholder={t("resultPlaceholder")}
              className="min-h-[280px] w-full rounded-xl border border-input bg-blue-50/30 p-4 text-sm leading-6 text-foreground outline-none lg:min-h-[420px]"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
