import { google } from '$lib/auth';
import { OAuth2RequestError } from 'arctic';

import type { RequestEvent } from '@sveltejs/kit';
import { UserService } from '$routes/auth/services/user.pocketbase.service';
import { appHomeRoute } from '$lib/auth/routes';

// http://localhost:5173/auth/google/callback?state=qyK9yn8wgGduXRSslbEtsE8vNTNOqnfLoDFG8E4YQVY&code=4%2F0ATx3LY6O5PwFuqe8ThnOXMDVcx0Wutrzd3s3vaz4h1xL4m6HNtyrdtGbnwcx6E1uzo88VA&scope=openid&authuser=0&prompt=consent

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const storedCodeVerifier = event.cookies.get('google_oauth_code_verifier') ?? null;
	if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
		console.log('tokens', tokens);
		const googleUserResponse = await fetch(
			`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.accessToken}`,
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`
				}
			}
		);
		const googleUser = await googleUserResponse.json();
		console.log('googleUser', googleUser);

		// const userService = new UserService(event.locals.pb);

		// const existingUserResponse = await userService.findExistingUserByGithubId(githubUser.id);

		// const existingUser = existingUserResponse.data;

		// if (existingUser) {
		// 	await userService.setSession(event, existingUser.id);
		// } else {
		// 	// TODO: put avatar later
		// 	const createdUserResponse = await userService.createUser({
		// 		name: githubUser.name,
		// 		email: githubUser.email,
		// 		password: 'Github@123', // TODO: generate random password later
		// 		githubId: githubUser.id,
		// 		username: githubUser.login
		// 	});

		// 	const { id: userId } = createdUserResponse.data || {};

		// 	if (createdUserResponse.code !== 200 || !userId) {
		// 		throw new Error('Failed to create user');
		// 	}

		// 	await userService.setSession(event, userId, {
		// 		githubId: githubUser.id,
		// 		username: githubUser.login
		// 	});
		// }

		// return new Response(null, {
		// 	status: 302,
		// 	headers: {
		// 		Location: appHomeRoute
		// 	}
		// });

		return new Response(null);
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

// interface GitHubUser {
// 	id: string;
// 	login: string;
// 	name: string;
// 	email: string;
// }
