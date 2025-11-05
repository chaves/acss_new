import type { LayoutServerLoad } from './$types';
import * as runtime from '$lib/paraglide/runtime.js';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	const selectedLanguage = runtime.getLocale() ?? 'fr';
	let isoString = 'fr-FR';
	if (selectedLanguage == 'en') {
		isoString = 'en-US';
	}
	const lang = runtime.getLocale();

	return {
		currentDateOnServer: new Intl.DateTimeFormat(isoString, {
			timeZone: 'Europe/Paris',
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		}).format(new Date()),
		lang: lang
	};
};
