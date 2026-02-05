<script lang="ts">
	import seminar_options from '$lib/data/seminars_options.json';
	import Link from '$lib/components/Link.svelte';
	import type { Seminar } from '$lib/types';
	import { formatTime } from '$lib/utils';

	interface Props {
		seminar: Seminar;
		index: number;
		type?: 'all' | 'nlp' | 'pub';
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
		null
	);
</script>

{#if detailUrl}
	<!-- Clickable card for NLP and Public Governance seminars -->
	<a href={detailUrl} class="seminar-item clickable">
		<div class="seminar-header">
			<div class="seminar-datetime">
				<div class="datetime-badge">
					<svg class="datetime-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span class="date">{seminar.date}</span>
					<span class="time-separator">•</span>
					<span class="time">{formatTime(seminar.time)}</span>
				</div>
			</div>
		</div>

		<div class="seminar-body">
			<h3 class="seminar-presenter">{seminar.presenter}</h3>
			<p class="seminar-title">{seminar.title}</p>
		</div>

		<span class="view-details-hint">
			View details
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
					<span class="date">{seminar.date}</span>
					<span class="time-separator">•</span>
					<span class="time">{formatTime(seminar.time)}</span>
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

		{#if abstract && seminar.abstract}
			<div class="seminar-abstract">
				<span class="abstract-label">Abstract</span>
				<p class="abstract-text">{seminar.abstract}</p>
			</div>
		{/if}
	</article>
{/if}

<style>
	.seminar-item {
		display: block;
		background: white;
		border-radius: 0.75rem;
		padding: 1.25rem;
		border: 1px solid rgba(74, 108, 170, 0.08);
		transition: all 0.3s ease;
		text-align: left;
		text-decoration: none;
		color: inherit;
	}

	.seminar-item:hover {
		box-shadow: 0 4px 12px rgba(74, 108, 170, 0.1);
		border-color: rgba(74, 108, 170, 0.15);
	}

	.seminar-item.clickable {
		cursor: pointer;
		position: relative;
	}

	.seminar-item.clickable:hover {
		box-shadow: 0 6px 20px rgba(74, 108, 170, 0.15);
		border-color: rgba(74, 108, 170, 0.25);
		transform: translateY(-2px);
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
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.75rem;
		background: linear-gradient(135deg, rgba(74, 108, 170, 0.1) 0%, rgba(182, 70, 124, 0.1) 100%);
		border-radius: 2rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--acss-blue-dark, #1D4796);
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
		font-style: italic;
		color: var(--acss-red, #b6467c);
	}

	.seminar-body {
		margin-bottom: 0.5rem;
	}

	.seminar-presenter {
		font-family: 'Quicksand', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-heading, #1e293b);
		margin-bottom: 0.25rem;
	}

	.seminar-title {
		font-style: italic;
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
		text-align: justify;
		border-left: 3px solid;
		border-image: linear-gradient(180deg, var(--acss-blue, #4a6caa), var(--acss-red, #b6467c)) 1;
		padding-left: 1rem;
	}

	.view-details-hint {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--acss-blue, #4a6caa);
		margin-top: 0.5rem;
		opacity: 0.7;
		transition: opacity 0.2s ease;
	}

	.seminar-item.clickable:hover .view-details-hint {
		opacity: 1;
	}

	.view-details-hint svg {
		width: 1rem;
		height: 1rem;
	}
</style>
