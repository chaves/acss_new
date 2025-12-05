import type { LayoutServerLoad } from './$types';
import { getLocale } from '$lib/paraglide/runtime';
import { getISOLocale } from '$lib/helpers/locale';
import { DATETIME_FORMAT_OPTIONS } from '$lib/constants';

// Enable prerendering for static generation
export const prerender = true;

export const load: LayoutServerLoad = async () => {
	const lang = getLocale();
	const isoLocale = getISOLocale();

	return {
		currentDateOnServer: new Intl.DateTimeFormat(isoLocale, DATETIME_FORMAT_OPTIONS).format(
			new Date()
		),
		lang
	};
};
