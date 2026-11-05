<script lang="ts">
	import SEO from '#lib/seo/SEO.svelte';
	import StructuredData from '#lib/seo/StructuredData.svelte';
	import { pageUrl } from '#lib/seo/schema-utils.js';
	import Breadcrumb from '#lib/components/layout/Breadcrumb.svelte';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { formatDate } from '#lib/helpers/locale.js';
	import { localizeUrl } from '#lib/utils.js';
	import content from '#lib/data/good-practices.json';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const locale = getLocale();
	const copy = content[locale];
	const base = '/cluster/bonnes-pratiques';
	const page = $derived(data.page);
	const html = $derived(page.html);
	const colon = locale === 'fr' ? ' :' : ':';

	// Adds a copy button to each highlighted code block (progressive enhancement).
	function copyButtons(node: HTMLElement) {
		const buttons: HTMLButtonElement[] = [];
		for (const block of node.querySelectorAll<HTMLElement>('.doc-code')) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'doc-copy';
			button.textContent = copy.copy;
			button.addEventListener('click', async () => {
				try {
					await navigator.clipboard.writeText(block.querySelector('pre')?.innerText || '');
					button.textContent = copy.copied;
				} catch {
					button.textContent = copy.copyFailed;
				}
				setTimeout(() => (button.textContent = copy.copy), 1800);
			});
			block.append(button);
			buttons.push(button);
		}
		return () => buttons.forEach((button) => button.remove());
	}
</script>

<SEO
	title={`${page.title} — ${copy.short} | Institut ACSS-PSL`}
	description={page.description || copy.description}
	type="article"
	modifiedTime={data.updated}
/>
<StructuredData
	data={{
		'@type': 'TechArticle',
		headline: page.title,
		description: page.description,
		url: pageUrl(`${base}/${page.slug}`),
		inLanguage: 'en',
		dateModified: data.updated,
		isPartOf: { '@type': 'CollectionPage', name: copy.title, url: pageUrl(base) },
		publisher: { '@type': 'Organization', name: 'Institut ACSS-PSL' }
	}}
/>
<Breadcrumb title={page.title} title_path={page.title} trail={[{ link: 'cluster', link_text: 'Cluster' }, { link: 'cluster/bonnes-pratiques', link_text: copy.short }]} fonction={page.description || undefined} />

