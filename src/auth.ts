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
import { PocketBaseAdapter } from '$lib/auth/adapters/pocketbase';
import credentials from '@auth/sveltekit/providers/credentials';
import { authSchema } from '$lib/auth/schema';
import { ZodError } from 'zod';
import type { User } from '$lib/auth/types';

const pocketbase = new PocketBase(POCKETBASE_URL);

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	secret: AUTH_SECRET,
	adapter: PocketBaseAdapter(pocketbase, {
		username: PB_USERNAME,
		password: PB_PASSWORD
	}),
	providers: [
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
		credentials({
			credentials: {
				email: {},
				password: {},
				browserHash: {},
				isIncognitoMode: {},
				landingPage: {},
				referralSiteUrl: {}
			},
			authorize: async (credentials) => {
				try {
					const { email } = await authSchema.parseAsync(credentials);

					const user = await pocketbase
						.collection('users')
						.getFirstListItem<User>(pocketbase.filter('email ~ {:email}', { email }));

					if (!user) {
						throw new Error('User not found.');
					}

					return user as any;
				} catch (error) {
					if (error instanceof ZodError) {
						return null;
					}
				}
			}
		})
	]
});
