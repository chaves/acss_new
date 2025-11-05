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
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

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

</script>

<header class="sticky top-0 z-50 bg-white pb-2 pt-4">
	<Navbar>
		<NavBrand href="/">
			<img
				src="/images/logos/acss_logo.svg"
				class="me-3 h-9 sm:h-12"
				alt="ACSS-PSL Institute Logo"
				loading="eager"
				decoding="async"
				fetchpriority="high"
			/>
		</NavBrand>
		<NavHamburger />
		<NavUl {activeUrl} activeClass="text-acss_red" nonActiveClass="text-acss_blue">
			{#each menu as item}
				{#if item.children}
					<NavLi class="cursor-pointer text-acss_blue">
						{item.title}<ChevronDownOutline
							class="ms-2 inline h-6 w-6 text-acss_red dark:text-white"
						/>
					</NavLi>
					<Dropdown {activeUrl} class="z-20 w-fit text-acss_blue" activeClass="text-acss_red">
						{#each item.children as child}
							<DropdownItem href={child.path}>{child.title}</DropdownItem>
                            <DropdownDivider />
						{/each}
					</Dropdown>
				{:else}
					<NavLi href={item.path}>{item.title}</NavLi>
				{/if}
			{/each}
            <li>|</li>
            <li>
                <LanguageSwitch />
            </li>
		</NavUl>
	</Navbar>
</header>
