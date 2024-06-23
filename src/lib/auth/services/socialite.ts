import { UserService } from '$routes/auth/services/user.service';
import type { RequestEvent } from '@sveltejs/kit';
import { appHomeRoute } from '../routes';
import type { AccountProvider } from '../types';
import { generatePassword } from '../helpers';

export type SocialiteUserData = {
	id: string;
	username: string;
	name: string;
	email: string;
};

export async function socialiteCallbackHandler(
	event: RequestEvent,
	userData: SocialiteUserData,
	provider: keyof typeof AccountProvider = 'password'
) {
	const userService = new UserService(event.locals.pb);

	// check if user already exists by email
	const existingUserResponse = await userService.findExistingUserByEmail(userData.email);

	let { id: existingUserId } = existingUserResponse.data || {};

	// if not, create user
	if (!existingUserId) {
		// TODO: put avatar later
		const createdUserResponse = await userService.createUser({
			name: userData.name,
			email: userData.email,
			password: generatePassword(8),
			username: userData.username
		});

		if (!createdUserResponse || createdUserResponse.code !== 200 || !createdUserResponse.data) {
			throw new Error('Failed to create user');
		}

		existingUserId = createdUserResponse.data.id;
	}

	// otherwise, check if account exists by provider & provider id
	const existingAccountProvider = await userService.getAccountByProvider(provider, userData.id);

	// if not, create account
	if (!existingAccountProvider.data) {
		await userService.createAccount({
			provider: provider,
			providerId: userData.id,
			userId: existingUserId
		});
	}

	// set session
	await userService.setSession(event, existingUserId, {
		username: userData.username,
		providerId: userData.id,
		provider
	});

	// redirect to home
	return new Response(null, {
		status: 302,
		headers: {
			Location: appHomeRoute
		}
	});
}
