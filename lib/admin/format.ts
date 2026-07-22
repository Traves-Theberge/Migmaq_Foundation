/** Coarse relative-time label ("14m ago", "3h ago", "2d ago") used across the admin dashboard's activity feeds. */
export function relativeTime(iso: string): string {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.round(diffMs / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.round(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.round(hours / 24)}d ago`;
}

export const AUDIT_ACTION_LABEL: Record<string, string> = {
    insert: 'Created',
    update: 'Updated',
    delete: 'Deleted',
};

export const AUDIT_TABLE_LABEL: Record<string, string> = {
    dictionary_words: 'Dictionary word',
    dictionary_word_usages: 'Dictionary usage example',
    lesson_categories: 'Lesson category',
    lessons: 'Lesson',
    lesson_steps: 'Lesson step',
    books: 'Storybook',
    book_pages: 'Storybook page',
    audio_recordings: 'Audio recording',
    profiles: 'User profile',
};
