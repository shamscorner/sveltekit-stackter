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

		const existingUserResponse = await userService.findExistingUserByGithubId(githubUser.id);

		const existingUser = existingUserResponse.data;

		if (existingUser) {
			await userService.setSession(event, existingUser.id);
		} else {
			// TODO: put avatar later
			const createdUserResponse = await userService.createUser({
				name: githubUser.name,
				email: githubUser.email,
				password: 'Github@123', // TODO: generate random password later
				githubId: githubUser.id,
				username: githubUser.login
			});

			const { id: userId } = createdUserResponse.data || {};

			if (createdUserResponse.code !== 200 || !userId) {
				throw new Error('Failed to create user');
			}

			await userService.setSession(event, userId);
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: appHomeRoute
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
			// invalid code
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
