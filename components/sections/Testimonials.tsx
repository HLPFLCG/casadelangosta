"use client";

import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const items = t.raw("items") as { quote: string; author: string }[];

  return (
    <section className="py-20 bg-ocean text-coconut overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-coconut text-center mb-14">
          {t("title")}
        </h2>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {items.map((item) => (
                <div
                  key={item.author}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <figure className="bg-coconut/10 border border-coconut/20 rounded-3xl p-8 h-full flex flex-col justify-between">
                    <blockquote className="text-sand leading-relaxed italic mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="text-sm font-semibold text-reef">
                      {item.author}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="text-coconut hover:bg-coconut/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="text-coconut hover:bg-coconut/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
