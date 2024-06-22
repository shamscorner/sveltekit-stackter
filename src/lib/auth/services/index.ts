import type { ApiResponse } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import type { Account, AccountDto, AccountProvider, User, UserDto } from '../types';
import { UserService } from '$routes/auth/services/user.pocketbase.service';
import { appHomeRoute } from '../routes';

export abstract class AuthService {
	abstract parseErrorFromErrorObject(error: unknown): ApiResponse<User>;
	abstract findExistingUserByEmail(email: string): Promise<ApiResponse<User>>;
	abstract getUserById(id: string): Promise<ApiResponse<User>>;
	abstract createUser({ name, email, password }: UserDto): Promise<ApiResponse<User>>;
	abstract authenticateUser({
		email,
		password,
		browserHash,
		landingPage,
		referralSiteUrl,
		isIncognitoMode,
		userAgent
	}: Omit<UserDto, 'name'>): Promise<ApiResponse<{ user: User; token: string }>>;
	abstract setSession<T>(
		event: RequestEvent,
		userId: string,
		...args: Record<never, never>[]
	): Promise<ApiResponse<T>>;
	abstract requestEmailVerification(email: string): Promise<ApiResponse<boolean>>;
	abstract requestPasswordReset(email: string): Promise<ApiResponse<boolean>>;
	abstract confirmPasswordReset(
		token: string,
		password: string,
		confirmPassword: string
	): Promise<ApiResponse<boolean>>;
	abstract getAccountByProvider(
		provider: keyof typeof AccountProvider,
		providerId: string
	): Promise<ApiResponse<Account>>;
	abstract getAccountByProviderId(providerId: string): Promise<ApiResponse<Account>>;
	abstract getAccountByUserId(userId: string): Promise<ApiResponse<Account>>;
	abstract createAccount(account: AccountDto): Promise<ApiResponse<Account>>;
}

export type SocialiteUserData = {
	id: string;
	username: string;
	name: string;
	email: string;
};

export async function socialiteCallbackHandler(event: RequestEvent, userData: SocialiteUserData) {
	const userService = new UserService(event.locals.pb);

	// check if account already exists by provider id
	const existingUserAccountResponse = await userService.getAccountByProviderId(userData.id);

	let { userId: existingUserId } = existingUserAccountResponse.data || {};

	// if not, create user
	if (!existingUserId) {
		// TODO: put avatar later
		const createdUserResponse = await userService.createUser({
			name: userData.name,
			email: userData.email,
			password: 'Github@123', // TODO: generate random password later
			username: userData.username
		});

		if (!createdUserResponse || createdUserResponse.code !== 200 || !createdUserResponse.data) {
			throw new Error('Failed to create user');
		}

		existingUserId = createdUserResponse.data.id;
	}

	// otherwise, check if account exists by provider & provider id
	const existingAccountProvider = await userService.getAccountByProvider('github', userData.id);

	// if not, create account
	if (!existingAccountProvider.data) {
		await userService.createAccount({
			provider: 'github',
			providerId: userData.id,
			userId: existingUserId
		});
	}

	await userService.setSession(event, existingUserId, {
		githubId: userData.id,
		username: userData.username
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: appHomeRoute
		}
	});
}
