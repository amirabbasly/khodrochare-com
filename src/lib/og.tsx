import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

/**
 * سازنده تصویر اوپن‌گراف مشترک برای همه صفحات.
 * فونت وزیرمتن به‌صورت محلی خوانده می‌شود تا متن فارسی بدون وابستگی به
 * سرویس بیرونی و بدون مشکل نبود گلیف رندر شود.
 */
let fontsCache: { name: string; data: ArrayBuffer; weight: 400 | 700 | 800 }[] | null = null;

async function loadFonts() {
  if (fontsCache) return fontsCache;
  const read = async (file: string) => {
    const buffer = await readFile(path.join(process.cwd(), "src/app/fonts", file));
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ) as ArrayBuffer;
  };
  fontsCache = [
    { name: "Vazirmatn", data: await read("Vazirmatn-Regular.ttf"), weight: 400 },
    { name: "Vazirmatn", data: await read("Vazirmatn-Bold.ttf"), weight: 700 },
    { name: "Vazirmatn", data: await read("Vazirmatn-ExtraBold.ttf"), weight: 800 },
  ];
  return fontsCache;
}

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export async function renderOg({
  eyebrow,
  title,
  subtitle,
  badges = [],
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  badges?: string[];
}) {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #0b1220 0%, #121c2e 45%, #1a2436 100%)",
          fontFamily: "Vazirmatn",
          color: "#ffffff",
          direction: "rtl",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 20,
              background: "#f79009",
              color: "#0b1220",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            چ
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 30, fontWeight: 800 }}>{siteConfig.brand.fa}</div>
            <div style={{ fontSize: 20, color: "#9fb0c9" }}>{siteConfig.brand.tagline}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(247,144,9,0.16)",
              color: "#fbbf24",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 42 ? 58 : 68,
              fontWeight: 800,
              lineHeight: 1.35,
              letterSpacing: 0,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#b9c6d8", lineHeight: 1.6 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {(badges.length > 0
            ? badges
            : ["۲۴ ساعته", "تهران و حومه", "آزادراه‌های شمال"]
          ).map((badge) => (
            <div
              key={badge}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.06)",
                fontSize: 22,
                color: "#e7edf6",
              }}
            >
              {badge}
            </div>
          ))}
          <div style={{ marginRight: "auto", fontSize: 22, color: "#8ea0b8" }}>
            {siteConfig.seoHost}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: fonts.map((font) => ({ ...font, style: "normal" as const })),
    },
  );
}
