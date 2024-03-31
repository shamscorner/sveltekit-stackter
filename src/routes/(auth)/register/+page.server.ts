import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { UserService } from '../services/user.pocketbase.service';
import { PUBLIC_LANDING_PAGE } from '$env/static/public';

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

		if (userResponse.code !== 200) {
			const { code, error } = userResponse;
			return fail(code, {
				form,
				error: error?.message
			});
		}

		await userService.requestEmailVerification(email);

		return { form, user: userResponse.data };
	}
};
