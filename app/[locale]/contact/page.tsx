import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/sections/ContactForm";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    title: locale === "es" ? "Contacto" : "Contact",
    description:
      locale === "es"
        ? "Contáctenos por WhatsApp, teléfono o formulario para reservar su mesa en Casa de Langosta, Cahuita."
        : "Contact Casa de Langosta by WhatsApp, phone, or form to reserve your table in Cahuita, Costa Rica.",
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="bg-coconut min-h-screen py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-14">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-palm mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-text text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </header>
        <ContactForm locale={locale} />
      </div>
    </div>
  );
}
