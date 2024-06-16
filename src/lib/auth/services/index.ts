import type { ApiResponse } from '$lib/types';
import type { User, UserDto } from '../types';

export abstract class AuthService {
	abstract findExistingUserByEmail(email: string): Promise<ApiResponse<User>>;
	abstract findExistingUserByGithubId(githubId: string): Promise<ApiResponse<User>>;
	abstract getUserById(id: string): Promise<ApiResponse<User>>;
	abstract createUser({ name, email, password }: UserDto): Promise<ApiResponse<User>>;
	abstract parseErrorFromErrorObject(error: unknown): ApiResponse<User>;
	abstract requestEmailVerification(email: string): Promise<ApiResponse<boolean>>;
	abstract authenticateUser({
		email,
		password,
		browserHash,
		landingPage,
		referralSiteUrl,
		isIncognitoMode,
		userAgent
	}: Omit<UserDto, 'name'>): Promise<ApiResponse<{ user: User; token: string }>>;
}
