import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LobsterTank({ locale: _locale }: { locale: string }) {
  const t = useTranslations("lobster_tank");

  return (
    <section className="py-20 bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-palm mb-6">
              {t("title")}
            </h2>
            <p className="text-muted-text text-lg leading-relaxed mb-8">{t("body")}</p>
            <Button asChild variant="default">
              <Link href="/contact">{t("cta")}</Link>
            </Button>
          </div>

          {/* Image — tilted for handcrafted feel */}
          <div className="flex justify-center">
            <div className="relative tilt-right rounded-3xl overflow-hidden shadow-xl w-full max-w-md aspect-[4/3]">
              <Image
                src="/images/lobster-tank.jpg"
                alt="Fresh Caribbean spiny lobsters in the restaurant tank at Casa de Langosta"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
