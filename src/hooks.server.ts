import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { detectLocale } from '$lib/i18n/i18n-util.js';
import { sequence } from '@sveltejs/kit/hooks';
import PocketBase from 'pocketbase';
import { lucia } from '$lib/auth';
import { POCKETBASE_URL } from '$env/static/private';
import { PUBLIC_DEFAULT_LOGIN_ROUTE } from '$env/static/public';

async function urlRewrite({ event, resolve }) {
	if (event.url.pathname.match(/[A-Z]/)) {
		throw redirect(302, event.url.pathname.toLowerCase());
	}

	return resolve(event);
}

async function i18n({ event, resolve }) {
	const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
	const locale = detectLocale(acceptLanguageHeaderDetector);
	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
}

async function initPocketbase({ event, resolve }) {
	event.locals.pb = new PocketBase(POCKETBASE_URL);

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
}

async function initLuciaAuth({ event, resolve }) {
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

async function protectRoutes({ event, resolve }) {
	const shouldProtectRoute = (routeId: string) => {
		return routeId && routeId.startsWith('/(protected)/');
	};

	if (shouldProtectRoute(event.route.id) && !event.locals.user) {
		throw redirect(302, PUBLIC_DEFAULT_LOGIN_ROUTE);
	}

	return resolve(event);
}

export const handle = sequence(
	urlRewrite,
	i18n,
	initPocketbase,
	initLuciaAuth,
	protectRoutes
) satisfies Handle;
