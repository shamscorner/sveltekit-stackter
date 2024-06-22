import { github } from '$lib/auth';
import { OAuth2RequestError } from 'arctic';

import type { RequestEvent } from '@sveltejs/kit';
import { UserService } from '$routes/auth/services/user.pocketbase.service';
import { appHomeRoute } from '$lib/auth/routes';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const userService = new UserService(event.locals.pb);

		// check if account already exists by provider id
		const existingUserAccountResponse = await userService.getAccountByProviderId(githubUser.id);

		let { userId: existingUserId } = existingUserAccountResponse.data || {};

		// if not, create user
		if (!existingUserId) {
			// TODO: put avatar later
			const createdUserResponse = await userService.createUser({
				name: githubUser.name,
				email: githubUser.email,
				password: 'Github@123', // TODO: generate random password later
				username: githubUser.login
			});

			if (!createdUserResponse || createdUserResponse.code !== 200 || !createdUserResponse.data) {
				throw new Error('Failed to create user');
			}

			existingUserId = createdUserResponse.data.id;
		}

		// otherwise, check if account exists by provider & provider id
		const existingAccountProvider = await userService.getAccountByProvider('github', githubUser.id);
		console.log('existingAccountProvider', existingAccountProvider, {
			provider: 'github',
			providerId: githubUser.id
		});

		// if not, create account
		if (!existingAccountProvider.data) {
			await userService.createAccount({
				provider: 'github',
				providerId: githubUser.id,
				userId: existingUserId
			});
		}

		await userService.setSession(event, existingUserId, {
			githubId: githubUser.id,
			username: githubUser.login
		});

		return new Response(null, {
			status: 302,
			headers: {
				Location: appHomeRoute
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
			return new Response(null, {
				status: 400
			});
		}

		return new Response(null, {
			status: 500
		});
	}
}

interface GitHubUser {
	id: string;
	login: string;
	name: string;
	email: string;
}
