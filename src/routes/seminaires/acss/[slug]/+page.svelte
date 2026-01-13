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
		<h1>{session.frontmatter.title}</h1>

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

	h1 {
		@apply mb-4 text-2xl font-bold text-blueGray-700;
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
		@apply text-blue-600 hover:underline;
	}

	.contacts {
		@apply mt-4 text-sm;
	}

	.contacts p {
		@apply my-1;
	}

	.contacts a {
		@apply text-blue-600 hover:underline;
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
		@apply text-blue-600 hover:underline;
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

	.registration {
		@apply my-8 text-center;
	}

	.registration-button {
		@apply inline-block rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-800 hover:shadow-lg;
	}

	.back-link {
		@apply mt-8 border-t pt-4;
	}

	.back-link a {
		@apply text-blue-600 hover:underline;
	}
</style>
