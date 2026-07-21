import '../openapi/extend-zod';
import { z } from 'zod';

/**
 * Validates app/admin/login/actions.ts's signInAction form data. Not
 * registered with the OpenAPI registry — this backs a Server Action
 * (a same-origin form POST with no stable JSON contract), not a
 * documented HTTP endpoint.
 */
export const SignInFormSchema = z.object({
    email: z.string().trim().min(1, 'Enter your email and password.').email('Enter your email and password.'),
    password: z.string().min(1, 'Enter your email and password.'),
    next: z
        .string()
        .default('/admin')
        .transform((v) => (v.startsWith('/admin') ? v : '/admin')),
});

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

/** Validates app/admin/actions.ts's uploadAvatarAction form data. Not an OpenAPI-documented endpoint — same reasoning as SignInFormSchema. */
export const AvatarUploadFormSchema = z.object({
    file: z
        .instanceof(File, { message: 'Choose an image first.' })
        .refine((f) => f.size > 0, 'Choose an image first.')
        .refine((f) => f.type.startsWith('image/'), "That file isn't an image.")
        .refine((f) => f.size <= MAX_AVATAR_BYTES, 'Image must be 5MB or smaller.'),
    userId: z.string().uuid('Missing user id.'),
});
