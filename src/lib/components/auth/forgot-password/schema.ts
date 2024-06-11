import { authSchema } from '$lib/components/auth/schema';

export const formSchema = authSchema.omit({ password: true });

export type FormSchema = typeof formSchema;
