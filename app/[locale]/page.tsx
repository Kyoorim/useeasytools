import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-6">
      <main className="w-full max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">{t("title")}</h1>
        <p className="mt-4 text-zinc-600">{t("description")}</p>
      </main>
    </div>
  );
}
