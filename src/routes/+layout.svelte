<script lang="ts">
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import menuData from '$lib/data/menu.json';
	import '../app.css';

	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();


	// Retrieve the menu for the current language
	const menu = menuData['fr'] || menuData['en'];

</script>

<ParaglideJS {i18n}>
	<!--Header-->

	<Navigation />

	<section class="py-9 bg-blueGray-50">
		<div class="container main">
			<div class="mx-auto mb-6">
				{@render children()}
			</div>
		</div>
	</section>

	<Footer />

</ParaglideJS>
