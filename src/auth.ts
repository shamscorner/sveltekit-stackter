import { SvelteKitAuth } from '@auth/sveltekit';
import PocketBase from 'pocketbase';
import GitHub from '@auth/sveltekit/providers/github';
import {
	GITHUB_ID,
	GITHUB_SECRET,
	AUTH_SECRET,
	PB_USERNAME,
	PB_PASSWORD,
	POCKETBASE_URL
} from '$env/static/private';
import { PocketBaseAdapter } from '$lib/auth-adapters/pocketbase';

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	secret: AUTH_SECRET,
	adapter: PocketBaseAdapter(new PocketBase(POCKETBASE_URL), {
		username: PB_USERNAME,
		password: PB_PASSWORD
	}),
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
});
