<script lang="ts">
	import { workshops, type WorkshopType } from '$lib/data/workshops';

	interface Props {
		type: WorkshopType;
		showRegistration?: boolean;
		variant?: 'card' | 'section';
	}

	let { type, showRegistration = true, variant = 'card' }: Props = $props();

	const workshop = workshops[type];
</script>

<div class="workshop-info" class:card={variant === 'card'} class:section={variant === 'section'}>
	{#if variant === 'section'}
		<h3>About this workshop</h3>
	{/if}

	{#each workshop.description as paragraph}
		<p>{paragraph}</p>
	{/each}

	<p class="schedule">
		<strong>Periodicity:</strong> {workshop.schedule}.
	</p>

	{#if showRegistration}
		{#if workshop.registration.type === 'form'}
			<p class="registration">
				<strong>
					To attend, <a href={workshop.registration.url} target="_blank" rel="noopener noreferrer">{workshop.registration.text}</a>.
				</strong>
			</p>
		{:else if workshop.registration.type === 'contacts'}
			<div class="contacts">
				<p><strong>To attend, please contact:</strong></p>
				{#each workshop.registration.contacts as contact}
					<p class="contact">
						<strong>{contact.name}:</strong>
						<a href="mailto:{contact.email}">{contact.email}</a>
					</p>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.workshop-info.card {
		@apply mb-6 rounded-xl border-2 border-blue-100 bg-white px-6 py-3 text-sm;
	}

	.workshop-info.section {
		@apply mt-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8;
	}

	.workshop-info.section h3 {
		@apply mb-3 text-lg font-semibold text-gray-800;
	}

	p {
		@apply my-2 text-gray-600;
	}

	.schedule {
		@apply mt-4 rounded-lg bg-white/50 p-3;
	}

	.workshop-info.card .schedule {
		@apply mt-2 rounded-none bg-transparent p-0;
	}

	.registration {
		@apply mt-2;
	}

	.registration a {
		@apply text-blue-600 hover:underline;
	}

	.contacts {
		@apply mt-4;
	}

	.contact {
		@apply my-1;
	}

	.contact a {
		@apply text-blue-600 hover:underline;
	}
</style>
