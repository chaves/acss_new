<script lang="ts">
	import SEO from '#lib/seo/SEO.svelte';
	import StructuredData from '#lib/seo/StructuredData.svelte';
	import { pageUrl } from '#lib/seo/schema-utils.js';
	import Breadcrumb from '#lib/components/layout/Breadcrumb.svelte';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { formatDate } from '#lib/helpers/locale.js';
	import { localizeUrl } from '#lib/utils.js';
	import { BASE_URL } from '#lib/constants.js';
	import content from '#lib/data/good-practices.json';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const copy = content[getLocale()];
	const path = '/cluster/bonnes-pratiques';
	const docs = 'https://extranet.acss-psl.eu/documentation';
</script>

<SEO title={`${copy.title} | Institut ACSS-PSL`} description={copy.description} />
<StructuredData
	data={{
		'@type': 'CollectionPage',
		name: copy.title,
		description: copy.description,
		url: pageUrl(path),
		inLanguage: getLocale(),
		isPartOf: { '@type': 'WebSite', name: 'Institut ACSS-PSL', url: BASE_URL },
		hasPart: data.pages.map((page) => ({
			'@type': 'TechArticle',
			name: page.title,
			description: page.description,
			url: pageUrl(`${path}/${page.slug}`),
			inLanguage: 'en'
		}))
	}}
/>
<Breadcrumb title={copy.title} title_path={copy.short} link="cluster" link_text="Cluster" fonction={copy.subtitle} />

<div class="practices">
	<section class="intro">
		<p class="lead">{copy.lead}</p>
		{#if copy.language}<p class="language">{copy.language}</p>{/if}
		<aside class="notice" aria-label={copy.noticeTitle}>
			<strong>{copy.noticeTitle}</strong>
			<p>{copy.members}</p>
		</aside>
	</section>

	<section aria-labelledby="sheets-title">
		<h2 id="sheets-title">{copy.sheets}</h2>
		<ol class="sheets">
			{#each data.pages as page, index (page.slug)}
				<li>
					<a href={localizeUrl(`${path}/${page.slug}`)}>
						<span class="number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
						<span class="text">
							<strong lang="en">{page.title}</strong>
							{#if page.description}<span lang="en">{page.description}</span>{/if}
						</span>
						<span class="arrow" aria-hidden="true">→</span>
					</a>
				</li>
			{/each}
		</ol>
	</section>

	<div class="aside">
		<section class="members">
			<p class="links">
				<a href={docs}>{copy.membersLink} ↗</a>
				<a href={localizeUrl('/cluster')}>{copy.access}</a>
			</p>
		</section>
		<section class="credits" aria-labelledby="credits-title">
			<h2 id="credits-title">{copy.creditsTitle}</h2>
			<p>{copy.credits}</p>
			<p class="updated">{copy.updated}{getLocale() === 'fr' ? ' :' : ':'} {formatDate(data.updated)}</p>
		</section>
	</div>
</div>

<style>
	.practices {
		display: grid;
		gap: clamp(2.25rem, 5vw, 3.5rem);
		color: var(--color-body);
	}
	p {
		margin: 0;
		line-height: 1.8;
	}
	h2 {
		margin: 0 0 1rem;
		font-family: var(--font-heading);
		font-size: clamp(1.3rem, 2.2vw, 1.65rem);
		font-weight: 700;
		color: var(--color-heading);
	}
	.intro {
		max-width: 72ch;
	}
	.lead {
		font-size: clamp(1.08rem, 1.7vw, 1.25rem);
		line-height: 1.65;
		font-weight: 500;
		color: var(--color-heading);
	}
	.language {
		margin-top: 0.9rem;
		font-size: 0.88rem;
		color: var(--color-muted);
	}
	.sheets {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}
	.sheets a {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		gap: 1rem;
		align-items: start;
		height: 100%;
		padding: 1.35rem 1.4rem;
		border: 1px solid #d5deec;
		border-radius: 0.9rem;
		background: #fff;
		color: inherit;
		text-decoration: none;
		transition:
			border-color 150ms,
			box-shadow 150ms;
	}
	.sheets a:hover {
		border-color: var(--acss-blue);
		box-shadow: 0 10px 24px -18px rgba(29, 71, 150, 0.55);
	}
	.sheets a:focus-visible {
		outline: 3px solid var(--acss-red);
		outline-offset: 3px;
	}
	.number {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.5rem;
		line-height: 1.1;
		color: var(--acss-red-dark);
	}
	.text {
		display: grid;
		gap: 0.35rem;
	}
	.text strong {
		font-family: var(--font-heading);
		font-size: 1.12rem;
		color: var(--color-heading);
	}
	.text span {
		font-size: 0.88rem;
		line-height: 1.6;
	}
	.arrow {
		color: var(--acss-blue-dark);
		font-weight: 700;
	}
	.aside {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: start;
	}
	.members {
		padding: 1.5rem;
		border-radius: 1rem;
		background: var(--bg-secondary);
		border-top: 3px solid var(--acss-red);
		font-size: 0.9rem;
	}
	.notice {
		margin-top: 1.4rem;
		padding: 1rem 1.2rem;
		border-left: 3px solid var(--acss-red);
		background: var(--bg-secondary);
		border-radius: 0 0.7rem 0.7rem 0;
		font-size: 0.9rem;
	}
	.notice strong {
		display: block;
		margin-bottom: 0.25rem;
		color: var(--color-heading);
		font-size: 0.78rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1.5rem;
	}
	.links a {
		color: var(--acss-blue-dark);
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 0.25em;
	}
	.credits p {
		font-size: 0.9rem;
	}
	.updated {
		margin-top: 0.75rem;
		color: var(--color-muted);
		font-size: 0.8rem !important;
	}
	@media (max-width: 820px) {
		.sheets,
		.aside {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
