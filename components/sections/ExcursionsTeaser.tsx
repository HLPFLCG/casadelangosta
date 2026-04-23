import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { excursions } from "@/content/excursions.en";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExcursionsTeaser() {
  const t = useTranslations("excursions");

  return (
    <section className="py-20 bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-palm mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-text text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {excursions.map(({ id, icon }) => (
            <Card key={id} className="text-center p-2">
              <CardHeader className="pb-2">
                <span className="text-4xl" aria-hidden="true">
                  {icon}
                </span>
                <CardTitle className="text-lg mt-2">
                  {t(`items.${id}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-text leading-relaxed">
                  {t(`items.${id}.duration`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="default">
            <Link href="/excursions">
              {t("booking_note")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
