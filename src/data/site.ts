export interface SiteMetadata {
  companyName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  whatsappNumber: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
  };
}

export const site: SiteMetadata = {
  companyName: "Terra Preta",
  tagline: "Amazonian superfoods, exported with integrity.",
  description:
    "Terra Preta exports premium freeze-dried açaí powder from the Bolivian Amazon. USDA NOP and EU Organic certified. Direct from producer to your facility.",
  contactEmail: "cgomez@terrapreta.lat",
  whatsappNumber: "+59171641050",
  socialLinks: {
    linkedin: "https://linkedin.com/company/terra-preta",
  },
};
