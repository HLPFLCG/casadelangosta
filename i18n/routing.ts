import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/menu": "/menu",
    "/story": { en: "/story", es: "/historia" },
    "/excursions": { en: "/excursions", es: "/excursiones" },
    "/visit": { en: "/visit", es: "/visita" },
    "/gallery": { en: "/gallery", es: "/galeria" },
    "/contact": { en: "/contact", es: "/contacto" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
