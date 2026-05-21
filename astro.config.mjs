import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://terrapreta.lat",
  integrations: [
    sitemap({
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
          "language",
          "local-shipping",
          "location-on",
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
