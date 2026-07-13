"use client";

import { StoryBook } from '@dictionary-ui/react';
import { demoBook, glosses } from './demo-book';

export default function StoryBookPreview() {
    return <StoryBook book={demoBook} glosses={glosses} />;
}
