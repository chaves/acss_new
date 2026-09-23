<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import { marked } from 'marked';
	import SEO from '$lib/seo/SEO.svelte';
	import StructuredData from '$lib/seo/StructuredData.svelte';
	import { generatePersonSchema, generateBreadcrumbSchema } from '$lib/seo/schema-utils';

	let { data }: { data: PageData } = $props();
	let membre = $derived(data.membre[0]);
	let name = $derived(membre.FirstName + ' ' + membre.LastName);
	// Convert the Markdown biography to HTML.
	let biographyHtml = $derived(marked(membre.biography ?? ''));

	// Use the start of the biography as the description rather than just the name.
	const seoDescription = $derived.by(() => {
		const plain = membre.biography
			?.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
			.replace(/[#*_>`]/g, '')
			.replace(/\s+/g, ' ')
			.trim();

		const role = membre.fonction ? `${name}, ${membre.fonction}` : name;
		const lead = `${role} — Institut ACSS-PSL.`;
		return plain ? `${lead} ${plain}`.slice(0, 300) : lead;
	});

	const personSchema = $derived(
		generatePersonSchema({
			name,
			jobTitle: membre.fonction,
			affiliation: 'Institut ACSS-PSL',
			image: membre.ImageFileName ? `/images/photos_equipe/${membre.ImageFileName}` : undefined,
			url: `/equipe/${membre.Slug}`,
			email: membre.email
		})
	);

	const breadcrumbSchema = $derived(
		generateBreadcrumbSchema([
			{ name: 'Institut ACSS-PSL', url: '/' },
			{ name: m.team(), url: '/equipe' },
			{ name, url: `/equipe/${membre.Slug}` }
		])
	);
</script>

<SEO title="{name} | Institut ACSS-PSL" description={seoDescription} />
<StructuredData data={personSchema} />
<StructuredData data={breadcrumbSchema} />

<Breadcrumb
	title={name}
	title_path={name}
	fonction={membre.fonction}
	email={membre.email}
	link="equipe"
	link_text={m.team()}
/>

<div class="flex flex-wrap text-sm">
	{#if typeof membre === 'undefined'}
		<h1>Cette page n'existe pas.</h1>
	{:else}
		<div class="order-0 md:order-0 mb-12 w-full px-3 pr-12 md:w-1/3">
			<img
				class="w-80 rounded-xl object-cover shadow-md"
				src="/images/photos_equipe/{membre.ImageFileName}"
				alt="{membre.FirstName} {membre.LastName}"
				width="320"
				height="320"
				loading="eager"
				decoding="async"
			/>
		</div>
		<div class="equipe-bio order-0 md:order-0 mb-12 w-full px-3 pr-12 md:w-2/3">
			{@html biographyHtml}
		</div>
	{/if}
</div>

<style>
</style>
