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
    "Terra Preta connects European buyers with certified freeze-dried açaí producers in the Bolivian Amazon. We coordinate harvest-to-export logistics and manage organic certification verification — so you receive compliant, premium açaí powder without navigating complex supply chains. USDA NOP and EU Organic certified.",
  contactEmail: "cgomez@terrapreta.lat",
  whatsappNumber: "+59171641050",
  socialLinks: {},
};
