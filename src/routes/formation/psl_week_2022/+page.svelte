<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { localizeUrl } from '$lib/utils';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
</script>

<svelte:head>
	<title
		>Institut PSL-ACSS : Applied Computational Social Sciences - Data-Intensive Governance - PSL
		Institute</title
	>
	<meta
		name="description"
		content="Une expertise de recherche en sciences sociales articulée avec des capacités en sciences des données pour renforcer
	la pertinence de la recherche académique sur les grandes problématiques sociétales"
	/>
</svelte:head>

<Breadcrumb
	title="PSL Week : NLP for Social Sciences"
	title_path="PSL Week 2022"
	link="formation"
	link_text={m.training()}
/>

<img
	src="/images/psl_week/image_nlp.jpg"
	alt="PSL Week : NLP for Social Sciences"
	loading="eager"
	decoding="async"
/>

<p>
	The aim of the course is to provide theoretical and practical training in modern NLP methods for
	research in the social sciences (Economics, Management, Sociology, etc.). It is intended for
	students in the process of completing their thesis or for master's students who are considering
	pursuing a doctorate and adopting these rapidly developing methods.&nbsp;
</p>
<h1>Dates &amp; place:</h1>
<p>21/25 November - 9h-12h : 14h-17h&nbsp;</p>
<p>24 rue Saint-Georges 75009 Paris</p>
<p>Room I101 (Amphi Pierre Miquel) - from Monday to Thursday and room I102 on Friday</p>
<p>contact : christophe.benavent@dauphine.psl.eu</p>
<h1>Public:</h1>
<p>
	This course is primarily intended for master students at <a href="https://psl.eu/" target="_blank"
		>PSL University</a
	>, but also for PhD students. Places are available for PhD students or colleagues from other
	universities (limited number, Prerequisite : Prior training in r and/or python is required.)
</p>

<h1>Syllabus:</h1>
<ul>
	<li>Session 1 : Tokenize and annotate</li>
	<li>Session 2 : Semantic spaces</li>
	<li>Session 3 : Topic modeling</li>
	<li>Session 4 : Embeddings</li>
	<li>Session 5 : ML for text</li>
	<li>Session 6 : introduction to Transformers</li>
	<li>
		Session 7, 8, 9 : hackathon with an <a
			href="https://www.plus.transformation.gouv.fr/experiences">Administration user experiences</a
		> data set.
	</li>
	<li>Session 10 : students presentations</li>
</ul>
<p>
	The lecture will be delivery principally in r, but the parallel procedure with python will be also
	studied. All materials (script, data and references) will be available at&nbsp;
</p>
<p>
	<a href="https://github.com/BenaventC/NLP_lecture_PSLWeek"
		>https://github.com/BenaventC/NLP_lecture_PSLWeek</a
	>
</p>
<p>r and Rstudio (with tidyverse) has to be installed before.</p>
<h1>Team:</h1>
<p>
	<a href={localizeUrl('/membres/christophe-benavent')}>Christophe Benavent</a>,
	<a href={localizeUrl('/equipe/bruno-chaves-ferreira')}>Bruno Chaves Ferreira</a>,
	<strong>José Carlos Romero Moreno</strong>
	and <strong>Olivier Caron</strong> from the Acss Institute.
</p>

<style>
	h1 {
		@apply mt-6 font-semibold;
	}

	h1 ~ p,
	h1 ~ ul {
		@apply ml-6;
	}
	p,
	ul {
		@apply mt-2;
	}
	img {
		@apply float-right ml-6 hidden rounded-xl border border-gray-200 bg-white shadow lg:block;
	}
</style>
