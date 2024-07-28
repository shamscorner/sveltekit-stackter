import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

import { detectLocale } from '$lib/i18n/i18n-util.js';

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

export const handle = sequence(urlRewrite, i18n) satisfies Handle;
