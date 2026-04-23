import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function StoryTeaser() {
  const t = useTranslations("story_teaser");

  return (
    <section className="py-20 bg-coconut">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center order-last lg:order-first">
            <div className="relative tilt-left rounded-3xl overflow-hidden shadow-xl w-full max-w-md aspect-[4/3]">
              <Image
                src="/images/roberto.jpg"
                alt="Roberto, owner and fifth-generation fisherman, at Casa de Langosta"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-reef mb-4">
              Cahuita, Costa Rica
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-palm mb-6">
              {t("title")}
            </h2>
            <p className="text-muted-text text-lg leading-relaxed mb-8">{t("body")}</p>
            <Button asChild variant="outline">
              <Link href="/story">{t("cta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
