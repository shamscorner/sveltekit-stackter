import Pocketbase, { ClientResponseError } from 'pocketbase';
import { AuthService } from './base';
import type { ApiResponse } from '$lib/types';
import { UserRole, type User, type UserDto } from '$lib/types/user.type';
import { capitalizeFirstLetter } from '$lib/helpers';
import { get } from 'svelte/store';
import LL from '$lib/i18n/i18n-svelte';

export class UserService extends AuthService {
	private pb: Pocketbase;

	constructor(pb: Pocketbase) {
		super();
		this.pb = pb;
	}

	findExistingUserByEmail(email: string): Promise<ApiResponse<User>> {
		throw new Error('Method not implemented.');
	}
	async createUser({
		name,
		email,
		password,
		browserHash,
		landingPage,
		isIncognitoMode,
		referralSiteUrl,
		userAgent
	}: UserDto): Promise<ApiResponse<User>> {
		try {
			const user = await this.pb.collection('users').create<User>({
				email,
				emailVisibility: true,
				password,
				passwordConfirm: password,
				name,
				role: UserRole.user,
				browserHash,
				landingPage,
				referralSiteUrl,
				isIncognitoMode,
				userAgent
			});

			return {
				code: 200,
				data: user
			};
		} catch (error) {
			return this.parseErrorFromErrorObject(error);
		}
	}

	async requestEmailVerification(email: string): Promise<ApiResponse<boolean>> {
		try {
			const output = await this.pb.collection('users').requestVerification(email);
			console.log('output: ', output);
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
