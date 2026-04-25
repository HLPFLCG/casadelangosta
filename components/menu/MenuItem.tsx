import { Separator } from "@/components/ui/separator";
import type { MenuItem as MenuItemType } from "@/content/menu.en";
import { MenuBadge } from "./MenuBadge";

interface MenuItemProps {
  item: MenuItemType;
  lobsterNote: string;
}

export function MenuItem({ item, lobsterNote }: MenuItemProps) {
  return (
    <article className="py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-palm mb-1">{item.name}</h3>
          <p className="text-sm text-muted-text leading-relaxed mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {item.badges.map((b) => (
              <MenuBadge key={b} badge={b} />
            ))}
          </div>
          {item.marketPrice && <p className="text-xs text-muted-text mt-2 italic">{lobsterNote}</p>}
        </div>
        {item.priceUSD && (
          <div className="flex-shrink-0 text-right">
            <p className="font-semibold text-palm">${item.priceUSD}</p>
            {item.priceCRC && (
              <p className="text-xs text-muted-text">₡{item.priceCRC.toLocaleString()}</p>
            )}
          </div>
        )}
      </div>
      <Separator className="mt-5" />
    </article>
  );
}
