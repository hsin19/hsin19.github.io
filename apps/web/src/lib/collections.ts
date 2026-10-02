import {
    type CollectionEntry,
    getCollection,
} from "astro:content";

type OrderedCollection = "projects" | "launchpad" | "experience";

/** List a collection in the order its source data lists it. */
export async function getOrdered<C extends OrderedCollection>(collection: C): Promise<CollectionEntry<C>["data"][]> {
    const entries: CollectionEntry<C>[] = await getCollection(collection);
    return entries.map(entry => entry.data).toSorted((a, b) => a.order - b.order);
}
