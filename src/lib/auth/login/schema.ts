import { authSchema } from '$lib/auth/schema';

export const formSchema = authSchema;

export type FormSchema = typeof formSchema;
