import type { MenuCategory } from "./menu.en";

export const menu: MenuCategory[] = [
  {
    id: "tank",
    items: [
      {
        id: "lobster-coconut",
        name: "Langosta Caribeña en Salsa de Coco",
        description:
          "Langosta espinosa caribeña viva elegida de nuestro tanque, cocida a fuego lento en nuestra salsa de coco de la casa con culantro y chile panameño. Servida con arroz con frijoles, plátanos maduros y ensalada de la casa.",
        marketPrice: true,
        badges: ["shellfish", "gf", "market_price"],
      },
      {
        id: "lobster-garlic",
        name: "Langosta Caribeña con Mantequilla de Ajo",
        description:
          "Langosta espinosa caribeña viva abierta a la mitad y asada a la parrilla, acabada con mantequilla dorada de ajo y limón fresco. Servida con arroz con frijoles, plátanos maduros y ensalada de la casa.",
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
        name: "Ceviche de Pescado",
        description:
          "Pesca fresca del día marinada en jugo de limón con culantro, cebolla morada, chile dulce y un toque de picante caribeño. Servido con patacones.",
        priceUSD: 12,
        priceCRC: 6500,
        badges: ["gf"],
      },
      {
        id: "shrimp-coconut-curry",
        name: "Camarones en Curry de Coco",
        description:
          "Camarones caribeños en un fragante curry de coco con cúrcuma, chile panameño y jengibre. Servidos sobre arroz de coco con frijoles.",
        priceUSD: 18,
        priceCRC: 9800,
        badges: ["shellfish", "gf", "spicy"],
      },
      {
        id: "pasta-shrimp",
        name: "Pasta con Camarones Caribeños",
        description:
          "Pasta al dente salteada con camarones locales, ajo, tomates cherry, albahaca fresca y un toque de vino blanco.",
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
        name: "Pargo Rojo Entero a la Parrilla",
        description:
          "Pargo rojo entero de la pesca del día, sazonado con hierbas caribeñas y asado a la llama. Servido con arroz con frijoles, patacones y ensalada de la casa.",
        priceUSD: 22,
        priceCRC: 11900,
        badges: ["gf"],
      },
      {
        id: "jerk-chicken",
        name: "Pollo Jerk al Estilo Caribeño",
        description:
          "Pollo con hueso marinado toda la noche en especias jerk — pimienta gorda, chile panameño, tomillo y jengibre — asado lentamente a la parrilla. Servido con arroz de coco con frijoles y plátanos maduros.",
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
          "El plato clásico costarricense: pechuga de pollo a la parrilla, arroz, frijoles negros, plátanos maduros, ensalada fresca y picadillo de papa.",
        priceUSD: 13,
        priceCRC: 7000,
        badges: ["gf"],
      },
      {
        id: "coconut-rice-peas",
        name: "Arroz de Coco con Frijoles",
        description:
          "Arroz caribeño tradicional cocido a fuego lento en leche de coco con frijoles de palo, tomillo y ajo. El acompañante perfecto o una satisfactoria guarnición.",
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
        name: "Casado Vegetariano",
        description:
          "Arroz, frijoles negros, vegetales de temporada salteados, plátanos maduros, ensalada de la casa y aguacate fresco. Completamente a base de plantas.",
        priceUSD: 12,
        priceCRC: 6500,
        badges: ["gf", "vegan"],
      },
      {
        id: "patacones-guac",
        name: "Patacones con Guacamole",
        description:
          "Rodajas de plátano verde frito dos veces, servidas con guacamole de la casa y pico de gallo.",
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
        name: "Jugo Natural de Maracuyá",
        description: "Maracuyá fresca licuada con agua. Sin azúcar añadida, sin gaseosa.",
        priceUSD: 4,
        priceCRC: 2200,
        badges: ["gf", "vegan"],
      },
      {
        id: "juice-tamarind",
        name: "Jugo Natural de Tamarindo",
        description:
          "Clásica agua fresca caribeña de tamarindo, ligeramente ácida y muy refrescante.",
        priceUSD: 4,
        priceCRC: 2200,
        badges: ["gf", "vegan"],
      },
      {
        id: "juice-pipa",
        name: "Pipa Fría (Agua de Coco Natural)",
        description: "Coco entero frío, abierto en la mesa. La bebida más caribeña que existe.",
        priceUSD: 5,
        priceCRC: 2700,
        badges: ["gf", "vegan"],
      },
      {
        id: "juice-guanabana",
        name: "Jugo Natural de Guanábana",
        description:
          "Cremosa guanábana licuada con agua — tropical, fragante y completamente natural.",
        priceUSD: 4,
        priceCRC: 2200,
        badges: ["gf", "vegan"],
      },
    ],
  },
];
