<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Link from '$lib/components/Link.svelte';
	import SeminarItem from '$lib/components/layout/SeminarItem.svelte';
	import PostItem from '$lib/components/layout/PostItem.svelte';
	import SEO from '$lib/seo/SEO.svelte';
	import StructuredData from '$lib/seo/StructuredData.svelte';
	import { generateOrganizationSchema, generateWebSiteSchema } from '$lib/seo/schema-utils';
	import { getOGLocale, isEnglish } from '$lib/helpers/locale';
	import { Carousel } from 'flowbite-svelte';
	import images from '$lib/data/images_home.json';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let currentLocale = $derived(getOGLocale());
	let isEn = $derived(isEnglish());

	const organizationSchema = generateOrganizationSchema();
	const websiteSchema = generateWebSiteSchema();
</script>

<SEO
	title="Institut ACSS-PSL : Applied Computational Social Sciences"
	description="Expertise in social sciences research coupled with data science capabilities to increase research relevance, inform decision-making, and foster better collective governance."
	type="website"
	url="/"
	locale={currentLocale}
	keywords="computational social sciences, data science, governance, PSL, research institute"
/>

<StructuredData data={organizationSchema} />
<StructuredData data={websiteSchema} />

<!-- Featured Announcement -->
<div class="announcement-card">
	<div class="announcement-accent"></div>
	<div class="announcement-content">
		<div class="announcement-badge">
			{isEn ? 'Upcoming Event' : 'Événement à venir'}
		</div>
		<div class="announcement-body">
			<img
				src="/images/visuels/Visuel_26-11-25.jpg"
				alt="ACSS Research Seminar"
				class="announcement-image"
			/>
			<div class="announcement-text">
				<h3 class="announcement-title">
					<Link href="/seminaires/acss">ACSS Research seminar</Link>
				</h3>
				<p class="announcement-subtitle">"<em>LLMs : from Archives to Finance</em>"</p>
				<div class="announcement-details">
					<div class="detail-item">
						<svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<span>Wednesday, November 26<sup>th</sup> 2025</span>
					</div>
					<div class="detail-item">
						<svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>8:30 - 13:30</span>
					</div>
					<div class="detail-item">
						<svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span>Campus de l'Estrapade de PSL - 16 bis rue de l'Estrapade, 75005 Paris</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Main Content Grid -->
