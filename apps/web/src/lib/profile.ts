import { getEntry } from "astro:content";

export async function getProfile() {
    const entry = await getEntry("profile", "profile");
    if (!entry) throw new Error("Missing profile data in @hsin19/content");
    return entry.data;
}
