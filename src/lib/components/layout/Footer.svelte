<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { localizeUrl } from '$lib/utils';
</script>

<footer class="footer">
	<!-- Top gradient accent line -->
	<div class="footer-accent"></div>

	<div class="footer-content">
		<div class="container px-4 mx-auto">
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
							decoding="async"
						/>
					</a>
					<a href="https://dauphine.psl.eu/" class="partner-link" target="_blank" rel="noopener noreferrer">
						<img
							class="partner-logo"
							src="/images/logos_autres/logo_bleu_dauphine.png"
							alt="Université Paris Dauphine-PSL"
							loading="lazy"
							decoding="async"
						/>
					</a>
					<a href="https://insp.gouv.fr/" class="partner-link" target="_blank" rel="noopener noreferrer">
						<img
							class="partner-logo"
							src="/images/logos_autres/Logo_INSP.png"
							alt="INSP - Institut National du Service Public"
							loading="lazy"
							decoding="async"
						/>
					</a>
					<a href="https://www.minesparis.psl.eu/" class="partner-link" target="_blank" rel="noopener noreferrer">
						<img
							class="partner-logo"
							src="/images/logos_autres/mines.png"
							alt="Mines Paris - PSL"
							loading="lazy"
							decoding="async"
						/>
					</a>
					<a href="http://www.institutnicod.org/" class="partner-link" target="_blank" rel="noopener noreferrer">
						<img
							class="partner-logo"
							src="/images/logos_autres/nicod.png"
							alt="Institut Jean Nicod"
							loading="lazy"
							decoding="async"
						/>
					</a>
				</div>
			</div>

			<!-- Bottom Bar -->
			<div class="footer-bottom">
				<p class="copyright">
					{m.copyright({ year: new Date().getFullYear() })}
				</p>
				<div class="footer-links">
					<a href={localizeUrl('/lettre-d-information')} class="footer-link">
						{m.subscribe_letter()}
					</a>
					<span class="divider">•</span>
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
		position: relative;
		background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
		margin-top: 3rem;
	}

	.footer-accent {
		height: 4px;
		background: linear-gradient(90deg, var(--acss-blue, #4a6caa) 0%, var(--acss-red, #b6467c) 100%);
	}

	.footer-content {
		padding: 3rem 0 2rem;
	}

	/* Partners Section */
	.partners-section {
		text-align: center;
		margin-bottom: 3rem;
	}

	.partners-title {
		font-family: 'Quicksand', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--acss-blue-dark, #1D4796);
		margin-bottom: 2rem;
		position: relative;
		display: inline-block;
	}

	.partners-title::after {
		content: '';
		position: absolute;
		bottom: -0.5rem;
		left: 50%;
		transform: translateX(-50%);
		width: 40px;
		height: 3px;
		background: linear-gradient(90deg, var(--acss-blue, #4a6caa) 0%, var(--acss-red, #b6467c) 100%);
		border-radius: 2px;
	}

	.partners-grid {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}

	.partner-link {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		border-radius: 0.75rem;
		transition: all 0.3s ease;
	}

	.partner-link:hover {
		background: white;
		box-shadow: 0 4px 12px rgba(74, 108, 170, 0.1);
	}

	.partner-logo {
		height: 4rem;
		width: auto;
		max-width: 140px;
		object-fit: contain;
		filter: grayscale(100%);
		opacity: 0.6;
		transition: all 0.3s ease;
	}

	.partner-link:hover .partner-logo {
		filter: grayscale(0%);
		opacity: 1;
	}

	/* Footer Bottom */
	.footer-bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(74, 108, 170, 0.1);
	}

	.copyright {
		font-size: 0.875rem;
		color: #94a3b8;
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.footer-link {
		font-size: 0.875rem;
		color: var(--acss-blue-dark, #1D4796);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.footer-link:hover {
		color: var(--acss-red, #b6467c);
	}

	.footer-link.contact {
		color: var(--acss-red, #b6467c);
	}

	.footer-link.contact:hover {
		color: var(--acss-red-dark, #9a3d65);
	}

	.divider {
		color: #cbd5e1;
	}

	/* Responsive */
	@media (min-width: 768px) {
		.partner-logo {
			height: 5rem;
			max-width: 160px;
		}

		.footer-bottom {
			flex-direction: row;
			justify-content: space-between;
		}
	}

	@media (min-width: 1024px) {
		.partners-grid {
			gap: 3rem;
		}

		.partner-logo {
			height: 6rem;
			max-width: 180px;
		}
	}
</style>
