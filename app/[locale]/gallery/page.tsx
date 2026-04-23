import { getTranslations } from "next-intl/server";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    title: locale === "es" ? "Galería" : "Gallery",
    description:
      locale === "es"
        ? "Fotos de Casa de Langosta: la cocina, las mesas, el tanque de langostas y la costa caribeña de Cahuita."
        : "Photos of Casa de Langosta: the kitchen, the tables, the lobster tank, and the Caribbean coast of Cahuita.",
    path: "/gallery",
    locale,
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });

  const photos = [
    { src: "/images/hero-dining.jpg", alt: t("alt.hero"), width: 1200, height: 800 },
    { src: "/images/lobster-tank.jpg", alt: t("alt.lobster"), width: 800, height: 600 },
    { src: "/images/lobster-coconut.jpg", alt: t("alt.coconut"), width: 800, height: 600 },
    { src: "/images/ceviche.jpg", alt: t("alt.ceviche"), width: 800, height: 600 },
    { src: "/images/roberto.jpg", alt: t("alt.kitchen"), width: 800, height: 1000 },
    { src: "/images/coast.jpg", alt: t("alt.coast"), width: 1200, height: 800 },
    { src: "/images/interior-1.jpg", alt: t("alt.interior1"), width: 800, height: 600 },
    { src: "/images/interior-2.jpg", alt: t("alt.interior2"), width: 800, height: 600 },
    { src: "/images/snapper.jpg", alt: t("alt.snapper"), width: 800, height: 600 },
    { src: "/images/jerk-chicken.jpg", alt: t("alt.jerk"), width: 800, height: 600 },
  ];

  return (
    <div className="bg-coconut min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-14">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-palm mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-text text-lg">{t("subtitle")}</p>
        </header>
        <GalleryGrid photos={photos} />
      </div>
    </div>
  );
}
