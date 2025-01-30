import type { PageServerLoad } from './$types';

export const load = (async () => {
    const date: string = new Date().toISOString();
    const source = 'https://cms.acss-psl.eu/api/seminars'
    const url_upcoming = `${source}?filters[type]=nlp&filters[date][$gte]=${date}&sort=date:asc`;
    const url_past = `${source}?filters[type]=nlp&filters[date][$lt]=${date}&sort=date:desc`;
    const seminars_upcoming = await (await fetch(url_upcoming)).json();
    const seminars_past = await (await fetch(url_past)).json();
    return {
        seminars_upcoming: seminars_upcoming.data,
        seminars_past: seminars_past.data
    };
}) satisfies PageServerLoad;
