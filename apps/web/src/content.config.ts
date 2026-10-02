import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { contentLoader } from "./lib/content-loader";

const link = z.object({ label: z.string(), href: z.url() });

/** Set by the loader from the item's position in its source array. */
const order = z.number().int();

const profile = defineCollection({
    loader: contentLoader("profile"),
    schema: z.object({
        name: z.string(),
        nativeName: z.string(),
        romanizedName: z.string(),
        role: z.string(),
        location: z.string(),
        lead: z.string(),
        bio: z.string(),
        email: z.email(),
        github: z.url(),
        source: z.url(),
    }),
});

const projects = defineCollection({
    loader: contentLoader("projects"),
    schema: ({ image }) =>
        z.object({
            order,
            name: z.string(),
            kicker: z.string().optional(),
            description: z.string(),
            stack: z.array(z.string()),
            year: z.number().int(),
            links: z.array(link).min(1),
            /** Present for projects shown as large cards; the rest are listed compactly. */
            featured: z.object({ icon: image(), tint: z.string() }).optional(),
        }),
});

const launchpad = defineCollection({
    loader: contentLoader("launchpad"),
    schema: ({ image }) =>
        z.object({
            order,
            name: z.string(),
            note: z.string(),
            href: z.url(),
            /** Falls back to a monogram tile when omitted. */
            icon: image().optional(),
        }),
});

const experience = defineCollection({
    loader: contentLoader("experience"),
    schema: z.object({
        order,
        org: z.string(),
        role: z.string(),
        start: z.string(),
        /** Omit for an ongoing entry. */
        end: z.string().optional(),
        summary: z.string().optional(),
        stack: z.array(z.string()).optional(),
        kind: z.enum(["work", "education"]),
        /** Hidden from production builds; shown with a marker in dev. */
        draft: z.boolean().default(false),
        /** Content still to confirm; surfaced in dev and as a build warning. */
        todo: z.string().optional(),
    }),
});

export const collections = { profile, projects, launchpad, experience };
