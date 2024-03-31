export enum UserRole {
	super = 'super',
	admin = 'admin',
	user = 'user'
}

export type UserDto = {
	name: string;
	email: string;
	password: string;
};

export type User = {
	username?: string;
	email: string;
	emailVisibility: boolean;
	name: string;
	role: keyof typeof UserRole;
	verified: boolean;
	created: string;
	updated: string;
	avatar?: string;
};
