import type { PageServerLoad } from './$types';

export const load = (async () => {
    const date: string = new Date().toISOString();
    const source = 'https://cms.acss-psl.eu/api/seminars'
    const url = `${source}?filters[date][$gte]=${date}&sort=date:asc`;
    const seminars = await (await fetch(url)).json();
    return {
        seminars: seminars.data
    };
}) satisfies PageServerLoad;