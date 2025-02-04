import type { PageServerLoad } from './$types';

export const load = (async ({ params }: { params: { slug: string } }) => {
  const source = 'https://cms.acss-psl.eu/api/';
  const url_posts = `${source}posts?filters[Slug]=${params.slug}&populate=*`;

  try {
    const res = await fetch(url_posts);
    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return { post: data.data };
  } catch (error) {
    console.error("Error loading post:", error);
    return { post: [] };
  }
}) satisfies PageServerLoad
