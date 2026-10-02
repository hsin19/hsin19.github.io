import sitemap from "@astrojs/sitemap";
import {
    defineConfig,
    fontProviders,
} from "astro/config";

export default defineConfig({
    site: "https://hsin19.github.io",
    integrations: [sitemap()],
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Instrument Serif",
            cssVariable: "--font-display",
            weights: [400],
            styles: ["normal", "italic"],
            subsets: ["latin"],
            fallbacks: ["serif"],
        },
        {
            provider: fontProviders.fontsource(),
            name: "Geist",
            cssVariable: "--font-sans",
            weights: ["100 900"],
            styles: ["normal"],
            subsets: ["latin"],
            fallbacks: ["sans-serif"],
        },
        {
            provider: fontProviders.fontsource(),
            name: "Geist Mono",
            cssVariable: "--font-mono",
            weights: ["100 900"],
            styles: ["normal"],
            subsets: ["latin"],
            fallbacks: ["monospace"],
        },
    ],
});
