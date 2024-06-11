import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		locale: locals.locale,
		session: await locals.auth()
	};
}) satisfies LayoutServerLoad;
