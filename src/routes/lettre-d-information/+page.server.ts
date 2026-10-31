import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { acceptNewsletterAttempt, subscribe } from '#lib/server/newsletter.js';
import * as m from '#lib/paraglide/messages.js';
export const prerender = false;
export const load: PageServerLoad = ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'private, no-store' });
};
export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		const expectedOrigin = new URL(request.url).origin;
		if (request.headers.get('origin') !== expectedOrigin)
			return fail(403, {
				code: 'origin',
				values: { firstName: '', lastName: '', institution: '', email: '' }
			});
		const data = await request.formData();
		const values = {
			firstName: String(data.get('firstName') || '').trim(),
			lastName: String(data.get('lastName') || '').trim(),
			institution: String(data.get('institution') || '').trim(),
			email: String(data.get('email') || '')
				.trim()
				.toLowerCase()
		};
		if (String(data.get('website') || '')) return { success: true };
		const errors: Record<string, string> = {};
		if (!values.firstName || values.firstName.length > 150)
			errors.firstName = m.first_name_required();
		if (!values.lastName || values.lastName.length > 150) errors.lastName = m.last_name_required();
		if (!values.institution || values.institution.length > 300)
			errors.institution = m.institution_required();
		if (!values.email) errors.email = m.email_required();
		else if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
			errors.email = m.email_invalid();
		if (Object.keys(errors).length) return fail(400, { code: 'invalid', errors, values });
		try {
			if (!(await acceptNewsletterAttempt(getClientAddress())))
				return fail(429, { code: 'limited', values });
			if ((await subscribe(values)) === 'duplicate')
				return fail(400, { code: 'duplicate', values });
			return { success: true };
		} catch {
			console.error('[acss] newsletter registration unavailable');
			return fail(503, { code: 'unavailable', values });
		}
	}
};
