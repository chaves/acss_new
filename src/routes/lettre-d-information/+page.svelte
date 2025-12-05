<script lang="ts">
	import { mailingList } from '$lib/api';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import { localizeUrl } from '$lib/utils';

	type FormState = 'idle' | 'submitting' | 'success' | 'error';

	let firstName = $state('');
	let lastName = $state('');
	let institution = $state('');
	let email = $state('');

	let formState: FormState = $state('idle');
	let errors = $state<Record<string, string>>({});
	let errorMessage = $state('');

	/**
	 * Validate email format
	 */
	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	/**
	 * Validate form fields
	 */
	function validateForm(): boolean {
		errors = {};

		if (!firstName.trim()) {
			errors.firstName = m.first_name_required();
		}

		if (!lastName.trim()) {
			errors.lastName = m.last_name_required();
		}

		if (!institution.trim()) {
			errors.institution = m.institution_required();
		}

		if (!email.trim()) {
			errors.email = m.email_required();
		} else if (!isValidEmail(email)) {
			errors.email = m.email_invalid();
		}

		return Object.keys(errors).length === 0;
	}

	/**
	 * Handle form submission
	 */
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		formState = 'submitting';
		errorMessage = '';

		try {
			await mailingList.subscribe({
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				institution: institution.trim(),
				email: email.trim().toLowerCase()
			});

			formState = 'success';
			// Reset form
			firstName = '';
			lastName = '';
			institution = '';
			email = '';
		} catch (error) {
			formState = 'error';
			console.error('Subscription error:', error);

			// Try to extract a user-friendly error message
			if (error instanceof Error) {
				errorMessage = error.message;
			} else {
				errorMessage = m.subscription_error();
			}
		}
	}

	// Get localized page title
	const pageTitle = $derived(m.newsletter_title());
	const locale = $derived(getLocale());
</script>

<svelte:head>
	<title>Institut ACSS-PSL : {pageTitle}</title>
</svelte:head>

<Breadcrumb title={pageTitle} title_path={pageTitle} />

<div class="max-w-2xl mx-auto">
	<div class="bg-white rounded-lg shadow-md p-8">
		<h2 class="text-2xl font-bold text-gray-900 mb-4">{pageTitle}</h2>
		<p class="text-gray-600 mb-8">{m.newsletter_description()}</p>

		{#if formState === 'success'}
			<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
				<div class="flex items-start">
					<svg
						class="h-5 w-5 text-green-500 mr-3 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<p class="text-green-800 font-medium">{m.subscription_success()}</p>
				</div>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-6">
				{#if formState === 'error'}
					<div class="p-4 bg-red-50 border border-red-200 rounded-lg">
						<div class="flex items-start">
							<svg
								class="h-5 w-5 text-red-500 mr-3 mt-0.5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg>
							<p class="text-red-800">{errorMessage || m.subscription_error()}</p>
						</div>
					</div>
				{/if}

				<!-- First Name -->
				<div>
					<label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
						{m.first_name()}
						<span class="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="firstName"
						bind:value={firstName}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
						class:border-red-500={errors.firstName}
						disabled={formState === 'submitting'}
						required
					/>
					{#if errors.firstName}
						<p class="mt-1 text-sm text-red-600">{errors.firstName}</p>
					{/if}
				</div>

				<!-- Last Name -->
				<div>
					<label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
						{m.last_name()}
						<span class="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="lastName"
						bind:value={lastName}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
						class:border-red-500={errors.lastName}
						disabled={formState === 'submitting'}
						required
					/>
					{#if errors.lastName}
						<p class="mt-1 text-sm text-red-600">{errors.lastName}</p>
					{/if}
				</div>

				<!-- Institution -->
				<div>
					<label for="institution" class="block text-sm font-medium text-gray-700 mb-2">
						{m.institution()}
						<span class="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="institution"
						bind:value={institution}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
						class:border-red-500={errors.institution}
						disabled={formState === 'submitting'}
						required
					/>
					{#if errors.institution}
						<p class="mt-1 text-sm text-red-600">{errors.institution}</p>
					{/if}
				</div>

				<!-- Email -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
						{m.email()}
						<span class="text-red-500">*</span>
					</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
						class:border-red-500={errors.email}
						disabled={formState === 'submitting'}
						required
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-600">{errors.email}</p>
					{/if}
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						disabled={formState === 'submitting'}
						class="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if formState === 'submitting'}
							<span class="flex items-center justify-center">
								<svg
									class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								{m.subscribing()}
							</span>
						{:else}
							{m.submit()}
						{/if}
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
	:global(input:focus) {
		outline: none;
	}
</style>

