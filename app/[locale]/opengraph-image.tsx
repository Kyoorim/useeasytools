import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isKorean = locale !== "en";

  const title = "UseEasyTools";
  const subtitle = isKorean
    ? "브라우저 기반 PDF 유틸리티"
    : "Browser-based PDF utilities";
  const feature = isKorean
    ? "PDF 페이지 카운터 · 텍스트 정제기"
    : "PDF Page Counter · Text Cleaner";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #eff6ff 0%, #dbeafe 45%, #bfdbfe 100%)",
          position: "relative",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: "9999px",
            background: "rgba(37,99,235,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -90,
            left: -60,
            width: 320,
            height: 320,
            borderRadius: "9999px",
            background: "rgba(29,78,216,0.14)",
          }}
        />

        <div
          style={{
            margin: "56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: 36,
            padding: "44px 48px",
            background: "rgba(255,255,255,0.88)",
            border: "1px solid rgba(148,163,184,0.3)",
            boxShadow: "0 24px 70px -30px rgba(15,23,42,0.45)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "inline-flex",
                width: "fit-content",
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 24,
                fontWeight: 700,
                color: "#1d4ed8",
                background: "#eff6ff",
              }}
            >
              100% Client-side
            </div>
            <div
              style={{
                fontSize: 78,
                lineHeight: 1.05,
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 34,
                color: "#334155",
                fontWeight: 600,
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                borderRadius: 16,
                padding: "12px 18px",
                fontSize: 27,
                color: "#1e3a8a",
                background: "#dbeafe",
                fontWeight: 700,
              }}
            >
              {feature}
            </div>
            <div
              style={{
                fontSize: 24,
                color: "#475569",
                fontWeight: 600,
              }}
            >
              useeasytools.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
