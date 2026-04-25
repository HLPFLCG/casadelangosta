import { MenuCategory } from "@/components/menu/MenuCategory";
import { menu as menuEn } from "@/content/menu.en";
import type { MenuCategory as MenuCategoryType } from "@/content/menu.en";
import { menu as menuEs } from "@/content/menu.es";
import { getMenuData } from "@/lib/admin-data";
import { buildMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    title: locale === "es" ? "Menú" : "Menu",
    description:
      locale === "es"
        ? "El menú completo de Casa de Langosta. Langosta caribeña, ceviche de pescado, pargo rojo y más."
        : "The full menu at Casa de Langosta. Caribbean lobster, fish ceviche, whole grilled red snapper, and more.",
    path: "/menu",
    locale,
  });
}

function MenuPage({
  menuData,
}: {
  menuData: MenuCategoryType[];
}) {
  const t = useTranslations("menu");

  return (
    <div className="py-16 bg-coconut min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-palm mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-text text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </header>

        {menuData.map((category) => (
          <MenuCategory key={category.id} category={category} />
        ))}

        <div className="mt-16 rounded-3xl bg-sand p-8 text-center">
          <p className="text-palm font-medium">{t("lobster_note")}</p>
        </div>
      </div>
    </div>
  );
}

export default async function MenuPageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const staticMenu = locale === "es" ? menuEs : menuEn;
  const menuData = await getMenuData(locale, staticMenu);
  return <MenuPage menuData={menuData} />;
}
