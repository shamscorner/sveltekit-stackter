import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '$lib/auth/login/schema';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { UserService } from '../services/user.pocketbase.service';
import { PUBLIC_LANDING_PAGE } from '$env/static/public';
import { lucia } from '$lib/auth';

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

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return { form, user: existingUser };
	}
};
