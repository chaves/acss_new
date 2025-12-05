import type { LayoutServerLoad } from './$types';
import { getLocale } from '$lib/paraglide/runtime';
import { getISOLocale } from '$lib/helpers/locale';
import { DATETIME_FORMAT_OPTIONS } from '$lib/constants';

// Note: We don't set prerender = true here because routes with ISR config
// should not be prerendered. Static routes will be prerendered via svelte.config.js
// Routes with ISR config will use Incremental Static Regeneration instead.

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
