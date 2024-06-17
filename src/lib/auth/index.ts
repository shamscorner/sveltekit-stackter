import { Lucia } from 'lucia';
import { PocketbaseAdapter } from '@shamscorner/lucia-pocketbase';
import { dev } from '$app/environment';
import PocketBase from 'pocketbase';
import { GitHub } from 'arctic';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	POCKETBASE_PASSWORD,
	POCKETBASE_USERNAME
} from '$env/static/private';

const client = new PocketBase('http://127.0.0.1:8090');
const adapter = new PocketbaseAdapter(client, {
	adminUsername: POCKETBASE_USERNAME,
	adminPassword: POCKETBASE_PASSWORD
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev // set to `true` when using HTTPS
		}
	}
	// TODO: fix here. Because the attributes param is returning null
	// getUserAttributes: (attributes) => {
	// 	console.log('attributes', attributes);
	// 	return {
	// 		// attributes has the type of DatabaseUserAttributes
	// 		githubId: attributes.githubId,
	// 		username: attributes.username
	// 	};
	// }
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	githubId: number;
	username: string;
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
