<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
	import { localizeUrl } from '#lib/utils.js';
	import { EXTRANET_URL } from '#lib/constants.js';
	import { LinkedinSolid } from 'flowbite-svelte-icons';
</script>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-container">
			<!-- Partners Section -->
			<div class="partners-section">
				<h3 class="partners-title">{m.partners()}</h3>

				<div class="partners-grid">
					<a href="https://www.cnrs.fr/" class="partner-link" target="_blank" rel="noopener noreferrer">
						<img
							class="partner-logo"
							src="/images/logos_autres/cnrs.png"
							alt="CNRS - Centre National de la Recherche Scientifique"
							loading="lazy"
							decoding="async" width="89" height="89"
						/>
					</a>
					<a href="https://dauphine.psl.eu/" class="partner-link" target="_blank" rel="noopener noreferrer">
						<img
							class="partner-logo"
							src="/images/logos_autres/logo_bleu_dauphine.png"
							alt="Université Paris Dauphine-PSL"
							loading="lazy"
							decoding="async" width="1001" height="143"
						/>
					</a>
					<a href="https://insp.gouv.fr/" class="partner-link" target="_blank" rel="noopener noreferrer">
						<img
							class="partner-logo"
							src="/images/logos_autres/Logo_INSP.png"
							alt="INSP - Institut National du Service Public"
							loading="lazy"
							decoding="async" width="150" height="93"
						/>
					</a>
					<a href="https://www.minesparis.psl.eu/" class="partner-link" target="_blank" rel="noopener noreferrer">
						<img
							class="partner-logo"
							src="/images/logos_autres/mines.png"
							alt="Mines Paris - PSL"
							loading="lazy"
							decoding="async" width="131" height="98"
						/>
					</a>
					<a href="https://institutnicod.ens.psl.eu/" class="partner-link" target="_blank" rel="noopener noreferrer">
						<img
							class="partner-logo"
							src="/images/logos_autres/nicod.png"
							alt="Institut Jean Nicod"
							loading="lazy"
							decoding="async" width="150" height="150"
						/>
					</a>
				</div>
			</div>

			<!-- Bottom Bar -->
			<div class="footer-bottom">
				<p class="copyright">
					{m.copyright({ year: new Date().getFullYear() })}
					<br />
					{m.site_made_by()}
				</p>
				<div class="footer-links">
					<a href={EXTRANET_URL} class="footer-link">Extranet</a>
					<a
						href="https://www.linkedin.com/company/acss-psl"
						class="footer-link social-link"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LinkedinSolid class="footer-social-icon" />
						<span>LinkedIn</span>
					</a>
					<a href={localizeUrl('/lettre-d-information')} class="footer-link">
						{m.subscribe_letter()}
					</a>
					<a href="mailto:bruno.chavesferreira@dauphine.psl.eu" class="footer-link contact">
						Contact
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		margin-top: clamp(2rem, 4vw, 3rem);
		background: var(--bg-secondary, #f8fafc);
		border-top: 1px solid rgba(74, 108, 170, 0.14);
	}

	.footer-content {
		padding: 1.75rem 0 1rem;
	}

	.footer-container {
		max-width: var(--content-max, 1280px);
		margin-inline: auto;
		padding-inline: clamp(1rem, 3vw, 2rem);
	}

	.partners-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-bottom: 1.5rem;
	}

	.partners-title {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-muted, #64748b);
	}

	.partners-grid {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem clamp(1rem, 3vw, 2.5rem);
	}

	.partner-link {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 3.25rem;
		padding: 0.25rem;
		opacity: 0.85;
		transition: opacity 150ms ease;
	}

	.partner-link:hover {
		opacity: 1;
	}

	.partner-logo {
		width: auto;
		height: 2.75rem;
		max-width: 10rem;
		object-fit: contain;
		filter: none;
		opacity: 1;
	}

	.footer-bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 2rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(74, 108, 170, 0.12);
	}

	.copyright {
		color: var(--color-muted, #64748b);
		font-size: 0.75rem;
		line-height: 1.8;
	}

	.footer-links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 1.25rem;
	}

	.footer-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-height: 2rem;
		color: var(--color-muted, #64748b);
		font-size: 0.75rem;
		font-weight: 500;
		text-decoration: none;
	}

	.footer-link:hover {
		color: var(--acss-blue-dark, #1d4796);
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.footer-link :global(.footer-social-icon) {
		width: 0.875rem;
		height: 0.875rem;
	}

	@media (min-width: 768px) {
		.partners-section {
			flex-direction: row;
			align-items: center;
			gap: 2.5rem;
		}

		.partners-grid {
			flex: 1;
			justify-content: space-between;
		}
	}

	@media (max-width: 767px) {
		.footer-link {
			min-height: 2.75rem;
		}
	}
</style>
