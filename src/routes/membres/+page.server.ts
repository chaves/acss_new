import type { PageServerLoad } from './$types';
import Membres from '$lib/data/membres.json';

export const load = (async () => {
    return {
        membres: Membres,
    };
}) satisfies PageServerLoad;


