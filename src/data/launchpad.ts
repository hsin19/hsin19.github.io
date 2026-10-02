import type { ImageMetadata } from "astro";
import inTheGreenYetIcon from "../assets/icons/inthegreenyet.svg";
import showMeWayIcon from "../assets/icons/show-me-way.svg";

export interface LaunchpadItem {
    name: string;
    note: string;
    href: string;
    /** Falls back to a monogram tile when omitted. */
    icon?: ImageMetadata;
}

export const launchpad: LaunchpadItem[] = [
    { name: "InTheGreenYet", note: "Portfolio tracker", href: "https://inthegreenyet.hsin19.com", icon: inTheGreenYetIcon },
    { name: "Show Me Way", note: "Trip companion", href: "https://trip.hsin19.com", icon: showMeWayIcon },
    { name: "EF Core Extensions", note: "Docs & NuGet", href: "https://hsin19.github.io/H.EFCore.Extensions" },
    { name: "GitHub", note: "Everything else", href: "https://github.com/hsin19" },
];
