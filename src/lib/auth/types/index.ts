export enum UserRole {
	super,
	admin,
	user
}

export enum AccountProvider {
	password,
	google,
	github
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
	username?: string;
	role?: keyof typeof UserRole;
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

export type AccountDto = {
	provider: keyof typeof AccountProvider;
	providerId: string;
	userId: string;
};

export type Account = {
	[key: string]: any;
	id: string;
	created: string;
	updated: string;
	provider: keyof typeof AccountProvider;
	providerId: string;
	userId: string;
};
