<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const { session } = data;

	// Format date
	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<svelte:head>
	<title>ACSS-PSL: {session.frontmatter.title}</title>
	<meta name="description" content={session.frontmatter.title} />
</svelte:head>

<Breadcrumb
	title={session.frontmatter.title}
	title_path={session.frontmatter.title}
	link="seminaires/acss"
	link_text="ACSS Research Seminar"
/>

<article class="session-detail">
	<!-- Header -->
	<header class="session-header">
		<div class="session-meta">
			<div class="meta-item">
				<span class="meta-label">Date:</span>
				<span class="meta-value">{formatDate(session.frontmatter.date)}</span>
			</div>

			{#if session.frontmatter.time}
				<div class="meta-item">
					<span class="meta-label">Time:</span>
					<span class="meta-value">{session.frontmatter.time}</span>
				</div>
			{/if}

			{#if session.frontmatter.location}
				<div class="meta-item">
					<span class="meta-label">Location:</span>
					<span class="meta-value">{session.frontmatter.location}</span>
				</div>
			{/if}

			{#if session.frontmatter.status}
				<div class="meta-item">
					<span
						class="status-badge"
						class:upcoming={session.frontmatter.status === 'upcoming'}
						class:past={session.frontmatter.status === 'past'}
					>
						{session.frontmatter.status === 'upcoming' ? 'Upcoming' : 'Past Session'}
					</span>
				</div>
			{/if}
		</div>

		{#if session.frontmatter.image}
			<div class="session-image">
				<img src={session.frontmatter.image} alt={session.frontmatter.title} />
			</div>
		{/if}

		{#if session.frontmatter.organizers}
			<div class="organizers">
				<p class="organizers-label">Organized by:</p>
				<ul class="organizers-list">
					{#each session.frontmatter.organizers as organizer}
						<li>
							<a href={organizer.url} target="_blank" rel="noopener noreferrer">
								{organizer.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		{#if session.frontmatter.contact_present || session.frontmatter.contact_attend}
			<div class="contacts">
				{#if session.frontmatter.contact_present}
					<p>
						<em
							>To propose a presentation, please contact: <a
								href="mailto:{session.frontmatter.contact_present}"
								>{session.frontmatter.contact_present}</a
							></em
						>
					</p>
				{/if}
				{#if session.frontmatter.contact_attend}
					<p>
						<em
							>To attend, please contact: <a href="mailto:{session.frontmatter.contact_attend}"
								>{session.frontmatter.contact_attend}</a
							></em
						>
					</p>
				{/if}
			</div>
		{/if}
	</header>

	<!-- Content -->
	<div class="session-content prose">
		{@html session.html}
	</div>

	{#if session.frontmatter.presentations && session.frontmatter.presentations.length > 0}
		<section class="presentations-section">
			<h2 class="presentations-title">
				<svg xmlns="http://www.w3.org/2000/svg" class="presentations-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
				</svg>
				Presentation Slides
			</h2>
			<div class="presentations-list">
				{#each session.frontmatter.presentations as presentation}
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

	{#if session.frontmatter.registration}
		<div class="registration">
			<a href={session.frontmatter.registration} class="registration-button" target="_blank">
				Register to attend this session
			</a>
		</div>
	{/if}

	<!-- Back link -->
	<div class="back-link">
		<a href="/seminaires/acss">← Back to all ACSS sessions</a>
	</div>
</article>

<style>
	.session-detail {
		@apply mx-auto max-w-4xl;
	}

	.session-header {
		@apply mb-8 rounded-xl border-2 border-blue-100 bg-white px-6 py-6;
	}

	.session-meta {
		@apply mb-4 flex flex-wrap gap-4;
	}

	.meta-item {
		@apply flex items-center gap-2;
	}

	.meta-label {
		@apply font-semibold text-blueGray-600;
	}

	.meta-value {
		@apply text-blueGray-700;
	}

	.status-badge {
		@apply rounded-full px-3 py-1 text-sm font-semibold;
	}

	.status-badge.upcoming {
		@apply bg-green-100 text-green-700;
	}

	.status-badge.past {
		@apply bg-gray-100 text-gray-600;
	}

	.session-image {
		@apply my-6;
	}

	.session-image img {
		@apply h-auto w-full rounded-lg;
	}

	.organizers {
		@apply my-4 border-l-4 border-blue-400 pl-3;
	}

	.organizers-label {
		@apply font-semibold text-blueGray-600;
	}

	.organizers-list {
		@apply ml-0 list-none;
	}

	.organizers-list li {
		@apply inline;
	}

	.organizers-list li:not(:last-child)::after {
		content: ', ';
	}

	.organizers-list a {
		@apply text-blue-600;
	}

	.contacts {
		@apply mt-4 text-sm;
	}

	.contacts p {
		@apply my-1;
	}

	.contacts a {
		@apply text-blue-600;
	}

	.session-content {
		@apply max-w-none rounded-xl border-2 border-blue-100 bg-white px-6 py-6;
	}

	/* Style the rendered markdown content */
	.session-content :global(h2) {
		@apply mb-4 mt-8 border-b-2 border-gray-200 pb-2 text-xl font-semibold;
	}

	.session-content :global(h3) {
		@apply mb-3 mt-6 text-lg font-semibold;
	}

	.session-content :global(h4) {
		@apply mb-2 mt-4 text-base font-semibold;
	}

	.session-content :global(p) {
		@apply my-3 leading-relaxed;
	}

	.session-content :global(a) {
		@apply text-blue-600;
	}

	.session-content :global(ul) {
		@apply ml-5 list-disc;
	}

	.session-content :global(strong) {
		@apply font-semibold;
	}

	.session-content :global(em) {
		@apply italic;
	}

	.session-content :global(hr) {
		@apply my-8 border-t-2 border-gray-200;
	}

	/* Presentations Section */
	.presentations-section {
		@apply mt-8 rounded-xl border-2 border-blue-100 bg-white px-6 py-6;
	}

	.presentations-title {
		@apply mb-5 flex items-center gap-2 text-lg font-semibold text-blueGray-700;
	}

	.presentations-icon {
		@apply h-5 w-5 text-blue-600;
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
		@apply text-sm font-semibold text-blueGray-700;
	}

	.presentation-speaker {
		@apply text-xs text-blueGray-500;
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

	.registration {
		@apply my-8 text-center;
	}

	.registration-button {
		@apply inline-block rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-800 hover:shadow-lg no-underline;
	}

	.registration-button:hover {
		text-decoration: none !important;
		color: white !important;
	}

	.back-link {
		@apply mt-8 border-t pt-4;
	}

	.back-link a {
		@apply text-blue-600;
	}
</style>
