import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = () => {
	return {
		form: superValidate(formSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, formSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// Simulate a slow response
		// Add your logic here
		await new Promise((resolve) => setTimeout(resolve, 2000));

		return { form };
	}
};
