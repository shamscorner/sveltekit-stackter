import { ID, account, storage, picturesBucketId } from '$lib/appwrite';
import type { GlobalResponseType } from '$lib/types';
import type { Models } from 'appwrite';
import { parseError } from './error.service';

export type CreateUserAccountInput = {
	email: string;
	password: string;
	name?: string;
};

export type LoginUserAccountInput = {
	email: string;
	password: string;
};

export async function getUserAccount() {
	let response: GlobalResponseType<Models.User<Models.Preferences>> = {
		successful: true,
		data: undefined
	};

	try {
		const result = await account.get();

		if (result) {
			response = {
				successful: true,
				data: result
			};
		} else {
			response.successful = false;
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function loginUserAccount({
	email,
	password
}: LoginUserAccountInput) {
	let response: GlobalResponseType<null> = {
		successful: true
	};

	try {
		const result = await account.createEmailSession(email, password);

		if (!result) {
			response = {
				successful: false
			};
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function createUserAccount(
	{ email, password, name }: CreateUserAccountInput,
	verificationUrl: string
) {
	let response: GlobalResponseType<Models.User<Models.Preferences>> = {
		successful: true,
		data: undefined
	};

	try {
		const result = await account.create(ID.unique(), email, password, name);

		if (result) {
			await loginUserAccount({ email, password });
			sendAccountVerificationLink(verificationUrl);

			response = {
				successful: true,
				data: result
			};
		} else {
			response.successful = false;
		}
	} catch (error: any) {
		response = parseError(error);
	}

	return response;
}

export async function logoutUserAccount() {
	let response: GlobalResponseType<null> = {
		successful: true
	};

	try {
		const result = await account.deleteSession('current');

		if (!result) {
			response = {
				successful: false
			};
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function uploadProfilePicture(file: File) {
	let response: GlobalResponseType<Models.File> = {
		successful: true,
		data: undefined
	};

	try {
		const result = await storage.createFile(
			picturesBucketId,
			ID.unique(),
			file
		);

		if (result) {
			response = {
				successful: true,
				data: result
			};
		} else {
			response.successful = false;
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function updateUserAccountName(name: string) {
	let response: GlobalResponseType<Models.User<Models.Preferences>> = {
		successful: true,
		data: undefined
	};

	try {
		const result = await account.updateName(name);

		if (result) {
			response = {
				successful: true,
				data: result
			};
		} else {
			response.successful = false;
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function getUserAccountPrefs() {
	let response: GlobalResponseType<Models.Preferences> = {
		successful: true,
		data: undefined
	};

	try {
		const result = await account.getPrefs();

		if (result) {
			response = {
				successful: true,
				data: result
			};
		} else {
			response.successful = false;
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function updateUserAccountPrefs(record: Models.Preferences) {
	let response: GlobalResponseType<Models.User<Models.Preferences>> = {
		successful: true,
		data: undefined
	};

	try {
		const result = await account.updatePrefs({
			...record
		});

		if (result) {
			response = {
				successful: true,
				data: result
			};
		} else {
			response.successful = false;
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function sendAccountVerificationLink(redirectURL: string) {
	let response: GlobalResponseType<null> = {
		successful: true
	};

	try {
		const result = await account.createVerification(redirectURL);

		if (!result) {
			response = {
				successful: false
			};
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function updateAccountVerification(
	userId: string,
	secret: string
) {
	let response: GlobalResponseType<null> = {
		successful: true
	};

	try {
		const result = await account.updateVerification(userId, secret);

		if (!result) {
			response = {
				successful: false
			};
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function sendAccountRecoveryLink(
	email: string,
	redirectURL: string
) {
	let response: GlobalResponseType<null> = {
		successful: true
	};

	try {
		const result = await account.createRecovery(email, redirectURL);

		if (!result) {
			response = {
				successful: false
			};
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}

export async function updateAccountPasswordRecovery({
	userId,
	secret,
	password,
	confirmPassword
}) {
	let response: GlobalResponseType<null> = {
		successful: true
	};

	try {
		const result = await account.updateRecovery(
			userId,
			secret,
			password,
			confirmPassword
		);

		if (!result) {
			response = {
				successful: false
			};
		}
	} catch (error) {
		response = parseError(error);
	}

	return response;
}
