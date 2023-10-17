export const urlRegex =
	/^(?:(https?|ftp):\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$#_-]+)?@)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(:[0-9]{1,5})?([/?]([a-zA-Z0-9.&%$#_-]+[/]?)?)?(\?[a-zA-Z0-9+&@#/%=~_|!:,.;-]*)?(#[a-zA-Z0-9_-]*)?$/;

export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function isValidURL(url: string) {
	return urlRegex.test(url);
}

export enum PasswordStrength {
	Pass = 'Pass',
	FairPass = 'Fair Pass',
	Poor = 'Poor'
}

export function validatePasswordStrength(password: string): {
	label: PasswordStrength | '';
	color: 'text-red-500' | 'text-amber-500' | 'text-green-500';
} {
	if (password.length < 8) {
		return {
			label: PasswordStrength.Poor,
			color: 'text-red-500'
		};
	}

	if (!/[A-Z]/.test(password)) {
		return {
			label: PasswordStrength.Poor,
			color: 'text-red-500'
		};
	}

	if (!/[a-z]/.test(password)) {
		return {
			label: PasswordStrength.FairPass,
			color: 'text-amber-500'
		};
	}

	if (!/[0-9]/.test(password)) {
		return {
			label: PasswordStrength.FairPass,
			color: 'text-amber-500'
		};
	}

	if (!/[!@#$%^&*()\-=_+[\]{}|;':",.<>/?]/.test(password)) {
		return {
			label: PasswordStrength.FairPass,
			color: 'text-amber-500'
		};
	}

	return {
		label: PasswordStrength.Pass,
		color: 'text-green-500'
	};
}
