"use client";

import {
  type ChangeEvent,
  type DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Lock, Upload } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useTranslations } from "next-intl";
import { LoadingState } from "@/components/pdf-page-counter/loading-state";
import {
  type PageCountItem,
  ResultCard,
} from "@/components/pdf-page-counter/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MAX_FILE_COUNT = 20;
const MAX_FILE_SIZE_MB = 50;
const MAX_TOTAL_SIZE_MB = 200;

const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;

export default function PdfPageCounterPage() {
  const t = useTranslations("PdfPageCounterPage");
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFileCount, setLoadingFileCount] = useState(0);
  const [resultItems, setResultItems] = useState<PageCountItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const isPdfFile = (file: File) => {
    if (file.type === "application/pdf") {
      return true;
    }

    return file.name.toLowerCase().endsWith(".pdf");
  };

  const processFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    if (files.length > MAX_FILE_COUNT) {
      setErrorMessage(t("errors.tooManyFiles", { max: MAX_FILE_COUNT }));
      setResultItems([]);
      return;
    }

    const invalidFile = files.find((file) => !isPdfFile(file));
    if (invalidFile) {
      setErrorMessage(t("errors.invalidPdf"));
      setResultItems([]);
      return;
    }

    const tooLargeFile = files.find((file) => file.size > MAX_FILE_SIZE_BYTES);
    if (tooLargeFile) {
      setErrorMessage(
        t("errors.fileTooLarge", {
          name: tooLargeFile.name,
          maxSize: MAX_FILE_SIZE_MB,
        })
      );
      setResultItems([]);
      return;
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      setErrorMessage(t("errors.totalTooLarge", { maxTotal: MAX_TOTAL_SIZE_MB }));
      setResultItems([]);
      return;
    }

    setIsLoading(true);
    setLoadingFileCount(files.length);
    setErrorMessage(null);
    setResultItems([]);

    const nextItems: PageCountItem[] = [];
    const failedFiles: string[] = [];

    try {
      for (const file of files) {
        try {
          const buffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
          nextItems.push({
            fileName: file.name,
            pageCount: pdf.getPageCount(),
            fileSize: file.size,
          });
        } catch {
          failedFiles.push(file.name);
        }
      }

      setResultItems(nextItems);

      if (failedFiles.length > 0) {
        setErrorMessage(t("errors.failedSome", { count: failedFiles.length }));
      }
    } finally {
      setIsLoading(false);
      setLoadingFileCount(0);
    }
  }, [t]);

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      if (isLoading) {
        return;
      }

      const files = Array.from(event.clipboardData?.files ?? []);
      if (files.length === 0) {
        return;
      }

      event.preventDefault();
      void processFiles(files);
    };

    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("paste", onPaste);
    };
  }, [isLoading, processFiles]);

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }
    await processFiles(files);
    event.target.value = "";
  };

  const onDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files ?? []);
    if (files.length === 0) {
      return;
    }
    await processFiles(files);
  };

  const resetState = () => {
    setResultItems([]);
    setErrorMessage(null);
    setIsLoading(false);
    setLoadingFileCount(0);
    setIsDragging(false);
  };

  const totalPages = resultItems.reduce((sum, item) => sum + item.pageCount, 0);

  return (
    <section className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-8 lg:gap-10">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground lg:text-base">
          {t("heroDescription")}
        </p>
      </div>

      <div className="w-full space-y-4">
        {isLoading ? (
          <LoadingState fileCount={loadingFileCount} />
        ) : resultItems.length > 0 ? (
          <ResultCard
            items={resultItems}
            totalPages={totalPages}
            onReset={resetState}
          />
        ) : (
          <Card
            className={cn(
              "w-full border-2 border-dashed border-slate-300 bg-white py-0 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] transition-colors duration-200",
              isDragging && "border-blue-600 bg-blue-50/40"
            )}
          >
            <CardContent
              className="cursor-pointer px-5 py-12 text-center lg:px-10 lg:py-16"
              onClick={openFilePicker}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                multiple
                className="hidden"
                onChange={onFileChange}
              />
              <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
                <div className="rounded-full bg-blue-50 p-4 text-blue-600">
                  <Upload className="size-7" />
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {t("dropzoneTitle")}
                </p>
                <p className="text-sm text-muted-foreground">{t("dropzoneHint")}</p>
                <p className="text-xs text-muted-foreground">{t("limitHint")}</p>
                <p className="text-xs text-muted-foreground">{t("pasteHint")}</p>
                <Button
                  type="button"
                  className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700"
                  onClick={(event) => {
                    event.stopPropagation();
                    openFilePicker();
                  }}
                >
                  {t("chooseFile")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {errorMessage && (
          <p className="text-center text-sm font-medium text-destructive">
            {errorMessage}
          </p>
        )}

        <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white/80 px-4 py-3 text-center text-xs text-muted-foreground lg:text-sm">
          <Lock className="size-4 shrink-0 text-blue-600" />
          <p>
            <span className="mr-1 font-semibold text-foreground">
              {t("privacyLabel")}
            </span>
            {t("privacyText")}
          </p>
        </div>
      </div>
    </section>
  );
}
