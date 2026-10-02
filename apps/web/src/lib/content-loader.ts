import type { Loader } from "astro/loaders";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import {
    dirname,
    join,
    relative,
} from "node:path";
import { fileURLToPath } from "node:url";

// @hsin19/content is the single source of site data. Today it is static JSON in the
// workspace; moving to an API means replacing `read` with a fetch returning the same shape.
const contentRoot = dirname(createRequire(import.meta.url).resolve("@hsin19/content/package.json"));

type Item = Record<string, unknown> & { id?: unknown; };

async function read(filePath: string): Promise<Item[] | Item> {
    return JSON.parse(await readFile(filePath, "utf8"));
}

/**
 * Loads `data/<name>.json` from @hsin19/content at build time.
 * An array becomes one entry per item, keyed by its `id`, with its position recorded as `order`
 * (collections come back sorted by id, so array order would otherwise be lost).
 * An object becomes a single entry keyed `name`.
 * Relative image paths in the data resolve against the data file, so `image()` works in schemas.
 */
export function contentLoader(name: string): Loader {
    const filePath = join(contentRoot, "data", `${name}.json`);

    return {
        name: `content:${name}`,
        async load({ config, logger, parseData, store, watcher }) {
            const storedPath = relative(fileURLToPath(config.root), filePath);

            async function sync() {
                const raw = await read(filePath);
                const items = Array.isArray(raw) ? raw.map((item, order) => ({ ...item, order })) : [{ ...raw, id: name }];
                store.clear();
                for (const { id, ...data } of items) {
                    if (typeof id !== "string") throw new Error(`${name}.json: every entry needs a string "id"`);
                    const parsed = await parseData({ id, data, filePath });
                    store.set({ id, data: parsed, filePath: storedPath });
                }
            }

            await sync();
            watcher?.add(filePath);
            watcher?.on("change", async changed => {
                if (changed !== filePath) return;
                logger.info(`Reloading ${name}.json`);
                await sync();
            });
        },
    };
}
