
import type { PageServerLoad } from './$types';

export const load = (async ({ params }: { params: { slug: string } }) => {
    const source = 'https://cms.acss-psl.eu/api/authors'
    const url_membre = `${source}?filters[Slug]=${params.slug}`;
    const membre = await (await fetch(url_membre)).json();
    // console.log(membre.data);
    return {
        membre: membre.data
    };
}) satisfies PageServerLoad;
