export const saveLastLoginEmail = (email: string): void => {
	localStorage.setItem('lastLoginEmail', email);
};

export const getLastLoginEmail = (): string | null => {
	return localStorage.getItem('lastLoginEmail');
};

export const deleteLastLoginEmail = (): void => {
	localStorage.removeItem('lastLoginEmail');
};
