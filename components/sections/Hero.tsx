import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { reserveLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[92vh] flex items-center grain-overlay overflow-hidden bg-palm">
      {/* Background image */}
      <Image
        src="/images/hero-dining.jpg"
        alt="Open-air dining area with thatched roof and sand floor at Casa de Langosta, Cahuita"
        fill
        priority
        className="object-cover object-center opacity-50"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(31,61,43,0.4) 0%, rgba(31,61,43,0.7) 60%, rgba(31,61,43,0.9) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-coconut">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-6">
            <span className="block">{t("headline")}</span>
            <span className="block text-reef mt-1">{t("headline2")}</span>
            <span className="block mt-1">{t("headline3")}</span>
          </h1>
          <p className="text-lg sm:text-xl text-sand/90 leading-relaxed mb-10 max-w-xl">
            {t("subheadline")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="accent" size="lg">
              <a href={reserveLink(locale)} target="_blank" rel="noopener noreferrer">
                {t("cta_whatsapp")}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-coconut text-coconut hover:bg-coconut hover:text-palm"
            >
              <Link href="/menu">{t("cta_menu")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
