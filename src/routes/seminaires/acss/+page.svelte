<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import { isEnglish } from '$lib/helpers/locale';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const upcomingSessions = $derived(data.upcomingSessions);
	const pastSessions = $derived(data.pastSessions);
	const isEn = $derived(isEnglish());

	// Format date
	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	// Extract excerpt from content
	const getExcerpt = (content: string, maxLength: number = 200) => {
		const text = content.replace(/<[^>]*>/g, '').replace(/[#*\[\]`_~]/g, '');
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	};
</script>

<svelte:head>
	<title>ACSS-PSL Institute: Research Seminar</title>
	<meta
		name="description"
		content="ACSS-PSL Institute Research Seminar provides an opportunity to discuss the activities of the institute throughout the academic year."
	/>
</svelte:head>

<Breadcrumb
	title="ACSS-PSL Institute Research Seminar"
	title_path="ACSS-PSL Institute Research Seminar"
	link="seminaires"
	link_text={m.seminars()}
/>

<div class="description">
	<p>
		This seminar provides an opportunity to discuss about the activities of the institute and
		will be organized in 3 sessions throughout the 2025-2026 academic year. Its purpose is
		twofold:
	</p>
	<ul>
		<li>
			To invite external speakers to present original research in terms of data and/or methods
			that could enrich the Institute's research and/or initiate new research projects
		</li>
		<li>To exchange on the Institute's ongoing or upcoming projects and research.</li>
	</ul>
	<p>
		The seminar is organized by <a
			href="https://dauphine.psl.eu/recherche/cvtheque/profil/darolles-serge">Serge Darolles</a
		>, <a href="https://dauphine.psl.eu/recherche/cvtheque/profil/le-fol-gaelle">Gaëlle Le Fol</a>
		&
		<a href="https://dauphine.psl.eu/recherche/cvtheque/profil/porcher-simon">Simon Porcher</a>.
	</p>
	<p>
		<em
			>To propose a presentation, please contact: <a href="mailto:simon.porcher@dauphine.psl.eu"
				>simon.porcher@dauphine.psl.eu</a
			>.</em
		>
	</p>
	<p>
		<em
			>To attend, please contact: <a href="mailto:bruno.chavesferreira@dauphine.psl.eu"
				>bruno.chavesferreira@dauphine.psl.eu</a
			></em
		>
	</p>
</div>

<!-- Upcoming Sessions -->
{#if upcomingSessions.length > 0}
	<section class="sessions-section">
		<h2 class="section-title">{isEn ? 'Upcoming Sessions' : 'Sessions à venir'}</h2>
		<div class="sessions-grid">
			{#each upcomingSessions as session}
				<article class="session-card upcoming">
					<a href="/seminaires/acss/{session.slug}" class="session-link">
						{#if session.frontmatter.image}
							<div class="session-image">
								<img
									src={session.frontmatter.image}
									alt={session.frontmatter.title}
									loading="lazy"
								/>
							</div>
						{/if}

						<div class="session-body">
							<div class="session-header">
								<h3 class="session-title">{session.frontmatter.title}</h3>
								<span class="status-badge upcoming">{isEn ? 'Upcoming' : 'À venir'}</span>
							</div>

							<div class="session-meta">
								<div class="meta-item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="meta-icon"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									<span>{formatDate(session.frontmatter.date)}</span>
								</div>

								{#if session.frontmatter.time}
									<div class="meta-item">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="meta-icon"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<span>{session.frontmatter.time}</span>
									</div>
								{/if}
							</div>

							<p class="session-excerpt">
								{getExcerpt(session.content)}
							</p>

							<span class="read-more">Read more →</span>
						</div>
					</a>
				</article>
			{/each}
		</div>
	</section>
{/if}

<!-- Past Sessions -->
{#if pastSessions.length > 0}
	<section class="sessions-section">
		<h2 class="section-title past">{isEn ? 'Past Sessions' : 'Sessions passées'}</h2>
		<div class="sessions-list">
			{#each pastSessions as session}
				<article class="session-item">
					<a href="/seminaires/acss/{session.slug}" class="session-item-link">
						{#if session.frontmatter.image}
							<div class="session-item-thumbnail">
								<img
									src={session.frontmatter.image}
									alt={session.frontmatter.title}
									loading="lazy"
								/>
							</div>
						{/if}
						<div class="session-item-content">
							<div class="session-item-header">
								<h3 class="session-item-title">{session.frontmatter.title}</h3>
								<span class="session-item-date">{formatDate(session.frontmatter.date)}</span>
							</div>
							<p class="session-item-excerpt">
								{getExcerpt(session.content, 150)}
							</p>
						</div>
					</a>
				</article>
			{/each}
		</div>
	</section>
{/if}

<style>
	.description {
		@apply mb-8 rounded-xl border-2 border-blue-100 bg-white px-6 py-4 text-sm;
	}

	.description p {
		@apply my-2;
	}

	.description ul {
		@apply ml-5 list-decimal;
	}

	.description ul li {
		@apply mt-2;
	}

	.description a {
		color: #b6467c;
		transition: all 0.2s ease;
	}

	.description a:hover {
		color: #9a3d65;
		text-decoration: underline;
	}

	/* Sections */
	.sessions-section {
		@apply mb-12;
	}

	.section-title {
		@apply mb-6 text-2xl font-bold text-blueGray-700;
	}

	.section-title.past {
		@apply border-b-2 border-gray-200 pb-3;
	}

	/* Upcoming Sessions Grid */
	.sessions-grid {
		@apply grid gap-6 md:grid-cols-2;
	}

	.session-card {
		@apply overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm transition hover:shadow-lg;
	}

	.session-card.upcoming {
		border-color: rgba(182, 70, 124, 0.3);
		box-shadow: 0 4px 6px -1px rgba(182, 70, 124, 0.1), 0 2px 4px -1px rgba(182, 70, 124, 0.06);
	}

	.session-card.upcoming:hover {
		box-shadow: 0 10px 15px -3px rgba(182, 70, 124, 0.15), 0 4px 6px -2px rgba(182, 70, 124, 0.1);
		border-color: rgba(182, 70, 124, 0.5);
	}

	.session-link {
		@apply block;
	}

	.session-image {
		@apply aspect-video overflow-hidden;
	}

	.session-image img {
		@apply h-full w-full object-cover transition hover:scale-105;
	}

	.session-body {
		@apply p-6;
	}

	.session-header {
		@apply mb-3 flex items-start justify-between gap-3;
	}

	.session-title {
		@apply flex-1 text-lg font-semibold text-blueGray-700;
	}

	.status-badge {
		@apply rounded-full px-3 py-1 text-xs font-semibold;
	}

	.status-badge.upcoming {
		background: linear-gradient(135deg, rgba(182, 70, 124, 0.15) 0%, rgba(182, 70, 124, 0.1) 100%);
		color: #b6467c;
		border: 1px solid rgba(182, 70, 124, 0.3);
	}

	.session-meta {
		@apply mb-4 flex flex-wrap gap-3 text-sm text-blueGray-600;
	}

	.meta-item {
		@apply flex items-center gap-1;
	}

	.meta-icon {
		@apply h-4 w-4;
	}

	.session-excerpt {
		@apply mb-3 text-sm leading-relaxed text-blueGray-600;
	}

	.read-more {
		@apply font-semibold;
		color: #b6467c;
		transition: all 0.2s ease;
	}

	.read-more:hover {
		color: #9a3d65;
	}

	/* Past Sessions List */
	.sessions-list {
		@apply space-y-4;
	}

	.session-item {
		@apply rounded-lg border-l-4 border-gray-300 bg-white transition hover:shadow-md;
	}

	.session-item:hover {
		border-left-color: #b6467c;
	}

	.session-item-link {
		@apply flex gap-4;
	}

	.session-item-thumbnail {
		@apply h-24 w-32 flex-shrink-0 overflow-hidden rounded;
	}

	.session-item-thumbnail img {
		@apply h-full w-full object-cover transition hover:scale-105;
	}

	.session-item-content {
		@apply flex-1 p-4;
	}

	.session-item-header {
		@apply mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between;
	}

	.session-item-title {
		@apply text-base font-semibold text-blueGray-700;
	}

	.session-item-date {
		@apply text-sm text-blueGray-500;
	}

	.session-item-excerpt {
		@apply text-sm leading-relaxed text-blueGray-600;
	}
</style>
