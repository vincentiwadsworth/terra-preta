export interface NutritionFact {
  label: string;
  value: string;
  per: string;
}

export interface ParticleSizeRange {
  mesh: string;
  microns: string;
  percentage: string;
}

export interface PackagingSpec {
  type: string;
  detail: string;
}

export interface Product {
  name: string;
  subtitle: string;
  description: string;
  oracTotal: number;
  oracUnit: string;
  nutritionFacts: NutritionFact[];
  particleSize: ParticleSizeRange[];
  packaging: PackagingSpec[];
  shelfLife: string;
  storageConditions: string;
  certifications: string[];
}

export const product: Product = {
  name: "Freeze-Dried Açaí Powder",
  subtitle: "Premium organic açaí from the Bolivian Amazon, exported by Terra Preta.",
  description:
    "100% organic freeze-dried açaí powder sourced from wild-harvested Euterpe precatoria palms in the Beni region of Bolivia. Cold-processed within hours of harvest to preserve maximum nutritional integrity, vibrant color, and authentic Amazonian flavor.",
  oracTotal: 125900,
  oracUnit: "µmol TE/100g",
  nutritionFacts: [
    { label: "Energy", value: "534 kcal / 2234 kJ", per: "100g" },
    { label: "Protein", value: "8.1 g", per: "100g" },
    { label: "Total Fat", value: "48.0 g", per: "100g" },
    { label: "Saturated Fat", value: "11.8 g", per: "100g" },
    { label: "Monounsaturated Fat", value: "27.3 g", per: "100g" },
    { label: "Polyunsaturated Fat", value: "8.9 g", per: "100g" },
    { label: "Carbohydrates", value: "28.3 g", per: "100g" },
    { label: "Dietary Fiber", value: "27.3 g", per: "100g" },
    { label: "Sugars", value: "1.0 g", per: "100g" },
    { label: "Sodium", value: "30 mg", per: "100g" },
    { label: "Calcium", value: "260 mg", per: "100g" },
    { label: "Iron", value: "4.4 mg", per: "100g" },
    { label: "Potassium", value: "930 mg", per: "100g" },
    { label: "Vitamin A", value: "1002 IU", per: "100g" },
    { label: "Anthocyanins", value: "320 mg", per: "100g" },
  ],
  particleSize: [
    { mesh: "60", microns: "250", percentage: "100%" },
    { mesh: "80", microns: "180", percentage: "98%" },
    { mesh: "100", microns: "150", percentage: "95%" },
  ],
  packaging: [
    { type: "Primary", detail: "5 kg aluminum-laminated bag, nitrogen-flushed" },
    { type: "Secondary", detail: "2 bags per corrugated box (10 kg net per box)" },
    { type: "Pallet", detail: "24 boxes per euro pallet (240 kg net)" },
  ],
  shelfLife: "24 months from production date when stored as directed",
  storageConditions: "Cool, dry environment (<25°C, <65% RH). Keep sealed after opening.",
  certifications: [
    "USDA NOP Organic",
    "EU Organic (Reg. 2018/848)",
    "Bolivia National Organic (Ley 3525/06)",
  ],
};
