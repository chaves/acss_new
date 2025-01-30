import type { PageServerLoad } from './$types';

import Equipe from '$lib/data/equipe.json';

export const load = (async () => {
    return {
        equipe: Equipe,
    };
}) satisfies PageServerLoad;