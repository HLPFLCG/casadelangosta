"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div className={cn("flex items-center gap-1 text-sm font-medium", className)}>
      <button
        onClick={() => switchLocale("en")}
        aria-label="Switch to English"
        aria-current={locale === "en" ? "true" : undefined}
        className={cn(
          "px-2 py-1 rounded-md transition-colors",
          locale === "en"
            ? "text-ocean font-semibold"
            : "text-muted-text hover:text-palm"
        )}
      >
        EN
      </button>
      <span className="text-border select-none">|</span>
      <button
        onClick={() => switchLocale("es")}
        aria-label="Cambiar a español"
        aria-current={locale === "es" ? "true" : undefined}
        className={cn(
          "px-2 py-1 rounded-md transition-colors",
          locale === "es"
            ? "text-ocean font-semibold"
            : "text-muted-text hover:text-palm"
        )}
      >
        ES
      </button>
    </div>
  );
}
