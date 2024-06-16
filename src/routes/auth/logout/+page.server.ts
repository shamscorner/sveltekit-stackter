import { lucia } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { loginRoute } from '$lib/auth/routes';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) {
		redirect(302, loginRoute);
	}

	await lucia.invalidateSession(event.locals.session.id);

	const sessionCookie = lucia.createBlankSessionCookie();

	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});

	redirect(302, loginRoute);
};
