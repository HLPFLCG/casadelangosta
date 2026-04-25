import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { reserveLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";

const NAV_LINKS = [
  { href: "/menu", key: "menu" },
  { href: "/story", key: "story" },
  { href: "/excursions", key: "excursions" },
  { href: "/visit", key: "visit" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
] as const;

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-coconut/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / wordmark */}
        <Link
          href="/"
          className="font-display text-xl font-semibold text-palm hover:text-ocean transition-colors"
          aria-label="Casa de Langosta — Home"
        >
          Casa de <span className="text-ocean">Langosta</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 text-sm font-medium text-muted-text hover:text-palm rounded-lg transition-colors"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <LocaleSwitcher />
          <Button asChild variant="accent" size="sm">
            <a href={reserveLink(locale)} target="_blank" rel="noopener noreferrer">
              {t("reserve")}
            </a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden">
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
