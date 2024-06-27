import { PocketbaseAdapter } from '@shamscorner/lucia-pocketbase';
import { GitHub, Google } from 'arctic';
import { Lucia } from 'lucia';
import PocketBase from 'pocketbase';

import { dev } from '$app/environment';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	POCKETBASE_PASSWORD,
	POCKETBASE_URL,
	POCKETBASE_USERNAME
} from '$env/static/private';
import { PUBLIC_LANDING_PAGE } from '$env/static/public';

const client = new PocketBase(POCKETBASE_URL);
const adapter = new PocketbaseAdapter(client, {
	adminUsername: POCKETBASE_USERNAME,
	adminPassword: POCKETBASE_PASSWORD
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev // set to `true` when using HTTPS
		}
	},
	getSessionAttributes: (attributes) => {
		return {
			provider: attributes.provider,
			providerId: attributes.providerId,
			username: attributes.username
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
	}
}

interface DatabaseSessionAttributes {
	providerId: string;
	provider: string;
	username: string;
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	`${PUBLIC_LANDING_PAGE}/auth/google/callback`
);
