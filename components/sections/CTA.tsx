import { Button } from "@/components/ui/button";
import { PHONE_LANDLINE, PHONE_WHATSAPP_DISPLAY } from "@/lib/constants";
import { reserveLink } from "@/lib/whatsapp";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export function CTA({ locale }: { locale: string }) {
  const t = useTranslations("cta_section");

  return (
    <section className="py-20 bg-reef grain-overlay">
      <div className="relative z-[2] mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-white/90 text-lg mb-10">{t("body")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-reef hover:bg-coconut font-semibold">
            <a href={reserveLink(locale)} target="_blank" rel="noopener noreferrer">
              {t("whatsapp")}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-reef"
          >
            <a href={`tel:${PHONE_LANDLINE}`}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              {PHONE_WHATSAPP_DISPLAY}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
