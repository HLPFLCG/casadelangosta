import { ReservationForm } from "@/components/sections/ReservationForm";
import { buildMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    title: locale === "es" ? "Reservar" : "Reserve a Table",
    description:
      locale === "es"
        ? "Reserve su mesa en Casa de Langosta, Cahuita. Confirmaremos su reserva en pocas horas."
        : "Book your table at Casa de Langosta, Cahuita. We'll confirm your reservation within a few hours.",
    path: "/reserve",
    locale,
  });
}

export default async function ReservePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reserve" });

  return (
    <div className="bg-coconut min-h-screen py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-palm mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-text text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </header>

        {/* Demo banner */}
        <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-center">
          <p className="text-sm text-amber-700">{t("demo_note")}</p>
        </div>

        <ReservationForm locale={locale} />
      </div>
    </div>
  );
}
