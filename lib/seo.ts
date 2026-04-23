import type { Metadata } from "next";
import {
  ADDRESS,
  COORDS,
  HOURS,
  PHONE_WHATSAPP_DISPLAY,
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_TAGLINE,
} from "./constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://casadelangosta.cr";

export function buildMetadata({
  title,
  description,
  path = "/",
  locale = "en",
}: {
  title?: string;
  description?: string;
  path?: string;
  locale?: string;
}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const pageDesc =
    description ??
    "Family-owned Caribbean seafood restaurant in Cahuita, Costa Rica. Fresh lobster from our tank daily. Open 12:00–22:00.";

  return {
    title: pageTitle,
    description: pageDesc,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: {
        en: `${BASE_URL}/en${path}`,
        es: `${BASE_URL}/es${path}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `${BASE_URL}${path}`,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_CR" : "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — Caribbean seafood restaurant in Cahuita, Costa Rica`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE_FULL_NAME,
    alternateName: SITE_NAME,
    description:
      "Family-owned Caribbean seafood restaurant in Cahuita, Limón, Costa Rica. Specialising in fresh Caribbean spiny lobster, fish ceviche, and Afro-Caribbean cuisine.",
    url: BASE_URL,
    telephone: PHONE_WHATSAPP_DISPLAY,
    priceRange: "$$$",
    servesCuisine: ["Caribbean", "Costa Rican", "Seafood", "Afro-Caribbean"],
    currenciesAccepted: "CRC, USD",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.province,
      postalCode: ADDRESS.postalCode,
      addressCountry: "CR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COORDS.lat,
      longitude: COORDS.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: HOURS.open,
        closes: HOURS.close,
      },
    ],
    menu: `${BASE_URL}/menu`,
    image: `${BASE_URL}/opengraph-image`,
  };
}
