import type { GlobalResponseType } from '$lib/types';
import type { AppwriteException } from 'appwrite';

export function parseError<T>(error: any): GlobalResponseType<T> {
	const errorObj = error as AppwriteException;

	return {
		successful: false,
		error: errorObj
	};
}

export function getEmptyErrorResponse(errorMessage: string) {
	return {
		message: errorMessage,
		code: 422,
		response: '',
		type: 'unknown',
		name: 'Unknown'
	};
}
