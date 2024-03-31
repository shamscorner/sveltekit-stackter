import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { UserService } from '../services/user.pocketbase.service';

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

		const { name, email, password } = form.data;

		const userService = new UserService(event.locals.pb);

		const userResponse = await userService.createUser({ name, email, password });

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
