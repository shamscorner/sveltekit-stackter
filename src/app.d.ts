// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import PocketBase from 'pocketbase';
import type { DefaultSession } from '@auth/sveltekit';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: import('$lib/i18n/i18n-types.ts').Locales;
			pb: PocketBase;
			session: {
				user: {
					userId: string;
					/**
					 * By default, TypeScript merges new interface properties and overwrites existing ones.
					 * In this case, the default session user properties will be overwritten,
					 * with the new ones defined above. To keep the default session user properties,
					 * you need to add them back into the newly declared interface.
					 */
				} & DefaultSession['user'];
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
