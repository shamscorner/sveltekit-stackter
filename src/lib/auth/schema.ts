import { z } from 'zod';

export const authSchema = z.object({
	email: z
		.string({ required_error: 'Required' })
		.min(1, 'Required')
		.max(100, 'Max 100 characters')
		.email('Invalid email'),
	password: z
		.string({ required_error: 'Required' })
		.min(1, 'Required')
		.min(8, 'Must be more than 8 characters')
		.max(32, 'Must be less than 32 characters'),
	browserHash: z.string().optional(),
	isIncognitoMode: z.boolean().optional().default(false),
	landingPage: z.string().optional(),
	referralSiteUrl: z.string().optional()
});

export type AuthSchema = typeof authSchema;
