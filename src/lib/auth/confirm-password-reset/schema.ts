import { authSchema } from '$lib/auth/schema';
import { z } from 'zod';

export const formSchema = authSchema
	.omit({
		email: true
	})
	.extend({
		confirmPassword: z
			.string()
			.max(50, {
				message: 'Max 50 characters'
			})
			.min(1, 'Required')
	});

export type FormSchema = typeof formSchema;
