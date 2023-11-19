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
