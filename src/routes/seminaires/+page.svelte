<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { localizeUrl } from '$lib/utils';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
</script>

<svelte:head>
	<title>Institut PSL-ACSS : {m.seminars()}</title>
</svelte:head>

<Breadcrumb title={m.seminars()} title_path={m.seminars()} />

<div class="seminars">
	<h2>Seminar</h2>
	<div class="seminar">
		<h3><a href={localizeUrl('/seminaires/acss')}>ACSS-PSL Institute Research Seminar</a></h3>
		<p>
			This seminar will provide an opportunity to discuss about the activities of the institute and
			will be organized in 3 sessions throughout the 2025-2026 academic year. Its purpose is
			twofold:
		</p>
		<ul>
			<li>
				To invite external speakers to present original research in terms of data and/or methods
				that could enrich the Institute's research and/or initiate new research projects
			</li>
			<li>To exchange on the Institute's ongoing or upcoming projects and research.</li>
		</ul>
	</div>

	<h2>Workshops</h2>

	<div class="seminar">
		<h3>
			<a href={localizeUrl('/seminaires/public-governance')}>Public Governance workshop</a>
			<span>- on Mondays from 17h30 to 19h</span>
		</h3>

		<p>
			The Public Governance workshop focuses on the role of governance in designing and developing
			better policies. Key features are the political environment, the role of the media, the
			engagement of stakeholders such as civil society and firms, the market structure and level of
			competition, and the independence of public regulators, among others. Particular emphasis is
			placed on research with NLP methods due to the proven usefulness of transforming text into
			data for further econometric analysis.
		</p>
	</div>

	<div class="seminar">
		<h3>
			<a href={localizeUrl('/seminaires/nlp')}>AI & NLP (Natural Language Processing) workshop</a>
			<span>- on Thursdays from 12h15 to 13h30</span>
		</h3>
		<p>
			The aim of this workshop is to promote technical and practical exchanges between researchers
			who use NLP methods. There is no hesitation in detailing the code (r/python), sharing tips,
			and discovering new methods and models.
		</p>
	</div>
</div>

<style>
	span {
		@apply text-sm font-normal italic;
	}

	h2 {
		@apply mt-6 text-lg font-semibold;
	}
	h3 {
		@apply mt-3 text-base font-semibold;
	}

	ul {
		@apply ml-5 list-decimal;
	}

	p,
	ul li {
		@apply mt-2;
	}

	.seminar {
		@apply border-l-4 pl-3 text-sm;
	}
</style>
