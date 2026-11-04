<script lang="ts">
	import seminar_options from '#lib/data/seminars_options.json';
	import Link from '#lib/components/Link.svelte';
	import type { Seminar } from '#lib/types/index.js';
	import { formatTime, localizeUrl } from '#lib/utils.js';
	import { formatDate, isEnglish } from '#lib/helpers/locale.js';

	interface Props {
		seminar: Seminar;
		index: number;
		type?: 'all' | 'nlp' | 'pub' | 'digitalReg' | 'TrEnCE';
		abstract?: boolean;
	}

	let { seminar, index, type = 'all', abstract = true }: Props = $props();

	let seminarOption = $derived(seminar_options.find((s) => s.value === seminar.type));
	let title = $derived(seminarOption?.name ?? '');
	let url = $derived(seminarOption?.url ?? '');

	// Generate detail page URL for specific seminar types (using slug for SEO)
	let detailUrl = $derived(
		type === 'nlp' && seminar.slug ? `/seminaires/nlp/${seminar.slug}` :
		type === 'pub' && seminar.slug ? `/seminaires/public-governance/${seminar.slug}` :
		type === 'digitalReg' && seminar.slug ? `/seminaires/digital-regulation/${seminar.slug}` :
		type === 'TrEnCE' && seminar.slug ? `/seminaires/trence/${seminar.slug}` :
		null
	);
</script>

{#if detailUrl}
	<!-- Clickable card for NLP and Public Governance seminars -->
	<a href={localizeUrl(detailUrl)} class="seminar-item clickable">
		<div class="seminar-header">
			<div class="seminar-datetime">
				<div class="datetime-badge">
					<svg class="datetime-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span class="date">{seminar.date ? formatDate(seminar.date) : ''}</span>
					{#if seminar.time}
						<span class="time-separator" aria-hidden="true">·</span>
						<span class="time">{formatTime(seminar.time)}</span>
					{/if}
				</div>
			</div>
		</div>

		<div class="seminar-body">
			<h3 class="seminar-presenter">{seminar.presenter}</h3>
			<p class="seminar-title">{seminar.title}</p>
		</div>

		<span class="view-details-hint">
			{isEnglish() ? 'View details' : 'Voir les détails'}
			<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</span>
	</a>
{:else}
	<!-- Regular card for home page or other contexts -->
	<article class="seminar-item">
		<div class="seminar-header">
			<div class="seminar-datetime">
				<div class="datetime-badge">
					<svg class="datetime-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span class="date">{seminar.date ? formatDate(seminar.date) : ''}</span>
					{#if seminar.time}
						<span class="time-separator" aria-hidden="true">·</span>
						<span class="time">{formatTime(seminar.time)}</span>
					{/if}
				</div>
			</div>

			{#if type === 'all'}
				<div class="seminar-type">
					<Link href="/seminaires/{url}">{title}</Link>
				</div>
			{/if}
		</div>

		<div class="seminar-body">
			<h3 class="seminar-presenter">{seminar.presenter}</h3>
			<p class="seminar-title">{seminar.title}</p>
		</div>

		{#if abstract && seminar.abstractHtml}
			<div class="seminar-abstract">
				<span class="abstract-label">{isEnglish() ? 'Abstract' : 'Résumé'}</span>
				<div class="abstract-text">{@html seminar.abstractHtml}</div>
			</div>
		{/if}
	</article>
{/if}

<style>
	.seminar-item {
		display: block;
		padding: 1.25rem 0;
		border-bottom: 1px solid rgba(74, 108, 170, 0.16);
		text-align: left;
		text-decoration: none;
		color: inherit;
		overflow-wrap: anywhere;
		transition: border-color 150ms ease;
	}

	.seminar-item:hover {
		border-color: rgba(74, 108, 170, 0.35);
	}

	.seminar-item.clickable {
		cursor: pointer;
		position: relative;
	}

	.seminar-item.clickable:hover {
		border-color: var(--acss-blue, #4a6caa);
	}

	.seminar-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.datetime-badge {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--color-muted, #64748b);
	}

	.datetime-icon {
		width: 1rem;
		height: 1rem;
		color: var(--acss-blue, #4a6caa);
	}

	.time-separator {
		color: var(--color-muted, #94a3b8);
	}

	.seminar-type {
		font-size: 0.8125rem;
		font-style: normal;
		color: var(--acss-red, #b6467c);
	}

	.seminar-body {
		margin-bottom: 0.5rem;
	}

	.seminar-presenter {
		font-family: 'Quicksand', sans-serif;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-heading, #1e293b);
		margin-bottom: 0.25rem;
	}

	.seminar-title {
		font-style: normal;
		color: var(--color-body, #475569);
		font-size: 0.9375rem;
		line-height: 1.5;
	}

	.seminar-abstract {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(74, 108, 170, 0.1);
	}

	.abstract-label {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--acss-blue, #4a6caa);
		margin-bottom: 0.5rem;
	}

	.abstract-text {
		font-size: 0.875rem;
		color: var(--color-body, #475569);
		line-height: 1.6;
		text-align: start;
		border-left: 3px solid;
		border-left-color: var(--acss-red, #b6467c);
		padding-left: 1rem;
	}

	.view-details-hint {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--acss-blue-dark, #1d4796);
		margin-top: 0.5rem;
		opacity: 1;
		transition: opacity 0.2s ease;
	}

	.seminar-item.clickable:hover .view-details-hint {
		opacity: 1;
	}

	.view-details-hint svg {
		width: 1rem;
		height: 1rem;
	}
	@media (min-width: 768px) {
		.seminar-item.clickable {
			display: grid;
			grid-template-columns: minmax(0, 1fr) auto;
			column-gap: 1.5rem;
		}

		.clickable .seminar-header,
		.clickable .seminar-body {
			grid-column: 1;
		}

		.clickable .seminar-body {
			margin-bottom: 0;
		}

		.clickable .view-details-hint {
			grid-column: 2;
			grid-row: 1 / 3;
			align-self: center;
			margin-top: 0;
			white-space: nowrap;
		}
	}
</style>
