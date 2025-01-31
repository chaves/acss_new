<script lang="ts">
	import { languageTag } from '$lib/paraglide/runtime.js'
    import Breadcrumb from "$lib/components/layout/Breadcrumb.svelte"
</script>

<Breadcrumb title="Mission" title_link="Mission" />

{#if languageTag() == 'fr'}
	<p class="mt-0">
		La <span class="site_blue font-bold">transformation numérique</span> rend possible la collecte
		et le traitement à <span class="site_blue font-bold">large échelle</span>
		de <span class="site_blue font-bold">données hétérogènes</span> induisant une évolution significative
		des sciences sociales en permettant de dépasser les limites des méthodes d’observation traditionnelles.
	</p>

	<p class="mt-6">
		Les <span class="site_blue font-bold">sciences des données</span> sont non seulement porteuses
		d’avancées scientifiques dans le domaine des
		<span class="site_red font-bold">sciences sociales</span>
		mais les connaissances mises au point et les capacités d’observation développées peuvent être
		<span class="site_red font-bold">utiles aux acteurs économiques, politiques et sociaux</span>
		pour mieux comprendre les transformations en cours et les maîtriser.
	</p>

	<h2 class="text-xl mt-6 py-3 border-t-4 border-b-4 border-blue-200">
		L’Institut réunit directement plus de 25 porteurs de projets scientifiques qui eux-mêmes
		mobilisent une communauté d’environ 60 chercheurs seniors et 30 chercheurs juniors, cet effectif
		ayant vocation à monter en puissance. Ils sont porteurs notamment de cinq chaires d’enseignement
		et de recherche ainsi que d’une dizaine de projets financés par la Commission Européenne ou
		l’ANR.
	</h2>

	<p class="mt-6">
		<span class="site_red font-bold">Cette capacité de recherche en sciences sociales</span> -
		économie, gestion, sociologie, sciences politiques et sciences comportementales - s’articule à
		une <span class="site_blue font-bold">équipe d’ingénieurs</span> en sciences des données, mais
		aussi à un <span class="site_blue font-bold">centre de calcul</span> et des moyens de stockage sécurisés
		et massifs.
	</p>

	<p class="mt-6">
		Ces moyens constituent le coeur d’une <strong>plateforme</strong> favorisant les
		<strong>synergies</strong>
		entre acteurs sociaux, économiques, et politiques qui mutualisent leurs savoir-faire afin de réaliser
		des avancées scientifiques et de développer des connaissances et outils
		<strong>utiles pour la décision ou le débat public</strong>, en particulier autour des
		<strong>thématiques</strong> suivantes :
	</p>

	<ul class="list-disc ml-6">
		<li class="mt-3">
			les menaces pesant sur la <strong>cohésion sociale et politique</strong> et les moyens d’y remédier
			;
		</li>
		<li class="mt-3">
			la <strong>transition écologique</strong> et la quête de modèles de développement plus durables
			;
		</li>
		<li class="mt-3">
			la <strong>transformation numérique</strong> et les modèles organisationnels et de gouvernance
			qu’elle porte ;
		</li>
		<li class="mt-3">
			les défis de l’<strong>efficacité économique</strong> et de la concurrence dans une économie globalisée.
		</li>
	</ul>

	<p class="mt-6">
		Dans tous ces domaines, s’expriment également une demande de pratiques de gouvernance
		renouvelées de la part tant des citoyens que des acteurs économiques et sociaux ainsi que la
		nécessité de reconstruire un ordre international.
	</p>
{:else}
	<p class="mt-0">
		The <span class="site_blue font-bold">digital revolution</span> makes it possible to collect and
		process massive amounts of
		<span class="site_blue font-bold">heterogeneous data</span>, removing the limitations of
		traditional observation methods and preparing the ground for significant progress in the
		<span class="site_blue font-bold">social sciences</span>.
	</p>

	<p class="mt-6">
		<span class="site_blue font-bold">Data sciences</span> not only contribute to advances in the
		<span class="site_blue font-bold">social sciences</span>, but the knowledge and
		<span class="site_blue font-bold">observation capacities</span> developed can be useful for
		<span class="site_blue font-bold">helping economic, political, and social actors</span> better understand
		and steer the transformations under way.
	</p>

	<h2 class="text-xl mt-6 py-3 border-t-4 border-b-4 border-blue-200">
		The Institute directly brings together around 30 scientific project leaders, who in turn
		mobilise a community of approximately 60 senior and 30 junior scientific researchers—a workforce
		that is slated to grow. They notably hold five teaching and research chairs and are in charge of
		more than ten projects financed by the European Commission or the French National Research
		Agency.
	</h2>
	<p class="mt-6">
		<span class="site_red font-bold">This research capacity in the social sciences</span>
		(economics, management, sociology, political science, and behavioural sciences) hinges on a team
		of <span class="site_blue font-bold">data science engineers</span>, a
		<span class="site_blue font-bold">computing centre</span>, and massive, secure data storage
		capacity.
	</p>
	<p class="mt-6">
		These resources form the core of a <strong>platform</strong> that promotes
		<strong>synergies</strong>
		between social, economic, and political actors who pool their know-how in order to make scientific
		advances and develop knowledge and tools
		<strong>useful for decision-making or public debate</strong>, in particular on the
		<strong>following subjects</strong>:
	</p>
	<ul class="list-disc ml-6">
		<li class="mt-3">
			<strong>threats to social and political cohesion</strong> and the tools to resolve them
		</li>
		<li class="mt-3">
			<strong>the ecologic transition</strong> and the quest for more sustainable development models
		</li>
		<li class="mt-3">
			<strong>the digital transformation</strong> and the associated organisational and governance models
		</li>
		<li class="mt-3">
			<strong>the challenges of economic efficiency</strong> and competition in a global economy.
		</li>
	</ul>
	<p class="mt-6">
		In all these areas, citizens and economic and social actors are also expressing a demand for <strong
			>a renewal of governance practices</strong
		> and a need for a redesign of the international order.
	</p>
{/if}