<div class="content-grid">
	<!-- Mission Card -->
	<div class="mission-card">
		<h1 class="mission-title">
			Applied Computational Social Sciences
			<span class="mission-subtitle">Data-Intensive Governance - PSL Institute</span>
		</h1>

		<div class="accent-line-sm"></div>

		{#if isEn}
			<h2 class="mission-description">
				Expertise in <span class="site_blue">social sciences</span> research coupled with
				<span class="site_red">data science</span> capabilities in order to:
			</h2>
			<ul class="mission-list">
				<li>
					<span class="list-marker"></span>
					<span>Increase the relevance of academic research to the challenges facing society</span>
				</li>
				<li>
					<span class="list-marker"></span>
					<span>Shed some light on governmental and private sectors decision-making</span>
				</li>
				<li>
					<span class="list-marker"></span>
					<span>Foster better collective governance</span>
				</li>
			</ul>
		{:else}
			<h2 class="mission-description">
				Une expertise de recherche en <span class="site_blue">sciences sociales</span>
				articulée avec des capacités en
				<span class="site_red">sciences des données</span> pour :
			</h2>
			<ul class="mission-list">
				<li>
					<span class="list-marker"></span>
					<span>Renforcer la pertinence de la recherche académique sur les grandes problématiques sociétales</span>
				</li>
				<li>
					<span class="list-marker"></span>
					<span>Éclairer la décision publique et privée</span>
				</li>
				<li>
					<span class="list-marker"></span>
					<span>Favoriser une meilleure gouvernance collective</span>
				</li>
			</ul>
		{/if}

		<!-- Presentation Menu Links -->
		<nav class="presentation-links" aria-label="Presentation">
			<Link href="/mission" class="presentation-link">
				<svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span>{isEn ? 'Mission' : 'Mission'}</span>
			</Link>
			<Link href="/plateforme" class="presentation-link">
				<svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
				<span>{isEn ? 'Platform' : 'Plateforme'}</span>
			</Link>
			<Link href="/membres" class="presentation-link">
				<svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
				<span>{isEn ? 'Members' : 'Membres'}</span>
			</Link>
			<Link href="/equipe" class="presentation-link">
				<svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
				<span>{isEn ? 'Team' : 'Équipe'}</span>
			</Link>
			<Link href="/partenariats" class="presentation-link">
				<svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
				</svg>
				<span>{isEn ? 'Partnerships' : 'Partenariats'}</span>
			</Link>
		</nav>
	</div>

	<!-- Blog Card -->
	<div class="blog-card">
		<h2 class="section-title">
			<span class="title-text">Blog</span>
			<span class="title-accent"></span>
		</h2>
		<div class="posts-list">
			{#if data.posts.length > 0}
				{#each data.posts as post, index}
					<PostItem {post} {index} />
				{/each}
			{:else}
				<p class="no-content">{isEn ? 'No posts found' : 'Aucun article trouvé'}</p>
			{/if}
		</div>
	</div>
</div>

<!-- Second Row -->
<div class="content-grid-bottom">
	<!-- Seminars Card -->
	<div class="seminars-card">
		{#if data.seminars.length > 0}
			<h2 class="section-title-center">
				<span class="title-text">
					{isEn ? 'Upcoming working group sessions' : 'Prochaines sessions des groupes de travail'}
				</span>
				<span class="title-accent-center"></span>
			</h2>

			<div class="seminars-list">
				{#each data.seminars as seminar, index}
					<SeminarItem {seminar} {index} abstract={false} />
				{/each}
			</div>
		{/if}
	</div>

	<!-- Carousel Card -->
	<div class="carousel-card">
		<Carousel {images} duration={3000} imgClass="carousel-image" />
	</div>
</div>

<style>
	/* ==================== Announcement Card ==================== */
	.announcement-card {
		position: relative;
		margin-bottom: 2rem;
		border-radius: 1rem;
		overflow: hidden;
		background: white;
		box-shadow: 0 4px 6px -1px rgba(74, 108, 170, 0.1), 0 2px 4px -1px rgba(74, 108, 170, 0.06);
	}

	.announcement-accent {
		height: 4px;
		background: linear-gradient(90deg, var(--acss-blue, #4a6caa) 0%, var(--acss-red, #b6467c) 100%);
	}

	.announcement-content {
		padding: 1.5rem;
	}

	.announcement-badge {
		display: inline-block;
		padding: 0.375rem 1rem;
		background: linear-gradient(135deg, rgba(74, 108, 170, 0.1) 0%, rgba(182, 70, 124, 0.1) 100%);
		color: var(--acss-blue-dark, #1D4796);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-radius: 2rem;
		margin-bottom: 1rem;
	}

	.announcement-body {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.announcement-image {
		width: 100%;
		height: auto;
		border-radius: 0.75rem;
		object-fit: cover;
	}

	.announcement-text {
		flex: 1;
	}

	.announcement-title {
		font-family: 'Quicksand', sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.announcement-subtitle {
		font-size: 1.125rem;
		color: var(--color-body, #475569);
		margin-bottom: 1rem;
	}

	.announcement-details {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.detail-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		font-size: 0.9375rem;
		color: var(--color-body, #475569);
	}

	.detail-icon {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--acss-blue, #4a6caa);
		flex-shrink: 0;
		margin-top: 0.125rem;
	}

	@media (min-width: 768px) {
		.announcement-body {
			flex-direction: row;
			align-items: flex-start;
		}

		.announcement-image {
			width: 16rem;
			flex-shrink: 0;
		}
	}

	/* ==================== Content Grid ==================== */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin: 0 0.75rem 1rem;
	}

	@media (min-width: 1024px) {
		.content-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* ==================== Mission Card ==================== */
	.mission-card {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 4px 6px -1px rgba(74, 108, 170, 0.1), 0 2px 4px -1px rgba(74, 108, 170, 0.06);
		border: 1px solid rgba(74, 108, 170, 0.08);
	}

	.mission-title {
		font-family: 'Quicksand', sans-serif;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-heading, #1e293b);
		line-height: 1.4;
		margin-bottom: 1rem;
	}

	.mission-subtitle {
		display: block;
		font-size: 1rem;
		font-weight: 600;
		color: var(--acss-blue-dark, #1D4796);
		margin-top: 0.25rem;
	}

	.accent-line-sm {
		height: 3px;
		width: 60px;
		background: linear-gradient(90deg, var(--acss-blue, #4a6caa) 0%, var(--acss-red, #b6467c) 100%);
		border-radius: 2px;
		margin-bottom: 1.5rem;
	}

	.mission-description {
		font-family: 'Quicksand', sans-serif;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-heading, #1e293b);
		line-height: 1.5;
		margin-bottom: 1.5rem;
	}

	.mission-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.mission-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.75rem 0;
		font-size: 1rem;
		color: var(--color-body, #475569);
		border-bottom: 1px solid rgba(74, 108, 170, 0.08);
	}

	.mission-list li:last-child {
		border-bottom: none;
	}

	.list-marker {
		width: 8px;
		height: 8px;
		background: linear-gradient(135deg, var(--acss-blue, #4a6caa) 0%, var(--acss-red, #b6467c) 100%);
		border-radius: 50%;
		flex-shrink: 0;
		margin-top: 0.5rem;
	}

	@media (min-width: 1024px) {
		.mission-title {
			font-size: 1.5rem;
		}
	}

	/* ==================== Presentation Links ==================== */
	.presentation-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(74, 108, 170, 0.1);
	}

	:global(.presentation-link) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.875rem;
		background: linear-gradient(135deg, rgba(74, 108, 170, 0.06) 0%, rgba(182, 70, 124, 0.06) 100%);
		border-radius: 2rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--acss-blue-dark, #1D4796);
		text-decoration: none;
		transition: all 0.3s ease;
		border: 1px solid transparent;
	}

	:global(.presentation-link:hover) {
		background: white;
		border-color: rgba(74, 108, 170, 0.15);
		box-shadow: 0 2px 8px rgba(74, 108, 170, 0.15);
		transform: translateY(-2px);
	}

	:global(.presentation-link::after) {
		display: none !important;
	}

	:global(.presentation-link .link-icon) {
		width: 1rem;
		height: 1rem;
		color: var(--acss-blue, #4a6caa);
	}

	:global(.presentation-link:hover .link-icon) {
		color: var(--acss-red, #b6467c);
	}

	/* ==================== Blog Card ==================== */
	.blog-card {
		background: linear-gradient(135deg, rgba(74, 108, 170, 0.04) 0%, rgba(182, 70, 124, 0.04) 100%);
		border-radius: 1rem;
		padding: 2rem;
		border: 1px solid rgba(74, 108, 170, 0.08);
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.title-text {
		font-family: 'Quicksand', sans-serif;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--acss-blue-dark, #1D4796);
	}

	.title-accent {
		flex: 1;
		height: 2px;
		background: linear-gradient(90deg, var(--acss-blue, #4a6caa) 0%, transparent 100%);
		border-radius: 1px;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.no-content {
		color: var(--color-muted, #94a3b8);
		font-style: italic;
		text-align: center;
		padding: 2rem;
	}

	/* ==================== Second Row ==================== */
	.content-grid-bottom {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin: 0 0.75rem 0.5rem;
	}

	@media (min-width: 1024px) {
		.content-grid-bottom {
			grid-template-columns: 2fr 1fr;
		}
	}

	/* ==================== Seminars Card ==================== */
	.seminars-card {
		background: linear-gradient(135deg, rgba(74, 108, 170, 0.04) 0%, rgba(182, 70, 124, 0.04) 100%);
		border-radius: 1rem;
		padding: 2rem;
		border: 1px solid rgba(74, 108, 170, 0.08);
	}

	.section-title-center {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.section-title-center .title-text {
		display: block;
		font-family: 'Quicksand', sans-serif;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--acss-blue-dark, #1D4796);
		margin-bottom: 0.75rem;
	}

	.title-accent-center {
		display: block;
		width: 60px;
		height: 3px;
		background: linear-gradient(90deg, var(--acss-blue, #4a6caa) 0%, var(--acss-red, #b6467c) 100%);
		border-radius: 2px;
		margin: 0 auto;
	}

	.seminars-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* ==================== Carousel Card ==================== */
	.carousel-card {
		background: white;
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 4px 6px -1px rgba(74, 108, 170, 0.1), 0 2px 4px -1px rgba(74, 108, 170, 0.06);
		border: 1px solid rgba(74, 108, 170, 0.08);
		min-height: 350px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Ensure carousel fills its container properly */
	:global(.carousel-card > div) {
		width: 100%;
		height: 100%;
		min-height: 320px;
	}

	:global(.carousel-card .carousel-image) {
		max-width: 100%;
		max-height: 300px;
		width: auto;
		height: auto;
		object-fit: contain;
		border-radius: 0.5rem;
		margin: 0 auto;
		display: block;
	}

	/* Style carousel navigation indicators */
	:global(.carousel-card [role="group"]) {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
