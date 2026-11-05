<script lang="ts">
	import SEO from '#lib/seo/SEO.svelte';
	import StructuredData from '#lib/seo/StructuredData.svelte';
	import { pageUrl } from '#lib/seo/schema-utils.js';
	import Breadcrumb from '#lib/components/layout/Breadcrumb.svelte';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import content from '#lib/data/cluster.json';
	import { BASE_URL } from '#lib/constants.js';
	import { localizeUrl } from '#lib/utils.js';

	const copy = content[getLocale()];
	const charter = '/files/cluster/charte-acss-4h100-2h100-ab46b87a.pdf';
	const email = 'bruno.chavesferreira@dauphine.psl.eu';
	const acknowledgement =
		'This work used the computing resources of the PSL-ACSS Institute, acquired with support from the Île-de-France Region through the SESAME 2023 programme (project reference EX079187).';
</script>

<SEO title={`${copy.title} | Institut ACSS-PSL`} description={copy.description} />
<StructuredData data={{
	'@type': 'WebPage',
	name: copy.title,
	description: copy.description,
	url: pageUrl('/cluster'),
	inLanguage: getLocale(),
	isPartOf: { '@type': 'WebSite', name: 'Institut ACSS-PSL', url: BASE_URL },
	hasPart: {
		'@type': 'DigitalDocument',
		name: 'ACSS 4H100 and 2H100 Research Project Access Charter',
		url: BASE_URL + charter,
		encodingFormat: 'application/pdf',
		inLanguage: 'en'
	}
}} />
<Breadcrumb title={copy.title} title_path="Cluster" fonction={copy.subtitle} />

