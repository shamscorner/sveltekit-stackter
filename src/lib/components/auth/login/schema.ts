import { authSchema } from '$lib/components/auth/schema';

export const formSchema = authSchema;

export type FormSchema = typeof formSchema;
