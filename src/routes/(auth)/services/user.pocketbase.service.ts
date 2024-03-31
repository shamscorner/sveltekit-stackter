import Pocketbase from 'pocketbase';
import { AuthService } from './base';
import type { ApiResponse } from '$lib/types';
import { UserRole, type User, type UserDto } from '$lib/types/user.type';
import { parseErrorFromErrorObject } from '$lib/services/error.service';

export class UserService extends AuthService {
	private pb: Pocketbase;

	constructor(pb: Pocketbase) {
		super();
		this.pb = pb;
	}

	findExistingUserByEmail(email: string): Promise<ApiResponse<User>> {
		throw new Error('Method not implemented.');
	}
	async createUser({ name, email, password }: UserDto): Promise<ApiResponse<User>> {
		try {
			const user = await this.pb.collection('users').create<User>({
				email,
				emailVisibility: true,
				password,
				passwordConfirm: password,
				name,
				role: UserRole.user
			});

			return {
				code: 200,
				data: user
			};
		} catch (error) {
			return parseErrorFromErrorObject(error);
		}
	}
}
