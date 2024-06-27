import { type RequestEvent } from '@sveltejs/kit';

import { lucia } from '$lib/auth';
import { loginRoute } from '$lib/auth/routes';

export async function GET(event: RequestEvent): Promise<Response> {
	if (event.locals.session) {
		await lucia.invalidateSession(event.locals.session.id);

		const sessionCookie = lucia.createBlankSessionCookie();

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: loginRoute
		}
	});
}
