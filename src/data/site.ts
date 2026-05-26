export interface SiteMetadata {
  companyName: string;
  contactEmail: string;
  whatsappNumber: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
  };
}

export const site: SiteMetadata = {
  companyName: "Terra Preta",
  contactEmail: "cgomez@terrapreta.lat",
  whatsappNumber: "+59171641050",
  socialLinks: {},
};
