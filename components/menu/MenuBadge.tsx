import { useTranslations } from "next-intl";
import type { DietaryBadge } from "@/content/menu.en";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";

const BADGE_VARIANT: Record<DietaryBadge, BadgeProps["variant"]> = {
  gf: "gf",
  v: "v",
  vegan: "vegan",
  spicy: "spicy",
  shellfish: "shellfish",
  market_price: "market",
};

export function MenuBadge({ badge }: { badge: DietaryBadge }) {
  const t = useTranslations("badges");
  return <Badge variant={BADGE_VARIANT[badge]}>{t(badge as keyof typeof BADGE_VARIANT)}</Badge>;
}
