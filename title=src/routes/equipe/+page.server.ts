import type { PageServerLoad } from './$types';

export const load = (async () => {
  const url = 'https://cms.acss-psl.eu/api/authors?filters[type]=acss_engineer&sort=LastName';

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch equipe: ${res.status} ${res.statusText}`);
    }
    const { data } = await res.json();

    // Map each member so that we explicitly keep the slug.
    // Adjust the property access as needed depending on your API response.
    const equipe = data.map((member: any) => ({
      ...member,
      slug: member.attributes?.Slug || member.slug || null
    }));

    return { equipe };
  } catch (error) {
    console.error("Error loading equipe:", error);
    return { equipe: [] };
  }
}) satisfies PageServerLoad;