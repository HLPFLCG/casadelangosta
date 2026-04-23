import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dishes = [
  {
    key: "lobster",
    image: "/images/lobster-coconut.jpg",
    alt: "Caribbean lobster in coconut sauce served with rice and beans",
  },
  {
    key: "ceviche",
    image: "/images/ceviche.jpg",
    alt: "Fresh fish ceviche with lime and Caribbean spices",
  },
  {
    key: "jerk",
    image: "/images/jerk-chicken.jpg",
    alt: "Caribbean jerk chicken with coconut rice and peas",
  },
] as const;

export function SignatureDishes() {
  const t = useTranslations("signature");

  return (
    <section className="py-20 bg-coconut">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-palm mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-text text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dishes.map(({ key, image, alt }) => (
            <Card key={key} className="overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle>
                  {t(`${key}_title` as "lobster_title" | "ceviche_title" | "jerk_title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-text leading-relaxed">
                  {t(`${key}_desc` as "lobster_desc" | "ceviche_desc" | "jerk_desc")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
