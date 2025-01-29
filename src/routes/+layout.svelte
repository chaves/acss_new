<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';

	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Footer from '$lib/ui_old/Footer.svelte';

	let { children } = $props();
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
