import { UserService } from '$routes/auth/services/user.pocketbase.service';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { id } = locals.user || {};

	if (!id) {
		return fail(404);
	}

	const userService = new UserService(locals.pb);

	const userResponse = await userService.getUserById(id);

	if (userResponse.code !== 200 || !userResponse.data) {
		return fail(404);
	}

	return { user: userResponse.data };
};
