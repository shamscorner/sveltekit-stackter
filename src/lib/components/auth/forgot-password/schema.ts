import { authSchema } from '../schema';

export const formSchema = authSchema.omit({ password: true });

export type FormSchema = typeof formSchema;
