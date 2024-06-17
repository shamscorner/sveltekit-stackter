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
	},
	getSessionAttributes: (attributes) => {
		return {
			githubId: attributes.githubId,
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
	githubId: number;
	username: string;
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
