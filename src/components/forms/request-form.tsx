"use client";

import { useState } from "react";
import { Check, Icon, WhatsAppIcon } from "@/components/icons";
import { services } from "@/data/services";
import { trackLeadConversion } from "@/lib/analytics";
import { toLatinDigits } from "@/lib/utils";
import { telHref, whatsappHref } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

export function RequestForm({
  compact = false,
  defaultService,
  contextLabel,
}: {
  compact?: boolean;
  defaultService?: string;
  contextLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService ?? services[0]?.shortName ?? "");
  const [location, setLocation] = useState("");
  const [car, setCar] = useState("");
  const [note, setNote] = useState("");
  const [urgent, setUrgent] = useState(true);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const payload = {
      name,
      phone: toLatinDigits(phone),
      service,
      location,
      car,
      note,
      urgent,
      page: contextLabel ?? (typeof window !== "undefined" ? window.location.pathname : ""),
      honeypot: (event.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "ارسال درخواست انجام نشد. لطفاً تلفنی تماس بگیرید.");
        return;
      }
      trackLeadConversion({
        service,
        page: payload.page,
        urgent,
      });
      setStatus("done");
    } catch {
      setStatus("error");
      setError("ارتباط برقرار نشد. لطفاً با شماره تماس مستقیم درخواست دهید.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-trust-100 bg-trust-50 p-6 text-center">
        <span className="mx-auto mb-3 inline-flex size-12 items-center justify-center rounded-full bg-trust-100 text-trust-700">
          <Check className="size-6" />
        </span>
        <h3 className="text-lg font-extrabold text-trust-700">درخواست شما ثبت شد</h3>
        <p className="mt-2 text-sm leading-7 text-ink-600">
          کارشناس ما در سریع‌ترین زمان با شما تماس می‌گیرد. اگر وضعیت اضطراری است، همین حالا
          تلفنی تماس بگیرید تا درخواست در بالاترین اولویت قرار گیرد.
        </p>
        <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
          <a href={telHref} className="btn bg-alert-500 text-white">
            <Icon name="phone" className="size-4" />
            تماس فوری
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn border border-trust-600 text-trust-700"
          >
            <WhatsAppIcon className="size-4" />
            ارسال لوکیشن در واتساپ
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6"
      aria-label="فرم درخواست امداد خودرو"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
          <Icon name="pin" className="size-5" />
        </span>
        <div>
          <h3 className="text-base font-extrabold text-ink-900">درخواست امداد خودرو</h3>
          <p className="text-xs text-ink-500">
            ثبت درخواست کمتر از یک دقیقه — تماس کارشناس بلافاصله پس از ثبت
          </p>
        </div>
      </div>

      <div className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"}>
        <label className="flex flex-col gap-1.5 sm:col-span-1">
          <span className="text-xs font-bold text-ink-600">نام و نام خانوادگی</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-ink-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400"
            placeholder="مثال: محمد رضایی"
            autoComplete="name"
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-1">
          <span className="text-xs font-bold text-ink-600">شماره تماس</span>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            dir="ltr"
            className="nums rounded-xl border border-ink-200 px-3 py-2.5 text-start text-sm outline-none transition focus:border-brand-400"
            placeholder="0912xxxxxxx"
            autoComplete="tel"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-ink-600">نوع خدمت</span>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-400"
          >
            {services.map((item) => (
              <option key={item.slug} value={item.shortName}>
                {item.shortName}
              </option>
            ))}
            <option value="مشاوره و سؤال فنی">مشاوره و سؤال فنی</option>
            <option value="چکاپ پیش از سفر">چکاپ پیش از سفر</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-ink-600">شهر یا منطقه</span>
          <input
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-xl border border-ink-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400"
            placeholder="مثال: تهران، سعادت‌آباد یا آزادراه تهران-شمال کیلومتر ۱۲"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-ink-600">مدل خودرو</span>
          <input
            value={car}
            onChange={(e) => setCar(e.target.value)}
            className="rounded-xl border border-ink-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400"
            placeholder="مثال: پژو ۲۰۷ اتوماتیک"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-ink-600">توضیح کوتاه مشکل</span>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="rounded-xl border border-ink-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400"
            placeholder="مثال: خودرو استارت نمی‌خورد"
          />
        </label>
      </div>

      {/* تله ضدربات — کاربر واقعی این فیلد را نمی‌بیند */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <label className="mt-4 flex items-start gap-2.5 text-xs leading-6 text-ink-600">
        <input
          type="checkbox"
          checked={urgent}
          onChange={(e) => setUrgent(e.target.checked)}
          className="mt-1 size-4 accent-brand-500"
        />
        وضعیت اضطراری است و به امداد فوری نیاز دارم (اولویت بالاتر در صف درخواست‌ها)
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn mt-4 w-full bg-brand-400 text-ink-950 hover:bg-brand-300 disabled:opacity-70"
      >
        {status === "sending" ? "در حال ارسال…" : "ثبت درخواست امداد"}
      </button>

      {status === "error" ? (
        <p className="mt-3 rounded-xl bg-alert-50 px-3 py-2 text-xs font-bold text-alert-700">
          {error}
        </p>
      ) : null}

      <p className="mt-3 text-center text-[0.7rem] leading-6 text-ink-400">
        اطلاعات شما فقط برای هماهنگی امداد استفاده می‌شود و در اختیار شخص ثالث قرار نمی‌گیرد.
      </p>
    </form>
  );
}
