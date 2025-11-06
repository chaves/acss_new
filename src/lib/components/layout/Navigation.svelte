<script lang="ts">
	// External library imports
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider
	} from 'flowbite-svelte';
	import { ChevronDownOutline, CloseOutline } from 'flowbite-svelte-icons';

	import { page } from '$app/state';
	import { locales } from '$lib/paraglide/runtime';

	// Internal components/modules
	import LanguageSwitch from './LanguageSwitch.svelte';

	// Data imports
	import MenuFR from '$lib/data/menu_fr.json';
	import MenuEN from '$lib/data/menu_en.json';

	// Variables
	const { lang } = $props();
	let menu = $derived(lang === 'en' ? MenuEN : MenuFR);
	let hidden = $state(true); // Track menu visibility for mobile

	// Get canonical path without language prefix for activeUrl matching
	let activeUrl = $derived.by(() => {
		const pathname = page.url.pathname;
		const [, firstSegment, ...rest] = pathname.split('/');
		// If first segment is a language tag, remove it
		if (locales.includes(firstSegment as any)) {
			return '/' + rest.join('/');
		}
		return pathname;
	});

	// Helper function to add language prefix to paths
	function localizeUrl(path: string) {
		return `/${lang}${path}`;
	}

	// Toggle menu visibility
	function toggleMenu() {
		hidden = !hidden;
	}

</script>

<header class="sticky top-0 z-50 bg-white pb-2 pt-4">
	<Navbar>
		<NavBrand href={localizeUrl('/')}>
			<img
				src="/images/logos/acss_logo.svg"
				class="me-3 h-9 sm:h-12"
				alt="ACSS-PSL Institute Logo"
				loading="eager"
				decoding="async"
				fetchpriority="high"
			/>
		</NavBrand>
		<NavHamburger onclick={toggleMenu} />
		<NavUl bind:hidden {activeUrl} activeClass="text-acss_red" nonActiveClass="text-acss_blue">
			<!-- Close button for mobile - positioned at top right of menu -->
			<li class="block md:hidden">
				<button
					onclick={toggleMenu}
					class="flex w-full items-center justify-end p-2 text-acss_red hover:text-acss_blue"
					aria-label="Close menu"
				>
					<CloseOutline class="h-8 w-8" />
				</button>
			</li>
			{#each menu as item}
				{#if item.children}
					<NavLi class="cursor-pointer text-acss_blue">
						{item.title}<ChevronDownOutline
							class="ms-2 inline h-6 w-6 text-acss_red dark:text-white"
						/>
					</NavLi>
					<Dropdown {activeUrl} class="z-20 w-fit text-acss_blue" activeClass="text-acss_red">
						{#each item.children as child}
							<DropdownItem href={localizeUrl(child.path)} onclick={() => { hidden = true; }}>{child.title}</DropdownItem>
                            <DropdownDivider />
						{/each}
					</Dropdown>
				{:else}
					<NavLi href={localizeUrl(item.path)} onclick={() => { hidden = true; }}>{item.title}</NavLi>
				{/if}
			{/each}
            <li>|</li>
            <li>
                <LanguageSwitch />
            </li>
		</NavUl>
	</Navbar>
</header>
