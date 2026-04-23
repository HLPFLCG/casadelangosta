import { Clock, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { GOOGLE_MAPS_URL, OPENSTREETMAP_EMBED } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function VisitTeaser() {
  const t = useTranslations("visit_teaser");

  return (
    <section className="py-20 bg-palm text-coconut">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-coconut mb-6">
              {t("title")}
            </h2>
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="h-5 w-5 text-reef flex-shrink-0 mt-1" aria-hidden="true" />
              <p className="text-sand leading-relaxed">{t("address")}</p>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <Clock className="h-5 w-5 text-reef flex-shrink-0" aria-hidden="true" />
              <p className="text-sand">
                <span className="font-semibold text-coconut">{t("hours_label")}</span>{" "}
                {t("hours")}
              </p>
            </div>
            <Button asChild variant="accent">
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                {t("directions_cta")}
              </a>
            </Button>
          </div>

          {/* Embedded map */}
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-video w-full">
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
        </div>
      </div>
    </section>
  );
}
