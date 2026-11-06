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

## Bonnes pratiques du cluster

`/cluster/bonnes-pratiques` présente les pages publiques de la documentation du cluster (dépôt privé `ACSS-PSL/cluster_documentation`, pages marquées `public: true`). Pendant la compilation, `scripts/snapshot-practices.mjs` lit `https://extranet.acss-psl.eu/api/bonnes-pratiques`, qui renvoie ces seules pages déjà rendues et nettoyées, et écrit `.generated/good-practices.json`. Une erreur de lecture interrompt la compilation : le dernier déploiement reste en ligne. Le contenu est en anglais ; l’encadré « Information générale » rappelle que les informations d’accès sont communiquées individuellement.

Un commit sur une page publique est détecté par la tâche minute de l’extranet, qui déclenche le deploy hook. `ACSS_PRACTICES_FILE=<fichier.json>` remplace la lecture distante en développement ; `ACSS_PRACTICES_URL` change l’adresse lue.

## Projets et réalisations du cluster

`/cluster/projets` présente les projets validés en cours et les réalisations (articles, documents de travail, présentations, code…) que leurs porteurs publient depuis l’extranet (ACSS est informé par email et peut en retirer une). `scripts/snapshot-projects.mjs` lit `https://extranet.acss-psl.eu/api/cluster/projets` (ou `ACSS_PROJECTS_FILE` / `ACSS_PROJECTS_URL`) et écrit `.generated/cluster-projects.json`. L’API n’expose que le titre du projet, le porteur, son établissement et son laboratoire, le responsable scientifique s’il diffère, et le texte nettoyé des réalisations publiées : jamais d’email, de description, de note ni de PDF. Une erreur de lecture interrompt la compilation. La page `/cluster` en montre les chiffres et les trois dernières réalisations.

Le logo officiel de la Région Île-de-France (`static/images/logos_autres/region-ile-de-france.svg`, version standard de la valise 2019) figure, avec la mention obligatoire « Action financée par la Région Île-de-France », sur `/cluster` et `/cluster/projets` (`src/lib/components/cluster/RegionFunding.svelte`). Le pied de page de toutes les pages porte aussi un bandeau « Cluster de calcul financé par la Région Île-de-France » avec ce logo (`src/lib/components/layout/Footer.svelte`), comme le demande la charte de visibilité pour la page d’accueil. Charte régionale : logo toujours sur fond blanc, au moins 85 px de large à l’écran, cliquable vers www.iledefrance.fr, proportions et couleurs inchangées.

## Charte du cluster

`static/files/cluster/charte-acss-4h100-2h100-<8 premiers caractères du sha256>.pdf` est généré par `~/_ACSS/MARCELLE/Chartre/sources/build_charter.py` (vérification : `verify_charter.py`). Après une nouvelle version, renommer le fichier avec son nouveau sha256, mettre à jour `src/routes/cluster/+page.svelte` et copier le même PDF dans `resources/charte-acss-modele.pdf` de l’extranet (modèle des tests d’extraction). La version de novembre 2026 informe le demandeur de la publication du projet et de ses réalisations (bloc 06).

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
