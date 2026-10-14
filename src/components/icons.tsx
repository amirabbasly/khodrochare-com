import type { SVGProps } from "react";
import type { IconKey } from "@/data/types";

type Props = SVGProps<SVGSVGElement> & { name: IconKey; className?: string };

/** مجموعه آیکون‌های خطی سایت (stroke، سازگار با currentColor) */
export function Icon({ name, className, ...rest }: Props) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
    ...rest,
  };

  switch (name) {
    case "battery":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="17" height="10" rx="2.5" />
          <path d="M22 10.5v3" />
          <path d="M6 10.5v3M9.5 10.5v3M13 10.5v3" />
        </svg>
      );
    case "tire":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.4" />
          <path d="M12 3v3.2M12 17.8V21M3 12h3.2M17.8 12H21M5.6 5.6l2.3 2.3M16.1 16.1l2.3 2.3M18.4 5.6l-2.3 2.3M7.9 16.1l-2.3 2.3" />
        </svg>
      );
    case "fuel":
      return (
        <svg {...common}>
          <path d="M4 20V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15" />
          <path d="M3 20h11" />
          <path d="M13 9h3a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-2.5-3" />
          <path d="M6 8h5" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
          <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
          <path d="M12 15v2.5" />
        </svg>
      );
    case "tow":
      return (
        <svg {...common}>
          <path d="M3 16.5V9h8.5l3 4H19a2 2 0 0 1 2 2v1.5" />
          <path d="M3 16.5h2M21 16.5h-2M10.5 16.5h5.5" />
          <circle cx="7" cy="17.8" r="1.9" />
          <circle cx="18" cy="17.8" r="1.9" />
          <path d="M14.5 9 12 5" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M15.5 3a3.5 3.5 0 0 0-3.3 4.7L4 15.9 8.1 20l8.2-8.2A3.5 3.5 0 0 0 20.9 8 3.4 3.4 0 0 0 20 6l-2.6 2.6-2.4-.6-.6-2.4L17.2 3z" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 5 13.5h5.5L10 22l8-11.5h-5.5L13 2z" />
        </svg>
      );
    case "road":
      return (
        <svg {...common}>
          <path d="M6 3 3.5 21M18 3l2.5 18" />
          <path d="M12 4v2.5M12 10v2.5M12 16v2.5" />
        </svg>
      );
    case "motorcycle":
      return (
        <svg {...common}>
          <circle cx="5.5" cy="17" r="3" />
          <circle cx="18.5" cy="17" r="3" />
          <path d="M8.5 17h6l-2.2-6H9.5" />
          <path d="M14.5 11h3.5l-2-3h-3" />
        </svg>
      );
    case "checklist":
      return (
        <svg {...common}>
          <path d="M9 4h9a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6" />
          <path d="M3.5 9.5 5 11l2.8-3" />
          <path d="M9 12h6M9 16h6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5V12l3.2 2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5.5c0 4.4 2.9 8.2 7 9.5 4.1-1.3 7-5.1 7-9.5V6l-7-3z" />
          <path d="m9.3 12 2 2 3.4-3.6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.7 1.5C10.4 18 6 13.6 3.5 5.2A1.5 1.5 0 0 1 5 3.5z" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="2.5" />
          <path d="M3 9.5h18" />
          <circle cx="16.5" cy="14.5" r="1.2" />
        </svg>
      );
    case "star":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 3.6l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.7l5.9-.8L12 3.6z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="3.2" />
          <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
          <path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 19.6c0-2.2-.6-3.9-1.7-5" />
        </svg>
      );
    case "tunnel":
      return (
        <svg {...common}>
          <path d="M3 20V12a9 9 0 0 1 18 0v8" />
          <path d="M8 20v-8a4 4 0 0 1 8 0v8" />
          <path d="M12 4v1.5" />
        </svg>
      );
    case "mountain":
      return (
        <svg {...common}>
          <path d="M2 19.5 9 7l4 6.5 2-3 5 9z" />
          <path d="m7 12 2 1.5L11 12" />
        </svg>
      );
    case "snow":
      return (
        <svg {...common}>
          <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
          <path d="M12 6.5 9.8 4.6M12 6.5l2.2-1.9M12 17.5l-2.2 1.9M12 17.5l2.2 1.9" />
        </svg>
      );
    case "traffic":
      return (
        <svg {...common}>
          <rect x="8" y="2.5" width="8" height="19" rx="3" />
          <circle cx="12" cy="7" r="1.4" />
          <circle cx="12" cy="12" r="1.4" />
          <circle cx="12" cy="17" r="1.4" />
        </svg>
      );
  }
}

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
    </svg>
  );
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.53 3.68 1.46 5.2L2 22l5.1-1.6a9.8 9.8 0 0 0 4.94 1.33h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.47 2 12.04 2zm5.7 13.9c-.24.68-1.4 1.3-1.94 1.35-.54.06-1.05.24-3.53-.73-2.98-1.17-4.88-4.24-5.03-4.44-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.51.24.58.83 2.02.9 2.17.07.15.12.32.02.51-.1.2-.2.32-.39.5-.19.2-.4.44-.29.63.11.2.5.85 1.08 1.38.74.68 1.36.9 1.55 1 .2.1.31.08.43-.05.12-.14.5-.6.64-.8.14-.2.28-.16.47-.09.19.07 1.2.57 1.41.67.2.1.34.15.39.24.05.09.05.53-.19 1.2z" />
    </svg>
  );
}

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.7 4.3 19 19.2c-.2 1-.8 1.2-1.6.8l-4.4-3.2-2.1 2c-.24.24-.44.44-.9.44l.32-4.5 8.2-7.4c.36-.32-.08-.5-.55-.18L7.8 13.1l-4.3-1.35c-.94-.3-.96-.94.2-1.4l16.6-6.4c.78-.3 1.46.18 1.4 1.35z" />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7.2 8.2 5.6 8.2-5.6" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** نشان برند: سپر + جاده + سپیده */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="kc-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a2340" />
          <stop offset="100%" stopColor="#080c1d" />
        </linearGradient>
        <linearGradient id="kc-sun" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffb02e" />
          <stop offset="100%" stopColor="#f79009" />
        </linearGradient>
      </defs>
      <path
        d="M24 3 7 9v12.2C7 31 14.2 40.5 24 45c9.8-4.5 17-14 17-23.8V9L24 3z"
        fill="url(#kc-shield)"
      />
      <circle cx="24" cy="20.5" r="7.5" fill="url(#kc-sun)" opacity="0.92" />
      <path
        d="M12.5 39.5c3-6.5 5.5-11 11.5-11s8.5 4.5 11.5 11"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.9"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path d="M24 30.5v3.4M24 37v3" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}
