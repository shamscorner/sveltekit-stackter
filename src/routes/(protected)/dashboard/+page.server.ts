import { UserService } from '$routes/auth/services/user.pocketbase.service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { id } = locals.user || {};

	if (!id) {
		throw error(403, {
			message: 'Forbidden'
		});
	}

	const userService = new UserService(locals.pb);

	const userResponse = await userService.getUserById(id);

	if (userResponse.code !== 200 || !userResponse.data) {
		throw error(404, 'User not found');
	}

	return { user: userResponse.data };
};
