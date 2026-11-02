<script lang="ts">
	import { localizeUrl } from '#lib/utils.js';
	import SEO from '#lib/seo/SEO.svelte';
	import Breadcrumb from '#lib/components/layout/Breadcrumb.svelte';
	import * as m from '#lib/paraglide/messages.js';
	import Link from '#lib/components/Link.svelte';
</script>

<SEO title="Institut ACSS-PSL : {m.training()}" description={m.seo_training_description()} />

<Breadcrumb title={m.training()} title_path={m.training()} />

<div class="training-grid">
	<div class="cadre">
		<Link href="/formation/psl_week_2022">
			<img
				src="/images/hackhaton_2022/psl_week.png"
				alt="PSL Week - NLP methods for social sciences"
				loading="lazy"
				decoding="async"
			/>
			<h2 class="formation">(novembre 2022) PSL-WEEK - NLP methods for social sciences</h2>
		</Link>
	</div>

	<div class="cadre">
		<a href={localizeUrl('/formation/hackathon_2022')}>
			<img
				src="/images/hackhaton_2022/personnes/image_1.jpeg"
				alt="Hackathon master SIREN"
				loading="lazy"
				decoding="async"
			/>
			<h2 class="formation">
				(juin 2022) Hackathon du master SIREN en collaboration avec Services Publics +
			</h2>
		</a>
	</div>
</div>

<style>
	.training-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 25rem), 1fr));
		gap: 1.5rem;
	}

	.cadre :global(a) {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		height: 100%;
		min-height: 8rem;
		padding: 1.25rem;
		border: 1px solid rgba(74, 108, 170, 0.16);
		border-radius: var(--radius-md);
		transition: border-color 150ms ease;
	}

	.cadre :global(a:hover) {
		border-color: var(--acss-blue);
	}

	.formation {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		font-weight: 600;
		line-height: 1.5;
		color: var(--color-heading);
	}

	img {
		width: 5rem;
		height: 5rem;
		flex: none;
		object-fit: cover;
		border-radius: 0.25rem;
	}

	@media (max-width: 400px) {
		.cadre :global(a) {
			padding: 1rem;
			gap: 0.875rem;
		}

		img {
			width: 3.5rem;
			height: 3.5rem;
		}
	}
</style>
