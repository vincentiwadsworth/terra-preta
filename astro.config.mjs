import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://terrapreta.lat",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr", "de"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          es: "es-ES",
          fr: "fr-FR",
          de: "de-DE",
        },
      },
      filter: (page) => !page.includes("/404"),
    }),
    icon({
      include: {
        "material-symbols": [
          "arrow-downward",
          "call",
          "check-circle",
          "chevron-right",
          "close",
          "description",
          "download",
          "eco",
          "factory",
          "groups",
          "handshake",
          "language",
          "local-shipping",
          "location-on",
          "open-in-new",
          "mail",
          "menu",
          "science",
          "send",
          "verified",
        ],
      },
    }),
  ],
});
