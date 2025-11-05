<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
</script>

<svelte:head>
	<title>Institut ACSS-PSL : {m.partners()}</title>
</svelte:head>

<Breadcrumb title={m.partners()} title_path={m.partners()} />

{#if getLocale() == 'fr'}
	<p>
		Des partenaires sont nécessaires au développement de l’Institut, tant pour financer son
		fonctionnement général que ses projets de recherche dont ils seront les premiers bénéficiaires.
	</p>

	<p class="mt-6 font-bold">
		SOUTENIR L’INSTITUT PSL-<span class="site_blue">AC</span><span class="site_red">SS</span> C’EST :
	</p>

	<ul class="ml-6 list-disc">
		<li class="mt-3">
			<strong>Participer directement à la production de connaissances</strong> propres à nourrir la réflexion
			sur les enjeux sociétaux et les stratégies collectives à déployer.
		</li>

		<li class="mt-3">
			<strong>Contribuer à l’élaboration d’une gouvernance publique</strong> pensée à partir d’un traitement
			pointu des données pertinentes et d’un questionnement de fond sur les enjeux socio-économiques
			concernés.
		</li>

		<li class="mt-3">
			<strong>Profiter d’une plateforme de réflexions et d’échanges neutres</strong> s’appuyant sur un
			réseau de partenaires publics et privés potentiellement porteurs de solutions innovantes tant en
			matière de politiques publiques que de stratégie industrielle et commerciale.
		</li>

		<li class="mt-3">
			<strong>Bénéficier d’un réservoir de compétences mobilisables</strong> sur des questions spécifiques
			liées aux grands défis socio-économiques
		</li>

		<li class="mt-3">
			<strong>Bénéficier d’un abattement de l’IS</strong> à hauteur de 60% du don à la Fondation PSL.
		</li>
	</ul>
{:else}
	<p>
		To support the development of the Institute, partners provide funding for both its operation and
		its research projects, of which these partners are the primary beneficiaries.
	</p>

	<p class="mt-6 font-bold">
		SUPPORTING THE PSL-<span class="site_blue">AC</span><span class="site_red">SS</span> INSTITUTE MEANS:
	</p>
	<ul class="ml-6 list-disc">
		<li class="mt-3">
			<strong>Directly participating in the production of knowledge</strong> to inform a conversation
			on social issues and the collective strategies to be deployed.
		</li>
		<li class="mt-3">
			<strong>Contributing to the elaboration of policies</strong> based on a thorough processing of
			the relevant data and a careful examination of the socio-economic challenges.
		</li>
		<li class="mt-3">
			<strong>Taking advantage of a platform supporting neutral exchanges</strong> relying on a network
			of public and private partners with the potential to provide innovative solutions both in terms
			of public policy and industrial and commercial strategy.
		</li>
		<li class="mt-3">
			<strong>Benefiting from a pool of skills that can be mobilised</strong> to tackle specific issues
			related to major socio-economic challenges.
		</li>
		<li class="mt-3">
			<strong>Benefiting from a 60% tax deduction for donations</strong> to the PSL Foundation.
		</li>
	</ul>
{/if}
