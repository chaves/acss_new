<script lang="ts">
    import type { PageData } from './$types';
    import * as m from '$lib/paraglide/messages.js';
    import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
    import Link from '$lib/components/Link.svelte';
    let { data }: { data: PageData } = $props();
</script>

<Breadcrumb title={m.team()} title_path={m.team()} />

<div class="people-grid">
	{#each data.equipe as membre}
		{@const slug = membre.Slug ?? (membre as { slug?: string }).slug}
		<div>
			{#if slug}
				<Link href="/equipe/{slug}" class="block no-underline text-inherit cursor-pointer">
					<div class="person-card">
						<div class="person-layout">
							<img
								class="person-photo"
								src="/images/photos_equipe/{membre.ImageFileName}"
								alt="{membre.FirstName} {membre.LastName}"
								width="150"
								height="150"
								loading="lazy"
								decoding="async"
							/>
							<div>
								<strong class="person-name">
									{membre.FirstName}
									{membre.LastName}
								</strong>
								<p class="person-description">
									{membre.fonction}
								</p>
							</div>
						</div>
					</div>
				</Link>
			{:else}
				<div class="person-card">
					<div class="person-layout">
						<img
							class="person-photo"
							src="/images/photos_equipe/{membre.ImageFileName}"
							alt="{membre.FirstName} {membre.LastName}"
							width="150"
							height="150"
							loading="lazy"
							decoding="async"
						/>
						<div>
							<strong class="person-name">
								{membre.FirstName}
								{membre.LastName}
							</strong>
							<p class="person-description">
								{membre.fonction}
							</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style lang="postcss">
	.people-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 26rem), 1fr));
		gap: 1rem;
	}

	.person-card {
		height: 100%;
		padding: clamp(1.25rem, 3vw, 2rem);
		border: 1px solid rgba(74, 108, 170, 0.12);
		border-radius: var(--radius-md);
		background: white;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
	}

	.person-card:hover {
		border-color: rgba(74, 108, 170, 0.3);
		transform: translateY(-2px);
	}

	.person-layout {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.person-photo {
		width: clamp(5rem, 12vw, 7.5rem);
		height: clamp(5rem, 12vw, 7.5rem);
		flex: none;
		border-radius: 50%;
		object-fit: cover;
	}

	.person-name {
		display: block;
		font-family: var(--font-heading);
		font-size: 1.2rem;
		color: var(--color-heading);
	}

	.person-description {
		margin-top: 0.5rem;
		color: var(--color-body);
		font-size: 0.9rem;
		line-height: 1.55;
	}
</style>