import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { excursions } from "@/content/excursions.en";
import { PHONE_WHATSAPP } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { buildWaLink } from "@/lib/whatsapp";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    title: locale === "es" ? "Excursiones" : "Excursions",
    description:
      locale === "es"
        ? "Excursiones locales desde Cahuita: snorkel en el Parque Nacional, Santuario de Perezosos, territorio Bribri y avistamiento de delfines en Manzanillo."
        : "Local excursions from Cahuita: Cahuita National Park snorkel, Sloth Sanctuary, Bribri territory, and dolphin watching at Manzanillo.",
    path: "/excursions",
    locale,
  });
}

function ExcursionsPage(_: { locale: string }) {
  const t = useTranslations("excursions");

  return (
    <div className="bg-coconut min-h-screen py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-14">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-palm mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-text text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          {excursions.map(({ id, icon, pricePerPerson, stripeLink }) => {
            const message = t(`items.${id}.message`);
            const waLink = buildWaLink({ message, phone: PHONE_WHATSAPP });

            return (
              <Card key={id} className="flex flex-col">
                <CardHeader>
                  <span className="text-5xl mb-2" aria-hidden="true">
                    {icon}
                  </span>
                  <CardTitle className="text-2xl">{t(`items.${id}.title`)}</CardTitle>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs font-semibold text-reef uppercase tracking-wide">
                      {t(`items.${id}.duration`)}
                    </p>
                    <span className="text-xs text-muted-text">·</span>
                    <p className="text-xs font-semibold text-ocean">
                      ${pricePerPerson} {t("per_person")}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between gap-4">
                  <p className="text-muted-text leading-relaxed">{t(`items.${id}.desc`)}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild variant="default" className="flex-1">
                      <a href={stripeLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        {t("book_online")}
                      </a>
                    </Button>
                    <Button asChild variant="secondary" className="flex-1">
                      <a href={waLink} target="_blank" rel="noopener noreferrer">
                        {t("ask_whatsapp")}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="rounded-3xl bg-sand p-8 text-center">
          <p className="text-palm font-medium">{t("booking_note")}</p>
        </div>
      </div>
    </div>
  );
}

export default async function ExcursionsPageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ExcursionsPage locale={locale} />;
}
