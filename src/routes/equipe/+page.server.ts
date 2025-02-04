import type { PageServerLoad } from './$types';

export const load = (async () => {
  const source = 'https://cms.acss-psl.eu/api/authors';
  const url_equipe = `${source}?filters[type]=acss_engineer&sort=LastName`;

  try {
    const res = await fetch(url_equipe);
    if (!res.ok) {
      throw new Error(`Failed to fetch equipe: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return { equipe: data.data };
  } catch (error) {
    console.error("Error loading equipe:", error);
    return { equipe: [] };
  }
}) satisfies PageServerLoad