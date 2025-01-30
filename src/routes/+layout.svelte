<script lang="ts">
	import type { LayoutProps } from './$types';

	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { languageTag } from '$lib/paraglide/runtime.js'
	import '../app.css';

	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { data, children }: LayoutProps = $props();

</script>

<ParaglideJS {i18n}>
	<!--Header-->

	<Navigation lang={languageTag()} />

	<section class="py-9 bg-blueGray-50">
		<div class="container main">
			<div class="mx-auto mb-6">
				{@render children()}
			</div>
		</div>
	</section>

	<Footer />

</ParaglideJS>
