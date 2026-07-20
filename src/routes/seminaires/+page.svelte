<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Link from '$lib/components/Link.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
</script>

<svelte:head>
	<title>Institut PSL-ACSS : {m.seminars()}</title>
</svelte:head>

<Breadcrumb title={m.seminars()} title_path={m.seminars()} />

<div class="seminars">
	<h2>Seminar</h2>
	<div class="seminar">
		<h3><Link href="/seminaires/acss">ACSS-PSL Institute Research Seminar</Link></h3>
		<p>
			This seminar provides an opportunity to discuss about the activities of the institute and
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
			<Link href="/seminaires/public-governance">Public Governance workshop</Link>
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
			<Link href="/seminaires/nlp">AI & NLP (Natural Language Processing) workshop</Link>
			<span>- on Thursdays from 12h15 to 13h30</span>
		</h3>
		<p>
			The aim of this workshop is to promote technical and practical exchanges between researchers
			who use NLP methods. There is no hesitation in detailing the code (r/python), sharing tips,
			and discovering new methods and models.
		</p>
	</div>

	<div class="seminar">
		<h3>
			<Link href="/seminaires/digital-regulation">Digital Regulation</Link>
			<span>- online seminar series</span>
		</h3>
		<p>
			The Digital Regulation workshop is an online seminar series focused on digital activities and their regulation.
			This working group is developing a joint approach in order to establish a reasoned position on digital regulation
			in the context of current European (and American) initiatives.
		</p>
	</div>

	<div class="seminar">
		<h3>
			<Link href="/seminaires/trence">Transport, Energy and Climate Economics (TrEnCE)</Link>
			<span>- online seminar series</span>
		</h3>
		<p>
			The Transport, Energy and Climate Economics workshop is an online seminar series in the fields of transport,
			energy and environmental economics. The group provides a forum for exchange between researchers in these
			closely related sub-fields.
		</p>
	</div>
</div>

<style lang="postcss">
	.seminars {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 25rem), 1fr));
		gap: 1rem;
	}

	.seminars > h2 {
		grid-column: 1 / -1;
		margin-top: clamp(1rem, 4vw, 2.5rem);
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 700;
		color: var(--color-heading);
	}

	.seminar {
		padding: clamp(1.25rem, 3vw, 2rem);
		border: 1px solid rgba(74, 108, 170, 0.12);
		border-radius: var(--radius-md);
		background: white;
	}

	.seminar h3 {
		margin-bottom: 1rem;
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 700;
		line-height: 1.45;
	}

	.seminar h3 span {
		display: block;
		margin-top: 0.35rem;
		font-family: var(--font-body);
		font-size: 0.8rem;
		font-weight: 500;
		font-style: normal;
		color: var(--color-muted);
	}

	.seminar p,
	.seminar ul {
		font-size: 0.9rem;
		line-height: 1.7;
		color: var(--color-body);
	}

	.seminar ul {
		margin-top: 1rem;
		margin-left: 1.25rem;
		list-style: disc;
	}

	.seminar li + li {
		margin-top: 0.5rem;
	}
</style>
