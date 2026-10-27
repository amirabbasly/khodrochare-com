import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "خودرو چاره | امداد خودرو تهران شبانه‌روزی",
    short_name: "خودرو چاره",
    description:
      "امداد خودرو و خدمات خودرو در محل در تهران؛ تعمیر خودرو در محل، پنچرگیری سیار، باتری و برق خودرو در محل، خودروبر و یدک‌کش شبانه‌روزی.",
    lang: "fa",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f8fb",
    theme_color: "#071222",
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}
