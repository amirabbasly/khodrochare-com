/**
 * نقشه شماتیک محورهای تهران-شمال (نه نقشه جغرافیایی دقیق).
 * هدف: نمایش پوشش امدادی روی محورها در یک قاب گرافیکی سبک و بدون تصویر.
 */
export function CorridorMap({ className }: { className?: string }) {
  const label = {
    fill: "#d1d9e8",
    fontSize: 10.5,
    fontWeight: 700,
  } as const;

  const node = (x: number, y: number, big = false) => ({
    cx: x,
    cy: y,
    r: big ? 5.5 : 3.6,
    fill: big ? "#ffb02e" : "#7888a8",
  });

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 ${className ?? ""}`}
    >
      <svg viewBox="0 0 520 320" role="img" aria-label="نقشه شماتیک محورهای تهران به شمال" className="h-auto w-full">
        <defs>
          <linearGradient id="map-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111731" />
            <stop offset="100%" stopColor="#080c1d" />
          </linearGradient>
          <pattern id="map-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0v26" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="520" height="320" fill="url(#map-bg)" />
        <rect width="520" height="320" fill="url(#map-grid)" />

        {/* دریای خزر */}
        <path d="M0 0h520v62c-70 14-150 12-230 4C210 58 120 52 0 66z" fill="#0e2a3f" opacity="0.85" />
        <text x="440" y="30" style={label} fill="#526287">
          دریای خزر
        </text>

        {/* آزادراه کرج-قزوین */}
        <path d="M195 232c-30 2-55-6-85-14" stroke="#526287" strokeWidth="3" strokeDasharray="7 6" fill="none" />

        {/* آزادراه تهران-شمال */}
        <path
          d="M282 250c-14-12-26-24-38-38-9-11-16-23-22-36-6-14-10-28-14-42"
          stroke="#ffb02e"
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* جاده چالوس */}
        <path
          d="M195 232c-4-12-6-24-2-36 4-13 8-25 4-38-3-11-7-19-6-27 1-7 5-12 9-16"
          stroke="#f79009"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="9 7"
        />
        {/* جاده هراز */}
        <path
          d="M282 250c10-8 22-16 30-26 7-9 12-19 14-30 2-11 2-22 3-32"
          stroke="#ffc85e"
          strokeWidth="3.6"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        {/* جاده فیروزکوه */}
        <path
          d="M282 250c16-4 34-6 52-6 18 0 36-4 52-12 14-7 26-17 34-28 7-10 10-20 11-30"
          stroke="#ff9c9c"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* گره‌ها */}
        <circle {...node(282, 250, true)} />
        <text x="290" y="272" style={label}>
          تهران
        </text>

        <circle {...node(195, 232)} />
        <text x="150" y="248" style={label}>
          کرج
        </text>

        <circle {...node(160, 100, true)} />
        <text x="118" y="94" style={label}>
          چالوس
        </text>

        <circle {...node(178, 132)} />
        <text x="126" y="140" style={{ ...label, fill: "#a8b5cd" }}>
          مرزن‌آباد
        </text>

        <circle {...node(228, 176)} />
        <text x="196" y="196" style={{ ...label, fill: "#a8b5cd" }}>
          شهرستانک / پل زنگوله
        </text>

        <circle {...node(299, 118, true)} />
        <text x="272" y="104" style={label}>
          آمل
        </text>

        <circle {...node(318, 172)} />
        <text x="292" y="188" style={{ ...label, fill: "#a8b5cd" }}>
          پلور
        </text>

        <circle {...node(310, 214)} />
        <text x="286" y="230" style={{ ...label, fill: "#a8b5cd" }}>
          رودهن
        </text>

        <circle {...node(360, 240)} />
        <text x="344" y="260" style={{ ...label, fill: "#a8b5cd" }}>
          دماوند
        </text>

        <circle {...node(402, 214)} />
        <text x="386" y="204" style={{ ...label, fill: "#a8b5cd" }}>
          فیروزکوه
        </text>

        <circle {...node(440, 142, true)} />
        <text x="420" y="128" style={label}>
          ساری
        </text>

        {/* برچسب محورها */}
        <text x="300" y="60" style={{ ...label, fill: "#ffb02e", fontSize: 11 }}>
          آزادراه تهران-شمال
        </text>
        <text x="96" y="200" style={{ ...label, fill: "#ffc85e", fontSize: 11 }}>
          جاده هراز (۷۷)
        </text>
        <text x="330" y="290" style={{ ...label, fill: "#ff9c9c", fontSize: 11 }}>
          جاده فیروزکوه (۷۹)
        </text>
        <text x="60" y="290" style={{ ...label, fill: "#f79009", fontSize: 11 }}>
          جاده چالوس (۵۹)
        </text>
      </svg>

      <div className="absolute bottom-3 left-3 rounded-xl border border-white/10 bg-ink-950/80 px-3 py-2 text-[0.68rem] text-ink-300">
        نقشه شماتیک پوشش محورها — نه مقیاس جغرافیایی
      </div>
    </div>
  );
}
