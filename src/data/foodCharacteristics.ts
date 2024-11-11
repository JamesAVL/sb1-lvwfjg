import { FoodCharacteristic } from '../types/DefrostTypes';

export const FOOD_CHARACTERISTICS: Record<string, FoodCharacteristic> = {
  WHOLE_MEAT: {
    surfaceAreaExponent: 0.65,
    densityFactor: 1.2,
    thicknessScale: 0.95,
    name: "Whole joints of meat (beef, pork, veal)",
    baseSettings: [
      { weight: 800, settings: { power: 180, time: 15, power2: 90, timeRange: [10, 15] } },
      { weight: 1000, settings: { power: 180, time: 15, power2: 90, timeRange: [20, 30] } },
      { weight: 1500, settings: { power: 180, time: 25, power2: 90, timeRange: [25, 30] } }
    ],
    notes: "Turn several times during defrosting. Check center is fully defrosted.",
    safetyNotes: [
      "Turn meat several times during defrosting",
      "Remove defrosted portions as they soften",
      "Let stand 20-30 minutes after defrosting"
    ]
  },
  DICED_MEAT: {
    surfaceAreaExponent: 0.8,
    densityFactor: 1.15,
    thicknessScale: 0.7,
    name: "Diced or sliced meat (beef, pork, veal)",
    baseSettings: [
      { weight: 200, settings: { power: 180, time: 5, power2: 90, timeRange: [4, 6] } },
      { weight: 500, settings: { power: 180, time: 8, power2: 90, timeRange: [5, 10] } },
      { weight: 800, settings: { power: 180, time: 10, power2: 90, timeRange: [10, 15] } }
    ],
    notes: "Separate pieces when turning. Remove defrosted portions.",
    safetyNotes: [
      "Separate pieces as they begin to defrost",
      "Remove portions that are defrosted",
      "Let stand 5-10 minutes after defrosting"
    ]
  },
  MINCED_MEAT: {
    surfaceAreaExponent: 0.85,
    densityFactor: 1.1,
    thicknessScale: 0.6,
    name: "Mixed minced meat",
    baseSettings: [
      { weight: 200, settings: { power: 90, timeRange: [10, 15] } },
      { weight: 500, settings: { power: 180, time: 5, power2: 90, timeRange: [10, 15] } },
      { weight: 800, settings: { power: 180, time: 10, power2: 90, timeRange: [15, 20] } },
      { weight: 1000, settings: { power: 180, time: 13, power2: 90, timeRange: [20, 25] } }
    ],
    notes: "Freeze flat if possible. Remove defrosted portions.",
    safetyNotes: [
      "Break up and remove defrosted portions",
      "Turn several times during defrosting",
      "Cook immediately after defrosting"
    ]
  },
  POULTRY_PORTIONS: {
    surfaceAreaExponent: 0.75,
    densityFactor: 1.05,
    thicknessScale: 0.8,
    name: "Poultry portions (chicken, turkey)",
    baseSettings: [
      { weight: 600, settings: { power: 180, time: 5, power2: 90, timeRange: [13, 18] } },
      { weight: 1200, settings: { power: 180, time: 10, power2: 90, timeRange: [20, 25] } }
    ],
    notes: "Turn halfway through. Shield thin edges if needed.",
    safetyNotes: [
      "Ensure joints are fully defrosted",
      "Check no ice remains in cavity",
      "Let stand 20-30 minutes before cooking"
    ]
  },
  DUCK: {
    surfaceAreaExponent: 0.7,
    densityFactor: 1.15,
    thicknessScale: 0.9,
    name: "Whole Duck",
    baseSettings: [
      { weight: 2000, settings: { power: 180, time: 20, power2: 90, timeRange: [30, 40] } }
    ],
    notes: "Turn several times. Drain off liquid during defrosting.",
    safetyNotes: [
      "Turn every 10-15 minutes",
      "Shield wings and legs if needed",
      "Ensure cavity is fully defrosted"
    ]
  },
  GOOSE: {
    surfaceAreaExponent: 0.7,
    densityFactor: 1.2,
    thicknessScale: 0.95,
    name: "Whole Goose",
    baseSettings: [
      { weight: 4500, settings: { power: 180, time: 30, power2: 90, timeRange: [60, 80] } }
    ],
    notes: "Turn every 20 minutes. Drain liquid frequently.",
    safetyNotes: [
      "Turn regularly during defrosting",
      "Drain off liquid to prevent overflow",
      "Allow extra standing time due to size"
    ]
  },
  FISH_FILLET: {
    surfaceAreaExponent: 0.9,
    densityFactor: 0.9,
    thicknessScale: 0.5,
    name: "Fish fillets or steaks",
    baseSettings: [
      { weight: 400, settings: { power: 180, time: 5, power2: 90, timeRange: [10, 15] } }
    ],
    notes: "Separate pieces as they defrost. Handle gently.",
    safetyNotes: [
      "Separate fillets when partially defrosted",
      "Handle carefully to avoid breaking",
      "Cook immediately after defrosting"
    ]
  },
  WHOLE_FISH: {
    surfaceAreaExponent: 0.8,
    densityFactor: 0.95,
    thicknessScale: 0.7,
    name: "Whole fish",
    baseSettings: [
      { weight: 300, settings: { power: 180, time: 3, power2: 90, timeRange: [10, 15] } },
      { weight: 600, settings: { power: 180, time: 8, power2: 90, timeRange: [10, 15] } }
    ],
    notes: "Turn halfway through. Shield tail if needed.",
    safetyNotes: [
      "Turn carefully to avoid damage",
      "Check cavity is fully defrosted",
      "Defrost just until flexible"
    ]
  },
  VEGETABLES: {
    surfaceAreaExponent: 0.8,
    densityFactor: 0.9,
    thicknessScale: 0.7,
    name: "Vegetables (e.g., peas)",
    baseSettings: [
      { weight: 300, settings: { power: 180, timeRange: [8, 13] } },
      { weight: 600, settings: { power: 180, time: 10, power2: 90, timeRange: [8, 13] } }
    ],
    notes: "Stir carefully half way through. Add 1-2 tbsp water per 100g.",
    safetyNotes: [
      "Stir to ensure even defrosting",
      "Break up any frozen clumps",
      "Can be cooked from frozen if recipe allows"
    ]
  },
  FRUIT: {
    surfaceAreaExponent: 0.9,
    densityFactor: 0.85,
    thicknessScale: 0.5,
    name: "Fruit (e.g., raspberries)",
    baseSettings: [
      { weight: 300, settings: { power: 180, timeRange: [7, 10] } },
      { weight: 500, settings: { power: 180, time: 8, power2: 90, timeRange: [5, 10] } }
    ],
    notes: "Stir carefully during defrosting and separate defrosted parts.",
    safetyNotes: [
      "Separate fruits as they defrost",
      "Drain excess liquid if needed",
      "Can be used partially frozen for smoothies"
    ]
  },
  BUTTER: {
    surfaceAreaExponent: 0.95,
    densityFactor: 1.3,
    thicknessScale: 0.4,
    name: "Butter (for softening)",
    baseSettings: [
      { weight: 125, settings: { power: 90, timeRange: [7, 9] } },
      { weight: 250, settings: { power: 180, time: 2, power2: 90, timeRange: [3, 5] } }
    ],
    notes: "Remove packaging completely before defrosting.",
    safetyNotes: [
      "Remove all packaging including foil",
      "Check temperature frequently",
      "Stop when just softened to avoid melting"
    ]
  },
  BREAD: {
    surfaceAreaExponent: 0.7,
    densityFactor: 0.8,
    thicknessScale: 0.8,
    name: "Whole bread loaf",
    baseSettings: [
      { weight: 500, settings: { power: 180, time: 3, power2: 90, timeRange: [10, 15] } },
      { weight: 1000, settings: { power: 180, time: 3, power2: 90, timeRange: [15, 25] } }
    ],
    notes: "Turn halfway through. Best defrosted in slices if possible.",
    safetyNotes: [
      "Turn halfway for even defrosting",
      "Separate slices when possible",
      "Use immediately after defrosting"
    ]
  },
  DRY_CAKE: {
    surfaceAreaExponent: 0.75,
    densityFactor: 0.7,
    thicknessScale: 0.85,
    name: "Dry cake (e.g., sponge cake)",
    baseSettings: [
      { weight: 500, settings: { power: 90, timeRange: [10, 15] } },
      { weight: 750, settings: { power: 180, time: 2, power2: 90, timeRange: [10, 15] } }
    ],
    notes: "Only for cakes without icing, cream or crème pâtissière",
    safetyNotes: [
      "Not suitable for cream-filled cakes",
      "Defrost just until soft",
      "Let stand 5-10 minutes to complete defrosting"
    ]
  },
  MOIST_CAKE: {
    surfaceAreaExponent: 0.75,
    densityFactor: 0.85,
    thicknessScale: 0.9,
    name: "Moist cake (e.g., fruit cake)",
    baseSettings: [
      { weight: 500, settings: { power: 180, time: 5, power2: 90, timeRange: [15, 20] } },
      { weight: 750, settings: { power: 180, time: 10, power2: 90, timeRange: [15, 20] } }
    ],
    notes: "Only for cakes without icing, cream or gelatine.",
    safetyNotes: [
      "Not suitable for iced cakes",
      "Monitor carefully to avoid overheating",
      "Let stand 10-15 minutes after defrosting"
    ]
  }
};