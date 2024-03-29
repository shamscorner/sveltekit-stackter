import { PUBLIC_LANDING_PAGE } from '$env/static/public';
import type { RequestEvent } from '@sveltejs/kit';

export function getRandomItemFromArray(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

export function resetObjectPropertiesToEmptyString<T>(obj: T): T {
	const result: Record<string, any> = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				result[key] = resetObjectPropertiesToEmptyString(obj[key]);
			} else {
				result[key] = '';
			}
		}
	}

	return result as T;
}

export function getUserAgent() {
	return navigator.userAgent;
}

export function getOrigin() {
	const { origin } = window.location;
	return `${origin}${PUBLIC_LANDING_PAGE}`;
}

export function getIp(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
	let clientIp = '';
	try {
		clientIp = event.getClientAddress();
	} catch {
		clientIp = '';
	}
	return clientIp;
}
