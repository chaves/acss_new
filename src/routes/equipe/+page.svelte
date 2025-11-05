<script lang="ts">
    import type { PageData } from './$types';
    import * as m from '$lib/paraglide/messages.js';
    import Link from '$lib/components/Link.svelte';
    import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
    let { data }: { data: PageData } = $props();
</script>

<Breadcrumb title={m.team()} title_path={m.team()} />

<div class="flex flex-wrap">
	{#each data.equipe as membre}
		<div class="w-full lg:w-1/2 py-3 lg:px-2">
			<Link href="/equipe/{membre.Slug}">
				<div class="membre">
					<div class="flex items-center">
						<img
							class="object-cover w-30 h-30 mr-2 rounded-full"
							src="/images/photos_equipe/{membre.ImageFileName}"
							alt="{membre.FirstName} {membre.LastName}"
							width="150"
							height="150"
							loading="lazy"
							decoding="async"
						/>
						<div class="pl-4">
							<strong class="mt-6 mb-2 text-xl">
								{membre.FirstName}
								{membre.LastName}
							</strong>
							<p class="text-gray-500 mt-3">
								{membre.fonction}
							</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	{/each}
</div>

<style>
	.membre {
		@apply px-6 py-10 md:h-60 bg-white shadow rounded border border-gray-100 hover:border-gray-500;
	}

	img {
		@apply object-cover mr-2 rounded-full;
	}

	a {
		@apply hover:no-underline
	}
</style>