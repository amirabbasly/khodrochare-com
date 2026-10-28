import Image from "next/image";
import { SOCIALS } from "@/lib/data";

/** دکمه‌های شناور واتساپ و تلگرام — سمت راست صفحه، روی همه صفحات */
export default function SocialFloat() {
  const active = SOCIALS.filter((s) => s.href && s.icon);
  if (active.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2.5 lg:bottom-6 lg:right-6">
      {active.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          title={social.label}
          className="block size-12 overflow-hidden rounded-full shadow-xl shadow-navy-950/30 ring-2 ring-white/70 transition hover:scale-110 sm:size-13"
        >
          <Image
            src={social.icon}
            alt={social.label}
            width={512}
            height={512}
            className="size-full object-cover"
          />
        </a>
      ))}
    </div>
  );
}
