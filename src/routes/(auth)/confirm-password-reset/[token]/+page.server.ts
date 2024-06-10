import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { UserService } from '$routes/(auth)/services/user.pocketbase.service';

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

		const { token } = event.params;

		const { password, confirmPassword } = form.data;
		console.log('form.data', form.data);
		console.log('token', token);

		// const userService = new UserService(event.locals.pb);

		// const response = await userService.confirmPasswordReset(token, password, confirmPassword);

		// if (response.code !== 200) {
		// 	const { code, error } = response;
		// 	return fail(code, {
		// 		form,
		// 		error: error?.message
		// 	});
		// }

		return { form };
	}
};
