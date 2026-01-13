<script lang="ts">
	import { ChevronDownOutline, CloseOutline, BarsOutline, EnvelopeOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/state';
	import { locales } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages.js';
	import LanguageSwitch from './LanguageSwitch.svelte';
	import MenuFR from '$lib/data/menu_fr.json';
	import MenuEN from '$lib/data/menu_en.json';

	const { lang } = $props();
	let menu = $derived(lang === 'en' ? MenuEN : MenuFR);
	let mobileMenuOpen = $state(false);
	let openDropdown = $state<string | null>(null);
	let openNestedDropdown = $state<string | null>(null);

	// Get canonical path without language prefix for activeUrl matching
	let activeUrl = $derived.by(() => {
		const pathname = page.url.pathname;
		const [, firstSegment, ...rest] = pathname.split('/');
		if (locales.includes(firstSegment as any)) {
			return '/' + rest.join('/');
		}
		return pathname;
	});

	function localizeUrl(path: string) {
		return `/${lang}${path}`;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (!mobileMenuOpen) {
			openDropdown = null;
		}
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		openDropdown = null;
		openNestedDropdown = null;
	}

	function toggleDropdown(itemTitle: string) {
		if (openDropdown === itemTitle) {
			openDropdown = null;
			openNestedDropdown = null;
		} else {
			openDropdown = itemTitle;
			openNestedDropdown = null;
		}
	}

	function toggleNestedDropdown(itemTitle: string) {
		openNestedDropdown = openNestedDropdown === itemTitle ? null : itemTitle;
	}

	function isActive(path: string): boolean {
		return activeUrl === path || (path !== '/' && activeUrl.startsWith(path));
	}
</script>

<header class="header">
	<nav class="nav-container">
		<!-- Logo -->
		<a href={localizeUrl('/')} class="logo-link">
			<img
				src="/images/logos/acss_logo.svg"
				class="logo"
				alt="ACSS-PSL Institute Logo"
				loading="eager"
				decoding="async"
				fetchpriority="high"
			/>
		</a>

		<!-- Desktop Navigation -->
		<div class="desktop-nav">
			<ul class="nav-list">
				{#each menu as item}
					{#if item.children}
						<li class="nav-item dropdown-wrapper">
							<button class="nav-link dropdown-trigger" type="button">
								{item.title}
								<ChevronDownOutline class="chevron" />
							</button>
							<div class="dropdown-menu">
								{#each item.children as child}
									{#if child.children}
										<div class="nested-dropdown-wrapper">
											<a
												href={localizeUrl(child.path)}
												class="dropdown-item nested-trigger"
												class:active={isActive(child.path)}
											>
												{child.title}
												<ChevronDownOutline class="nested-chevron" />
											</a>
											<div class="nested-dropdown-menu">
												{#each child.children as nestedChild}
													<a
														href={localizeUrl(nestedChild.path)}
														class="nested-dropdown-item"
														class:active={isActive(nestedChild.path)}
													>
														{nestedChild.title}
													</a>
												{/each}
											</div>
										</div>
									{:else}
										<a
											href={localizeUrl(child.path)}
											class="dropdown-item"
											class:active={isActive(child.path)}
										>
											{child.title}
										</a>
									{/if}
								{/each}
							</div>
						</li>
					{:else}
						<li class="nav-item">
							<a
								href={localizeUrl(item.path)}
								class="nav-link"
								class:active={isActive(item.path)}
							>
								{item.title}
							</a>
						</li>
					{/if}
				{/each}
			</ul>

			<!-- Newsletter Icon Button -->
			<a
				href={localizeUrl('/lettre-d-information')}
				class="newsletter-button"
				aria-label={m.subscribe_letter()}
			>
				<EnvelopeOutline class="newsletter-icon" />
			</a>

			<!-- Language Switcher for Desktop -->
			<div class="desktop-lang-switch">
				<LanguageSwitch />
			</div>
		</div>

		<!-- Mobile Menu Button -->
		<button class="mobile-menu-button" onclick={toggleMobileMenu} aria-label="Toggle menu">
			<BarsOutline class="h-7 w-7" />
		</button>
	</nav>
</header>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
	<div
		class="mobile-overlay"
		role="button"
		tabindex="0"
		aria-label="Close menu"
		onclick={closeMobileMenu}
		onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? closeMobileMenu() : null}
	></div>
	<div class="mobile-menu">
		<!-- Mobile Menu Header -->
		<div class="mobile-menu-header">
			<img src="/images/logos/acss_logo.svg" class="mobile-logo" alt="ACSS-PSL" />
			<button class="mobile-close-button" onclick={closeMobileMenu} aria-label="Close menu">
				<CloseOutline class="h-7 w-7" />
			</button>
		</div>

		<!-- Mobile Menu Content -->
		<nav class="mobile-nav-content">
			<ul class="mobile-nav-list">
				{#each menu as item}
					{#if item.children}
						<li class="mobile-nav-item">
							<button
								class="mobile-nav-link mobile-dropdown-trigger"
								onclick={() => toggleDropdown(item.title)}
								type="button"
							>
								{item.title}
								<ChevronDownOutline
									class={openDropdown === item.title
										? 'mobile-chevron open'
										: 'mobile-chevron'}
								/>
							</button>
							{#if openDropdown === item.title}
								<ul class="mobile-dropdown">
									{#each item.children as child}
										{#if child.children}
											<li>
												<button
													class="mobile-dropdown-item mobile-nested-trigger"
													onclick={() => toggleNestedDropdown(child.title)}
													type="button"
												>
													{child.title}
													<ChevronDownOutline
														class={openNestedDropdown === child.title
															? 'mobile-nested-chevron open'
															: 'mobile-nested-chevron'}
													/>
												</button>
												{#if openNestedDropdown === child.title}
													<ul class="mobile-nested-dropdown">
														{#each child.children as nestedChild}
															<li>
																<a
																	href={localizeUrl(nestedChild.path)}
																	class="mobile-nested-dropdown-item"
																	class:active={isActive(nestedChild.path)}
																	onclick={closeMobileMenu}
																>
																	{nestedChild.title}
																</a>
															</li>
														{/each}
													</ul>
												{/if}
											</li>
										{:else}
											<li>
												<a
													href={localizeUrl(child.path)}
													class="mobile-dropdown-item"
													class:active={isActive(child.path)}
													onclick={closeMobileMenu}
												>
													{child.title}
												</a>
											</li>
										{/if}
									{/each}
								</ul>
							{/if}
						</li>
					{:else}
						<li class="mobile-nav-item">
							<a
								href={localizeUrl(item.path)}
								class="mobile-nav-link"
								class:active={isActive(item.path)}
								onclick={closeMobileMenu}
							>
								{item.title}
							</a>
						</li>
					{/if}
				{/each}
			</ul>

			<!-- Newsletter Button for Mobile -->
			<a
				href={localizeUrl('/lettre-d-information')}
				class="mobile-newsletter-button"
				onclick={closeMobileMenu}
				aria-label={m.subscribe_letter()}
			>
				<EnvelopeOutline class="mobile-newsletter-icon" />
				<span>{m.subscribe_letter()}</span>
			</a>

			<!-- Language Switcher for Mobile -->
			<div class="mobile-lang-switch">
				<LanguageSwitch />
			</div>
		</nav>
	</div>
{/if}

<style>
	/* ==================== Header ==================== */
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		border-bottom: 1px solid #e2e8f0;
	}

	.nav-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 1rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* ==================== Logo ==================== */
	.logo-link {
		display: flex;
		align-items: center;
		transition: opacity 0.2s;
	}

	.logo-link:hover {
		opacity: 0.8;
	}

	.logo {
		height: 2.5rem;
		width: auto;
	}

	/* ==================== Desktop Navigation ==================== */
	.desktop-nav {
		display: none;
	}

	.nav-list {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-item {
		position: relative;
	}

	.nav-link {
		display: flex;
		align-items: center;
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #1d4796;
		text-decoration: none;
		border-radius: 0.5rem;
		transition: all 0.2s ease-in-out;
		border: none;
		background: none;
		cursor: pointer;
		font-family: inherit;
		white-space: nowrap;
	}

	.nav-link:hover {
		background: #f1f5f9;
		color: #0f3474;
	}

	.nav-link.active {
		background: #1d4796;
		color: white;
	}

	.nav-link.active:hover {
		background: #0f3474;
	}

	/* ==================== Dropdown (Desktop) ==================== */
	.dropdown-wrapper:hover .dropdown-menu {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.dropdown-trigger {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.dropdown-wrapper :global(.chevron) {
		width: 1rem;
		height: 1rem;
		transition: transform 0.2s;
	}

	.dropdown-wrapper:hover :global(.chevron) {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 0.5rem;
		background: white;
		border-radius: 0.75rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		padding: 0.5rem;
		min-width: 16rem;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-10px);
		transition: all 0.3s ease-in-out;
		border: 1px solid #e2e8f0;
	}

	.dropdown-item {
		display: block;
		padding: 0.625rem 0.875rem;
		font-size: 0.875rem;
		color: #334155;
		text-decoration: none;
		border-radius: 0.5rem;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.dropdown-item:hover {
		background: #f1f5f9;
		color: #1d4796;
		transform: translateX(4px);
	}

	.dropdown-item.active {
		background: #eff6ff;
		color: #1d4796;
		font-weight: 600;
	}

	/* ==================== Nested Dropdown (Desktop) ==================== */
	.nested-dropdown-wrapper {
		position: relative;
	}

	.nested-dropdown-wrapper:hover .nested-dropdown-menu {
		opacity: 1;
		visibility: visible;
		transform: translateX(0);
	}

	.nested-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.nested-dropdown-wrapper :global(.nested-chevron) {
		width: 0.875rem;
		height: 0.875rem;
		transform: rotate(-90deg);
		transition: transform 0.2s;
	}

	.nested-dropdown-wrapper:hover :global(.nested-chevron) {
		transform: rotate(0deg);
	}

	.nested-dropdown-menu {
		position: absolute;
		left: 100%;
		top: 0;
		margin-left: 0.5rem;
		background: white;
		border-radius: 0.75rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		padding: 0.5rem;
		min-width: 14rem;
		opacity: 0;
		visibility: hidden;
		transform: translateX(-10px);
		transition: all 0.3s ease-in-out;
		border: 1px solid #e2e8f0;
	}

	.nested-dropdown-item {
		display: block;
		padding: 0.625rem 0.875rem;
		font-size: 0.875rem;
		color: #334155;
		text-decoration: none;
		border-radius: 0.5rem;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.nested-dropdown-item:hover {
		background: #f1f5f9;
		color: #1d4796;
		transform: translateX(4px);
	}

	.nested-dropdown-item.active {
		background: #eff6ff;
		color: #1d4796;
		font-weight: 600;
	}

	/* ==================== Newsletter Button (Desktop) ==================== */
	.newsletter-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		background: linear-gradient(135deg, #B84C7C 0%, #9a3d65 100%);
		color: white;
		border-radius: 0.75rem;
		margin-left: 1rem;
		transition: all 0.3s ease-in-out;
		box-shadow: 0 2px 8px rgba(184, 76, 124, 0.3);
		text-decoration: none;
	}

	.newsletter-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(184, 76, 124, 0.4);
		background: linear-gradient(135deg, #9a3d65 0%, #B84C7C 100%);
	}

	.newsletter-button:active {
		transform: translateY(0);
	}

	:global(.newsletter-icon) {
		width: 1.5rem;
		height: 1.5rem;
	}

	.desktop-lang-switch {
		margin-left: 1rem;
		padding-left: 1rem;
		border-left: 1px solid #e2e8f0;
	}

	/* ==================== Mobile Menu Button ==================== */
	.mobile-menu-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		color: #1d4796;
		background: none;
		border: none;
		cursor: pointer;
		border-radius: 0.5rem;
		transition: background 0.2s;
	}

	.mobile-menu-button:hover {
		background: #f1f5f9;
	}

	.mobile-menu-button:active {
		transform: scale(0.95);
	}

	/* ==================== Mobile Overlay ==================== */
	.mobile-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 60;
		animation: fadeIn 0.3s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* ==================== Mobile Menu ==================== */
	.mobile-menu {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 85%;
		max-width: 400px;
		background: white;
		z-index: 70;
		overflow-y: auto;
		animation: slideIn 0.3s ease-in-out;
		box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.mobile-menu-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-bottom: 1px solid #e2e8f0;
		background: #f8fafc;
	}

	.mobile-logo {
		height: 2rem;
		width: auto;
	}

	.mobile-close-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		color: #b84c7c;
		background: white;
		border: none;
		cursor: pointer;
		border-radius: 0.5rem;
		transition: all 0.2s;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.mobile-close-button:hover {
		background: #fef2f2;
		transform: rotate(90deg);
	}

	.mobile-close-button:active {
		transform: rotate(90deg) scale(0.9);
	}

	/* ==================== Mobile Navigation Content ==================== */
	.mobile-nav-content {
		padding: 1rem;
	}

	.mobile-nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.mobile-nav-item {
		margin-bottom: 0.5rem;
	}

	.mobile-nav-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1rem;
		font-size: 1rem;
		font-weight: 500;
		color: #334155;
		text-decoration: none;
		border-radius: 0.75rem;
		transition: all 0.2s;
		background: #f8fafc;
		border: 2px solid transparent;
	}

	.mobile-nav-link:hover {
		background: #f1f5f9;
		border-color: #e2e8f0;
		transform: translateX(4px);
	}

	.mobile-nav-link.active {
		background: #1d4796;
		color: white;
		font-weight: 600;
	}

	.mobile-dropdown-trigger {
		font-family: inherit;
		border: none;
		cursor: pointer;
		text-align: left;
	}

	:global(.mobile-chevron) {
		width: 1.25rem;
		height: 1.25rem;
		transition: transform 0.3s ease-in-out;
	}

	:global(.mobile-chevron.open) {
		transform: rotate(180deg);
	}

	/* ==================== Mobile Dropdown ==================== */
	.mobile-dropdown {
		list-style: none;
		margin: 0.5rem 0 0 0;
		padding: 0;
		animation: expandDown 0.3s ease-in-out;
	}

	@keyframes expandDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.mobile-dropdown-item {
		display: block;
		padding: 0.875rem 1rem 0.875rem 2rem;
		font-size: 0.9375rem;
		color: #64748b;
		text-decoration: none;
		border-radius: 0.75rem;
		transition: all 0.2s;
		background: white;
		margin-bottom: 0.25rem;
		border-left: 3px solid transparent;
	}

	.mobile-dropdown-item:hover {
		background: #f1f5f9;
		color: #1d4796;
		border-left-color: #1d4796;
		transform: translateX(4px);
	}

	.mobile-dropdown-item.active {
		background: #eff6ff;
		color: #1d4796;
		font-weight: 600;
		border-left-color: #1d4796;
	}

	/* ==================== Mobile Nested Dropdown ==================== */
	.mobile-nested-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-family: inherit;
		border: none;
		cursor: pointer;
		text-align: left;
	}

	:global(.mobile-nested-chevron) {
		width: 1rem;
		height: 1rem;
		transition: transform 0.3s ease-in-out;
		flex-shrink: 0;
	}

	:global(.mobile-nested-chevron.open) {
		transform: rotate(180deg);
	}

	.mobile-nested-dropdown {
		list-style: none;
		margin: 0.5rem 0 0 0;
		padding: 0;
		animation: expandDown 0.3s ease-in-out;
	}

	.mobile-nested-dropdown-item {
		display: block;
		padding: 0.875rem 1rem 0.875rem 2.5rem;
		font-size: 0.875rem;
		color: #64748b;
		text-decoration: none;
		border-radius: 0.75rem;
		transition: all 0.2s;
		background: #f8fafc;
		margin-bottom: 0.25rem;
		border-left: 3px solid transparent;
	}

	.mobile-nested-dropdown-item:hover {
		background: #e0e7ff;
		color: #1d4796;
		border-left-color: #1d4796;
		transform: translateX(4px);
	}

	.mobile-nested-dropdown-item.active {
		background: #dbeafe;
		color: #1d4796;
		font-weight: 600;
		border-left-color: #1d4796;
	}

	/* ==================== Newsletter Button (Mobile) ==================== */
	.mobile-newsletter-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		padding: 1rem 1.5rem;
		margin-top: 1rem;
		background: linear-gradient(135deg, #B84C7C 0%, #9a3d65 100%);
		color: white;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 1rem;
		text-decoration: none;
		transition: all 0.3s ease-in-out;
		box-shadow: 0 2px 8px rgba(184, 76, 124, 0.3);
	}

	.mobile-newsletter-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(184, 76, 124, 0.4);
		background: linear-gradient(135deg, #9a3d65 0%, #B84C7C 100%);
	}

	.mobile-newsletter-button:active {
		transform: translateY(0);
	}

	:global(.mobile-newsletter-icon) {
		width: 1.5rem;
		height: 1.5rem;
	}

	.mobile-lang-switch {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid #e2e8f0;
		display: flex;
		justify-content: center;
	}

	/* ==================== Responsive ==================== */
	@media (min-width: 768px) {
		.logo {
			height: 3rem;
		}

		.desktop-nav {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		.mobile-menu-button {
			display: none;
		}
	}

	@media (min-width: 1024px) {
		.nav-container {
			padding: 1.25rem 2rem;
		}

		.nav-list {
			gap: 0.5rem;
		}

		.nav-link {
			font-size: 0.9375rem;
			padding: 0.5rem 0.875rem;
		}

		.dropdown-menu {
			min-width: 16rem;
		}

		.dropdown-item {
			font-size: 0.9375rem;
		}
	}
</style>
