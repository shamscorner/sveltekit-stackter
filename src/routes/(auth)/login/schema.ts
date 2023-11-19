import { z } from 'zod';

export const formSchema = z.object({
	email: z.string().max(100, 'Max 100 characters').email(),
	password: z
		.string()
		.max(50, {
			message: 'Max 50 characters'
		})
		.min(1, 'Required'),
	userAgent: z.string().optional(),
	browserHash: z.string().optional(),
	isIncognitoMode: z.boolean().optional().default(false)
});

export type FormSchema = typeof formSchema;
