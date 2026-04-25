"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV_LINKS = [
  { href: "/menu", key: "menu" },
  { href: "/story", key: "story" },
  { href: "/excursions", key: "excursions" },
  { href: "/visit", key: "visit" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
] as const;

export function MobileNav({ locale: _locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-palm">Casa de Langosta</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="flex flex-col px-6 gap-1 mt-2">
          {NAV_LINKS.map(({ href, key }) => (
            <SheetClose asChild key={href}>
              <Link
                href={href}
                className="py-3 text-base font-medium text-palm hover:text-ocean border-b border-border last:border-0 transition-colors"
              >
                {t(key)}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="px-6 mt-6 flex flex-col gap-3">
          <SheetClose asChild>
            <Button asChild variant="accent" className="w-full">
              <Link href="/reserve">{t("reserve")}</Link>
            </Button>
          </SheetClose>
          <LocaleSwitcher className="justify-center" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
