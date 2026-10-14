import { NextResponse } from "next/server";
import { toLatinDigits } from "@/lib/utils";

type LeadPayload = {
  name?: string;
  phone?: string;
  service?: string;
  location?: string;
  car?: string;
  note?: string;
  urgent?: boolean;
  page?: string;
  honeypot?: string;
};

/** محدودکننده ساده درخواست (در حافظه پروسه) */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clean(value: unknown, max = 400): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "بدنه درخواست نامعتبر است." }, { status: 400 });
  }

  // تله ضدربات
  if (clean(body.honeypot)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "تعداد درخواست‌ها زیاد است. لطفاً تلفنی تماس بگیرید." },
      { status: 429 },
    );
  }

  const name = clean(body.name, 80);
  const phone = toLatinDigits(clean(body.phone, 20)).replace(/[^\d+]/g, "");
  const service = clean(body.service, 80);
  const location = clean(body.location, 160);
  const car = clean(body.car, 80);
  const note = clean(body.note, 600);
  const page = clean(body.page, 160);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "نام را کامل وارد کنید." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ ok: false, error: "شماره تماس معتبر وارد کنید." }, { status: 400 });
  }
  if (location.length < 3) {
    return NextResponse.json({ ok: false, error: "شهر یا منطقه را وارد کنید." }, { status: 400 });
  }

  const lead = {
    name,
    phone,
    service,
    location,
    car,
    note,
    urgent: body.urgent === true,
    page,
    receivedAt: new Date().toISOString(),
    source: "website-form",
  };

  // ارسال به وب‌هوک یا ربات تلگرام در صورت تنظیم متغیرهای محیطی
  const webhook = process.env.LEAD_WEBHOOK_URL;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const tasks: Promise<unknown>[] = [];

  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).catch(() => undefined),
    );
  }

  if (botToken && chatId) {
    const text = [
      "🚨 درخواست امداد جدید",
      `نام: ${lead.name}`,
      `تلفن: ${lead.phone}`,
      `خدمت: ${lead.service || "-"}`,
      `موقعیت: ${lead.location}`,
      `خودرو: ${lead.car || "-"}`,
      `توضیح: ${lead.note || "-"}`,
      `فوری: ${lead.urgent ? "بله" : "خیر"}`,
      `صفحه: ${lead.page || "-"}`,
    ].join("\n");

    tasks.push(
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }).catch(() => undefined),
    );
  }

  if (tasks.length > 0) {
    await Promise.allSettled(tasks);
  }

  // در نبود سرویس اعلان، سرنخ در لاگ سرور ثبت می‌شود تا از دست نرود
  console.info("[lead]", JSON.stringify(lead));

  return NextResponse.json({ ok: true });
}
