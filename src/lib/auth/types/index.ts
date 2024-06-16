export enum UserRole {
	super = 'super',
	admin = 'admin',
	user = 'user'
}

export type UserDto = {
	name: string;
	email: string;
	password: string;
	isIncognitoMode?: boolean;
	browserHash?: string;
	landingPage?: string;
	referralSiteUrl?: string;
	userAgent?: string;
	githubId?: string;
	username?: string;
};

export type User = {
	[key: string]: any;
	id: string;
	created: string;
	updated: string;
	avatar: number;
	email: string;
	name: string;
	username?: string;
	emailVisibility: boolean;
	role: keyof typeof UserRole;
	verified: boolean;
	isIncognitoMode?: boolean;
	browserHash?: string;
	landingPage?: string;
	referralSiteUrl?: string;
	userAgent?: string;
	attributes?: Record<string, any>;
};
