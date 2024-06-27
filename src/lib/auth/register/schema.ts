import { z } from 'zod';

import { authSchema } from '$lib/auth/schema';

export const formSchema = authSchema.extend({
	name: z.string().max(150, 'Max 150 characters').min(1, 'Required')
});

export type FormSchema = typeof formSchema;

export const resendEmailFormSchema = z.object({
	email: z.string().max(100, 'Max 100 characters').email()
});
export type ResendEmailFormSchema = typeof resendEmailFormSchema;
