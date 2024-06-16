import { redirect } from '@sveltejs/kit';
import { appHomeRoute, authRoutes, loginRoute } from './routes';
import { lucia } from '.';

export async function protectRoutes({ event, resolve }) {
	const currentRouteId = event.route.id;
	const shouldProtectRoute = currentRouteId && currentRouteId.startsWith('/(protected)/');
	const isLoggedIn = !!event.locals.user;

	if (shouldProtectRoute && !isLoggedIn) {
		throw redirect(302, loginRoute);
	}

	const isAuthRoute = authRoutes.includes(currentRouteId);

	if (isAuthRoute && isLoggedIn) {
		throw redirect(302, appHomeRoute);
	}

	return resolve(event);
}

export async function initLuciaAuth({ event, resolve }) {
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
}
