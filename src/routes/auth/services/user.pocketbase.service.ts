import Pocketbase, { ClientResponseError } from 'pocketbase';
import { AuthService } from '$lib/auth/services';
import type { ApiResponse } from '$lib/types';
import {
	AccountProvider,
	type Account,
	type AccountDto,
	type User,
	type UserDto
} from '$lib/auth/types';
import { capitalizeFirstLetter } from '$lib/helpers';
import { get } from 'svelte/store';
import LL from '$lib/i18n/i18n-svelte';
import { lucia } from '$lib/auth';
import type { RequestEvent } from '@sveltejs/kit';
import type { RegisteredDatabaseSessionAttributes } from 'lucia';

export class UserService extends AuthService {
	private pb: Pocketbase;

	constructor(pb: Pocketbase) {
		super();
		this.pb = pb;
	}

	async findExistingUserByEmail(email: string): Promise<ApiResponse<User>> {
		try {
			const user = await this.pb.collection('users').getFirstListItem<User>(`email~'${email}'`);

			return {
				code: 200,
				data: user
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async getUserById(id: string): Promise<ApiResponse<User>> {
		try {
			const user = await this.pb.collection('users').getOne<User>(id);

			return {
				code: 200,
				data: user
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async createUser({
		name,
		email,
		password,
		browserHash,
		landingPage,
		isIncognitoMode,
		referralSiteUrl,
		userAgent,
		username,
		role
	}: UserDto): Promise<ApiResponse<User>> {
		try {
			const user = await this.pb.collection('users').create<User>({
				email,
				emailVisibility: true,
				password,
				passwordConfirm: password,
				name,
				role: role || 'user',
				browserHash,
				landingPage,
				referralSiteUrl,
				isIncognitoMode,
				userAgent,
				username
			});

			return {
				code: 200,
				data: user
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async getAccountByUserId(userId: string): Promise<ApiResponse<Account>> {
		try {
			const account = await this.pb
				.collection('accounts')
				.getFirstListItem<Account>(`userId~'${userId}'`);

			return {
				code: 200,
				data: account
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async getAccountByProvider(
		provider: keyof typeof AccountProvider,
		providerId: string
	): Promise<ApiResponse<Account>> {
		try {
			const account = await this.pb
				.collection('accounts')
				.getFirstListItem<Account>(`provider~'${provider}'&&providerId~'${providerId}'`);

			return {
				code: 200,
				data: account
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async getAccountByProviderId(providerId: string): Promise<ApiResponse<Account>> {
		try {
			const account = await this.pb
				.collection('accounts')
				.getFirstListItem<Account>(`providerId~'${providerId}'`);

			return {
				code: 200,
				data: account
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async createAccount({ provider, providerId, userId }: AccountDto): Promise<ApiResponse<Account>> {
		try {
			const account = await this.pb.collection('accounts').create<Account>({
				provider: provider || 'password',
				providerId,
				userId
			});

			return {
				code: 200,
				data: account
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async authenticateUser({
		email,
		password,
		browserHash,
		landingPage,
		referralSiteUrl,
		isIncognitoMode,
		userAgent
	}: Omit<UserDto, 'name'>): Promise<ApiResponse<{ user: User; token: string }>> {
		try {
			const { record, token } = await this.pb
				.collection('users')
				.authWithPassword<User>(email, password);

			return {
				code: 200,
				data: {
					user: record,
					token
				}
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async setSession<T>(
		event: RequestEvent,
		userId: string,
		...args: Record<never, never>[]
	): Promise<ApiResponse<T>> {
		try {
			const session = await lucia.createSession(
				userId,
				(args[0] as RegisteredDatabaseSessionAttributes) || {},
				args[1]
			);
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			return {
				code: 200,
				data: session as T
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async requestEmailVerification(email: string): Promise<ApiResponse<boolean>> {
		try {
			await this.pb.collection('users').requestVerification(email);
			return {
				code: 200,
				data: true
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async requestPasswordReset(email: string): Promise<ApiResponse<boolean>> {
		try {
			await this.pb.collection('users').requestPasswordReset(email);
			return {
				code: 200,
				data: true
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async confirmPasswordReset(
		token: string,
		password: string,
		confirmPassword: string
	): Promise<ApiResponse<boolean>> {
		try {
			await this.pb.collection('users').confirmPasswordReset(token, password, confirmPassword);

			return {
				code: 200,
				data: true
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	parseErrorFromErrorObject(error) {
		const errorObj = error as ClientResponseError;

		console.error('API service errorObj: ', errorObj);

		const { response } = errorObj || {};
		const { code, message, data } = response || {};
		let nestedMessage = message as string;

		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				nestedMessage = capitalizeFirstLetter(`${key}: ${data[key].message}`);
			}
		}

		return {
			code: (code as number) || 500,
			error: {
				message: nestedMessage || get(LL).errors.somethingWentWrong()
			}
		};
	}
}
