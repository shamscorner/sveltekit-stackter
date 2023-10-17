import type { GlobalResponseType } from '$lib/types';

export function parseError<T>(error: any): GlobalResponseType<T> {
	return {
		successful: false,
		error
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

export type ErrorResponseType = ReturnType<typeof getEmptyErrorResponse>;
