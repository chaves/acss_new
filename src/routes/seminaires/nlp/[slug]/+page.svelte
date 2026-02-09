<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import WorkshopInfo from '$lib/components/layout/WorkshopInfo.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const { seminar } = data;

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const isPast = new Date(seminar.date) < new Date();
</script>

<svelte:head>
	<title>NLP Workshop: {seminar.title} | Institut ACSS-PSL</title>
	<meta name="description" content="{seminar.presenter} - {seminar.title}" />
</svelte:head>

<Breadcrumb
	title={seminar.title}
	title_path={seminar.title}
	link="seminaires/nlp"
	link_text={m.seminaire_nlp()}
/>

<article class="seminar-detail">
	<!-- Status Banner -->
	<div class="status-banner" class:past={isPast} class:upcoming={!isPast}>
		<span class="status-icon">
			{#if isPast}
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
			{:else}
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			{/if}
		</span>
		<span class="status-text">{isPast ? 'Past Session' : 'Upcoming Session'}</span>
	</div>

	<!-- Main Card -->
	<div class="main-card">
		<!-- Date & Time Header -->
		<div class="datetime-header">
			<div class="datetime-display">
				<div class="date-large">{formatDate(seminar.date)}</div>
				<div class="time-display">
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>{seminar.time.slice(0, 5)}h</span>
				</div>
			</div>
		</div>

		<!-- Presenter Section -->
		<div class="presenter-section">
			<div class="presenter-label">Presented by</div>
			<div class="presenter-name">{seminar.presenter}</div>
			{#if seminar.homepage}
				<a href={seminar.homepage} target="_blank" rel="noopener noreferrer" class="presenter-homepage">
					{seminar.homepage}
				</a>
			{/if}
		</div>

		<!-- Title -->
		<h1 class="seminar-title">{seminar.title}</h1>

		<!-- Location if available -->
		{#if seminar.location}
			<div class="location-info">
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<span>{seminar.location}</span>
			</div>
		{/if}
	</div>

	<!-- Abstract Section -->
	{#if seminar.abstract}
		<div class="abstract-card">
			<div class="abstract-header">
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
				<h2>Abstract</h2>
			</div>
			<p class="abstract-content">{seminar.abstract}</p>
		</div>
	{/if}

	<!-- Presentation Slides -->
	{#if seminar.presentations && seminar.presentations.length > 0}
		<section class="presentations-section">
			<div class="presentations-header">
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
				</svg>
				<h2>Presentation Slides</h2>
			</div>
			<div class="presentations-list">
				{#each seminar.presentations as presentation}
					<a
						href={presentation.file}
						class="presentation-card"
						download
						target="_blank"
						rel="noopener noreferrer"
					>
						<div class="presentation-file-icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
							</svg>
						</div>
						<div class="presentation-info">
							<span class="presentation-name">{presentation.title}</span>
							<span class="presentation-speaker">{presentation.speaker}</span>
						</div>
						<div class="presentation-download">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
							</svg>
							<span>PDF</span>
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Workshop Info Card -->
	<WorkshopInfo type="nlp" variant="section" showRegistration={!isPast} />

	<!-- Back link -->
	<div class="back-link">
		<a href="/seminaires/nlp">
			<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			Back to all NLP sessions
		</a>
	</div>
</article>

<style>
	.seminar-detail {
		@apply mx-auto max-w-3xl;
	}

	.status-banner {
		@apply mb-6 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold;
	}

	.status-banner.upcoming {
		@apply bg-green-100 text-green-700;
	}

	.status-banner.past {
		@apply bg-gray-100 text-gray-600;
	}

	.status-icon svg {
		@apply h-5 w-5;
	}

	.main-card {
		@apply rounded-2xl border-2 border-blue-100 bg-white p-8;
	}

	.datetime-header {
		@apply mb-6 border-b border-gray-100 pb-6;
	}

	.datetime-display {
		@apply text-center;
	}

	.date-large {
		@apply text-2xl font-bold text-gray-800;
	}

	.time-display {
		@apply mt-2 flex items-center justify-center gap-2 text-lg text-gray-600;
	}

	.time-display svg {
		@apply h-5 w-5;
	}

	.presenter-section {
		@apply mb-6;
	}

	.presenter-label {
		@apply text-sm text-gray-500 mb-1;
	}

	.presenter-name {
		@apply text-xl font-semibold text-gray-800;
	}

	.presenter-homepage {
		@apply text-sm text-blue-600 hover:text-blue-700 break-all;
	}

	.seminar-title {
		@apply text-xl font-medium italic text-gray-700 leading-relaxed;
	}

	.location-info {
		@apply mt-6 flex items-center gap-2 text-gray-600;
	}

	.location-info svg {
		@apply h-5 w-5 text-gray-400;
	}

	.abstract-card {
		@apply mt-6 rounded-2xl border-2 border-blue-100 bg-white p-8;
	}

	.abstract-header {
		@apply mb-4 flex items-center gap-3 text-gray-700;
	}

	.abstract-header svg {
		@apply h-6 w-6 text-blue-500;
	}

	.abstract-header h2 {
		@apply text-lg font-semibold;
	}

	.abstract-content {
		@apply text-gray-600 leading-relaxed text-justify;
		border-left: 4px solid;
		border-image: linear-gradient(180deg, #4a6caa, #b6467c) 1;
		padding-left: 1.5rem;
	}

	/* Presentations Section */
	.presentations-section {
		@apply mt-6 rounded-2xl border-2 border-blue-100 bg-white p-8;
	}

	.presentations-header {
		@apply mb-5 flex items-center gap-3 text-gray-700;
	}

	.presentations-header svg {
		@apply h-6 w-6 text-blue-500;
	}

	.presentations-header h2 {
		@apply text-lg font-semibold;
	}

	.presentations-list {
		@apply space-y-3;
	}

	.presentation-card {
		@apply flex items-center gap-4 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white px-5 py-4 no-underline transition-all;
	}

	.presentation-card:hover {
		@apply border-blue-300 shadow-md;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.04) 0%, rgba(59, 130, 246, 0.02) 100%);
		transform: translateY(-1px);
	}

	.presentation-file-icon {
		@apply flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-50;
	}

	.presentation-file-icon svg {
		@apply h-5 w-5 text-red-500;
	}

	.presentation-info {
		@apply flex flex-1 flex-col gap-0.5;
	}

	.presentation-name {
		@apply text-sm font-semibold text-gray-700;
	}

	.presentation-speaker {
		@apply text-xs text-gray-500;
	}

	.presentation-download {
		@apply flex flex-shrink-0 flex-col items-center gap-0.5 rounded-lg bg-blue-50 px-3 py-2 text-blue-600 transition-colors;
	}

	.presentation-card:hover .presentation-download {
		@apply bg-blue-100 text-blue-700;
	}

	.presentation-download svg {
		@apply h-5 w-5;
	}

	.presentation-download span {
		@apply text-[10px] font-bold uppercase tracking-wider;
	}

	.back-link {
		@apply mt-8 border-t pt-6;
	}

	.back-link a {
		@apply inline-flex items-center gap-2 text-blue-600 hover:text-blue-700;
	}

	.back-link svg {
		@apply h-4 w-4;
	}
</style>
