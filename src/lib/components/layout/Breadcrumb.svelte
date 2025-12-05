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
		<div class="container text-center">
			<!-- Title -->
			<h1 class="breadcrumb-title">
				{@html title}
			</h1>

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

			<!-- Breadcrumb navigation -->
			<nav class="breadcrumb-nav" aria-label="Breadcrumb">
				<ol class="breadcrumb-list">
					<li class="breadcrumb-item">
						<a href={localizeUrl('/')} class="breadcrumb-link">{m.home()}</a>
						<svg class="breadcrumb-separator" fill="currentColor" viewBox="0 0 20 20">
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
							<svg class="breadcrumb-separator" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</li>
					{/if}

					<li class="breadcrumb-item current" aria-current="page">
						<span>{title_path}</span>
					</li>
				</ol>
			</nav>
		</div>
	</div>
</section>

<style>
	.breadcrumb-section {
		position: relative;
		margin-bottom: 2rem;
		border-radius: 0.75rem;
		overflow: hidden;
		background: linear-gradient(135deg,
			rgba(74, 108, 170, 0.06) 0%,
			rgba(182, 70, 124, 0.06) 100%);
	}

	.breadcrumb-accent {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		background: linear-gradient(180deg,
			var(--acss-blue, #4a6caa) 0%,
			var(--acss-red, #b6467c) 100%);
	}

	.breadcrumb-content {
		padding: 1.5rem 1rem 1.5rem 1.5rem;
	}

	/* Title */
	.breadcrumb-title {
		font-family: 'Quicksand', sans-serif;
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--color-heading, #1e293b);
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	/* Optional elements */
	.breadcrumb-fonction {
		font-size: 1rem;
		color: var(--acss-blue-dark, #1D4796);
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.breadcrumb-date {
		font-size: 0.875rem;
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
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
		margin-bottom: 0.75rem;
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
		margin-top: 0.5rem;
	}

	.breadcrumb-list {
		display: flex;
		align-items: center;
		justify-content: center;
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
		font-size: 0.875rem;
		color: var(--color-body, #475569);
		text-decoration: none;
		transition: color 0.2s ease;
		font-weight: 500;
	}

	.breadcrumb-link:hover {
		color: var(--acss-blue, #4a6caa);
	}

	.breadcrumb-separator {
		width: 1.25rem;
		height: 1.25rem;
		color: #cbd5e1;
		flex-shrink: 0;
	}

	.breadcrumb-item.current span {
		font-size: 0.875rem;
		color: var(--color-muted, #94a3b8);
	}

	/* Responsive */
	@media (min-width: 1024px) {
		.breadcrumb-title {
			font-size: 2rem;
		}

		.breadcrumb-content {
			padding: 2rem 1.5rem 2rem 2rem;
		}
	}
</style>
