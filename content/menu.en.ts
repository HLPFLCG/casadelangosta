export type DietaryBadge = "gf" | "v" | "vegan" | "spicy" | "shellfish" | "market_price";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceUSD?: number;
  priceCRC?: number;
  marketPrice?: boolean;
  badges: DietaryBadge[];
}

export interface MenuCategory {
  id: "tank" | "sea" | "grill" | "tierra" | "vegetariano" | "drinks";
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: "tank",
    items: [
      {
        id: "lobster-coconut",
        name: "Caribbean Lobster in Coconut Sauce",
        description:
          "Live Caribbean spiny lobster chosen from our tank, simmered in our house coconut sauce with culantro and scotch bonnet. Served with rice & beans, sweet plantains, and house salad.",
        marketPrice: true,
        badges: ["shellfish", "gf", "market_price"],
      },
      {
        id: "lobster-garlic",
        name: "Caribbean Lobster in Garlic Butter",
        description:
          "Live Caribbean spiny lobster split and grilled, finished with golden garlic butter and fresh lime. Served with rice & beans, sweet plantains, and house salad.",
        marketPrice: true,
        badges: ["shellfish", "gf", "market_price"],
      },
    ],
  },
  {
    id: "sea",
    items: [
      {
        id: "ceviche",
        name: "Fish Ceviche",
        description:
          "Fresh daily catch marinated in lime juice with culantro, red onion, sweet pepper, and a whisper of Caribbean heat. Served with patacones.",
        priceUSD: 12,
        priceCRC: 6500,
        badges: ["gf"],
      },
      {
        id: "shrimp-coconut-curry",
        name: "Shrimp in Coconut Curry",
        description:
          "Caribbean shrimp in a fragrant coconut curry with turmeric, scotch bonnet, and ginger. Served over coconut rice and peas.",
        priceUSD: 18,
        priceCRC: 9800,
        badges: ["shellfish", "gf", "spicy"],
      },
      {
        id: "pasta-shrimp",
        name: "Pasta with Caribbean Shrimp",
        description:
          "Al dente pasta tossed with local shrimp, garlic, cherry tomatoes, fresh basil, and a splash of white wine.",
        priceUSD: 17,
        priceCRC: 9200,
        badges: ["shellfish"],
      },
    ],
  },
  {
    id: "grill",
    items: [
      {
        id: "red-snapper",
        name: "Whole Grilled Red Snapper",
        description:
          "Whole pargo rojo from the day's catch, seasoned with Caribbean herbs and grilled over open flame. Served with rice & beans, patacones, and house salad.",
        priceUSD: 22,
        priceCRC: 11900,
        badges: ["gf"],
      },
      {
        id: "jerk-chicken",
        name: "Caribbean-Style Jerk Chicken",
        description:
          "Bone-in chicken marinated overnight in jerk spices — allspice, scotch bonnet, thyme, and ginger — slow-charred on the grill. Served with coconut rice and peas and sweet plantains.",
        priceUSD: 16,
        priceCRC: 8700,
        badges: ["gf", "spicy"],
      },
    ],
  },
  {
    id: "tierra",
    items: [
      {
        id: "casado-pollo",
        name: "Casado de Pollo",
        description:
          "The classic Costa Rican plate: grilled chicken breast, rice, black beans, sweet plantains, fresh salad, and picadillo de papa.",
        priceUSD: 13,
        priceCRC: 7000,
        badges: ["gf"],
      },
      {
        id: "coconut-rice-peas",
        name: "Coconut Rice and Peas",
        description:
          "Traditional Caribbean rice slow-cooked in coconut milk with pigeon peas, thyme, and garlic. The perfect companion or a satisfying side.",
        priceUSD: 5,
        priceCRC: 2700,
        badges: ["gf", "vegan"],
      },
    ],
  },
  {
    id: "vegetariano",
    items: [
      {
        id: "casado-vegetariano",
        name: "Vegetarian Casado",
        description:
          "Rice, black beans, sautéed seasonal vegetables, sweet plantains, house salad, and fresh avocado. Completely plant-based.",
        priceUSD: 12,
        priceCRC: 6500,
        badges: ["gf", "vegan"],
      },
      {
        id: "patacones-guac",
        name: "Patacones with Guacamole",
        description:
          "Twice-fried green plantain rounds served with house-made guacamole and pico de gallo.",
        priceUSD: 8,
        priceCRC: 4300,
        badges: ["gf", "vegan"],
      },
    ],
  },
  {
    id: "drinks",
    items: [
      {
        id: "juice-passion",
        name: "Passion Fruit Natural Juice",
        description: "Fresh maracuyá blended with water. No added sugar, no soda.",
        priceUSD: 4,
        priceCRC: 2200,
        badges: ["gf", "vegan"],
      },
      {
        id: "juice-tamarind",
        name: "Tamarind Natural Juice",
        description: "Classic Caribbean tamarind agua fresca, slightly tart and deeply refreshing.",
        priceUSD: 4,
        priceCRC: 2200,
        badges: ["gf", "vegan"],
      },
      {
        id: "juice-pipa",
        name: "Pipa Fría (Fresh Coconut Water)",
        description: "Chilled whole coconut, opened tableside. The most Caribbean drink there is.",
        priceUSD: 5,
        priceCRC: 2700,
        badges: ["gf", "vegan"],
      },
      {
        id: "juice-guanabana",
        name: "Guanábana Natural Juice",
        description: "Creamy soursop blended with water — tropical, fragrant, and completely natural.",
        priceUSD: 4,
        priceCRC: 2200,
        badges: ["gf", "vegan"],
      },
    ],
  },
];
