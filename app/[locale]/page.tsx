import { CTA } from "@/components/sections/CTA";
import { ExcursionsTeaser } from "@/components/sections/ExcursionsTeaser";
import { Hero } from "@/components/sections/Hero";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { LobsterTank } from "@/components/sections/LobsterTank";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { StoryTeaser } from "@/components/sections/StoryTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { VisitTeaser } from "@/components/sections/VisitTeaser";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, path: "/" });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <SignatureDishes />
      <LobsterTank locale={locale} />
      <StoryTeaser />
      <VisitTeaser />
      <ExcursionsTeaser />
      <Testimonials />
      <InstagramFeed />
      <CTA locale={locale} />
    </>
  );
}
