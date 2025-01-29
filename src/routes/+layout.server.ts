import type { LayoutServerLoad } from './$types';
import { languageTag } from "$lib/paraglide/runtime"

console.log(`The language on the server is ${languageTag()}`);

export const load = (async () => {
    return {
        serverLang: `The language on the server is ${languageTag()}`,
    };
}) satisfies LayoutServerLoad;