export interface Excursion {
  id: "park" | "sloths" | "bribri" | "dolphins";
  icon: string;
  pricePerPerson: number;
  /** Demo Stripe Payment Link (test mode) */
  stripeLink: string;
}

export const excursions: Excursion[] = [
  {
    id: "park",
    icon: "🐠",
    pricePerPerson: 45,
    stripeLink: "https://buy.stripe.com/test_eVa28r0M81IA9XycMM",
  },
  {
    id: "sloths",
    icon: "🦥",
    pricePerPerson: 35,
    stripeLink: "https://buy.stripe.com/test_dR614n1Qc5YQ8Tu9AB",
  },
  {
    id: "bribri",
    icon: "🌿",
    pricePerPerson: 75,
    stripeLink: "https://buy.stripe.com/test_cN203j2Ug9aW0n2144",
  },
  {
    id: "dolphins",
    icon: "🐬",
    pricePerPerson: 55,
    stripeLink: "https://buy.stripe.com/test_bL172f3Yk5YQaZC28a",
  },
];
