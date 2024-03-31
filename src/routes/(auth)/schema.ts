import { z } from 'zod';

export const authSchema = z.object({
	email: z.string().max(100, 'Max 100 characters').email(),
	password: z
		.string()
		.max(50, {
			message: 'Max 50 characters'
		})
		.min(1, 'Required'),
	browserHash: z.string().optional(),
	isIncognitoMode: z.boolean().optional().default(false),
	landingPage: z.string().optional(),
	referralSiteUrl: z.string().optional()
});

export type AuthSchema = typeof authSchema;
