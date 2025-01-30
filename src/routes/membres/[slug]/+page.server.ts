import type { PageServerLoad } from './$types';
import Membres from '$lib/data/membres.json';

const data_membres = Membres;

function getBySlug(slug: string, data_membres: any[]) {
    return data_membres.filter(function (data_membres) {
        return data_membres.slug === slug;
    });
}

export const load = (async ({ params }: { params: { slug: string } }) => {
    const membre = getBySlug(params.slug, data_membres)[0];
    const full_name = `${membre.first_name} ${membre.last_name}`;
    return {
        membre: membre,
        full_name: full_name,
    };
}) satisfies PageServerLoad;