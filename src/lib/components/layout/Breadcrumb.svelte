<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { localizeUrl } from '$lib/utils';

	let {
		title,
		title_path,
		link = undefined,
		link_text = undefined,
		email = undefined,
		fonction = undefined,
		publishedAt = undefined
	} = $props();
</script>

<section class="breadcrumb-section">
	<!-- Left accent border -->
	<div class="breadcrumb-accent"></div>

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

					{#if link !== undefined}
						<li class="breadcrumb-item">
							<a href={localizeUrl(`/${link}`)} class="breadcrumb-link">{link_text}</a>
						</li>
						<!-- The h1 immediately below supplies the current page name visually. -->
						<li class="sr-only" aria-current="page">{title_path}</li>
					{:else}
						<li class="breadcrumb-item current" aria-current="page">
							<span>{title_path}</span>
						</li>
					{/if}
				</ol>
			</nav>

			<h1 class="breadcrumb-title">{title}</h1>

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
		position: relative;
		margin-bottom: clamp(1.75rem, 4vw, 3rem);
		border-radius: 1rem;
		overflow: hidden;
		background:
			linear-gradient(115deg, rgba(74, 108, 170, 0.035), transparent 48%),
			var(--bg-secondary, #f8fafc);
		border: 1px solid rgba(74, 108, 170, 0.1);
	}

	.breadcrumb-accent {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		background: linear-gradient(
			180deg,
			var(--acss-red, #b6467c),
			var(--acss-blue, #4a6caa)
		);
	}

	.breadcrumb-content {
		padding: clamp(1.4rem, 3.5vw, 2.75rem);
	}

	/* Title */
	.breadcrumb-title {
		font-family: var(--font-heading, 'Quicksand', sans-serif);
		font-size: clamp(1.75rem, 3.2vw, 2.75rem);
		font-weight: 700;
		color: var(--color-heading, #1e293b);
		max-width: 30ch;
		margin: 0;
		line-height: 1.1;
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
		gap: 0.5rem;
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
		margin-bottom: clamp(0.75rem, 1.8vw, 1.15rem);
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

	.breadcrumb-item.current span {
		font-size: 0.78rem;
		color: var(--color-muted, #94a3b8);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 480px) {
		.breadcrumb-content {
			padding-left: 2rem;
		}

		.breadcrumb-title {
			font-size: 1.75rem;
			line-height: 1.12;
		}
	}
</style>
