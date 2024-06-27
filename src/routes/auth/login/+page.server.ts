import { fail } from '@sveltejs/kit';

import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

import { PUBLIC_LANDING_PAGE } from '$env/static/public';
import { formSchema } from '$lib/auth/login/schema';

import { UserService } from '../services/user.service';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password, browserHash, landingPage, referralSiteUrl, isIncognitoMode } =
			form.data;

		const userService = new UserService(event.locals.pb);

		const authResponse = await userService.authenticateUser({
			email,
			password,
			browserHash: browserHash || '',
			landingPage: landingPage || PUBLIC_LANDING_PAGE,
			referralSiteUrl: referralSiteUrl || '',
			isIncognitoMode,
			userAgent: event.request.headers.get('user-agent') || ''
		});

		const existingUser = authResponse.data?.user;

		if (authResponse.code !== 200 || !existingUser || !existingUser.id) {
			const { code, error } = authResponse;
			return fail(code, {
				form,
				error: error?.message
			});
		}

		await userService.setSession(event, existingUser.id);

		return { form, user: existingUser };
	}
};
