<script lang="ts">
    import type { PageData } from './$types';
    import * as m from '$lib/paraglide/messages.js';
    import Breadcrumb from '$lib/components/layout/breadcrumb.svelte';

    let { data }: { data: PageData } = $props();
</script>

<Breadcrumb title={m.members_institute()} title_link={m.members()} />

<div class="flex flex-wrap">
	{#each data.membres as membre}
		<div class="w-full md:w-1/3 py-3 md:px-2">
			<a href="/membres/{membre.slug}">
				<div class="membre">
					<div class="flex items-center">
						<img
							class="object-cover w-20 h-20 mr-2 rounded-full"
							src="/images/photos_members/{membre.photo}"
							alt="{membre.first_name} {membre.last_name}"
							width="80"
							height="80"
						/>
						<div class="pl-4">
							<strong class="mt-6 mb-2">
								{membre.first_name}
								{membre.last_name}
							</strong>
							<p class="description">
								{membre.affiliations[0]}<br />
								{membre.disciplines[0]}
							</p>
						</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>

<style>
	.membre {
		@apply hover:cursor-pointer px-6 py-10 md:h-40 bg-white shadow rounded border border-gray-100 hover:border-gray-500;
	}

	img {
		@apply object-cover mr-2 rounded-full;
	}

	.membre p.description {
		@apply text-gray-500 text-xs mt-3;
	}

	a {
		@apply hover:no-underline
	}
</style>
