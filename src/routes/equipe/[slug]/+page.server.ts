import type { PageServerLoad } from './$types';
import Equipe from '$lib/data/equipe.json';

const data_equipe = Equipe;

function getBySlug(slug: string, data_equipe: any[]) {
    return data_equipe.filter(function (data_equipe) {
        return data_equipe.slug === slug;
    });
}

export const load = (async ({ params }: { params: { slug: string } }) => {
    const membre = getBySlug(params.slug, data_equipe)[0];
    const full_name = `${membre.first_name} ${membre.last_name}`;
    return {
        membre: membre,
        full_name: full_name,
    };
}) satisfies PageServerLoad;