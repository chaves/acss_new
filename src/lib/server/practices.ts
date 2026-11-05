// Good practices for the ACSS GPU servers, taken at build time from the cluster documentation
// (pages marked `public: true`). See scripts/snapshot-practices.mjs.
export type PracticePage = {
	slug: string;
	title: string;
	description: string;
	order: number;
	html: string;
	toc: { id: string; text: string; level: 2 | 3 }[];
};
type Collection = { revision: { sha: string; date: string }; pages: PracticePage[] };

export const PRACTICES_PATH = '/cluster/bonnes-pratiques';

const snapshots = import.meta.glob('/.generated/good-practices.json', {
	eager: true,
	import: 'default'
});

export function practices(): Collection {
	const snapshot = Object.values(snapshots)[0] as Collection | undefined;
	if (!snapshot)
		throw new Error('Good practices snapshot is missing. Run pnpm content:snapshot.');
	return snapshot;
}

// Links between practices are written without a locale; keep the reader in the current language.
export const localizePractices = (html: string, locale: string) =>
	html.replaceAll(`href="${PRACTICES_PATH}`, `href="/${locale}${PRACTICES_PATH}`);
