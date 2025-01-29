<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';

	import Footer from '$lib/ui_old/Footer.svelte';
	import Nav from '$lib/ui_old/Nav.svelte';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<!--Header-->
	<header class="bg-white sticky-bar pt-4 pb-2">
		<div class="container mx-auto flex items-center justify-between">
			<div class="text-xl font-bold">
				<Nav />
			</div>
		</div>
	</header>

	<section class="py-9 bg-blueGray-50">
		<div class="container main">
			<div class="mx-auto mb-6">
				{@render children()}
			</div>
		</div>
	</section>

	<Footer />

</ParaglideJS>
