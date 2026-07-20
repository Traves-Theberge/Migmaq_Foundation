#!/usr/bin/env -S npx tsx
/**
 * Validate lib/lessons/* data against itself and against the real
 * dictionary/audio data it's supposed to be drawn from.
 *
 * Hard errors (exit 1): duplicate lesson ids, duplicate category ids,
 * vocabulary/phrase steps missing a term or translation, vocabulary
 * steps whose term isn't a real dictionary headword.
 *
 * Warnings (exit 0): vocabulary/phrase steps with no speaker recording
 * in the audio manifest — expected for brand-new lessons not yet
 * recorded, but worth surfacing.
 *
 * Usage: npm run data:validate-lessons
 */
import { lessonCategories } from '../lib/lessons/index';
import { wordExists } from '../lib/dictionary';
import { getRecordings } from '../lib/audio';

async function main() {
    const errors: string[] = [];
    const warnings: string[] = [];

    const seenCategoryIds = new Set<string>();
    const seenLessonIds = new Set<string>();

    for (const category of lessonCategories) {
        if (seenCategoryIds.has(category.id)) {
            errors.push(`Duplicate category id: "${category.id}"`);
        }
        seenCategoryIds.add(category.id);

        for (const lesson of category.lessons) {
            const lessonRef = `${category.id}/${lesson.id}`;

            if (seenLessonIds.has(lesson.id)) {
                errors.push(`Duplicate lesson id: "${lesson.id}" (in ${lessonRef})`);
            }
            seenLessonIds.add(lesson.id);

            if (lesson.steps.length === 0) {
                errors.push(`${lessonRef}: has no steps`);
            }

            for (const [i, step] of lesson.steps.entries()) {
                const stepRef = `${lessonRef} step ${i + 1} (${step.type})`;

                if (step.type === 'info' && !step.description?.trim()) {
                    errors.push(`${stepRef}: info step has no description`);
                    continue;
                }

                if (step.type === 'vocabulary' || step.type === 'phrase') {
                    if (!step.term?.trim()) {
                        errors.push(`${stepRef}: missing term`);
                        continue;
                    }
                    if (!step.translation?.trim()) {
                        errors.push(`${stepRef}: "${step.term}" has no translation`);
                    }

                    if (step.type === 'vocabulary') {
                        const exists = await wordExists(step.term);
                        if (!exists) {
                            errors.push(`${stepRef}: "${step.term}" is not a dictionary headword`);
                        }
                    }

                    const recordings = await getRecordings(step.term);
                    if (recordings.length === 0) {
                        warnings.push(`${stepRef}: "${step.term}" has no audio recordings`);
                    }
                }
            }
        }
    }

    const totalLessons = lessonCategories.reduce((n, c) => n + c.lessons.length, 0);
    console.log(`Checked ${totalLessons} lessons across ${lessonCategories.length} categories.\n`);

    if (warnings.length > 0) {
        console.log(`${warnings.length} warning(s):`);
        warnings.forEach((w) => console.log(`  ⚠ ${w}`));
        console.log('');
    }

    if (errors.length > 0) {
        console.log(`${errors.length} error(s):`);
        errors.forEach((e) => console.log(`  ✖ ${e}`));
        process.exitCode = 1;
    } else {
        console.log('No errors.');
    }
}

main();
