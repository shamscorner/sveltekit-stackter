import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema, resendEmailFormSchema } from '$lib/auth/register/schema';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { UserService } from '../services/user.service';
import { PUBLIC_LANDING_PAGE } from '$env/static/public';

export const load: PageServerLoad = async () => {
	const registerForm = await superValidate(zod(formSchema));
	const resendEmailForm = await superValidate(zod(resendEmailFormSchema));

	return {
		registerForm,
		resendEmailForm
	};
};

export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event.request, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { name, email, password, browserHash, landingPage, referralSiteUrl, isIncognitoMode } =
			form.data;

		const userService = new UserService(event.locals.pb);

		const userResponse = await userService.createUser({
			name,
			email,
			password,
			browserHash: browserHash || '',
			landingPage: landingPage || PUBLIC_LANDING_PAGE,
			referralSiteUrl: referralSiteUrl || '',
			isIncognitoMode,
			userAgent: event.request.headers.get('user-agent') || ''
		});

		const { id: userId } = userResponse.data || {};

		if (userResponse.code !== 200 || !userId) {
			const { code, error } = userResponse;
			return fail(code, {
				form,
				error: error?.message
			});
		}

		const existingAccountProvider = await userService.getAccountByProvider('password', userId);

		if (!existingAccountProvider.data) {
			await userService.createAccount({
				provider: 'password',
				providerId: userId,
				userId
			});
		}

		await userService.requestEmailVerification(email);

		return { form, user: userResponse.data };
	},

	resendEmail: async (event) => {
		const form = await superValidate(event.request, zod(resendEmailFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email } = form.data;

		const userService = new UserService(event.locals.pb);

		await userService.requestEmailVerification(email);

		return { form };
	}
};
