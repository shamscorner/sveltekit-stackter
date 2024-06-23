import type { ApiResponse } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import type { Account, AccountDto, AccountProvider, User, UserDto } from '../types';

export abstract class AuthService {
	abstract EXCEPTION_EMAIL_INVALID: string;

	abstract parseErrorFromErrorObject(error: unknown): {
		code: number;
		type?: string;
		error: {
			message: string;
		};
	};
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
