# Site public ACSS

Site : https://acss-dig.psl.eu/ — SvelteKit 3, Svelte 5 et Vercel.

Les pages éditoriales sont précompilées en français et en anglais. Pendant la compilation, `scripts/snapshot-content.mjs` lit directement les versions publiées dans MySQL sur AlwaysData, puis produit l’instantané `.generated/public-content.json`. Aucun appel à Strapi ni à une API de contenu n’est nécessaire pour afficher les pages.

Le site conserve les séances ACSS historiques en Markdown et affiche également les nouvelles séances ACSS publiées depuis l’extranet. Les adresses existantes sont préservées. Les images et documents du CMS sont servis depuis https://extranet.acss-psl.eu/uploads/.

## Configuration

Copier `.env.example` vers `.env.local` pour le développement ; ne jamais committer ce fichier.

- `ACSS_CONTENT_DATABASE_URL` : compte de compilation, SELECT sur `CmsPublication` uniquement.
- `ACSS_NEWSLETTER_DATABASE_URL` : compte du formulaire, INSERT sur `MailingListSubscription`, SELECT/INSERT/UPDATE sur `NewsletterThrottle`. Il ne lit pas les inscrits.

Les connexions distantes utilisent TLS avec vérification du certificat. Les deux variables sont privées, sans préfixe `PUBLIC_` ou `VITE_`. Sur Vercel elles sont définies dans les environnements production et preview.

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

`pnpm build` régénère toujours l’instantané depuis SQL avant la compilation. Une erreur de lecture interrompt la compilation. Les pages précompilées, leur sitemap, leurs canoniques, leurs liens de langue et leurs données structurées sont inclus dans le déploiement.

## Mises à jour

L’extranet déclenche le deploy hook de la branche `main` après une publication ou un retrait. Une tâche AlwaysData vérifie aussi l’empreinte des publications chaque minute, réessaie les demandes échouées et demande une reconstruction quotidienne pour actualiser les dates des séminaires. Les brouillons et les inscriptions ne déclenchent pas de reconstruction. La configuration de cette tâche appartient au projet de l’extranet ; son URL de hook est un secret.

Une reconstruction demandée n’est pas encore une mise en ligne : vérifier son état READY dans Vercel. Un échec de compilation conserve le dernier déploiement publié.

## Formulaire

La lettre d’information utilise une action serveur SvelteKit. Elle fonctionne avec et sans JavaScript, contrôle l’origine et les données, protège contre les soumissions répétées et conserve l’unicité des emails. Aucun email n’est envoyé par ce formulaire.

## Vérifications

```sh
pnpm check
pnpm build
node tests/static-artifacts.mjs
```

Le contrôle des artefacts vérifie les pages éditoriales des deux langues, leurs canoniques, hreflang, JSON-LD et les médias migrés. Avec `SECRET_ENV_FILES` contenant un ou plusieurs chemins séparés par `|`, il contrôle également que ces secrets ne figurent pas dans les fichiers publics, sans les afficher.

`tests/newsletter-http.mjs` vérifie les soumissions réelles sur un serveur local au port 5188, exclusivement avec une base locale nommée `acss_test`. Il retire son inscription fictive à la fin. Ne jamais le lancer contre la base de production.
