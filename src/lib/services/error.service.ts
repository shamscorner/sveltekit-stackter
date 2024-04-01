import { capitalizeFirstLetter } from '$lib/helpers';
import LL from '$lib/i18n/i18n-svelte';
import type { ActionResult } from '@sveltejs/kit';
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

export function performFormValidation(result: ActionResult) {
	console.log(result);
	if (result.type === 'failure' && result.data) {
		const formData = result.data.form;
		const errors = formData.errors;
		let nestedMessage = '';

		for (const key in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, key)) {
				nestedMessage = capitalizeFirstLetter(`${key}: ${errors[key][0]}`);
			}
		}

		return nestedMessage || '';
	}

	if (result.type !== 'success' || !result.data) return '';

	const formData = result.data.form;
	if (!formData.valid) return '';
}
