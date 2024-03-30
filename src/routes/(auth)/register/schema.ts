import { z } from 'zod';
import { authSchema } from '../schema';

export const formSchema = authSchema.extend({
	name: z.string().max(150, 'Max 150 characters').min(1, 'Required')
});

export type FormSchema = typeof formSchema;
