import '../openapi/extend-zod';
import { z } from 'zod';

/**
 * Validates app/admin/users/actions.ts's updateUserRoleAction form data.
 * Not an OpenAPI-documented endpoint — this backs a Server Action, not a
 * stable HTTP contract. The role enum is the application-layer half of the
 * guard; supabase/migrations/0006_super_admin.sql's prevent_role_escalation
 * trigger is the enforcement that actually matters (this only produces a
 * friendlier form error before that trigger would otherwise reject it).
 */
export const UpdateUserRoleSchema = z.object({
    userId: z.string().uuid('Missing user id.'),
    role: z.enum(['editor', 'admin', 'super_admin'], { message: 'Choose a valid role.' }),
});
