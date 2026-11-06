<script lang="ts">
	import SEO from '#lib/seo/SEO.svelte';
	import StructuredData from '#lib/seo/StructuredData.svelte';
	import { pageUrl } from '#lib/seo/schema-utils.js';
	import Breadcrumb from '#lib/components/layout/Breadcrumb.svelte';
	import RegionFunding from '#lib/components/cluster/RegionFunding.svelte';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { formatDate } from '#lib/helpers/locale.js';
	import { BASE_URL } from '#lib/constants.js';
	import content from '#lib/data/cluster-projects.json';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const copy = content[getLocale()];
	const types = copy.types as Record<string, string>;
	const path = '/cluster/projets';
	let filter = $state('');

	const byId = $derived(new Map(data.projects.map((project) => [project.id, project])));
	const counts = $derived(data.outputs.reduce((map, output) => map.set(output.project, (map.get(output.project) || 0) + 1), new Map<string, number>()));
	const ongoing = $derived(data.projects.filter((project) => project.ongoing));
	const past = $derived(data.projects.filter((project) => !project.ongoing));
	const presentTypes = $derived([...new Set(data.outputs.map((output) => output.type))].sort((a, b) => (types[a] || a).localeCompare(types[b] || b)));
	const shown = $derived(filter ? data.outputs.filter((output) => output.type === filter) : data.outputs);
	const month = (date: string) => formatDate(date, { year: 'numeric', month: 'long' });
	const plural = (n: number) => `${n} ${copy.outputsCount[n > 1 ? 1 : 0]}`;
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
		funder: { '@type': 'GovernmentOrganization', name: 'Région Île-de-France', url: 'https://www.iledefrance.fr' },
		hasPart: data.projects.map((project) => ({
			'@type': 'ResearchProject',
			name: project.title,
			url: `${pageUrl(path)}#${project.id}`,
			...(project.institution ? { sourceOrganization: { '@type': 'Organization', name: project.institution } } : {})
		}))
	}}
/>
<Breadcrumb title={copy.title} title_path={copy.short} trail={[{ link: 'cluster', link_text: 'Cluster' }]} fonction={copy.subtitle} />

