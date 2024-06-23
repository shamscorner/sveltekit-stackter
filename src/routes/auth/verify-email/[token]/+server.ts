import { appHomeRoute } from '$lib/auth/routes';
import { UserService } from '$routes/auth/services/user.service';
import { error, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const { token } = event.params;

	if (!token) {
		error(404, {
			message: 'Invalid token'
		});
	}

	const userService = new UserService(event.locals.pb);

	const response = await userService.confirmEmailVerification(token);

	if (!response || response.code !== 200 || !response.data) {
		error(400, {
			message: 'Link is invalid or expired'
		});
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: appHomeRoute
		}
	});
}
