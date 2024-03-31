// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import PocketBase from 'pocketbase';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: import('$lib/i18n/i18n-types.ts').Locales;
			pb: PocketBase;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
