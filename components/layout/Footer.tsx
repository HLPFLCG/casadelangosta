import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PHONE_LANDLINE_DISPLAY, PHONE_WHATSAPP_DISPLAY } from "@/lib/constants";
import { reserveLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/menu", key: "menu" },
  { href: "/story", key: "story" },
  { href: "/excursions", key: "excursions" },
  { href: "/visit", key: "visit" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-palm text-sand mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <p className="font-display text-2xl font-semibold text-coconut mb-2">
              Casa de Langosta
            </p>
            <p className="text-sm text-muted-sand leading-relaxed">{t("tagline")}</p>
            <p className="text-sm text-muted-sand mt-2">{t("hours")}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-sand mb-4">
              {t("nav_title")}
            </p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-sand hover:text-coconut transition-colors"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-sand mb-4">
              {t("contact_title")}
            </p>
            <ul className="flex flex-col gap-2 text-sm text-sand">
              <li>
                <a
                  href={reserveLink(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coconut transition-colors"
                >
                  WhatsApp: {PHONE_WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href="tel:27551148" className="hover:text-coconut transition-colors">
                  {PHONE_LANDLINE_DISPLAY}
                </a>
              </li>
              <li className="mt-2 text-muted-sand text-xs leading-relaxed">
                Calle Principal, Cahuita
                <br />
                Limón, Costa Rica
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-palm-dark pt-6 text-xs text-muted-sand text-center">
          {t("copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
