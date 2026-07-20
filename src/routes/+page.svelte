<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import SeminarItem from '$lib/components/layout/SeminarItem.svelte';
	import PostItem from '$lib/components/layout/PostItem.svelte';
	import SEO from '$lib/seo/SEO.svelte';
	import StructuredData from '$lib/seo/StructuredData.svelte';
	import { generateOrganizationSchema, generateWebSiteSchema } from '$lib/seo/schema-utils';
	import { getOGLocale, isEnglish } from '$lib/helpers/locale';
	import { formatTime } from '$lib/utils';
	import { LinkedinSolid } from 'flowbite-svelte-icons';
	import images from '$lib/data/images_home.json';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let currentLocale = $derived(getOGLocale());
	let isEn = $derived(isEnglish());

	const organizationSchema = generateOrganizationSchema();
	const websiteSchema = generateWebSiteSchema();

	// Format date for display (always in English, not translated)
	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		const day = date.getDate();
		const suffix =
			day === 1 || day === 21 || day === 31
				? 'st'
				: day === 2 || day === 22
					? 'nd'
					: day === 3 || day === 23
						? 'rd'
						: 'th';
		return `${date.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long'
		})} ${day}${suffix} ${date.getFullYear()}`;
	};
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

<!-- Featured Announcement - Next Seminar (any category) -->
{#if data.nextSeminar}
	{@const seminar = data.nextSeminar}
	{@const isAcss = seminar.type === 'acss'}
	{@const isNlp = seminar.type === 'nlp'}
	{@const isPub = seminar.type === 'pub'}
	{@const isDigitalReg = seminar.type === 'digitalReg'}
	{@const title = isAcss ? seminar.data.frontmatter.title : seminar.data.title}
	{@const date = isAcss ? seminar.data.frontmatter.date : seminar.data.date}
	{@const time = isAcss ? seminar.data.frontmatter.time : seminar.data.time}
	{@const location = isAcss ? seminar.data.frontmatter.location : seminar.data.location}
	{@const presenter = isAcss ? seminar.data.frontmatter.presenter : seminar.data.presenter}
	{@const image = isAcss ? seminar.data.frontmatter.image : null}
	{@const registration = isAcss ? seminar.data.frontmatter.registration : null}
	{@const detailUrl = isAcss
		? `/seminaires/acss/${seminar.data.slug}`
		: isNlp
			? `/seminaires/nlp/${seminar.data.slug}`
			: isPub
				? `/seminaires/public-governance/${seminar.data.slug}`
				: isDigitalReg
					? `/seminaires/digital-regulation/${seminar.data.slug}`
					: `/seminaires/trence/${seminar.data.slug}`}
	{@const badgeEn = isAcss
		? 'Upcoming ACSS Research Seminar'
		: isNlp
			? 'Upcoming AI & NLP (Natural Language Processing) Workshop'
			: isPub
				? 'Upcoming Public Governance Workshop'
				: isDigitalReg
					? 'Upcoming Digital Regulation Workshop'
					: 'Upcoming TrEnCE Workshop'}
	{@const badgeFr = isAcss
		? 'Prochain séminaire de recherche ACSS'
		: isNlp
			? 'Prochain atelier IA & NLP (Natural Language Processing)'
			: isPub
				? 'Prochain atelier Public Governance'
				: isDigitalReg
					? 'Prochain atelier Digital Regulation'
					: 'Prochain atelier TrEnCE'}
	<div class="announcement-card">
		<div class="announcement-accent"></div>
		<div class="announcement-content">
			<div class="announcement-header">
				<div class="announcement-badge">
					<span>{isEn ? badgeEn : badgeFr}</span>
				</div>
			</div>

			<div class="announcement-body">
				{#if image}
					<div class="announcement-image-wrapper">
						<img
							src={image}
							alt={title}
							class="announcement-image"
						/>
						<div class="image-overlay"></div>
					</div>
				{/if}

				<div class="announcement-text">
					<a href={detailUrl} class="announcement-title-link">
						<h3 class="announcement-title">
							{title}
						</h3>
					</a>

					{#if !isAcss && presenter}
						<div class="announcement-presenter">
							<svg class="presenter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							<span class="presenter-name">{presenter}</span>
						</div>
					{/if}

					<div class="announcement-details">
						<div class="detail-item highlight">
							<svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							<span class="detail-text">{formatDate(date)}</span>
						</div>

						{#if time}
							<div class="detail-item">
								<svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span class="detail-text">{formatTime(time)}</span>
							</div>
						{/if}

						{#if location}
							<div class="detail-item">
								<svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<span class="detail-text">{location}</span>
							</div>
						{/if}
					</div>

					<div class="announcement-buttons">
						<Link href={detailUrl} class="view-all-link">
							{isEn ? 'View details' : 'Voir les détails'}
							<svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</Link>

						{#if registration}
							<a
								href={registration}
								class="view-all-link"
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
								{isEn ? 'Register Now' : "S'inscrire maintenant"}
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Main Content Grid -->
<div class="content-grid">
	<!-- Mission Card -->
	<div class="mission-card">
		<h1 class="mission-title">
			Applied Computational Social Sciences (ACSS)
			<span class="mission-subtitle">Paris Sciences et Lettres (PSL) Institute</span>
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

		<div class="mission-visuals">
			{#each images.slice(0, 3) as image, index}
				<div class:mission-visual-main={index === 0} class="mission-visual">
					<img
						src={image.src}
						alt={image.alt}
						loading={index === 0 ? 'eager' : 'lazy'}
						decoding="async"
					/>
				</div>
			{/each}
		</div>
	</div>

	<!-- Blog Card -->
	<div class="blog-card">
		<div class="blog-card-header">
			<h2 class="section-title">
				<span class="title-text">Blog</span>
				<span class="title-accent"></span>
			</h2>
			<a
				href="https://www.linkedin.com/company/acss-psl"
				class="linkedin-card"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn ACSS-PSL"
			>
				<LinkedinSolid class="linkedin-icon" />
				<span>
					<strong>LinkedIn</strong>
					<small>ACSS-PSL</small>
				</span>
				<svg class="linkedin-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
				</svg>
			</a>
		</div>

		{#if data.posts.length > 0}
			<div class="production-wall">
				<div class="home-featured-publication">
					<PostItem post={data.posts[0]} index={0} variant="featured" priority={true} />
				</div>
				<div class="home-publication-grid">
					{#each data.posts.slice(1) as post, index}
						<PostItem {post} index={index + 1} priority={index < 2} />
					{/each}
				</div>
			</div>
		{:else}
			<p class="no-content">{isEn ? 'No posts found' : 'Aucun article trouvé'}</p>
		{/if}

		{#if data.posts.length > 0}
			<div class="view-all-wrapper">
				<Link href="/blog" class="view-all-link">
					{isEn ? 'View all posts' : 'Voir tous les articles'}
					<svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</Link>
			</div>
		{/if}
	</div>
</div>

<!-- Seminars Section - Full Width (hidden if no upcoming seminars) -->
{#if data.seminars.length > 0}
	<div class="seminars-wrapper">
		<div class="seminars-card">
			<h2 class="section-title">
				<span class="title-text">
					{isEn ? 'Next sessions' : 'Sessions suivantes'}
				</span>
				<span class="title-accent"></span>
			</h2>
			<div class="seminars-list">
				{#each data.seminars as seminar, index}
					<SeminarItem {seminar} {index} abstract={false} />
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	/* ==================== Announcement Card ==================== */
	.announcement-card {
		position: relative;
		margin-bottom: clamp(1.5rem, 4vw, 3rem);
		border-radius: var(--radius-lg, 1.25rem);
		overflow: hidden;
		background: var(--bg-secondary, #f8fafc);
		border: 1px solid rgba(74, 108, 170, 0.12);
	}

	@keyframes cardPulse {
		0%,
		100% {
			box-shadow:
				0 20px 25px -5px rgba(74, 108, 170, 0.15),
				0 10px 10px -5px rgba(74, 108, 170, 0.08);
		}
		50% {
			box-shadow:
				0 25px 30px -5px rgba(74, 108, 170, 0.2),
				0 15px 15px -5px rgba(74, 108, 170, 0.12);
		}
	}

	.announcement-accent {
		height: 5px;
		background: var(--acss-red, #b6467c);
		position: relative;
		overflow: hidden;
	}

	.announcement-accent::after {
		content: none;
	}

	@keyframes shimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 200%;
		}
	}

	.announcement-content {
		padding: 2rem;
	}

	.announcement-header {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.announcement-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.25rem;
		background: linear-gradient(135deg, rgba(74, 108, 170, 0.12) 0%, rgba(182, 70, 124, 0.12) 100%);
		color: var(--acss-blue-dark, #1d4796);
		font-size: 0.875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-radius: 2rem;
		border: 2px solid rgba(74, 108, 170, 0.2);
	}

	:global(.view-all-link) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: white;
		color: var(--acss-blue, #4a6caa);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		border-radius: 0.5rem;
		border: 2px solid rgba(74, 108, 170, 0.15);
		transition: all 0.3s ease;
	}

	:global(.view-all-link:hover) {
		background: linear-gradient(135deg, var(--acss-blue, #4a6caa) 0%, var(--acss-red, #b6467c) 100%);
		color: white !important;
		border-color: transparent;
		transform: translateX(4px);
		box-shadow: 0 4px 12px rgba(74, 108, 170, 0.3);
	}

	:global(.view-all-link:hover *) {
		color: white !important;
	}

	:global(.view-all-link::after) {
		display: none !important;
	}

	:global(.arrow-icon) {
		width: 1rem;
		height: 1rem;
		transition: transform 0.3s ease;
		color: currentColor;
	}

	:global(.view-all-link:hover .arrow-icon) {
		transform: translateX(4px);
		color: white;
	}

	.announcement-body {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.announcement-image-wrapper {
		position: relative;
		overflow: hidden;
		border-radius: 1rem;
		box-shadow: 0 10px 20px rgba(74, 108, 170, 0.15);
	}

	.announcement-image {
		width: 100%;
		height: auto;
		display: block;
		transition: transform 0.3s ease;
	}

	.announcement-image-wrapper:hover .announcement-image {
		transform: scale(1.05);
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(74, 108, 170, 0.05) 0%,
			rgba(182, 70, 124, 0.05) 100%
		);
		pointer-events: none;
	}

	.announcement-text {
		flex: 1;
	}

	.announcement-title-link {
		text-decoration: none;
		display: block;
		transition: transform 0.3s ease;
		cursor: pointer;
	}

	.announcement-title-link:hover {
		transform: translateX(4px);
	}

	.announcement-title-link:hover .announcement-title {
		background: linear-gradient(135deg, var(--acss-red, #b6467c) 0%, var(--acss-blue, #4a6caa) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.announcement-title {
		font-family: 'Quicksand', sans-serif;
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: var(--color-heading, #1e293b);
		line-height: 1.3;
		background: linear-gradient(135deg, var(--acss-blue, #4a6caa) 0%, var(--acss-red, #b6467c) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		transition: all 0.3s ease;
	}

	.announcement-presenter {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
		padding: 0.75rem 1rem;
		background: linear-gradient(135deg, rgba(74, 108, 170, 0.08) 0%, rgba(182, 70, 124, 0.08) 100%);
		border-left: 3px solid var(--acss-blue, #4a6caa);
		border-radius: 0.5rem;
	}

	.presenter-icon {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--acss-blue, #4a6caa);
		flex-shrink: 0;
	}

	.presenter-name {
		font-size: 1.0625rem;
		font-weight: 600;
		color: var(--color-heading, #1e293b);
	}

	.announcement-details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.detail-item {
		display: flex;
		align-items: flex-start;
		gap: 0.875rem;
		padding: 0.75rem;
		background: rgba(74, 108, 170, 0.04);
		border-radius: 0.75rem;
		font-size: 0.9375rem;
		color: var(--color-body, #475569);
		transition: all 0.3s ease;
	}

	.detail-item:hover {
		background: rgba(74, 108, 170, 0.08);
		transform: translateX(4px);
	}

	.detail-item.highlight {
		background: linear-gradient(135deg, rgba(74, 108, 170, 0.1) 0%, rgba(182, 70, 124, 0.1) 100%);
		border: 2px solid rgba(74, 108, 170, 0.15);
		font-weight: 600;
	}

	.detail-icon {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--acss-blue, #4a6caa);
		flex-shrink: 0;
		margin-top: 0.125rem;
	}

	.detail-item.highlight .detail-icon {
		color: var(--acss-red, #b6467c);
	}

	.detail-text {
		flex: 1;
	}

	.announcement-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	@media (min-width: 768px) {
		.announcement-body {
			flex-direction: row;
			align-items: flex-start;
		}

		.announcement-image-wrapper {
			width: 20rem;
			flex-shrink: 0;
		}

		.announcement-title {
			font-size: 2rem;
		}
	}

	/* ==================== Content Grid ==================== */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr;
		align-items: start;
		gap: clamp(1.5rem, 4vw, 3rem);
		margin: 0 0 2rem;
	}

	@media (min-width: 1024px) {
		.content-grid .mission-card {
			display: grid;
			grid-template-columns: minmax(0, 1.08fr) minmax(24rem, 0.92fr);
			column-gap: clamp(2rem, 5vw, 4.5rem);
			align-items: start;
		}

		.content-grid .mission-visuals {
			grid-column: 2;
			grid-row: 1 / 6;
			align-self: center;
		}
	}

	/* ==================== Mission Card ==================== */
	.mission-card {
		background: white;
		border-radius: var(--radius-lg, 1.25rem);
		padding: clamp(1.5rem, 3vw, 2.5rem);
		border: 1px solid rgba(74, 108, 170, 0.08);
	}

	.mission-title {
		font-family: var(--font-heading, 'Quicksand', sans-serif);
		font-size: clamp(1.875rem, 3.4vw, 2.85rem);
		font-weight: 700;
		color: var(--color-heading, #1e293b);
		max-width: 18ch;
		line-height: 1.1;
		letter-spacing: -0.025em;
		margin-bottom: 1.25rem;
		text-wrap: balance;
	}

	.mission-subtitle {
		display: block;
		font-size: clamp(0.95rem, 1.5vw, 1.15rem);
		font-weight: 600;
		color: var(--acss-blue-dark, #1D4796);
		letter-spacing: 0;
		line-height: 1.45;
		margin-top: 0.75rem;
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
		position: relative;
		overflow: hidden;
		background:
			linear-gradient(120deg, rgba(74, 108, 170, 0.035), transparent 45%),
			#fbfcfe;
		border-radius: var(--radius-lg, 1.25rem);
		padding: clamp(1.25rem, 3vw, 2.25rem);
		border: 1px solid rgba(74, 108, 170, 0.12);
	}

	.blog-card-header {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: start;
		gap: 1.5rem;
		margin-bottom: clamp(1.25rem, 2vw, 1.75rem);
	}

	.blog-card-header .section-title {
		margin: 0;
		align-self: center;
	}

	.blog-card-header .title-text {
		font-size: clamp(1.75rem, 3vw, 2.5rem);
		line-height: 1;
		color: var(--acss-blue-dark, #1d4796);
	}

	.blog-card-header .title-accent {
		background: linear-gradient(90deg, var(--acss-blue, #4a6caa), transparent 100%);
	}

	.linkedin-card {
		display: grid;
		grid-template-columns: auto auto auto;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 0.9rem;
		border: 1px solid rgba(10, 102, 194, 0.18);
		border-radius: 0.9rem;
		background: white;
		color: #0a66c2;
		text-decoration: none;
		box-shadow: 0 8px 24px rgba(10, 102, 194, 0.08);
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			border-color 180ms ease;
	}

	.linkedin-card:hover {
		transform: translateY(-2px);
		border-color: rgba(10, 102, 194, 0.34);
		box-shadow: 0 12px 30px rgba(10, 102, 194, 0.14);
	}

	.linkedin-card :global(.linkedin-icon) {
		width: 1.75rem;
		height: 1.75rem;
	}

	.linkedin-card span {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}

	.linkedin-card strong {
		font-family: var(--font-heading, 'Quicksand', sans-serif);
		font-size: 0.95rem;
	}

	.linkedin-card small {
		margin-top: 0.2rem;
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--color-muted, #64748b);
	}

	.linkedin-arrow {
		width: 1rem;
		height: 1rem;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.title-text {
		font-family: var(--font-heading, 'Quicksand', sans-serif);
		font-size: clamp(1.35rem, 2vw, 1.75rem);
		font-weight: 700;
		color: var(--acss-blue-dark, #1D4796);
	}

	.title-accent {
		flex: 1;
		height: 2px;
		background: linear-gradient(90deg, var(--acss-blue, #4a6caa) 0%, transparent 100%);
		border-radius: 1px;
	}

	.production-wall {
		display: grid;
		grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
		align-items: stretch;
		gap: clamp(1rem, 2.5vw, 2rem);
	}

	.home-featured-publication {
		height: 100%;
	}

	.production-wall .home-featured-publication :global(.post-item.featured-variant) {
		height: 100%;
		box-shadow: 0 14px 34px rgba(29, 71, 150, 0.11);
	}

	.home-publication-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.home-publication-grid :global(.post-item) {
		min-height: 6.5rem;
		padding: 0.85rem;
		border: 1px solid rgba(74, 108, 170, 0.11);
		border-radius: 0.8rem;
		background: white;
	}

	.home-publication-grid :global(.post-item:hover) {
		background: var(--bg-accent, #eef3fb);
		border-color: rgba(74, 108, 170, 0.24);
	}

	.home-publication-grid :global(.post-title a) {
		color: var(--color-heading, #1e293b);
	}

	.home-publication-grid :global(.post-title) {
		font-size: 0.9rem;
		line-height: 1.3;
		margin-bottom: 0.4rem;
	}

	.home-publication-grid :global(.post-meta) {
		font-size: 0.75rem;
	}

	.home-publication-grid :global(.meta-label) {
		color: var(--color-muted, #94a3b8);
	}

	.home-publication-grid :global(.meta-date) {
		color: var(--acss-blue, #4a6caa);
	}

	.home-publication-grid :global(.post-image-wrapper) {
		display: none;
	}

	.view-all-wrapper {
		margin-top: clamp(1.5rem, 3vw, 2.25rem);
		padding-top: 1.25rem;
		border-top: 1px solid rgba(74, 108, 170, 0.12);
	}

	.view-all-wrapper :global(.view-all-link) {
		width: 100%;
		justify-content: center;
	}

	.no-content {
		color: var(--color-muted, #94a3b8);
		font-style: italic;
		text-align: center;
		padding: 2rem;
	}

	@media (max-width: 1100px) {
		.production-wall {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.blog-card-header {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.blog-card-header .title-accent {
			display: none;
		}

		.linkedin-card {
			width: 100%;
			grid-template-columns: auto 1fr auto;
		}

		.home-publication-grid {
			grid-template-columns: 1fr;
		}

		.home-publication-grid :global(.post-item) {
			min-height: 0;
		}
	}

	/* ==================== Mission Visuals ==================== */
	.mission-card {
		display: flex;
		flex-direction: column;
	}

	.mission-visuals {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: minmax(0, 1.5fr) minmax(0, 1fr);
		gap: 0.65rem;
		width: 100%;
		height: clamp(14rem, 70vw, 18rem);
		overflow: hidden;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(74, 108, 170, 0.1);
	}

	.mission-visual {
		position: relative;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
		border: 1px solid rgba(74, 108, 170, 0.1);
		border-radius: 0.75rem;
		background: var(--bg-secondary, #f8fafc);
	}

	.mission-visual-main {
		grid-column: 1 / -1;
	}

	.mission-visual img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: saturate(0.92) contrast(1.03);
		transition: transform 400ms ease;
	}

	.mission-visuals:hover .mission-visual img {
		transform: scale(1.015);
	}

	@media (min-width: 1024px) {
		.content-grid .mission-visuals {
			height: auto;
			aspect-ratio: 4 / 3;
			margin-top: 0;
			padding-top: 0;
			border-top: 0;
		}
	}

	/* ==================== Seminars Wrapper ==================== */
	.seminars-wrapper {
		margin: 0 0 1.5rem;
	}

	/* ==================== Seminars Card ==================== */
	.seminars-card {
		background: var(--bg-secondary, #f8fafc);
		border-radius: var(--radius-lg, 1.25rem);
		padding: clamp(1.25rem, 3vw, 2rem);
		border: 1px solid rgba(74, 108, 170, 0.08);
	}

	.seminars-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

</style>
