import type { BookDefinition } from './types';
import { muinMuin } from './muin-muin';

/** Add new books here — this is the only edit a new book needs beyond its own data file. */
export const BOOKS: BookDefinition[] = [muinMuin];

export function getBook(slug: string): BookDefinition | undefined {
    return BOOKS.find((b) => b.slug === slug);
}
