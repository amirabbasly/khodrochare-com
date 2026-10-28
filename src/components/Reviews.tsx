"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";
import {
  BadgeCheck,
  CircleCheckBig,
  Phone,
  Quote,
  RotateCcw,
  Send,
  Star,
  User,
  Wrench,
} from "lucide-react";
import { RATING_BASE, REVIEWS, SERVICES, isValidMobile, type Review } from "@/lib/data";
import { trackEvent } from "@/lib/track";
import Reveal from "./Reveal";

const STORAGE_KEY = "khodrochare-reviews";
const RATING_LABELS = ["", "ضعیف", "متوسط", "خوب", "خیلی خوب", "عالی"];

type StoredReview = Review & { mobile?: string; createdAt?: string };

/** خواندن نظرات ذخیره‌شده از حافظه مرورگر به‌صورت external store */
const EMPTY_STORE: StoredReview[] = [];
let storeCache: { raw: string; parsed: StoredReview[] } | null = null;

function readStoredReviews(): StoredReview[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
    if (storeCache && storeCache.raw === raw) return storeCache.parsed;
    const parsed = JSON.parse(raw) as StoredReview[];
    const safe = Array.isArray(parsed) ? parsed : EMPTY_STORE;
    storeCache = { raw, parsed: safe };
    return safe;
  } catch {
    return EMPTY_STORE;
  }
}

function subscribeReviews(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("khodrochare:reviews-changed", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("khodrochare:reviews-changed", onChange);
  };
}

const inputClass =
  "w-full rounded-2xl border border-navy-100 bg-white px-4 py-3 text-[15px] text-navy-900 placeholder:text-silver-400 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15";

const labelClass = "mb-2 flex items-center gap-1.5 text-sm font-extrabold text-navy-900";

