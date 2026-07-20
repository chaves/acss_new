<script lang="ts">
    import type { PageData } from './$types';
    import * as m from '$lib/paraglide/messages.js';
    import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
    let { data }: { data: PageData } = $props();
</script>

<Breadcrumb title={m.members()} title_path={m.members()} />

<div class="people-grid">
	{#each data.membres as membre}
		<div class="person-card">
			<div class="person-layout">
				<img
					class="person-photo"
					src="/images/photos_members/{membre.photo}"
					alt="{membre.first_name} {membre.last_name}"
					width="80"
					height="80"
					loading="lazy"
					decoding="async"
				/>
				<div>
					<strong class="person-name">
						{membre.first_name}
						{membre.last_name}
					</strong>
					<p class="person-description">
						{membre.affiliations[0]}<br />
						{membre.disciplines[0]}
					</p>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.people-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: 1rem;
	}

	.person-card {
		height: 100%;
		padding: 1.5rem;
		border: 1px solid rgba(74, 108, 170, 0.12);
		border-radius: var(--radius-md);
		background: white;
	}

	.person-layout {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.person-photo {
		width: 5rem;
		height: 5rem;
		flex: none;
		border-radius: 50%;
		object-fit: cover;
	}

	.person-name {
		display: block;
		font-family: var(--font-heading);
		color: var(--color-heading);
	}

	.person-description {
		margin-top: 0.5rem;
		color: var(--color-body);
		font-size: 0.75rem;
		line-height: 1.5;
	}
</style>
