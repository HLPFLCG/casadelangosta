import { useTranslations } from "next-intl";
import type { MenuCategory as MenuCategoryType } from "@/content/menu.en";
import { MenuItem } from "./MenuItem";

interface MenuCategoryProps {
  category: MenuCategoryType;
}

export function MenuCategory({ category }: MenuCategoryProps) {
  const t = useTranslations("menu");

  return (
    <section aria-labelledby={`cat-${category.id}`}>
      <h2
        id={`cat-${category.id}`}
        className="font-display text-2xl font-bold text-ocean mb-1 pt-8 pb-2 border-b-2 border-ocean/30"
      >
        {t(`categories.${category.id}`)}
      </h2>
      <div>
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} lobsterNote={t("lobster_note")} />
        ))}
      </div>
    </section>
  );
}
