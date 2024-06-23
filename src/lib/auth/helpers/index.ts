export function generatePassword(passwordLength: number): string {
	const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
	const upperCaseLetters = lowerCaseLetters.toUpperCase();
	const numbers = '0123456789';
	const specialCharacters = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
	const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

	let password = '';
	for (let i = 0; i < passwordLength; i++) {
		const randomIndex = Math.floor(Math.random() * allCharacters.length);
		password += allCharacters[randomIndex];
	}

	return password;
}
