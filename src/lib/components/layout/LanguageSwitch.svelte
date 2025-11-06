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
		en: 'English',
		fr: 'Français'
	};

	const shortLabels = {
		en: 'EN',
		fr: 'FR'
	};
</script>

<div class="languageSwitcher">
	<!-- Language buttons -->
	<div class="language-buttons">
		{#each locales as langTag}
			<button
				type="button"
				onclick={() => switchToLanguage(langTag)}
				class="lang-button"
				class:active={currentLang === langTag}
				class:inactive={currentLang !== langTag}
				aria-label="Switch to {labels[langTag]}"
				aria-current={currentLang === langTag ? 'true' : 'false'}
			>
				{shortLabels[langTag]}
			</button>
		{/each}
	</div>
</div>

<style>
	.languageSwitcher {
		display: flex;
		align-items: center;
	}

	.language-buttons {
		display: flex;
		gap: 0.25rem;
		background: #f1f5f9;
		border-radius: 0.5rem;
		padding: 0.25rem;
	}

	.lang-button {
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		border: none;
		padding: 0.5rem 0.875rem;
		border-radius: 0.375rem;
		transition: all 0.2s ease-in-out;
		font-family: inherit;
		min-width: 2.5rem;
		text-align: center;
	}

	.lang-button.active {
		background: #1d4796;
		color: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.lang-button.inactive {
		background: transparent;
		color: #64748b;
	}

	.lang-button.inactive:hover {
		background: white;
		color: #1d4796;
	}

	.lang-button.inactive:active {
		transform: scale(0.95);
	}

	/* Mobile optimization */
	@media (max-width: 768px) {
		.languageSwitcher {
			gap: 0.375rem;
		}

		.lang-button {
			padding: 0.625rem 1rem;
			font-size: 1rem;
			min-width: 3rem;
		}

		.language-buttons {
			padding: 0.375rem;
		}
	}
</style>
