<script lang="ts">
	import SEO from '$lib/seo/SEO.svelte';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
</script>

<SEO title="Institut ACSS-PSL : {m.recruitments()}" description={m.seo_recruitments_description()} />

<Breadcrumb title={m.recruitments()} title_path={m.recruitments()} />

<div class="editorial-page job-offer">
	{#if getLocale() == 'fr'}
		<p class="mt-0">
			<strong
				>L’Université PSL recrute 1 ingénieur(e) de recherche en science des données pour les
				sciences sociales</strong
			>
		</p>

		<p class="mt-4">
			<a href="/files/Ingenieur_IR_ACCS_2024_2_fr.pdf">Version imprimable (pdf)</a> ·
			<a href="/en/candidate">English version</a>
		</p>

		<p class="mt-6">
			Dans le cadre du développement de l’Institut ACSS, l’Université PSL recrute une/un
			ingénieur(e) de recherche (IR) en science des données. Elle/il sera chargé(e) de mettre en
			œuvre des méthodes et outils de collecte et traitement de données issues de sources variées
			(Web, bases de données institutionnelles, archives, etc.). Elle/il aura également la
			responsabilité de veiller au respect des bonnes pratiques en matière de développement et de
			gestion du code et des données. Enfin, elle/il contribuera au développement de modèles
			statistiques ou d’apprentissage automatique (notamment dans le domaine du traitement
			automatisé de la langue naturelle).
		</p>
		<p class="mt-6">
			Créé au sein de l’Université Paris Sciences et Lettres (PSL) et hébergé à Paris Dauphine,
			l’Institut « Applied Computational Social Sciences » a pour vocation de renforcer la recherche
			sur les grandes problématiques sociétales (cohésion politique et sociale, transition
			écologique, transformation numérique, efficacité et compétitivité économique) en articulant
			sciences des données et sciences sociales.
		</p>
		<p class="mt-6">
			L’Institut collecte et traite à large échelle des données hétérogènes tant pour permettre des
			avancées scientifiques que pour contribuer à éclairer le débat public et la décision. Il
			réunit une équipe pluridisciplinaire de chercheurs et s’appuie sur une équipe d’ingénieurs qui
			apportent leurs expertises pour constituer des bases de données originales et opérer des
			traitements complexes. Ces projets sont initiés et portés par des laboratoires du CNRS, de
			Dauphine, de l’ENS, de l’INSP, et des MinesParis-Tech. Les résultats des travaux ont vocation
			à être largement diffusés auprès de partenaires institutionnels et du monde économique.
		</p>

		<h2>Procédure de candidature</h2>
		<p class="mt-4">
			La candidature devra inclure un CV, une lettre de motivation et le relevé des derniers
			diplômes. L’examen des candidatures commencera le 2 novembre 2024 et se poursuivra jusqu’à ce
			que les postes soient pourvus. Prise de fonctions le 1er janvier (ou février) 2025.
		</p>
		<p class="mt-4">
			Contact : Bruno Chaves Ferreira
			<a href="mailto:bruno.chavesferreira@dauphine.psl.eu?subject=ACSS%20-%20candidature"
				>bruno.chavesferreira@dauphine.psl.eu</a
			>
		</p>

		<h2>Formation et compétences requises</h2>
		<h3>Compétences nécessaires</h3>
		<ul class="ml-6 list-disc">
			<li>
				Expérience dans le développement de réseaux de neurones profonds et autres modèles
				statistiques avancés appliqués au traitement automatisé du langage sur de larges corpus.
			</li>
			<li>Maîtrise des écosystèmes Python et/ou R dédiés à la science des données.</li>
			<li>
				Plus spécifiquement en Python, maîtrise de numpy, pandas, pytorch et l’environnement
				Hugging Face.
			</li>
			<li>
				En R, maîtrise du tidyverse, de tidymodels et des bibliothèques associées, ainsi que de
				torch.
			</li>
			<li>Maîtrise des bases de données relationnelles et NoSQL.</li>
			<li>Compréhension des méthodes scientifiques des sciences humaines et sociales.</li>
		</ul>

		<h3>Compétences additionnelles souhaitées</h3>
		<ul class="ml-6 list-disc">
			<li>
				Expérience dans le réglage des hyperparamètres pour les grands modèles de langage (LLM) afin
				d’améliorer les performances et l’efficacité.
			</li>
			<li>
				Familiarité avec le « fine-tuning » de modèles basés sur des architectures de type
				« Transformers ».
			</li>
			<li>
				Connaissance des techniques d’entraînement distribué et de l’exploitation des GPU dans un
				cluster.
			</li>
			<li>Pratique des services web modernes (architecture REST, formats JSON, XML, etc.).</li>
			<li>
				Méthodologies de développement : contrôle de version (Git), tests unitaires, intégration
				continue, etc.
			</li>
		</ul>

		<h2>Formation</h2>
		<p class="mt-4">
			Titulaire d’un master informatique, maths-info ou d’un diplôme d’école d’ingénieur.
		</p>

		<h2>Divers</h2>
		<ul class="ml-6 list-disc">
			<li>Peut convenir à un premier poste.</li>
			<li>Il s’agit d’une création de poste sur CDD pour une durée de 1 an renouvelable.</li>
			<li>Rémunération suivant profil et expérience en fonction des grilles CNRS.</li>
			<li>Le poste est basé à l’université Paris Dauphine.</li>
		</ul>
	{:else}
		<p class="mt-0">
			<strong
				>PSL University is hiring 1 senior data scientist (research engineer) for social
				sciences</strong
			>
		</p>

		<p class="mt-4">
			<a href="/files/Ingenieur_IR_ACCS_2024_2_en.pdf">Printer friendly version (pdf)</a> ·
			<a href="/fr/candidate">Version française</a>
		</p>

		<p class="mt-6">
			In the context of the development of the ACSS institute, PSL University is hiring one senior
			data scientist. She/he will be responsible for implementing strategies, tools and methods for
			producing and analyzing data from various sources (Web, institutional databases, archives,
			etc.). She/he will also be responsible for ensuring compliance with best practices in matter
			of code and data management. Finally, she/he will contribute to the development of
			statistical analysis or machine learning algorithms (particularly in the field of natural
			language processing).
		</p>
		<p class="mt-6">
			Created by the University Paris Sciences and Letters (PSL) and hosted by Paris-Dauphine, the
			«Applied Computational Social Sciences» Institute aims to strengthen research on major
			societal issues (political and social cohesion, ecological transition, digital
			transformation, economic efficiency and competitiveness) by linking data sciences and social
			sciences.
		</p>
		<p class="mt-6">
			The Institute collects and processes heterogeneous data on a large scale both to enable
			scientific advances and to help inform public dialog and decision-making.
		</p>
		<p class="mt-6">
			It brings together a multidisciplinary team of researchers and relies on a team of engineers
			in data science who bring their expertise to build original databases and perform
			sophisticated analysis. These projects are initiated and supported by research units
			affiliated to the French National Institute for Research (CNRS) and a group of outstanding
			research universities. The outcomes of the Institute activities are also featured to reach
			policymaking and business audiences.
		</p>

		<h2>Application</h2>
		<p class="mt-4">
			Applications should include a CV, a cover letter, and a transcript of concluded university
			degrees. Review of applications will begin November 2nd, 2024 and continue until the
			positions are closed. Starting date: January (or February) 1st, 2025.
		</p>
		<p class="mt-4">
			Contact: Bruno Chaves Ferreira
			<a href="mailto:bruno.chavesferreira@dauphine.psl.eu?subject=ACSS%20-%20candidate"
				>bruno.chavesferreira@dauphine.psl.eu</a
			>
		</p>

		<h2>Required Training and Skills</h2>
		<h3>Requested Skills</h3>
		<ul class="ml-6 list-disc">
			<li>
				Hands-on experience in developing deep neural networks and other advanced statistical models
				applied to automated language processing on large corpora.
			</li>
			<li>Mastery of Python and R ecosystems dedicated to data science.</li>
			<li>
				More specifically in Python, mastery of numpy, pandas, pytorch and the Hugging Face
				framework.
			</li>
			<li>In R, proficiency in tidyverse, tidymodels and associated libraries, and torch.</li>
			<li>Proficiency in relational databases.</li>
			<li>Understanding of scientific methods in the humanities and social sciences.</li>
		</ul>

		<h3>Additional Skills</h3>
		<ul class="ml-6 list-disc">
			<li>
				Experienced in tuning hyperparameters for large language models (LLMs) to improve
				performance and efficiency.
			</li>
			<li>Familiar with fine-tuning models such as BERT, GPT, and Transformer-based architectures.</li>
			<li>Knowledgeable in distributed training techniques and leveraging GPUs in a cluster.</li>
			<li>Practice of modern web services (REST architecture, JSON formats, XML, etc.).</li>
			<li>Development methodologies: unit tests, version control (Git), continuous integration, etc.</li>
		</ul>

		<h2>Education</h2>
		<p class="mt-4">
			Master’s degree in computer science, math-data science, or an engineering school degree.
		</p>

		<h2>Miscellaneous</h2>
		<ul class="ml-6 list-disc">
			<li>May be suitable for a first position.</li>
			<li>This is a new position on a fixed-term contract for a period of 1 year, renewable.</li>
			<li>Remuneration according to profile and experience (in accordance with the CNRS’s guidelines).</li>
			<li>The position is based at the University of Paris Dauphine.</li>
		</ul>
	{/if}
</div>

<style>
	.job-offer h2 {
		margin-top: 2.5rem;
		font-size: 1.35rem;
		font-weight: 600;
	}

	.job-offer h3 {
		margin-top: 1.5rem;
		font-weight: 600;
		font-style: italic;
		color: var(--color-heading);
	}

	.job-offer li {
		margin-top: 0.5rem;
	}

	.job-offer a {
		font-weight: 600;
		color: var(--acss-blue-dark);
	}

	.job-offer a:hover {
		text-decoration: underline;
	}
</style>
