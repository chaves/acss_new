<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import SideTwo from '$lib/components/layout/SideTwo.svelte';
	import { Carousel } from 'flowbite-svelte';
	import images_personnes from '$lib/data/images_hackathon_2022_personnes.json';
	import images_presentations from '$lib/data/images_hackathon_2022_presentations.json';
</script>

<Breadcrumb
	title="Hackathon du master SIREN en collaboration avec Services Publics +"
	title_path="Hackathon"
	link="formation"
	link_text={m.training()}
/>

<SideTwo>
	<svelte:fragment slot="side1">
		<p>
			La météo était au rendez-vous pour le hackathon du master
			<a href="https://dauphine.psl.eu/formations/masters/systemes-information-reseaux-et-numerique"
				>SIREN</a
			>. 64 étudiants et 5 assistants, pour explorer les données de
			<a href="https://www.plus.transformation.gouv.fr/">Service Publics +</a>, autrement dit un
			corpus de 16000 commentaires d’usagers à propos des services de l’administration.
		</p>
		<p>
			Les règles du jeu sont très simples. 4 questions posées par l’équipe expérience client de la <a
				href="https://www.modernisation.gouv.fr/qui-sommes-nous"
				>Direction interministérielle de la transformation publique</a
			> (DITP), une présentation du mode de production des données et des données elle-même. Des commentaires,
			des tags d’entités administratives, des dates, un indicateur de satisfaction ternaire. Une présentation
			rapide des grandes techniques qui peuvent être utilisées : de l’analyse syntaxique, de la modélisation
			thématique, du word2vec et même au cours de la semaine un peu de transformer pour faire de l’analyse
			de sentiment. La session a été créative !
		</p>

		<p>
			Pour se saisir des données, un environnement RStudio auquel ils ont été formés dans un cours
			de 18 heures et quelques scripts préparés par l’équipe d’encadrement. Pour la plupart le
			niveau de base était proche de zéro. Quelques-uns sont des as du code.
		</p>
	</svelte:fragment>

	<svelte:fragment slot="side2">
		<Carousel images={images_personnes} duration={3000} imgClass="object-contain h-full w-fit rounded-sm" />

	</svelte:fragment>
</SideTwo>

<SideTwo>
	<svelte:fragment slot="side1">
		<Carousel images={images_presentations} duration={3000} imgClass="object-contain h-full w-fit rounded-sm" />
	</svelte:fragment>
	<svelte:fragment slot="side2">
		<p>
			La seconde journée a eu pour but de définir la stratégie d’analyse, les grandes directions
			pour le « pipeline » des données et les premiers tests logiques, sur de petits échantillons.
			les jours suivants ont été consacrés laborieusement à déboguer le schéma initial, à corriger
			les trajectoires, jusqu’à produire des résultats stables et les injecter dans une ou deux
			dataviz.
		</p>

		<p>
			Vendredi matin ne restait que les viz à affiner, ajouter une palette de couleur un effet
			d’échelle, gérer le storytelling.
		</p>

		<p>
			Les équipes ont ensuite présenté leurs travaux devant un jury composés de membres de la DITP,
			de spécialistes du NLP ou du traitement des réclamations.
		</p>

		<p>
			On a ensuite conclu par une fête dans la cour de dauphine, le soleil versant généreusement ses
			rayons de fin d’après-midi.
		</p>
	</svelte:fragment>
</SideTwo>

<style>
	p {
		@apply mb-6;
	}
</style>
