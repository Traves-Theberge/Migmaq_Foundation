/**
 * Hand-written to match supabase/migrations/0001_init_schema.sql through
 * 0009_performance_indexes.sql exactly (indexes/RLS-only migrations don't
 * change this file's shape). Once a live project exists, prefer
 * regenerating this with `supabase gen types typescript` and diffing
 * against this file — but keep the shape identical either way, since
 * lib/supabase/server.ts and client.ts are typed against it.
 *
 * `Relationships: []` on every table and `Views`/`Functions` on the schema
 * are required by @supabase/postgrest-js's GenericTable/GenericSchema
 * constraints — omitting them doesn't error at this file, it silently
 * degrades every `.from(...)` call elsewhere to `never` row types.
 */

export type AppRole = 'admin' | 'editor' | 'super_admin';
export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type LessonStepType = 'vocabulary' | 'phrase' | 'info';
export type RecordingKind = 'word' | 'example';
export type AuditAction = 'insert' | 'update' | 'delete';

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    role: AppRole;
                    avatar_url: string | null;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    role?: AppRole;
                    avatar_url?: string | null;
                };
                Update: {
                    role?: AppRole;
                    avatar_url?: string | null;
                };
                Relationships: [];
            };
            dictionary_words: {
                Row: {
                    id: string;
                    word: string;
                    type: string | null;
                    definitions: string[];
                    translations: string[];
                    fr_definitions: string[] | null;
                    fr_translations: string[] | null;
                    fr_reviewed: boolean;
                    pronunciation_guide: string | null;
                    alternate_forms: string[] | null;
                    document_references: string[] | null;
                    entry_url: string | null;
                    created_at: string;
                    updated_at: string;
                    created_by: string | null;
                    updated_by: string | null;
                };
                Insert: {
                    word: string;
                    type?: string | null;
                    definitions?: string[];
                    translations?: string[];
                    fr_definitions?: string[] | null;
                    fr_translations?: string[] | null;
                    fr_reviewed?: boolean;
                    pronunciation_guide?: string | null;
                    alternate_forms?: string[] | null;
                    document_references?: string[] | null;
                    entry_url?: string | null;
                };
                Update: Partial<Database['public']['Tables']['dictionary_words']['Insert']>;
                Relationships: [];
            };
            dictionary_word_usages: {
                Row: {
                    id: string;
                    word_id: string;
                    sort_order: number;
                    migmaq: string;
                    english: string;
                    french: string | null;
                };
                Insert: {
                    word_id: string;
                    sort_order?: number;
                    migmaq: string;
                    english: string;
                    french?: string | null;
                };
                Update: Partial<Database['public']['Tables']['dictionary_word_usages']['Insert']>;
                Relationships: [];
            };
            lesson_categories: {
                Row: {
                    id: string;
                    title: string;
                    description: string | null;
                    icon: string | null;
                    color: string | null;
                    sort_order: number;
                    created_at: string;
                    updated_at: string;
                    created_by: string | null;
                    updated_by: string | null;
                };
                Insert: {
                    id: string;
                    title: string;
                    description?: string | null;
                    icon?: string | null;
                    color?: string | null;
                    sort_order?: number;
                };
                Update: Partial<Database['public']['Tables']['lesson_categories']['Insert']>;
                Relationships: [];
            };
            lessons: {
                Row: {
                    id: string;
                    category_id: string;
                    title: string;
                    description: string | null;
                    difficulty: LessonDifficulty;
                    estimated_minutes: number | null;
                    sort_order: number;
                    created_at: string;
                    updated_at: string;
                    created_by: string | null;
                    updated_by: string | null;
                };
                Insert: {
                    id: string;
                    category_id: string;
                    title: string;
                    description?: string | null;
                    difficulty?: LessonDifficulty;
                    estimated_minutes?: number | null;
                    sort_order?: number;
                };
                Update: Partial<Database['public']['Tables']['lessons']['Insert']>;
                Relationships: [];
            };
            lesson_steps: {
                Row: {
                    id: string;
                    lesson_id: string;
                    sort_order: number;
                    type: LessonStepType;
                    term: string | null;
                    translation: string | null;
                    pronunciation: string | null;
                    description: string | null;
                };
                // Not a discriminated union: the DB's lesson_steps_shape
                // check constraint (0001) requires 'info' steps to carry
                // only `description`, and 'vocabulary'/'phrase' steps to
                // carry both `term` and `translation` — this type doesn't
                // encode that, so an invalid combination still type-checks
                // here. The real enforcement is
                // lib/validation/admin-lessons.ts's LessonStepFormSchema
                // (superRefine mirrors the same rule with a friendly Zod
                // error) in front of the DB constraint itself as the
                // backstop; a discriminated union here would need the Zod
                // schema to produce a matching discriminated output type
                // to avoid fighting itself at every call site.
                Insert: {
                    lesson_id: string;
                    sort_order?: number;
                    type: LessonStepType;
                    term?: string | null;
                    translation?: string | null;
                    pronunciation?: string | null;
                    description?: string | null;
                };
                Update: Partial<Database['public']['Tables']['lesson_steps']['Insert']>;
                Relationships: [];
            };
            books: {
                Row: {
                    slug: string;
                    title: unknown; // LineToken[] jsonb — see lib/books/types.ts
                    subtitle: string;
                    teaser: string | null;
                    cover_image_alt: string | null;
                    cover_image_url: string | null;
                    note: string | null;
                    gloss_overrides: unknown;
                    sort_order: number;
                    created_at: string;
                    updated_at: string;
                    created_by: string | null;
                    updated_by: string | null;
                };
                Insert: {
                    slug: string;
                    title: unknown;
                    subtitle: string;
                    teaser?: string | null;
                    cover_image_alt?: string | null;
                    cover_image_url?: string | null;
                    note?: string | null;
                    gloss_overrides?: unknown;
                    sort_order?: number;
                };
                Update: Partial<Database['public']['Tables']['books']['Insert']>;
                Relationships: [];
            };
            book_pages: {
                Row: {
                    id: string;
                    book_slug: string;
                    sort_order: number;
                    label: string;
                    lines: unknown; // BookLine[] jsonb
                    image_alt: string;
                    image_url: string | null;
                };
                Insert: {
                    book_slug: string;
                    sort_order?: number;
                    label: string;
                    lines?: unknown;
                    image_alt: string;
                    image_url?: string | null;
                };
                Update: Partial<Database['public']['Tables']['book_pages']['Insert']>;
                Relationships: [];
            };
            audio_recordings: {
                Row: {
                    id: string;
                    word: string;
                    file: string;
                    speaker: string;
                    kind: RecordingKind;
                    url: string;
                    created_at: string;
                };
                Insert: {
                    word: string;
                    file: string;
                    speaker: string;
                    kind: RecordingKind;
                    url: string;
                };
                Update: Partial<Database['public']['Tables']['audio_recordings']['Insert']>;
                Relationships: [];
            };
            audit_log: {
                Row: {
                    id: string;
                    table_name: string;
                    record_id: string;
                    action: AuditAction;
                    actor_id: string | null;
                    actor_email: string | null;
                    diff: unknown;
                    created_at: string;
                };
                // Written only by the audit_log_capture() trigger — RLS has no
                // write policy for any role, so a client-side insert/update
                // would be rejected regardless of what TypeScript allows here.
                Insert: Record<string, never>;
                Update: Record<string, never>;
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
    };
}
