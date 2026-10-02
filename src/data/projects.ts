import type { ImageMetadata } from "astro";
import hopIcon from "../assets/icons/hop.svg";
import inTheGreenYetIcon from "../assets/icons/inthegreenyet.svg";
import showMeWayIcon from "../assets/icons/show-me-way.svg";

export interface ProjectLink {
    label: string;
    href: string;
}

export interface FeaturedProject {
    name: string;
    kicker: string;
    description: string;
    icon: ImageMetadata;
    /** Brand color used to tint the card. */
    tint: string;
    stack: string[];
    links: ProjectLink[];
}

export interface Project {
    name: string;
    description: string;
    stack: string[];
    year: number;
    href: string;
}

export const featured: FeaturedProject[] = [
    {
        name: "InTheGreenYet",
        kicker: "A personal investment tracker, powered by Notion.",
        description: "It's not about today's profit — it's about knowing where you truly stand. Portfolio data stays in your own Notion workspace; a single Cloudflare Worker handles OAuth, the Notion API and signed provider requests, so the app itself stays a thin client.",
        icon: inTheGreenYetIcon,
        tint: "#6fae3f",
        stack: ["React 19", "TypeScript", "Tailwind v4", "Cloudflare Workers", "Notion API", "PWA"],
        links: [
            { label: "Open app", href: "https://inthegreenyet.hsin19.com" },
            { label: "Source", href: "https://github.com/hsin19/InTheGreenYet" },
        ],
    },
    {
        name: "Show Me Way",
        kicker: "A YAML-driven, offline-first travel companion.",
        description: "Write a trip as one YAML file and get a day-by-day timeline, pre-trip checklists, a full-screen hotel address for the taxi driver and a departure countdown — all offline. Share links are encrypted in the browser before they leave the device.",
        icon: showMeWayIcon,
        tint: "#4cc2f7",
        stack: ["Svelte 5", "TypeScript", "Vite", "Tailwind v4", "PWA"],
        links: [
            { label: "Open app", href: "https://trip.hsin19.com" },
            { label: "Source", href: "https://github.com/hsin19/show-me-way" },
        ],
    },
    {
        name: "hop",
        kicker: "Short links and an end-to-end encrypted blob relay.",
        description: "One Worker, two deliberately different trust levels: anonymous ciphertext drops that can never redirect, and admin-only short links that can. The key travels in the URL fragment, so the server never sees plaintext.",
        icon: hopIcon,
        tint: "#f5b84b",
        stack: ["TypeScript", "Hono", "Cloudflare Workers", "KV"],
        links: [{ label: "Source", href: "https://github.com/hsin19/hop" }],
    },
];

export const more: Project[] = [
    {
        name: "H.EFCore.Extensions",
        description: "Helper extensions for EF Core — string-based ordering and query instances. Published on NuGet.",
        stack: ["C#", ".NET"],
        year: 2022,
        href: "https://github.com/hsin19/H.EFCore.Extensions",
    },
    {
        name: "dotfiles",
        description: "One-command macOS and Ubuntu setup: zsh, Ghostty, Brewfile and an AI commit-message hook.",
        stack: ["Shell"],
        year: 2026,
        href: "https://github.com/hsin19/dotfiles",
    },
    {
        name: "orderSite",
        description: "A small but complete ordering site with Google Sheets as the back end — no server required.",
        stack: ["Apps Script", "JavaScript"],
        year: 2021,
        href: "https://github.com/hsin19/orderSite",
    },
];
