<script lang="ts">
    import type { PageData } from './$types';
    import * as m from '$lib/paraglide/messages.js';
    import Link from '$lib/components/Link.svelte';
    import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
    let { data }: { data: PageData } = $props();
</script>

<Breadcrumb title={m.members()} title_path={m.members()} />

<div class="flex flex-wrap">
	{#each data.membres as membre}
		<div class="w-full md:w-1/3 py-3 md:px-2">
			<Link href="/membres/{membre.slug}">
				<div class="membre">
					<div class="flex items-center">
						<img
							class="object-cover w-20 h-20 mr-2 rounded-full"
							src="/images/photos_members/{membre.photo}"
							alt="{membre.first_name} {membre.last_name}"
							width="80"
							height="80"
							loading="lazy"
							decoding="async"
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
			</Link>
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
