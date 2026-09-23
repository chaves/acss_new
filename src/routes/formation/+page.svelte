<script lang="ts">
    import SEO from '$lib/seo/SEO.svelte';
    import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
    import * as m from '$lib/paraglide/messages.js';
    import Link from '$lib/components/Link.svelte';
</script>

<SEO title="Institut ACSS-PSL : {m.training()}" description={m.seo_training_description()} />

<Breadcrumb title={m.training()} title_path={m.training()} />

<div class="flex flex-wrap">
	<div class="cadre">
        <Link href="/formation/psl_week_2022">
            <img
				src="/images/hackhaton_2022/psl_week.png"
				alt="PSL Week - NLP methods for social sciences"
				loading="lazy"
				decoding="async"
			/>
		<div class="formation">(novembre 2022) PSL-WEEK - NLP methods for social sciences</div>
    </Link>
	</div>

	<div class="cadre">
		<a href="{`/formation/hackathon_2022`}">
			<div class="formation">
				<img
					src="/images/hackhaton_2022/personnes/image_1.jpeg"
					alt="Hackathon master SIREN"
					loading="lazy"
					decoding="async"
				/>
				<span>
					(juin 2022) Hackathon du master SIREN en collaboration avec Services Publics +
				</span>
			</div>
		</a>
	</div>
</div>

<style lang="postcss">
	.cadre {
		@apply w-full md:w-1/2 py-3 md:px-3;
	}

	.formation {
		@apply p-4 md:h-32 bg-white shadow rounded border border-gray-100 hover:border-gray-500;
	}

	img {
		@apply object-cover mr-2 h-24 rounded-full float-right hidden md:block ml-8;
	}
</style>