function Stars({ rating, className = "size-4.5" }: { rating: number; className?: string }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`امتیاز ${rating} از ۵`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < rating ? "fill-brand-500 text-brand-500" : "fill-navy-100 text-navy-100"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

export default function Reviews() {
  const storedReviews = useSyncExternalStore(subscribeReviews, readStoredReviews, () => EMPTY_STORE);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState(SERVICES[0].title);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formId = useId();

  const userReviews = useMemo<Review[]>(
    () =>
      storedReviews.map(({ name: n, service: s, rating: r, text: t, meta: m }) => ({
        name: n,
        service: s,
        rating: r,
        text: t,
        meta: m ?? "نظر ثبت‌شده در سایت خودرو چاره",
      })),
    [storedReviews],
  );

  const allReviews = useMemo(() => [...userReviews, ...REVIEWS], [userReviews]);

  const summary = useMemo(() => {
    const counts: Record<number, number> = { ...RATING_BASE };
    userReviews.forEach((r) => {
      counts[r.rating] = (counts[r.rating] ?? 0) + 1;
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const sum = Object.entries(counts).reduce((a, [star, count]) => a + Number(star) * count, 0);
    return { counts, total, average: total ? sum / total : 0 };
  }, [userReviews]);

  const faNumber = (n: number, digits = 0) =>
    n.toLocaleString("fa-IR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("لطفاً نام خود را وارد کنید.");
      return;
    }
    if (rating < 1) {
      setError("لطفاً با انتخاب ستاره‌ها، میزان رضایت خود را مشخص کنید.");
      return;
    }
    if (text.trim().length < 5) {
      setError("لطفاً تجربه خود از خدمت خودرو چاره را کوتاه بنویسید.");
      return;
    }
    if (mobile.trim() && !isValidMobile(mobile)) {
      setError("شماره موبایل واردشده معتبر نیست؛ آن را اصلاح یا خالی بگذارید.");
      return;
    }
    setError("");

    const review: StoredReview = {
      name: name.trim(),
      service,
      rating,
      text: text.trim(),
      meta: "نظر ثبت‌شده در سایت خودرو چاره",
      mobile: mobile.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as StoredReview[];
      prev.unshift(review);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
      window.dispatchEvent(new Event("khodrochare:reviews-changed"));
    } catch {
      // نادیده گرفته می‌شود
    }

    trackEvent("review_submit", { rating, service });
    setSubmitted(true);
  };

  const resetForm = () => {
    setName("");
    setMobile("");
    setService(SERVICES[0].title);
    setRating(0);
    setHoverRating(0);
    setText("");
    setError("");
    setSubmitted(false);
  };

  return (
    <section id="reviews" className="scroll-mt-28 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-[13px] font-extrabold text-brand-600 ring-1 ring-brand-100">
            <Star className="size-4 fill-brand-500 text-brand-500" aria-hidden />
            رضایت مشتریان خودرو چاره
          </span>
          <h2 className="mt-4 text-3xl font-black leading-snug text-navy-900 sm:text-4xl">
            نظر شما، چراغ راه خودرو چاره است
          </h2>
          <p className="mt-4 leading-8 text-silver-600">
            اگر از خدمات خودرو چاره استفاده کرده‌اید، رضایت و تجربه‌تان را ثبت کنید تا هم به
            راننده‌های دیگر کمک کند و هم ما هر روز بهتر شویم.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-5">
          {/* ستون نظرات */}
          <div className="lg:col-span-3">
            <Reveal>
              <div className="flex flex-col gap-6 rounded-3xl bg-navy-900 p-6 text-white sm:flex-row sm:items-center sm:p-8">
                <div className="text-center sm:border-l sm:border-white/10 sm:pl-8">
                  <p className="text-5xl font-black text-brand-400">{faNumber(summary.average, 1)}</p>
                  <div className="mt-2 flex justify-center">
                    <Stars rating={Math.round(summary.average)} className="size-5" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-navy-200">
                    میانگین {faNumber(summary.total)} رضایت ثبت‌شده
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percent = summary.total
                      ? Math.round(((summary.counts[star] ?? 0) / summary.total) * 100)
                      : 0;
                    return (
                      <div key={star} className="flex items-center gap-3 text-sm font-bold">
                        <span className="flex w-10 items-center gap-1 text-navy-100">
                          {faNumber(star)}
                          <Star className="size-3.5 fill-brand-400 text-brand-400" aria-hidden />
                        </span>
                        <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-navy-700">
                          <span
                            className="block h-full rounded-full bg-brand-500 transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </span>
                        <span className="w-12 text-left text-navy-200">{faNumber(percent)}٪</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {allReviews.map((review, i) => (
                <Reveal key={`${review.name}-${i}`} delay={(i % 2) * 100}>
                  <figure className="flex h-full flex-col rounded-3xl bg-paper p-6 ring-1 ring-navy-900/5">
                    <div className="flex items-center justify-between">
                      <Stars rating={review.rating} />
                      <Quote className="size-6 text-brand-300" aria-hidden />
                    </div>
                    <blockquote className="mt-4 flex-1 text-[15px] leading-8 text-navy-800">
                      {review.text}
                    </blockquote>
                    <figcaption className="mt-5 border-t border-dashed border-navy-100 pt-4">
                      <span className="flex items-center justify-between gap-2">
                        <span>
                          <span className="block font-extrabold text-navy-900">{review.name}</span>
                          <span className="text-[13px] font-semibold text-silver-500">{review.meta}</span>
                        </span>
                        <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-600 ring-1 ring-brand-100">
                          {review.service}
                        </span>
                      </span>
                      {i < userReviews.length && (
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1 text-[11px] font-bold text-white">
                          <BadgeCheck className="size-3.5 text-brand-400" aria-hidden />
                          نظر تازه ثبت‌شده توسط شما
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>

          {/* فرم ثبت رضایت مشتری */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="rounded-3xl bg-paper p-7 ring-1 ring-navy-900/5 sm:p-8 lg:sticky lg:top-28">
              {submitted ? (
                <div className="py-8 text-center">
                  <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <CircleCheckBig className="size-10" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-2xl font-black text-navy-900">سپاس از شما!</h3>
                  <p className="mx-auto mt-3 max-w-xs leading-8 text-silver-600">
                    رضایت شما با موفقیت ثبت و در همین بخش منتشر شد. خانواده خودرو چاره از اعتماد
                    شما ممنون است.
                  </p>
                  <div className="mt-5 flex justify-center">
                    <Stars rating={rating} className="size-6" />
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-7 inline-flex items-center gap-2 rounded-2xl border-2 border-navy-100 bg-white px-5 py-3 font-extrabold text-navy-900 transition hover:border-brand-500"
                  >
                    <RotateCcw className="size-5" aria-hidden />
                    ثبت نظر دیگر
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="flex items-center gap-2.5 text-xl font-black text-navy-900">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-500 text-navy-950">
                      <Star className="size-5.5" aria-hidden />
                    </span>
                    ثبت رضایت مشتری
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-8 text-silver-600">
                    تجربه‌تان از خدمت خودرو چاره را بنویسید؛ نظر شما بلافاصله در این بخش نمایش
                    داده می‌شود.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                    <div>
                      <span className={labelClass} id={`${formId}-rating-label`}>
                        میزان رضایت شما *
                      </span>
                      <div
                        className="flex items-center gap-1.5"
                        role="radiogroup"
                        aria-labelledby={`${formId}-rating-label`}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = star <= (hoverRating || rating);
                          return (
                            <button
                              key={star}
                              type="button"
                              role="radio"
                              aria-checked={rating === star}
                              aria-label={`${star} ستاره — ${RATING_LABELS[star]}`}
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              className="rounded-lg p-0.5 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-brand-500"
                            >
                              <Star
                                className={`size-9 transition ${active ? "fill-brand-500 text-brand-500" : "fill-navy-100 text-navy-100"}`}
                                aria-hidden
                              />
                            </button>
                          );
                        })}
                        <span className="mr-2 text-sm font-extrabold text-brand-600">
                          {RATING_LABELS[hoverRating || rating]}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-name`} className={labelClass}>
                        <User className="size-4 text-brand-600" aria-hidden />
                        نام و نام خانوادگی *
                      </label>
                      <input
                        id={`${formId}-name`}
                        className={inputClass}
                        placeholder="مثلاً: سارا احمدی"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-service`} className={labelClass}>
                        <Wrench className="size-4 text-brand-600" aria-hidden />
                        خدمتی که دریافت کردید
                      </label>
                      <select
                        id={`${formId}-service`}
                        className={inputClass}
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="سایر خدمات خودرو در محل">سایر خدمات خودرو در محل</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-mobile`} className={labelClass}>
                        <Phone className="size-4 text-brand-600" aria-hidden />
                        شماره موبایل (اختیاری)
                      </label>
                      <input
                        id={`${formId}-mobile`}
                        className={`${inputClass} text-right`}
                        placeholder="۰۹۱۲ ـــ ـــ ـــ"
                        dir="ltr"
                        inputMode="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        autoComplete="tel"
                      />
                      <p className="mt-1.5 text-xs text-silver-500">
                        شماره شما نمایش داده نمی‌شود؛ فقط برای پیگیری کیفیت خدمت است.
                      </p>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-text`} className={labelClass}>
                        متن نظر شما *
                      </label>
                      <textarea
                        id={`${formId}-text`}
                        className={`${inputClass} min-h-28 resize-y`}
                        placeholder="از سرعت رسیدن امداد، برخورد تکنسین و کیفیت کار بنویسید…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>

                    {error && (
                      <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 ring-1 ring-red-100">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 px-6 py-4 font-extrabold text-navy-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
                    >
                      <Send className="size-5 -scale-x-100" aria-hidden />
                      ثبت رضایت و انتشار نظر
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
