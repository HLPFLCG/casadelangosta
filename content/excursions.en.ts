export interface Excursion {
  id: "park" | "sloths" | "bribri" | "dolphins";
  icon: string;
}

export const excursions: Excursion[] = [
  { id: "park", icon: "🐠" },
  { id: "sloths", icon: "🦥" },
  { id: "bribri", icon: "🌿" },
  { id: "dolphins", icon: "🐬" },
];
