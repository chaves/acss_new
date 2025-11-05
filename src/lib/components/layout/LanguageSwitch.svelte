<script lang="ts">
	import { locales, getLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { browser } from '$app/environment';

	interface Props {
		reduced?: boolean;
	}

	let { reduced = false }: Props = $props();

	// Make current language reactive
	let currentLang = $derived(getLocale());

	/**
	 * Switch to a new language by replacing the language prefix in the URL
	 * Uses full page reload to ensure CSS and all assets are properly loaded
	 */
	function switchToLanguage(newLanguage: string) {
		if (!browser) return;

		const currentPath = get(page).url.pathname;
		const [, currentLang, ...pathParts] = currentPath.split('/');

		// Check if the first segment is a language tag
		const hasLangPrefix = locales.includes(currentLang as any);

		// Build the new path with the new language prefix
		const newPath = hasLangPrefix
			? `/${newLanguage}/${pathParts.join('/')}`
			: `/${newLanguage}${currentPath}`;

		// Use full page reload to ensure CSS is properly loaded
		window.location.href = newPath;
	}

	const labels = {
		en: 'EN',
		fr: 'FR'
	};

	const reducedLabels = {
		en: 'en',
		fr: 'fr'
	};
</script>

<div class="languageSwitcher">
	{#if reduced}
		{#each locales as langTag}
			<button
				type="button"
				onclick={() => switchToLanguage(langTag)}
				class:selected={currentLang === langTag}
				aria-label="Switch to {labels[langTag]}"
			>
				{reducedLabels[langTag]}
			</button>
		{/each}
	{:else}
		{#each locales as langTag}
			<button
				type="button"
				onclick={() => switchToLanguage(langTag)}
				class:selected={currentLang === langTag}
				aria-label="Switch to {labels[langTag]}"
			>
				{labels[langTag]}
			</button>
		{/each}
	{/if}
</div>

<style>
	.languageSwitcher {
		display: flex;
		gap: 0.5rem;
	}

	button {
		font-size: 0.9rem;
		text-decoration: none;
		cursor: pointer;
		color: #1d4796;
		background: none;
		border: none;
		padding: 0;
		font-family: inherit;
	}

	button:hover {
		opacity: 0.8;
	}

	button.selected {
		color: #b84c7c;
		font-weight: 600;
	}
</style>
