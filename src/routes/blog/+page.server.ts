import type { PageServerLoad } from './$types';

export const load = (async () => {
  const source = 'https://cms.acss-psl.eu/api/';
  const url_posts = `${source}posts?pagination[pageSize]=10&populate=*&sort=publishedAt:desc`;

  try {
    const res = await fetch(url_posts);
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return { posts: data.data };
  } catch (error) {
    console.error("Error loading posts:", error);
    return { posts: [] };
  }
}) satisfies PageServerLoad