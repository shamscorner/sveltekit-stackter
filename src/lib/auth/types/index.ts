export enum UserRole {
	super = 'super',
	admin = 'admin',
	user = 'user'
}

export type UserDto = {
	name: string;
	email: string;
	password: string;
	isIncognitoMode: boolean;
	browserHash: string;
	landingPage: string;
	referralSiteUrl: string;
	userAgent: string;
};

export type User = {
	[key: string]: any;
	id: string;
	created: string;
	updated: string;
	avatar: number;
	email: string;
	username?: string;
	emailVisibility: boolean;
	role: keyof typeof UserRole;
	verified: boolean;
	isIncognitoMode?: boolean;
	browserHash?: string;
	landingPage?: string;
	referralSiteUrl?: string;
	userAgent?: string;
};