<div class="cluster-page">
	<section class="overview" aria-label={copy.subtitle}>
		<div class="overview-copy">
			<p class="lead">{copy.lead}</p>
			<p>{copy.overview}</p>
			<div class="actions">
				<a class="download" href={charter} download="ACSS_4H100_2H100_Project_Access_Charter.pdf">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
						<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					{copy.download}
				</a>
				<a class="contact-action" href="#contact">{copy.contactAction} <span aria-hidden="true">↗</span></a>
			</div>
			<p class="format">{copy.format}</p>
		</div>
		<aside class="resources" aria-labelledby="resources-title">
			<h2 id="resources-title">{copy.resources}</h2>
			{#each ['4H100', '2H100'] as server}
				<div class="server">
					<strong>{server}</strong>
					<span>GPU NVIDIA H100</span>
				</div>
			{/each}
			<p>{copy.allocation}</p>
		</aside>
	</section>

	<div class="conditions-contact">
		<section aria-labelledby="research-context-title">
			<h2 id="research-context-title">{copy.contextTitle}</h2>
			<p>{copy.fundingContext}</p>
		</section>
		<section class="contact" aria-labelledby="collaboration-title">
			<h2 id="collaboration-title">{copy.collaborationTitle}</h2>
			<p><strong>{copy.collaborationLead}</strong> {copy.collaborationText}</p>
			<p class="contact-name">
				<a href={localizeUrl('/equipe')} class="contact-email">{copy.collaborationLink}</a>
			</p>
		</section>
	</div>

	<section class="access" aria-labelledby="access-title">
		<div class="section-intro">
			<h2 id="access-title">{copy.accessTitle}</h2>
			<p>{copy.accessIntro}</p>
		</div>
		<ol class="steps">
			{#each copy.steps as step, index}
				<li>
					<span class="step-number" aria-hidden="true">0{index + 1}</span>
					<h3>{step.title}</h3>
					<p>{step.body}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section class="practices-link" aria-labelledby="practices-title">
		<div>
			<h2 id="practices-title">{copy.practicesTitle}</h2>
			<p>{copy.practicesText}</p>
		</div>
		<a class="download" href={localizeUrl('/cluster/bonnes-pratiques')}>{copy.practicesLink} <span aria-hidden="true">→</span></a>
	</section>

	<div class="conditions-contact">
		<section class="conditions" aria-labelledby="conditions-title">
			<h2 id="conditions-title">{copy.conditionsTitle}</h2>
			<ul>
				{#each copy.conditions as condition}
					<li>
						<h3>{condition.title}</h3>
						<p>{condition.body}</p>
					</li>
				{/each}
			</ul>
		</section>
		<section id="contact" class="contact" aria-labelledby="contact-title">
			<h2 id="contact-title">{copy.contactTitle}</h2>
			<p>{copy.contactText}</p>
			<p class="contact-name">Bruno Chaves Ferreira</p>
			<a href={`mailto:${email}`} class="contact-email">{email}</a>
		</section>
	</div>

	<section class="acknowledgement" aria-labelledby="acknowledgement-title">
		<h2 id="acknowledgement-title">{copy.acknowledgementTitle}</h2>
		<p>{copy.acknowledgementIntro}</p>
		<blockquote lang="en">{acknowledgement}</blockquote>
	</section>
</div>

<style>
	.cluster-page {
		display: grid;
		gap: clamp(2.75rem, 6vw, 4.5rem);
		color: var(--color-body);
		padding-bottom: 1rem;
	}
	p {
		margin: 0;
		line-height: 1.8;
	}
	h2,
	h3 {
		font-family: var(--font-heading);
		color: var(--color-heading);
		font-weight: 700;
	}
	h2 {
		margin: 0 0 0.85rem;
		font-size: clamp(1.35rem, 2.3vw, 1.75rem);
		line-height: 1.25;
	}
	h3 {
		margin: 0 0 0.5rem;
		font-size: 1.15rem;
		line-height: 1.4;
	}
	.overview {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;
	}
	.overview-copy > p + p {
		margin-top: 1.1rem;
	}
	.lead {
		font-size: clamp(1.1rem, 1.8vw, 1.3rem);
		color: var(--color-heading);
		line-height: 1.65;
		font-weight: 500;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem 1.5rem;
		margin-top: 1.75rem;
	}
	.download {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.7rem;
		padding: 0.95rem 1.2rem;
		border-radius: 0.65rem;
		background: var(--acss-blue-dark);
		color: #fff;
		font-size: 0.95rem;
		font-weight: 600;
		text-decoration: none;
		transition: background 150ms;
	}
	.download:hover {
		background: #15366f;
	}
	.download svg {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}
	.contact-action {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: var(--acss-red-dark);
		font-size: 0.95rem;
		font-weight: 600;
		text-underline-offset: 0.3em;
	}
	.contact-action:hover {
		text-decoration: underline;
	}
	.format {
		margin-top: 0.7rem;
		font-size: 0.78rem;
		color: var(--color-muted);
	}
	a:focus-visible {
		outline: 3px solid var(--acss-red);
		outline-offset: 4px;
	}
	.resources {
		padding: clamp(1.5rem, 3vw, 2rem);
		border-radius: 1rem;
		background: var(--acss-blue-dark);
		color: #fff;
	}
	.resources h2 {
		font-size: 0.85rem;
		color: #fff;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		margin-bottom: 1.25rem;
	}
	.server {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.3rem 1rem;
		padding: 0.8rem 0;
		border-bottom: 1px solid #ffffff40;
	}
	.server strong {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 700;
		letter-spacing: -0.04em;
		line-height: 1.1;
	}
	.server span {
		font-size: 0.75rem;
	}
	.resources p {
		margin-top: 1.25rem;
		font-size: 0.83rem;
		line-height: 1.8;
		color: #e3ebfa;
	}
	.section-intro {
		max-width: 76ch;
		margin-bottom: 1.75rem;
	}
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 2rem;
	}
	.steps li {
		border-top: 1px solid #d5deec;
		padding-top: 1.1rem;
	}
	.step-number {
		display: block;
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.7rem;
		color: var(--acss-red-dark);
		margin-bottom: 0.7rem;
	}
	.steps p,
	.conditions p,
	.contact p {
		font-size: 0.9rem;
	}
	.conditions-contact {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;
	}
	.conditions ul {
		list-style: none;
		padding: 0;
		margin: 1.5rem 0 0;
	}
	.conditions li {
		padding-left: 1.2rem;
		border-left: 2px solid #d5deec;
		margin-top: 1.4rem;
	}
	.conditions h3 {
		font-size: 1.05rem;
	}
	.contact {
		background: var(--bg-secondary);
		border-top: 3px solid var(--acss-red);
		padding: 1.75rem;
		border-radius: 0 0 1rem 1rem;
		scroll-margin-top: 8rem;
	}
	.contact h2 {
		font-size: 1.3rem;
	}
	.contact .contact-name {
		color: var(--color-heading);
		font-weight: 600;
		margin-top: 1.4rem;
		margin-bottom: 0.5rem;
	}
	.contact-email {
		color: var(--acss-blue-dark);
		font-size: 0.85rem;
		line-height: 1.8;
		overflow-wrap: anywhere;
		text-decoration: underline;
		text-underline-offset: 0.25em;
	}
	.practices-link {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.25rem 2rem;
		padding: clamp(1.4rem, 3vw, 2rem);
		border: 1px solid #d5deec;
		border-radius: 1rem;
	}
	.practices-link > div {
		max-width: 62ch;
	}
	.practices-link p {
		font-size: 0.92rem;
	}
	.acknowledgement {
		padding-top: 2rem;
		border-top: 1px solid #d5deec;
	}
	.acknowledgement > p {
		font-size: 0.9rem;
	}
	blockquote {
		margin: 1.25rem 0 0;
		padding: 1.35rem 1.5rem;
		border-left: 3px solid var(--acss-red);
		background: var(--bg-secondary);
		color: var(--acss-blue-dark);
		font-size: 0.95rem;
		font-weight: 500;
		line-height: 1.9;
	}
	@media (max-width: 820px) {
		.overview,
		.conditions-contact {
			grid-template-columns: minmax(0, 1fr);
		}
		.resources {
			max-width: 100%;
		}
		.steps {
			grid-template-columns: minmax(0, 1fr);
			gap: 1.4rem;
		}
		.steps li {
			display: grid;
			grid-template-columns: 2.5rem minmax(0, 1fr);
			column-gap: 0.75rem;
		}
		.step-number {
			grid-row: span 2;
			font-size: 1.5rem;
		}
		.steps h3 {
			margin-top: 0.1rem;
		}
		.contact {
			padding: 1.4rem;
		}
		blockquote {
			padding: 1.2rem;
		}
	}
</style>
