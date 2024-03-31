import { capitalizeFirstLetter } from '$lib/helpers';
import LL from '$lib/i18n/i18n-svelte';
import type { ActionResult } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import { get } from 'svelte/store';

export function getEmptyErrorResponse(errorMessage: string) {
	return {
		message: errorMessage,
		code: 422
	};
}

export type ErrorResponseType = ReturnType<typeof getEmptyErrorResponse>;

export function parseErrorFromResponse(result: {
	type: 'error';
	status?: number | undefined;
	error:
		| Error
		| App.Error
		| {
				message: string;
		  };
}) {
	const error = result.error;
	const code = result.status || 500;
	const message = error.message || get(LL).errors.somethingWentWrong();

	return {
		message,
		code
	};
}

export function parseErrorFromErrorObject(error) {
	const errorObj = error as ClientResponseError;

	console.error('API service errorObj: ', errorObj);

	const { response } = errorObj || {};
	const { code, message, data } = response || {};
	let nestedMessage = message as string;

	for (const key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			nestedMessage = capitalizeFirstLetter(`${key}: ${data[key].message}`);
		}
	}

	return {
		code: code || 500,
		error: {
			message: nestedMessage || get(LL).errors.somethingWentWrong()
		}
	};
}

export function performFormValidation(result: ActionResult) {
	if (result.type === 'failure') {
		return result.data ? result.data.error : '';
	}

	if (result.type !== 'success' || !result.data) {
		return '';
	}

	const formData = result.data.form;
	if (!formData.valid) {
		return '';
	}
}
