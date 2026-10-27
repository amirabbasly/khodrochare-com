"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import {
  Car,
  CircleCheckBig,
  ClipboardList,
  Clock,
  MapPin,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  User,
  Wrench,
} from "lucide-react";
import { SERVICES, SITE, isValidMobile } from "@/lib/data";
import Reveal from "./Reveal";

const STORAGE_KEY = "khodrochare-requests";

type FormState = {
  name: string;
  mobile: string;
  service: string;
  car: string;
  address: string;
  note: string;
};

const INITIAL: FormState = {
  name: "",
  mobile: "",
  service: SERVICES[0].id,
  car: "",
  address: "",
  note: "",
};

const inputClass =
  "w-full rounded-2xl border border-navy-100 bg-paper px-4 py-3 text-[15px] text-navy-900 placeholder:text-silver-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15";

const labelClass = "mb-2 flex items-center gap-1.5 text-sm font-extrabold text-navy-900";

export default function RequestForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [error, setError] = useState("");
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const formId = useId();

  useEffect(() => {
    const handler = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (SERVICES.some((s) => s.id === id)) {
        setForm((prev) => ({ ...prev, service: id }));
        setTrackingCode(null);
        setError("");
      }
    };
    window.addEventListener("khodrochare:select-service", handler);
    return () => window.removeEventListener("khodrochare:select-service", handler);
  }, []);

  const set = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      setError("لطفاً نام و نام خانوادگی را وارد کنید.");
      return;
    }
    if (!isValidMobile(form.mobile)) {
      setError("لطفاً شماره موبایل معتبر وارد کنید؛ مثل ۰۹۱۲۳۴۵۶۷۸۹.");
      return;
    }
    if (form.address.trim().length < 5) {
      setError("لطفاً نشانی یا محل توقف خودرو را بنویسید تا امداد سریع‌تر برسد.");
      return;
    }
    setError("");

    const code = `KC-${Math.floor(100000 + Math.random() * 900000)}`;
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown[];
      prev.push({ ...form, code, createdAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
    } catch {
      // ذخیره‌سازی محلی ممکن است در برخی مرورگرها غیرفعال باشد
    }
    setTrackingCode(code);
  };

  const reset = () => {
    setForm(INITIAL);
    setTrackingCode(null);
    setError("");
  };

  return (
    <section id="request" className="scroll-mt-28 bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-1.5 text-[13px] font-extrabold text-navy-950">
            <ClipboardList className="size-4" aria-hidden />
            ثبت درخواست آنلاین
          </span>
          <h2 className="mt-4 text-3xl font-black leading-snug text-navy-900 sm:text-4xl">
            درخواست امداد خودرو چاره را همین حالا ثبت کنید
          </h2>
          <p className="mt-4 leading-8 text-silver-600">
            فرم زیر را تکمیل کنید تا کارشناس خودرو چاره برای هماهنگی و اعلام هزینه با شما تماس
            بگیرد؛ یا اگر عجله دارید، مستقیم تماس بگیرید.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-navy-900/10 ring-1 ring-navy-900/5 lg:grid-cols-5">
            {/* پنل اطلاعات تماس */}
            <aside className="relative bg-navy-900 px-7 py-9 text-white lg:col-span-2">
              <div className="dot-grid-dark absolute inset-0" aria-hidden />
              <div className="relative">
                <Image
                  src="/images/logo-mark.png"
                  alt=""
                  width={512}
                  height={512}
                  className="size-16 rounded-2xl ring-1 ring-white/15"
                />
                <h3 className="mt-5 text-xl font-black">خودرو چاره پاسخگوی شماست</h3>
                <p className="mt-2 text-[15px] leading-8 text-navy-200">
                  امداد خودرو و خدمات خودرو در محل در تهران؛ مشاوره و اعلام هزینه پیش از اعزام رایگان
                  است.
                </p>

                <div className="mt-7 space-y-3">
                  <a
                    href={SITE.phoneShortHref}
                    className="flex items-center justify-between rounded-2xl bg-brand-500 px-5 py-4 font-extrabold text-navy-950 transition hover:bg-brand-400"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="size-5" aria-hidden />
                      خط فوری امداد
                    </span>
                    <span dir="ltr" className="text-lg">
                      {SITE.phoneShort}
                    </span>
                  </a>
                  <a
                    href={SITE.phoneMainHref}
                    className="flex items-center justify-between rounded-2xl bg-navy-800 px-5 py-4 font-extrabold text-white ring-1 ring-white/10 transition hover:bg-navy-700"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="size-5 text-brand-400" aria-hidden />
                      مرکز خودرو چاره
                    </span>
                    <span dir="ltr" className="text-lg">
                      {SITE.phoneMain}
                    </span>
                  </a>
                </div>

                <ul className="mt-7 space-y-3.5 text-[15px] font-semibold text-navy-100">
                  <li className="flex items-center gap-2.5">
                    <Clock className="size-5 shrink-0 text-brand-400" aria-hidden />
                    {SITE.hours}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MapPin className="size-5 shrink-0 text-brand-400" aria-hidden />
                    اعزام امداد به سراسر تهران و حومه
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="size-5 shrink-0 text-brand-400" aria-hidden />
                    اعلام هزینه قبل از اعزام + ضمانت خدمت
                  </li>
                </ul>
              </div>
            </aside>

            {/* فرم */}
            <div className="px-7 py-9 sm:px-9 lg:col-span-3">
              {trackingCode ? (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <span className="flex size-20 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <CircleCheckBig className="size-10" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-2xl font-black text-navy-900">
                    درخواست شما با موفقیت ثبت شد
                  </h3>
                  <p className="mt-3 max-w-md leading-8 text-silver-600">
                    کارشناس خودرو چاره به‌زودی با شما تماس می‌گیرد و پس از اعلام هزینه، نزدیک‌ترین
                    تکنسین اعزام می‌شود. کد پیگیری درخواست:
                  </p>
                  <p
                    dir="ltr"
                    className="mt-4 rounded-2xl bg-navy-900 px-6 py-3 text-xl font-black tracking-widest text-brand-400"
                  >
                    {trackingCode}
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <a
                      href={SITE.phoneShortHref}
                      className="flex items-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 font-extrabold text-navy-950 transition hover:bg-brand-400"
                    >
                      <Phone className="size-5" aria-hidden />
                      تماس فوری: <span dir="ltr">{SITE.phoneShort}</span>
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="flex items-center gap-2 rounded-2xl border-2 border-navy-100 px-5 py-3 font-extrabold text-navy-900 transition hover:border-brand-500"
                    >
                      <RotateCcw className="size-5" aria-hidden />
                      ثبت درخواست جدید
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${formId}-name`} className={labelClass}>
                        <User className="size-4 text-brand-600" aria-hidden />
                        نام و نام خانوادگی *
                      </label>
                      <input
                        id={`${formId}-name`}
                        className={inputClass}
                        placeholder="مثلاً: علی رضایی"
                        value={form.name}
                        onChange={(e) => set("name")(e.target.value)}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-mobile`} className={labelClass}>
                        <Phone className="size-4 text-brand-600" aria-hidden />
                        شماره موبایل *
                      </label>
                      <input
                        id={`${formId}-mobile`}
                        className={`${inputClass} text-right`}
                        placeholder="۰۹۱۲ ـــ ـــ ـــ"
                        dir="ltr"
                        inputMode="tel"
                        value={form.mobile}
                        onChange={(e) => set("mobile")(e.target.value)}
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-service`} className={labelClass}>
                        <Wrench className="size-4 text-brand-600" aria-hidden />
                        خدمت موردنیاز *
                      </label>
                      <select
                        id={`${formId}-service`}
                        className={inputClass}
                        value={form.service}
                        onChange={(e) => set("service")(e.target.value)}
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`${formId}-car`} className={labelClass}>
                        <Car className="size-4 text-brand-600" aria-hidden />
                        مدل خودرو
                      </label>
                      <input
                        id={`${formId}-car`}
                        className={inputClass}
                        placeholder="مثلاً: پژو ۲۰۷، تیگو ۷، سمند"
                        value={form.car}
                        onChange={(e) => set("car")(e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor={`${formId}-address`} className={labelClass}>
                        <MapPin className="size-4 text-brand-600" aria-hidden />
                        نشانی یا محل توقف خودرو *
                      </label>
                      <input
                        id={`${formId}-address`}
                        className={inputClass}
                        placeholder="مثلاً: سعادت‌آباد، بلوار دریا، مقابل پلاک ۱۲"
                        value={form.address}
                        onChange={(e) => set("address")(e.target.value)}
                        autoComplete="street-address"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor={`${formId}-note`} className={labelClass}>
                        توضیح مشکل خودرو
                      </label>
                      <textarea
                        id={`${formId}-note`}
                        className={`${inputClass} min-h-24 resize-y`}
                        placeholder="اگر نشانه خاصی هست بنویسید؛ صدای موتور، روشن نشدن، پنچری و…"
                        value={form.note}
                        onChange={(e) => set("note")(e.target.value)}
                      />
                    </div>
                  </div>

                  {error && (
                    <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 ring-1 ring-red-100">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 px-6 py-4 text-base font-extrabold text-navy-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
                  >
                    <Send className="size-5 -scale-x-100" aria-hidden />
                    ثبت درخواست امداد خودرو چاره
                  </button>
                  <p className="mt-3 text-center text-xs leading-6 text-silver-500">
                    ثبت درخواست رایگان است؛ هزینه فقط پس از اعلام و تأیید شما دریافت می‌شود.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
