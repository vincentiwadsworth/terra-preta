export interface Certification {
  name: string;
  badgeText: string;
  authority: string;
  id: string;
  validUntil?: string;
  verificationUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: "USDA NOP Organic",
    badgeText: "USDA Organic",
    authority: "United States Department of Agriculture",
    id: "4080209399",
    verificationUrl: "https://organic.ams.usda.gov/integrity/",
  },
  {
    name: "EU Organic",
    badgeText: "EU Organic",
    authority: "European Union — Reg. 2018/848",
    id: "CN 0813",
    validUntil: "2026-05-31",
    verificationUrl: "https://ec.europa.eu/agriculture/organic/",
  },
  {
    name: "Bolivia National Organic",
    badgeText: "CERESCERT Organic",
    authority: "CERESCERT SRL — Ley 3525/06",
    id: "CERESCERT-001",
    verificationUrl: "https://www.cerescert.com/",
  },
];