<div class="projects-page">
	<section class="intro">
		<p class="lead">{copy.lead}</p>
	</section>

	<section aria-labelledby="ongoing-title">
		<h2 id="ongoing-title">{copy.ongoingTitle}</h2>
		{#if ongoing.length}
			<ul class="project-grid">
				{#each ongoing as project (project.id)}
					<li id={project.id} class="project">
						<h3>{project.title}</h3>
						<p class="who">{[project.applicant, project.institution, project.lab].filter(Boolean).join(' · ')}</p>
						{#if project.lead}<p class="lead-line"><span>{copy.lead_label}</span> {project.lead.affiliation ? `${project.lead.name} (${project.lead.affiliation})` : project.lead.name}</p>{/if}
						{#if counts.get(project.id)}<a class="count" href={`#outputs-title`} onclick={() => (filter = '')}>{plural(counts.get(project.id) || 0)}</a>{/if}
					</li>
				{/each}
			</ul>
		{:else}<p class="empty">{copy.ongoingEmpty}</p>{/if}
	</section>

	<section aria-labelledby="outputs-title">
		<h2 id="outputs-title">{copy.outputsTitle}</h2>
		<p class="section-intro">{copy.outputsIntro}</p>
		{#if data.outputs.length}
			{#if presentTypes.length > 1}
				<div class="filters" role="group" aria-label={copy.filterLabel}>
					<button type="button" aria-pressed={!filter} onclick={() => (filter = '')}>{copy.filterAll} <span>{data.outputs.length}</span></button>
					{#each presentTypes as type (type)}
						<button type="button" aria-pressed={filter === type} onclick={() => (filter = type)}>{types[type] || type} <span>{data.outputs.filter((output) => output.type === type).length}</span></button>
					{/each}
				</div>
			{/if}
			<ol class="outputs">
				{#each shown as output (output.id)}
					{@const project = byId.get(output.project)}
					<li>
						<p class="meta"><span class="type">{types[output.type] || types.other}</span><time datetime={output.date}>{month(output.date)}</time></p>
						<div class="body">{@html output.html}</div>
						{#if output.url}<p class="link"><a href={output.url} target="_blank" rel="noopener noreferrer">{output.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗</a></p>{/if}
						{#if project}<p class="project-ref">{copy.project}{getLocale() === 'fr' ? ' :' : ':'} {#if project.ongoing}<a href={`#${project.id}`}>{project.title}</a>{:else}<span>{project.title}</span>{/if}{' · ' + [project.applicant, project.institution].filter(Boolean).join(', ')}</p>{/if}
					</li>
				{/each}
			</ol>
		{:else}<p class="empty">{copy.outputsEmpty}</p>{/if}
	</section>

	{#if past.length}
		<section aria-labelledby="past-title">
			<h2 id="past-title">{copy.pastTitle}</h2>
			<ul class="past">
				{#each past as project (project.id)}
					<li id={project.id}><strong>{project.title}</strong> <span>{[project.applicant, project.institution, plural(counts.get(project.id) || 0)].filter(Boolean).join(' · ')}</span></li>
				{/each}
			</ul>
		</section>
	{/if}

	<p class="contribute">{copy.contribute} <a href="https://extranet.acss-psl.eu">{copy.contributeLink} ↗</a></p>

	<RegionFunding />
</div>

<style>
	.projects-page {
		display: grid;
		gap: clamp(2.5rem, 5vw, 3.75rem);
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
	h3 {
		margin: 0;
		font-weight: 700;
		font-family: var(--font-heading);
		font-size: 1.1rem;
		line-height: 1.4;
		color: var(--color-heading);
	}
	.lead {
		max-width: 72ch;
		font-size: clamp(1.08rem, 1.7vw, 1.25rem);
		line-height: 1.65;
		font-weight: 500;
		color: var(--color-heading);
	}
	.section-intro {
		max-width: 72ch;
		margin-bottom: 1.25rem;
		font-size: 0.92rem;
	}
	.project-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}
	.project {
		display: grid;
		gap: 0.45rem;
		align-content: start;
		padding: 1.3rem 1.4rem;
		border: 1px solid #d5deec;
		border-top: 3px solid var(--acss-red);
		border-radius: 0.4rem 0.4rem 0.9rem 0.9rem;
		background: #fff;
		scroll-margin-top: 8rem;
	}
	.project:target {
		box-shadow: 0 0 0 3px #e9b9cf;
	}
	.who,
	.lead-line {
		font-size: 0.86rem;
		line-height: 1.6;
	}
	.lead-line span {
		font-weight: 600;
		color: var(--color-heading);
	}
	.count {
		justify-self: start;
		margin-top: 0.3rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--acss-blue-dark);
	}
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}
	.filters button {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.85rem;
		border: 1px solid #ced9eb;
		border-radius: 999px;
		background: #fff;
		color: var(--acss-blue-dark);
		font: inherit;
		font-size: 0.82rem;
		font-weight: 600;
		cursor: pointer;
	}
	.filters button[aria-pressed='true'] {
		background: var(--acss-blue-dark);
		border-color: var(--acss-blue-dark);
		color: #fff;
	}
	.filters span {
		font-size: 0.72rem;
		opacity: 0.8;
	}
	.outputs {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid #d5deec;
	}
	.outputs li {
		padding: 1.2rem 0;
		border-bottom: 1px solid #d5deec;
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem 0.9rem;
		font-size: 0.8rem;
	}
	.type {
		padding: 0.15rem 0.6rem;
		border-radius: 0.35rem;
		background: #fbeef4;
		color: var(--acss-red-dark);
		font-weight: 700;
	}
	time {
		color: var(--color-muted);
	}
	.body {
		margin-top: 0.5rem;
		font-size: 0.95rem;
		line-height: 1.75;
		overflow-wrap: anywhere;
	}
	.body :global(p) {
		margin: 0.25rem 0;
	}
	.body :global(a),
	.link a,
	.project-ref a,
	.contribute a {
		color: var(--acss-blue-dark);
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	.link {
		margin-top: 0.3rem;
		font-size: 0.85rem;
		overflow-wrap: anywhere;
	}
	.project-ref {
		margin-top: 0.4rem;
		font-size: 0.8rem;
		color: var(--color-muted);
	}
	.past {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.6rem;
		font-size: 0.9rem;
	}
	.past span {
		color: var(--color-muted);
	}
	.empty {
		padding: 1.25rem 1.4rem;
		border-radius: 0.9rem;
		background: var(--bg-secondary);
		font-size: 0.9rem;
	}
	.contribute {
		padding: 1.1rem 1.3rem;
		border-left: 3px solid var(--acss-red);
		background: var(--bg-secondary);
		border-radius: 0 0.7rem 0.7rem 0;
		font-size: 0.9rem;
	}
	a:focus-visible,
	button:focus-visible {
		outline: 3px solid var(--acss-red);
		outline-offset: 3px;
	}
	@media (max-width: 820px) {
		.project-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
