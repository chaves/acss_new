import type { PageServerLoad } from './$types';

export const load = (async () => {
    const source = 'https://cms.acss-psl.eu/api/authors'
    const url_equipe = `${source}?filters[type]=acss_engineer&sort=LastName`;
    const equipe = await (await fetch(url_equipe)).json();
    return {equipe: equipe.data};
}) satisfies PageServerLoad;
