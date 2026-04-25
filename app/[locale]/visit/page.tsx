import { Button } from "@/components/ui/button";
import {
  GOOGLE_MAPS_URL,
  OPENSTREETMAP_EMBED,
  PHONE_LANDLINE,
  PHONE_LANDLINE_DISPLAY,
  PHONE_WHATSAPP_DISPLAY,
} from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { reserveLink } from "@/lib/whatsapp";
import { Clock, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    title: locale === "es" ? "Visítenos" : "Visit Us",
    description:
      locale === "es"
        ? "Cómo llegar a Casa de Langosta en Cahuita, Limón, Costa Rica. Horario, dirección, teléfono y mapa."
        : "How to find Casa de Langosta in Cahuita, Limón, Costa Rica. Opening hours, address, phone, and map.",
    path: "/visit",
    locale,
  });
}

function VisitPage({ locale }: { locale: string }) {
  const t = useTranslations("visit");

  return (
    <div className="bg-coconut min-h-screen">
      {/* Header */}
      <div className="bg-palm py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-coconut mb-4">
            {t("title")}
          </h1>
          <p className="text-sand text-lg">{t("subtitle")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Info */}
        <div className="space-y-10">
          {/* Address */}
          <section aria-labelledby="address-heading">
            <h2
              id="address-heading"
              className="font-display text-xl font-bold text-ocean mb-3 flex items-center gap-2"
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              {t("address_title")}
            </h2>
            <p className="text-muted-text leading-relaxed">{t("address")}</p>
          </section>

          {/* Hours */}
          <section aria-labelledby="hours-heading">
            <h2
              id="hours-heading"
              className="font-display text-xl font-bold text-ocean mb-3 flex items-center gap-2"
            >
              <Clock className="h-5 w-5" aria-hidden="true" />
              {t("hours_title")}
            </h2>
            <table className="text-sm text-muted-text w-full" aria-label="Opening hours">
              <tbody>
                <tr>
                  <td className="pr-8 py-1 font-medium text-palm">{t("hours_daily")}</td>
                  <td className="py-1">{t("hours_time")}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Phone */}
          <section aria-labelledby="phone-heading">
            <h2
              id="phone-heading"
              className="font-display text-xl font-bold text-ocean mb-3 flex items-center gap-2"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {t("phone_title")}
            </h2>
            <div className="flex flex-col gap-3">
              <Button asChild variant="default" className="w-full sm:w-auto">
                <a href={reserveLink(locale)} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {PHONE_WHATSAPP_DISPLAY}
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href={`tel:${PHONE_LANDLINE}`}>
                  {t("phone_secondary")} ({PHONE_LANDLINE_DISPLAY})
                </a>
              </Button>
            </div>
          </section>

          {/* Getting here */}
          <section aria-labelledby="getting-here-heading">
            <h2
              id="getting-here-heading"
              className="font-display text-xl font-bold text-ocean mb-3"
            >
              {t("getting_here_title")}
            </h2>
            <div className="space-y-3 text-sm text-muted-text leading-relaxed">
              <p>{t("getting_here_sj")}</p>
              <p>{t("getting_here_bus")}</p>
              <p>{t("getting_here_parking")}</p>
            </div>
          </section>

          {/* Accessibility */}
          <section aria-labelledby="accessibility-heading">
            <h2
              id="accessibility-heading"
              className="font-display text-xl font-bold text-ocean mb-3"
            >
              {t("accessibility_title")}
            </h2>
            <p className="text-sm text-muted-text leading-relaxed">{t("accessibility_note")}</p>
          </section>
        </div>

        {/* Right: Map */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-ocean">{t("map_title")}</h2>
          <div className="rounded-3xl overflow-hidden shadow-lg aspect-square w-full">
            <iframe
              src={OPENSTREETMAP_EMBED}
              width="100%"
              height="100%"
              title="Casa de Langosta on OpenStreetMap"
              aria-label="Map showing location of Casa de Langosta in Cahuita, Costa Rica"
              loading="lazy"
              className="border-0 w-full h-full"
            />
          </div>
          <Button asChild variant="outline" className="w-full">
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
              {t("directions_cta")}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default async function VisitPageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <VisitPage locale={locale} />;
}
