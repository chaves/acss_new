<script lang="ts">
	// Région Île-de-France visibility: official logo on its white background (≥ 85 px wide),
	// clickable to www.iledefrance.fr, with the mandatory mention. See the Région visibility charter.
	import { getLocale } from '#lib/paraglide/runtime.js';
	import content from '#lib/data/cluster-projects.json';

	let { compact = false }: { compact?: boolean } = $props();
	const copy = content[getLocale()];
</script>

<section class="funding" class:compact aria-labelledby={compact ? undefined : 'funding-title'} aria-label={compact ? copy.fundingMention : undefined}>
	<a class="logo" href="https://www.iledefrance.fr" target="_blank" rel="noopener" aria-label={copy.regionLink}>
		<img src="/images/logos_autres/region-ile-de-france.svg" alt="Région Île-de-France" width="220" height="80" loading="lazy" />
	</a>
	<div>
		{#if !compact}<h2 id="funding-title">{copy.fundingTitle}</h2>{/if}
		<p class="mention">{copy.fundingMention}</p>
		<p>{copy.fundingText}</p>
	</div>
</section>

<style>
	.funding {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: clamp(1.25rem, 3vw, 2.25rem);
		align-items: center;
		padding: clamp(1.25rem, 3vw, 1.75rem);
		border: 1px solid #dfe6f2;
		border-radius: 1rem;
		background: var(--bg-secondary);
	}
	.logo {
		display: block;
		padding: 0.25rem 0.5rem;
		border-radius: 0.6rem;
		background: #fff;
		line-height: 0;
	}
	.logo img {
		width: clamp(150px, 18vw, 220px);
		height: auto;
	}
	.logo:focus-visible {
		outline: 3px solid var(--acss-red);
		outline-offset: 3px;
	}
	h2 {
		margin: 0 0 0.4rem;
		font-family: var(--font-heading);
		font-size: clamp(1.2rem, 2vw, 1.45rem);
		font-weight: 700;
		color: var(--color-heading);
	}
	p {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.75;
	}
	.mention {
		font-weight: 600;
		color: var(--color-heading);
	}
	.compact {
		padding: 1rem 1.25rem;
	}
	.compact .logo img {
		width: 150px;
	}
	@media (max-width: 560px) {
		.funding {
			grid-template-columns: minmax(0, 1fr);
		}
		.logo {
			width: max-content;
		}
	}
</style>
