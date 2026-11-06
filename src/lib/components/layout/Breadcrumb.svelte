<script lang="ts">
	import { page } from '$app/state';
	import * as m from '#lib/paraglide/messages.js';
	import { localizeUrl } from '#lib/utils.js';
	import StructuredData from '#lib/seo/StructuredData.svelte';
	import { generateBreadcrumbSchema } from '#lib/seo/schema-utils.js';

	let {
		title,
		title_path,
		link = undefined,
		link_text = undefined,
		// Several intermediate levels, e.g. [{ link: 'cluster', link_text: 'Cluster' }, …]; replaces link/link_text.
		trail = undefined as { link: string; link_text: string }[] | undefined,
		email = undefined,
		fonction = undefined,
		publishedAt = undefined,
		richTitle = false,
		// Emit BreadcrumbList JSON-LD mirroring the visible trail. Pages that already
		// build a more specific breadcrumb schema themselves pass schema={false}.
		schema = true
	} = $props();

	const levels = $derived(trail ?? (link !== undefined ? [{ link, link_text }] : []));
	const breadcrumbSchema = $derived(
		generateBreadcrumbSchema([
			{ name: m.home(), url: '/' },
			...levels.map((level) => ({ name: level.link_text, url: `/${level.link}` })),
			{ name: title_path, url: page.url.pathname }
		])
	);
</script>

{#if schema}
	<StructuredData data={breadcrumbSchema} />
{/if}

<section class="breadcrumb-section">
	<div class="breadcrumb-content">
		<div class="breadcrumb-inner">
			<!-- Breadcrumb navigation appears first to establish context before the page title. -->
			<nav class="breadcrumb-nav" aria-label="Breadcrumb">
				<ol class="breadcrumb-list">
					<li class="breadcrumb-item">
						<a href={localizeUrl('/')} class="breadcrumb-link">{m.home()}</a>
						<svg class="breadcrumb-separator" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</li>

					{#if levels.length}
						{#each levels as level (level.link)}
							<li class="breadcrumb-item">
								<a href={localizeUrl(`/${level.link}`)} class="breadcrumb-link">{level.link_text}</a>
								<svg class="breadcrumb-separator" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path
										fill-rule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</li>
						{/each}
					{/if}
					<!-- The current page always closes the trail; long titles are shortened, the full one stays in title. -->
					<li class="breadcrumb-item current" aria-current="page">
						<span title={title_path}>{title_path}</span>
					</li>
				</ol>
			</nav>

			<h1 class="breadcrumb-title">
				{#if richTitle}
					{@html title}
				{:else}
					{title}
				{/if}
			</h1>

			<!-- Optional function/role -->
			{#if fonction !== undefined}
				<p class="breadcrumb-fonction">{fonction}</p>
			{/if}

			<!-- Optional published date -->
			{#if publishedAt !== undefined}
				<p class="breadcrumb-date">
					<span class="date-label">{m.published_at()}</span>
					<span class="date-value">{publishedAt}</span>
				</p>
			{/if}

			<!-- Optional email -->
			{#if email !== undefined}
				<p class="breadcrumb-email">
					<a href="mailto:{email}">{email}</a>
				</p>
			{/if}

		</div>
	</div>
</section>

<style>
	.breadcrumb-section {
		margin-bottom: clamp(1.75rem, 3vw, 2.5rem);
		padding-bottom: clamp(1.25rem, 2vw, 1.75rem);
		border-bottom: 1px solid rgba(74, 108, 170, 0.16);
		overflow-wrap: anywhere;
	}


	.breadcrumb-content {
		padding: 0;
	}

	/* Title */
	.breadcrumb-title {
		font-family: var(--font-heading, 'Quicksand', sans-serif);
		font-size: clamp(1.85rem, 3.2vw, 2.65rem);
		font-weight: 700;
		color: var(--color-heading, #1e293b);
		max-width: 38ch;
		margin: 0;
		line-height: 1.17;
		letter-spacing: -0.025em;
		text-wrap: balance;
	}

	/* Optional elements */
	.breadcrumb-fonction {
		font-size: 1rem;
		color: var(--acss-blue-dark, #1D4796);
		margin-top: 0.85rem;
		font-weight: 500;
		max-width: 72ch;
	}

	.breadcrumb-date {
		font-size: 0.875rem;
		margin-top: 0.85rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.35rem 0.75rem;
		flex-wrap: wrap;
	}

	.date-label {
		color: var(--color-muted, #94a3b8);
	}

	.date-value {
		color: var(--acss-blue, #4a6caa);
		font-weight: 500;
	}

	.breadcrumb-email {
		font-size: 0.875rem;
		margin-top: 0.65rem;
	}

	.breadcrumb-email a {
		color: var(--acss-red, #b6467c);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.breadcrumb-email a:hover {
		color: var(--acss-red-dark, #9a3d65);
		text-decoration: underline;
	}

	/* Breadcrumb navigation */
	.breadcrumb-nav {
		margin-bottom: 0.75rem;
	}

	.breadcrumb-list {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 0.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.breadcrumb-item {
		display: flex;
		align-items: center;
	}

	.breadcrumb-link {
		font-size: 0.78rem;
		color: var(--color-body, #475569);
		text-decoration: none;
		transition: color 0.2s ease;
		font-weight: 600;
		letter-spacing: 0.015em;
	}

	.breadcrumb-link:hover {
		color: var(--acss-blue, #4a6caa);
	}

	.breadcrumb-separator {
		width: 1rem;
		height: 1rem;
		color: #cbd5e1;
		flex-shrink: 0;
	}

	.breadcrumb-item.current {
		min-width: 0;
	}

	.breadcrumb-item.current span {
		display: block;
		max-width: min(36ch, 60vw);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.78rem;
		color: var(--color-muted, #94a3b8);
	}


	@media (max-width: 480px) {
		.breadcrumb-title {
			font-size: 1.75rem;
			line-height: 1.2;
		}
	}
</style>
