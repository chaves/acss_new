<script lang="ts">
	import seminar_options from '$lib/data/seminars_options.json';
	import Link from '$lib/components/Link.svelte';
	import type { Seminar } from '$lib/types';

	interface Props {
		seminar: Seminar;
		index: number;
		type?: 'all' | 'specific';
		abstract?: boolean;
	}

	let { seminar, index, type = 'all', abstract = true }: Props = $props();

	let seminarOption = $derived(seminar_options.find((s) => s.value === seminar.type));
	let title = $derived(seminarOption?.name ?? '');
	let url = $derived(seminarOption?.url ?? '');
</script>

<article class="seminar-item">
	<div class="seminar-header">
		<div class="seminar-datetime">
			<div class="datetime-badge">
				<svg class="datetime-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<span class="date">{seminar.date}</span>
				<span class="time-separator">•</span>
				<span class="time">{seminar.time.slice(0, 5)}h</span>
			</div>
		</div>
		
		{#if type === 'all'}
			<div class="seminar-type">
				<Link href="/seminaires/{url}">{title}</Link>
			</div>
		{/if}
	</div>

	<div class="seminar-body">
		<h3 class="seminar-presenter">
			{#if seminar.homepage}
				<a href={seminar.homepage} target="_blank" rel="noopener noreferrer" class="presenter-link">
					{seminar.presenter}
					<svg class="external-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</a>
			{:else}
				{seminar.presenter}
			{/if}
		</h3>
		
		<p class="seminar-title">{seminar.title}</p>
	</div>

	{#if abstract && seminar.abstract}
		<div class="seminar-abstract">
			<span class="abstract-label">Abstract</span>
			<p class="abstract-text">{seminar.abstract}</p>
		</div>
	{/if}
</article>

<style>
	.seminar-item {
		background: white;
		border-radius: 0.75rem;
		padding: 1.25rem;
		border: 1px solid rgba(74, 108, 170, 0.08);
		transition: all 0.3s ease;
		text-align: left;
	}

	.seminar-item:hover {
		box-shadow: 0 4px 12px rgba(74, 108, 170, 0.1);
		border-color: rgba(74, 108, 170, 0.15);
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

	.presenter-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		color: var(--acss-blue-dark, #1D4796);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.presenter-link:hover {
		color: var(--acss-blue, #4a6caa);
	}

	.external-icon {
		width: 0.875rem;
		height: 0.875rem;
		opacity: 0.7;
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
</style>
