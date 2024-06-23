import { google } from '$lib/auth';
import { OAuth2RequestError } from 'arctic';

import type { RequestEvent } from '@sveltejs/kit';
import { socialiteCallbackHandler } from '$lib/auth/services/socialite';

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
		const googleUserResponse = await fetch(`https://openidconnect.googleapis.com/v1/userinfo`, {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser: GoogleUser = await googleUserResponse.json();

		return await socialiteCallbackHandler(
			event,
			{
				id: googleUser.sub,
				username: googleUser.sub,
				name: googleUser.name,
				email: googleUser.email
			},
			'google'
		);
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

interface GoogleUser {
	sub: string;
	name: string;
	given_name: string;
	family_name?: string;
	picture?: string;
	email: string;
	email_verified: boolean;
}
