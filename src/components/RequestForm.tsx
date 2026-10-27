"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Car, CircleCheckBig, Clock3, MapPin, MessageSquareText, Phone, RotateCcw, Send, User } from "lucide-react";
import { SERVICES, SITE } from "@/lib/data";
import Reveal from "./Reveal";

type FormState = {
  name: string;
  mobile: string;
  service: string;
  car: string;
  address: string;
  note: string;
};

const EMPTY: FormState = { name: "", mobile: "", service: "repair", car: "", address: "", note: "" };

function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-navy-850 px-4 py-3 text-[15px] text-white placeholder:text-silver-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";

export default function RequestForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (SERVICES.some((s) => s.id === id)) {
        setForm((prev) => ({ ...prev, service: id }));
        setTracking(null);
      }
    };
    window.addEventListener("khodrochare:select-service", handler);
    return () => window.removeEventListener("khodrochare:select-service", handler);
  }, []);

  const set = (key: keyof FormState) => (e: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const mobile = toLatinDigits(form.mobile).replace(/\s/g, "");
    if (!form.name.trim()) return setError("لطفاً نام خود را وارد کنید.");
    if (!/^09\d{9}$/.test(mobile)) return setError("شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
    if (!form.address.trim()) return setError("لطفاً نشانی یا محدوده محل خودرو را بنویسید.");
    setError("");

    const code = `KC-${Math.floor(100000 + Math.random() * 900000)}`;
    try {
      const saved = JSON.parse(localStorage.getItem("khodrochare-requests") ?? "[]");
      saved.push({ ...form, mobile, code, at: new Date().toISOString() });
      localStorage.setItem("khodrochare-requests", JSON.stringify(saved));
    } catch {
      /* ذخیره‌سازی محلی در دسترس نیست */
    }
    setTracking(code);
  }

  const selectedService = SERVICES.find((s) => s.id === form.service);

  return (
    <section id="request" className="relative scroll-mt-28 overflow-hidden bg-navy-950">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-16 hidden h-56 w-10 -skew-x-[24deg] bg-brand-500/80 lg:block" aria-hidden />
      <div className="pointer-events-none absolute -right-8 top-16 hidden h-56 w-4 -skew-x-[24deg] bg-navy-600 lg:block" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-extrabold tracking-wide text-brand-400">ثبت درخواست آنلاین</p>
          <h2 className="mt-3 text-3xl font-black leading-snug text-white sm:text-4xl">
            درخواست امداد خودرو چاره را همین حالا ثبت کنید
          </h2>
          <p className="mt-4 text-base leading-8 text-silver-400">
            فرم زیر را تکمیل کنید؛ کارشناس خودرو چاره در چند دقیقه با شما تماس می‌گیرد، هزینه را
            اعلام و نزدیک‌ترین تکنسین را اعزام می‌کند.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.5fr]">
          {/* ستون تماس سریع */}
          <Reveal>
            <aside className="flex h-full flex-col gap-4 rounded-3xl bg-brand-500 p-7 text-navy-950">
              <h3 className="text-xl font-black">عجله دارید؟ تماس بگیرید</h3>
              <p className="text-[15px] font-medium leading-8">
                اگر خودرو وسط راه مانده یا شرایط اضطراری است، منتظر فرم نبمانید؛ اپراتورهای خودرو
                چاره شبانه‌روزی پشت خط هستند.
              </p>

              <a
                href={SITE.phoneShortHref}
                className="rounded-2xl bg-navy-950 px-5 py-4 text-center text-white transition hover:bg-navy-900"
              >
                <span className="flex items-center justify-center gap-2 text-xs font-bold text-silver-400">
                  <Phone className="size-4 text-brand-400" aria-hidden />
                  خط ویژه امداد خودرو چاره
                </span>
                <span className="mt-1 block text-2xl font-black tracking-wide" dir="ltr">
                  {SITE.phoneShort}
                </span>
              </a>

              <a
                href={SITE.phoneMainHref}
                className="rounded-2xl border-2 border-navy-950/25 px-5 py-4 text-center transition hover:bg-navy-950 hover:text-white"
              >
                <span className="block text-xs font-bold opacity-70">مرکز خودرو چاره</span>
                <span className="mt-1 block text-xl font-black tracking-wide" dir="ltr">
                  {SITE.phoneMain}
                </span>
              </a>

              <p className="mt-auto flex items-center gap-2 pt-2 text-sm font-bold">
                <Clock3 className="size-5" aria-hidden />
                {SITE.hours}
              </p>
            </aside>
          </Reveal>

          {/* فرم درخواست */}
          <Reveal delay={120}>
            <div className="rounded-3xl bg-navy-900 p-7 ring-1 ring-white/10 sm:p-9">
              {tracking ? (
                <div className="py-6 text-center">
                  <CircleCheckBig className="mx-auto size-16 text-brand-400" aria-hidden />
                  <h3 className="mt-5 text-2xl font-black text-white">درخواست شما ثبت شد</h3>
                  <p className="mx-auto mt-3 max-w-md text-[15px] leading-8 text-silver-300">
                    درخواست «{selectedService?.title}» برای {form.name} ثبت شد. کارشناس خودرو چاره
                    تا چند دقیقه دیگر با شماره <span dir="ltr">{form.mobile}</span> تماس می‌گیرد.
                  </p>
                  <p className="mx-auto mt-6 w-fit rounded-2xl bg-navy-850 px-6 py-3 ring-1 ring-dashed ring-brand-500/50">
                    <span className="block text-xs font-bold text-silver-400">کد پیگیری درخواست</span>
                    <span className="mt-1 block text-xl font-black tracking-widest text-brand-400" dir="ltr">
                      {tracking}
                    </span>
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                      href={SITE.phoneShortHref}
                      className="flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-extrabold text-navy-950 transition hover:bg-brand-400"
                    >
                      <Phone className="size-4" aria-hidden />
                      تماس فوری با امداد
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(EMPTY);
                        setTracking(null);
                      }}
                      className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-brand-500 hover:text-brand-300"
                    >
                      <RotateCcw className="size-4" aria-hidden />
                      ثبت درخواست جدید
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-1.5 text-sm font-bold text-silver-300">
                        <User className="size-4 text-brand-400" aria-hidden />
                        نام و نام خانوادگی
                      </span>
                      <input
                        className={inputClass}
                        value={form.name}
                        onChange={set("name")}
                        placeholder="مثلاً: علی رضایی"
                        autoComplete="name"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-1.5 text-sm font-bold text-silver-300">
                        <Phone className="size-4 text-brand-400" aria-hidden />
                        شماره موبایل
                      </span>
                      <input
                        className={inputClass}
                        value={form.mobile}
                        onChange={set("mobile")}
                        placeholder="۰۹۱۲ ـــ ـــ ـــ"
                        inputMode="tel"
                        autoComplete="tel"
                        dir="ltr"
                        style={{ textAlign: "right" }}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-1.5 text-sm font-bold text-silver-300">
                        <Car className="size-4 text-brand-400" aria-hidden />
                        نوع خدمت
                      </span>
                      <select className={inputClass} value={form.service} onChange={set("service")}>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                        <option value="other">سایر خدمات خودرو در محل</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-1.5 text-sm font-bold text-silver-300">
                        <Car className="size-4 text-brand-400" aria-hidden />
                        مدل خودرو
                      </span>
                      <input
                        className={inputClass}
                        value={form.car}
                        onChange={set("car")}
                        placeholder="مثلاً: پژو ۲۰۷ دنده‌ای"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="mb-2 flex items-center gap-1.5 text-sm font-bold text-silver-300">
                        <MapPin className="size-4 text-brand-400" aria-hidden />
                        نشانی یا محدوده محل خودرو
                      </span>
                      <input
                        className={inputClass}
                        value={form.address}
                        onChange={set("address")}
                        placeholder="مثلاً: تهران، سعادت‌آباد، خیابان سرو شرقی، پلاک ۱۲"
                        autoComplete="street-address"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="mb-2 flex items-center gap-1.5 text-sm font-bold text-silver-300">
                        <MessageSquareText className="size-4 text-brand-400" aria-hidden />
                        توضیح مشکل خودرو (اختیاری)
                      </span>
                      <textarea
                        className={`${inputClass} min-h-24 resize-y`}
                        value={form.note}
                        onChange={set("note")}
                        placeholder="اگر توضیحی هست بنویسید؛ مثلاً: خودرو استارت نمی‌خورد و چراغ چک روشن شده است."
                      />
                    </label>
                  </div>

                  {error && (
                    <p role="alert" className="mt-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 ring-1 ring-red-500/30">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-4 text-base font-extrabold text-navy-950 shadow-[0_16px_36px_rgba(255,122,0,0.3)] transition hover:bg-brand-400"
                  >
                    <Send className="size-5 -scale-x-100" aria-hidden />
                    ثبت درخواست امداد خودرو چاره
                  </button>
                  <p className="mt-4 text-center text-xs leading-6 text-silver-500">
                    با ثبت درخواست، کارشناس خودرو چاره برای هماهنگی و اعلام هزینه با شما تماس می‌گیرد.
                    هیچ هزینه‌ای پیش از انجام خدمت دریافت نمی‌شود.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