<div class="practice">
	<aside class="notice" aria-label={copy.noticeTitle}>
		<strong>{copy.noticeTitle}</strong>
		<p>{copy.members}</p>
	</aside>

	<div class="layout">
		{#if page.toc.length > 2}
			<nav class="toc" aria-labelledby="toc-title">
				<p id="toc-title">{copy.onThisPage}</p>
				<ul lang="en">
					{#each page.toc as item (item.id)}
						<li class:sub={item.level === 3}><a href={`#${item.id}`}>{item.text}</a></li>
					{/each}
				</ul>
			</nav>
		{/if}

		<article class="doc-body" lang="en">
			{#key html}<div {@attach copyButtons}>{@html html}</div>{/key}
		</article>
	</div>

	<nav class="pager" aria-label={copy.back}>
		{#if data.previous}
			<a class="previous" href={localizeUrl(`${base}/${data.previous.slug}`)}>
				<span>← {copy.previous}</span><strong lang="en">{data.previous.title}</strong>
			</a>
		{:else}<span></span>{/if}
		{#if data.next}
			<a class="next" href={localizeUrl(`${base}/${data.next.slug}`)}>
				<span>{copy.next} →</span><strong lang="en">{data.next.title}</strong>
			</a>
		{/if}
	</nav>

	<footer class="credits">
		<p>{copy.credits}</p>
		<p class="meta">
			{copy.updated}{colon} {formatDate(data.updated)} · <a href={localizeUrl(base)}>{copy.back}</a>
		</p>
	</footer>
</div>

<style>
	.practice {
		display: grid;
		gap: clamp(1.75rem, 4vw, 2.75rem);
		color: var(--color-body);
	}
	p {
		margin: 0;
	}
	.notice {
		max-width: 80ch;
		padding: 1rem 1.2rem;
		border-left: 3px solid var(--acss-red);
		background: var(--bg-secondary);
		border-radius: 0 0.7rem 0.7rem 0;
		font-size: 0.88rem;
		line-height: 1.7;
	}
	.notice strong {
		display: block;
		margin-bottom: 0.25rem;
		color: var(--color-heading);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
		gap: clamp(1.5rem, 4vw, 3.5rem);
		align-items: start;
	}
	.layout:has(> :only-child) {
		grid-template-columns: minmax(0, 1fr);
	}
	.toc {
		position: sticky;
		top: 7rem;
		max-height: calc(100vh - 8rem);
		overflow: auto;
		font-size: 0.82rem;
	}
	.toc p {
		margin-bottom: 0.6rem;
		font-weight: 700;
		color: var(--color-heading);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.toc ul {
		list-style: none;
		margin: 0;
		padding: 0 0 0 0.8rem;
		border-left: 1px solid #d5deec;
	}
	.toc li {
		padding: 0.22rem 0;
		line-height: 1.45;
	}
	.toc li.sub {
		padding-left: 0.85rem;
		font-size: 0.78rem;
	}
	.toc a {
		color: var(--color-body);
		text-decoration: none;
	}
	.toc a:hover {
		color: var(--acss-blue-dark);
		text-decoration: underline;
	}

	/* Rendered Markdown, produced and sanitised by the extranet. */
	.doc-body {
		min-width: 0;
		max-width: 80ch;
		font-size: 0.98rem;
		line-height: 1.8;
		overflow-wrap: anywhere;
	}
	.doc-body :global(h2),
	.doc-body :global(h3),
	.doc-body :global(h4) {
		position: relative;
		font-family: var(--font-heading);
		color: var(--color-heading);
		font-weight: 700;
		scroll-margin-top: 7rem;
	}
	.doc-body :global(h2) {
		margin: 2.6rem 0 0.9rem;
		font-size: clamp(1.3rem, 2.2vw, 1.6rem);
		line-height: 1.3;
	}
	.doc-body :global(h3) {
		margin: 2rem 0 0.6rem;
		font-size: 1.15rem;
	}
	.doc-body :global(h4) {
		margin: 1.5rem 0 0.5rem;
		font-size: 1rem;
	}
	.doc-body :global(> div > h2:first-child) {
		margin-top: 0;
	}
	.doc-body :global(.doc-anchor) {
		margin-left: 0.5rem;
		color: #b9c4d6;
		text-decoration: none;
		font-weight: 400;
		opacity: 0;
	}
	.doc-body :global(:is(h2, h3, h4):hover .doc-anchor),
	.doc-body :global(.doc-anchor:focus-visible) {
		opacity: 1;
	}
	.doc-body :global(p),
	.doc-body :global(ul),
	.doc-body :global(ol) {
		margin: 0.85rem 0;
	}
	.doc-body :global(ul),
	.doc-body :global(ol) {
		padding-left: 1.4rem;
	}
	.doc-body :global(ul) {
		list-style: disc;
	}
	.doc-body :global(ol) {
		list-style: decimal;
	}
	.doc-body :global(li + li) {
		margin-top: 0.3rem;
	}
	.doc-body :global(a:not(.doc-anchor)) {
		color: var(--acss-blue-dark);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.2em;
	}
	.doc-body :global(strong) {
		color: var(--color-heading);
	}
	.doc-body :global(hr) {
		border: 0;
		border-top: 1px solid #d5deec;
		margin: 2.2rem 0;
	}
	.doc-body :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		border: 1px solid #d5deec;
	}
	.doc-body :global(:not(pre) > code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.86em;
		background: #f1f4f9;
		border: 1px solid #e3e8f0;
		border-radius: 0.3rem;
		padding: 0.05rem 0.3rem;
	}
	.doc-body :global(kbd) {
		font-family: ui-monospace, Menlo, monospace;
		font-size: 0.82em;
		border: 1px solid #cfd8e6;
		border-bottom-width: 2px;
		border-radius: 0.3rem;
		padding: 0.05rem 0.3rem;
		background: #fff;
	}
	.doc-body :global(blockquote) {
		margin: 1.3rem 0;
		padding: 0.7rem 1.1rem;
		border-left: 3px solid #6f8fbe;
		background: #edf3fb;
		border-radius: 0 0.5rem 0.5rem 0;
		color: #38527b;
	}
	.doc-body :global(blockquote p) {
		margin: 0.4rem 0;
	}
	.doc-body :global(.doc-alert-title) {
		margin: 0.15rem 0 0.2rem !important;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.doc-body :global(.doc-alert-tip) {
		border-color: #39856c;
		background: #edf6f2;
		color: #26634f;
	}
	.doc-body :global(.doc-alert-important) {
		border-color: #6b4fbb;
		background: #f3f0fb;
		color: #4a3590;
	}
	.doc-body :global(.doc-alert-warning) {
		border-color: #b7791f;
		background: #fdf6e9;
		color: #7a4f12;
	}
	.doc-body :global(.doc-alert-caution) {
		border-color: #b6467c;
		background: #fcf0f3;
		color: #8c2751;
	}
	.doc-body :global(.doc-code) {
		position: relative;
		margin: 1.3rem 0;
		border: 1px solid #e3e8f0;
		border-radius: 0.55rem;
		background: #f8fafc;
	}
	.doc-body :global(.doc-code pre) {
		margin: 0;
		padding: 1rem 1.1rem;
		overflow: auto;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.8rem;
		line-height: 1.65;
		background: transparent !important;
		overflow-wrap: normal;
	}
	.doc-body :global(.doc-code-lang) {
		position: absolute;
		top: 0;
		left: 0.9rem;
		transform: translateY(-50%);
		background: #fff;
		border: 1px solid #e3e8f0;
		border-radius: 0.25rem;
		padding: 0 0.4rem;
		font-size: 0.58rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted);
		line-height: 1.7;
	}
	.doc-body :global(.doc-copy) {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		border: 1px solid #d6dfec;
		background: #fff;
		border-radius: 0.3rem;
		padding: 0.15rem 0.55rem;
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--acss-blue-dark);
		opacity: 0;
		transition: opacity 150ms;
		cursor: pointer;
	}
	.doc-body :global(.doc-code:hover .doc-copy),
	.doc-body :global(.doc-copy:focus-visible) {
		opacity: 1;
	}
	.doc-body :global(.doc-table) {
		margin: 1.3rem 0;
		overflow-x: auto;
		border: 1px solid #d5deec;
		border-radius: 0.55rem;
	}
	.doc-body :global(.doc-table table) {
		border-collapse: collapse;
		width: 100%;
		font-size: 0.85rem;
		overflow-wrap: normal;
	}
	.doc-body :global(.doc-table th),
	.doc-body :global(.doc-table td) {
		padding: 0.55rem 0.8rem;
		border-bottom: 1px solid #e3e8f0;
		text-align: left;
		vertical-align: top;
		line-height: 1.6;
	}
	.doc-body :global(.doc-table th) {
		background: #f5f8fc;
		font-weight: 700;
		color: var(--color-heading);
	}
	.doc-body :global(.doc-table tr:last-child td) {
		border-bottom: 0;
	}
	.doc-body :global(.doc-table [align='center']) {
		text-align: center;
	}
	.doc-body :global(.doc-table [align='right']) {
		text-align: right;
	}

	.pager {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid #d5deec;
	}
	.pager a {
		display: grid;
		gap: 0.25rem;
		padding: 1rem 1.2rem;
		border: 1px solid #d5deec;
		border-radius: 0.8rem;
		text-decoration: none;
		color: inherit;
	}
	.pager a:hover {
		border-color: var(--acss-blue);
	}
	.pager .next {
		text-align: right;
		grid-column: 2;
	}
	.pager span {
		font-size: 0.78rem;
		color: var(--color-muted);
	}
	.pager strong {
		font-family: var(--font-heading);
		color: var(--color-heading);
	}
	.credits {
		font-size: 0.85rem;
		line-height: 1.75;
	}
	.meta {
		margin-top: 0.5rem;
		color: var(--color-muted);
	}
	.meta a {
		color: var(--acss-blue-dark);
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	@media (max-width: 900px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
		}
		.toc {
			position: static;
			max-height: none;
			padding: 1rem 1.1rem;
			border: 1px solid #d5deec;
			border-radius: 0.7rem;
		}
	}
	@media (max-width: 600px) {
		.pager {
			grid-template-columns: minmax(0, 1fr);
		}
		.pager .next {
			grid-column: 1;
		}
		.doc-body :global(.doc-copy) {
			opacity: 1;
		}
	}
</style>
