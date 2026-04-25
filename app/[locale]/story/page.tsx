import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { reserveLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    title: locale === "es" ? "Nuestra Historia" : "Our Story",
    description:
      locale === "es"
        ? "La historia de Roberto Segura, pescador de quinta generación, y de la familia detrás de Casa de Langosta en Cahuita, Costa Rica."
        : "The story of Roberto Segura, fifth-generation fisherman, and the family behind Casa de Langosta in Cahuita, Costa Rica.",
    path: "/story",
    locale,
  });
}

function StoryPage({ locale }: { locale: string }) {
  const t = useTranslations("story");

  return (
    <article className="bg-coconut">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-palm">
        <Image
          src="/images/coast.jpg"
          alt="Cahuita's Caribbean coastline at sunrise"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-12 w-full">
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-coconut">
              {t("title")}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <p className="font-display text-2xl text-ocean font-semibold mb-10 leading-snug">
          {t("intro")}
        </p>

        <div className="prose prose-lg max-w-none text-muted-text space-y-6 mb-12">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
        </div>

        {/* Photo */}
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="tilt-right rounded-3xl overflow-hidden shadow-lg aspect-[4/3] relative">
            <Image
              src="/images/roberto.jpg"
              alt="Roberto Segura, owner and fifth-generation fisherman at Casa de Langosta"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="tilt-left rounded-3xl overflow-hidden shadow-lg aspect-[4/3] relative">
            <Image
              src="/images/fishing.jpg"
              alt="Traditional fishing boat on the Caribbean coast near Cahuita"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Pull quote */}
        <blockquote className="my-12 border-l-4 border-reef pl-6">
          <p className="font-display text-2xl sm:text-3xl text-palm font-semibold italic leading-snug mb-4">
            &ldquo;{t("pullquote")}&rdquo;
          </p>
          <footer className="text-reef font-semibold">{t("pullquote_attr")}</footer>
        </blockquote>

        <div className="prose prose-lg max-w-none text-muted-text space-y-6 mb-12">
          <p>{t("p3")}</p>
          <p>{t("p4")}</p>
        </div>

        <div className="rounded-3xl bg-sand p-10 text-center">
          <Button asChild variant="accent" size="lg">
            <a href={reserveLink(locale)} target="_blank" rel="noopener noreferrer">
              {t("cta")}
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default async function StoryPageWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <StoryPage locale={locale} />;
}
