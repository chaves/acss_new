import { writable, get } from 'svelte/store';
import en from './en.json';
import fr from './fr.json';

const translations = {
	en,
	fr
};

export const currentLanguage = writable('fr'); // Default to French

export function t(key: string): string {
	let translation = key;
	const lang = get(currentLanguage);

	if (translations[lang] && translations[lang][key]) {
		translation = translations[lang][key];
	}

	return translation;
}

export const i18n = {
	setLanguage: (lang: string) => currentLanguage.set(lang),
	currentLanguage
};