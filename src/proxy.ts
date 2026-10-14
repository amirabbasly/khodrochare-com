import { NextResponse, type NextRequest } from "next/server";
import { seoUrl, siteConfig } from "@/lib/site";

/**
 * Proxy (.com / دامنه تبلیغات)
 * ---------------------------------------------------------------
 * این مخزن روی دو دامنه سرو می‌شود:
 *  - khodrochare.ir : نسخه سئو و محتوایی (ایندکس‌پذیر)
 *  - khodrochare.com : نسخه تبلیغاتی (لندینگ ادز)
 *
 * برای اینکه دامنه تبلیغاتی باعث محتوای تکراری یا رقابت با دامنه سئو
 * نشود، همه پاسخ‌های .com با هدر X-Robots-Tag: noindex ارسال می‌شوند و
 * هدر Link با rel=canonical به معادل همان صفحه روی دامنه .ir اشاره می‌کند.
 * اگر NEXT_PUBLIC_NOINDEX_ADS_DOMAIN=false باشد، این رفتار غیرفعال می‌شود.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // هدرهای امنیتی پایه (بدون محدودیت فریم تا پیش‌نمایش‌ها کار کنند)
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(self)",
  );

  if (!siteConfig.noindexAdsDomain) return response;

  const host = (request.headers.get("host") ?? "").toLowerCase().split(":")[0];
  const isAdsDomain = host === siteConfig.adsHost || host.endsWith(`.${siteConfig.adsHost}`);

  if (isAdsDomain) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
    const path = request.nextUrl.pathname;
    const canonical = seoUrl(path === "/" ? "/" : path);
    response.headers.set("Link", `<${canonical}>; rel="canonical"`);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * همه مسیرها به‌جز فایل‌های ایستا و مسیرهای سیستمی نقشه سایت و ربات‌ها
     * (این دو باید بدون هدر اضافه سرو شوند تا crawler بتواند بخواندشان).
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|avif|ico|woff2)$).*)",
  ],
};
