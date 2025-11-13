<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	function getTitle() {
		if (getLocale() == 'en') {
			return 'The PSL-<span class="site_blue">AC</span><span class="site_red">SS</span> Institute :<br />a synergistic platform for its researchers';
		} else {
			return 'L’Institut PSL-<span class="site_blue">AC</span><span class="site_red">SS</span> :<br />une plateforme de synergies pour ses chercheurs';
		}
	}

	const title = getTitle();
</script>

<svelte:head>
	<title>Institut ACSS-PSL : {m.plafform()}</title>
</svelte:head>

<Breadcrumb {title} title_path={m.plafform()} />

{#if getLocale() == 'fr'}
	<p>
		L’Institut constitue une plateforme pour les chercheurs de PSL dont l’objectif fondamental est
		de permettre une <strong>mutualisation ciblée de ressources</strong> afin de :
	</p>
	<ul class="ml-6 list-disc">
		<li class="mt-3">
			Mener des <strong>projets ambitieux</strong> s’inscrivant dans le long-terme
		</li>
		<li class="mt-3">
			Constituer un <strong>vecteur de formation</strong> (initiale et continue)
		</li>
		<li class="mt-3">
			Développer des <strong>partenariats</strong> avec des entreprises et des administrations
		</li>
		<li class="mt-3">
			Constituer une <strong>référence pour le débat public</strong> en produisant et diffusant une information
			indépendante et digne de confiance, rendant explicites l’état des savoirs et les limites des connaissances
			sur les enjeux économiques, politiques et sociaux auxquelles notre société est confrontée
		</li>
	</ul>

	<h2 class="mt-6 border-b-4 border-t-4 border-blue-200 py-3 text-xl">
		L’Institut <strong>PSL–<span class="site_blue">AC</span><span class="site_red">SS</span></strong
		> fédère sur toutes ses thématiques, un large spectre de contributeurs associés à d’importants programmes
		de recherche financés.
	</h2>

	<div class="grid grid-cols-2 gap-10">
		<div>
			<p class="mt-6 font-bold">CENTRES DE RECHERCHES CONCERNÉS AU SEIN DE PSL:</p>
			<ul class="ml-6 list-disc">
				<li class="mt-3">
					<a class="underline" href="https://www.ceremade.dauphine.fr/"
						>Centre de Recherche en Mathématiques de la Décision</a
					> / Dauphine
				</li>
				<li class="mt-3">
					<a class="underline" href="https://www.lamsade.dauphine.fr/"
						>Laboratoire d’Analyse et de Modélisation de Systèmes pour l’Aide à la Décision</a
					> / Dauphine
				</li>
				<li class="mt-3">
					<a
						class="underline"
						href="https://www.ens.psl.eu/laboratoire/laboratoire-de-neurosciences-cognitives-computationnelles-inserm-u960"
						>Laboratoire de Neurosciences Cognitives Computationnelles</a
					> / Institut Jean Nicod, ENS
				</li>
				<li class="mt-3">
					<a class="underline" href="https://www.ena.fr/index.php?page=ressources/cera"
						>Centre d’Expertise et de Recherche Administrative</a
					> / INSP
				</li>
				<li class="mt-3">
					<a class="underline" href="https://www.cerna.minesparis.psl.eu/"
						>Centre d’Économie Industrielle</a
					> / Mines ParisTech
				</li>
				<li class="mt-3">
					<a class="underline" href="https://irisso.dauphine.fr/"
						>Institut de Recherche Interdisciplinaire en Sciences Sociales</a
					> / Dauphine
				</li>
				<li class="mt-3">
					<a class="underline" href="https://leda.dauphine.fr/"
						>Laboratoire d’Économie de Dauphine</a
					>
				</li>
				<li class="mt-3">
					<a class="underline" href="https://drm.dauphine.fr/fr/drm/accueil.html"
						>Dauphine Recherches en Management</a
					>
				</li>
				<li class="mt-3">
					<a class="underline" href="https://philosophie.ens.fr/">Département de Philosophie</a> / ENS
				</li>
			</ul>

			<p class="mt-6 font-bold">DISCIPLINES CORRESPONDANTES:</p>
			<ul class="ml-6 list-disc">
				<li class="mt-3">Droit et finances publiques</li>
				<li class="mt-3">Économie</li>
				<li class="mt-3">Finance</li>
				<li class="mt-3">Informatique et sciences des données</li>
				<li class="mt-3">Management</li>
				<li class="mt-3">Mathématiques</li>
				<li class="mt-3">Sciences cognitives</li>
				<li class="mt-3">Sociologie et sciences politiques</li>
			</ul>
		</div>
		<div>
			<p class="mt-6 font-bold">
				CHAIRES & PROGRAMMES FINANCÉS, PORTÉS PAR LES CHERCHEURS DE L’INSTITUT:
			</p>
			<ul class="ml-6 list-disc">
				<li class="mt-3">
					ANR (Agence Nationale de la Recherche) Job quality and Work Sustainability
				</li>
				<li class="mt-3">ANR MEADOW-marché de l’emploi</li>
				<li class="mt-3">ANR APB Admission Post-Bac</li>
				<li class="mt-3">ANR Eco REes-santé</li>
				<li class="mt-3">ANR Vhealth</li>
				<li class="mt-3">ANR Passage des disciplines</li>
				<li class="mt-3">ANR Osmose H2020</li>
				<li class="mt-3">Association Mieux voter</li>
				<li class="mt-3">Chaire Économie du Climat</li>
				<li class="mt-3">Chaire Gouvernance et régulation</li>
				<li class="mt-3">Chaire ENA-ENS Savoir-Prévoir-Pouvoir</li>
				<li class="mt-3">Chaire ACPR Régulation et risque systémique</li>
				<li class="mt-3">Chaire FinTech</li>
				<li class="mt-3">Fondation du risque - Quantitative Management Initiative</li>
				<li class="mt-3">GDR (Groupement de Recherche) Policy Analytics</li>
				<li class="mt-3">
					IDR (Initiative de Recherche) PREF-Prise de risque de l’épargnant français
				</li>
				<li class="mt-3">IDR Développement de la gestion quantitative</li>
				<li class="mt-3">Projet Corporate Honorum</li>
				<li class="mt-3">Projet Digital Governance Challenge</li>
				<li class="mt-3">Projet Femme dans les instances des entreprises</li>
				<li class="mt-3">Projet Social Responsability of Algorithms</li>
				<li class="mt-3">Think Tank FONDAFIP</li>
			</ul>
		</div>
	</div>
{:else}
	<p>
		The Institute provides a platform for PSL researchers, fundamentally designed to allow the <strong
			>targeted pooling of resources</strong
		> in order to:
	</p>
	<ul class="ml-6 list-disc">
		<li class="mt-3">Conduct <strong>ambitious projects</strong> with a long time horizon</li>
		<li class="mt-3">
			Function as a <strong>training resource</strong> (basic and continuing training)
		</li>
		<li class="mt-3">
			Develop <strong>partnerships</strong> with businesses and public organisations
		</li>
		<li class="mt-3">
			Provide a <strong>touchstone for public debate</strong> by producing and disseminating independent
			and trustworthy information, making explicit the current state and the limitations of our knowledge
			of the economic, political, and social issues facing society
		</li>
	</ul>

	<h2 class="mt-6 border-b-4 border-t-4 border-blue-200 py-3 text-xl">
		For all of its subjects, the <strong
			>PSL-<span class="site_blue">AC</span><span class="site_red">SS</span></strong
		> Institute unites a wide range of individuals who contribute to major funded research programmes
	</h2>

	<div class="grid grid-cols-2 gap-10">
		<div>
			<p class="mt-6 font-bold">RESEARCH CENTERS CONCERNED AT PSL UNIVERSITY:</p>
			<ul class="ml-6 list-disc">
				<li class="mt-3">
					<a class="underline" href="https://www.ceremade.dauphine.fr/"
						>Centre de Recherche en Mathématiques de la Décision</a
					> / Dauphine
				</li>
				<li class="mt-3">
					<a class="underline" href="https://www.lamsade.dauphine.fr/"
						>Laboratoire d’Analyse et de Modélisation de Systèmes pour l’Aide à la Décision</a
					> / Dauphine
				</li>
				<li class="mt-3">
					<a
						class="underline"
						href="https://www.ens.psl.eu/laboratoire/laboratoire-de-neurosciences-cognitives-computationnelles-inserm-u960"
						>Laboratoire de Neurosciences Cognitives Computationnelles</a
					> / Institut Jean Nicod, ENS
				</li>
				<li class="mt-3">
					<a class="underline" href="https://www.ena.fr/index.php?page=ressources/cera"
						>Centre d’Expertise et de Recherche Administrative</a
					> / INSP
				</li>
				<li class="mt-3">
					<a class="underline" href="https://www.cerna.minesparis.psl.eu/"
						>Centre d’Économie Industrielle</a
					> / Mines ParisTech
				</li>
				<li class="mt-3">
					<a class="underline" href="https://irisso.dauphine.fr/"
						>Institut de Recherche Interdisciplinaire en Sciences Sociales</a
					> / Dauphine
				</li>
				<li class="mt-3">
					<a class="underline" href="https://leda.dauphine.fr/"
						>Laboratoire d’Économie de Dauphine</a
					>
				</li>
				<li class="mt-3">
					<a class="underline" href="https://drm.dauphine.fr/fr/drm/accueil.html"
						>Dauphine Recherches en Management</a
					>
				</li>
				<li class="mt-3">
					<a class="underline" href="https://philosophie.ens.fr/">Département de Philosophie</a> / ENS
				</li>
			</ul>

			<p class="mt-6 font-bold">CORRESPONDING DISCIPLINES:</p>
			<ul class="ml-6 list-disc">
				<li class="mt-3">Administrative sciences</li>
				<li class="mt-3">Cognitive sciences</li>
				<li class="mt-3">Computer and data science</li>
				<li class="mt-3">Economics</li>
				<li class="mt-3">Finance</li>
				<li class="mt-3">Management</li>
				<li class="mt-3">Mathematics</li>
				<li class="mt-3">Political Science and sociology</li>
			</ul>
		</div>
		<div>
			<p class="mt-6 font-bold">
				CHAIRS & PROGRAMMES FUNDED AND RUN BY THE INSTITUTE’S RESEARCH STAFF:
			</p>
			<ul class="ml-6 list-disc">
				<li class="mt-3">
					ANR (Agence Nationale de la Recherche) Job quality and Work Sustainability
				</li>
				<li class="mt-3">ANR MEADOW-marché de l’emploi</li>
				<li class="mt-3">ANR APB Admission Post-Bac</li>
				<li class="mt-3">ANR Eco REes-santé</li>
				<li class="mt-3">ANR Vhealth</li>
				<li class="mt-3">ANR Passage des disciplines</li>
				<li class="mt-3">ANR Osmose H2020</li>
				<li class="mt-3">Association Mieux voter</li>
				<li class="mt-3">Chaire Économie du Climat</li>
				<li class="mt-3">Chaire Gouvernance et régulation</li>
				<li class="mt-3">Chaire ENA-ENS Savoir-Prévoir-Pouvoir</li>
				<li class="mt-3">Chaire ACPR Régulation et risque systémique</li>
				<li class="mt-3">Chaire FinTech</li>
				<li class="mt-3">Fondation du risque - Quantitative Management Initiative</li>
				<li class="mt-3">GDR (Groupement de Recherche) Policy Analytics</li>
				<li class="mt-3">
					IDR (Initiative de Recherche) PREF-Prise de risque de l’épargnant français
				</li>
				<li class="mt-3">IDR Développement de la gestion quantitative</li>
				<li class="mt-3">Projet Corporate Honorum</li>
				<li class="mt-3">Projet Digital Governance Challenge</li>
				<li class="mt-3">Projet Femme dans les instances des entreprises</li>
				<li class="mt-3">Projet Social Responsability of Algorithms</li>
				<li class="mt-3">Think Tank FONDAFIP</li>
			</ul>
		</div>
	</div>
{/if}
