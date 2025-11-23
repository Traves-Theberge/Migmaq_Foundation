export interface LessonStep {
    type: 'vocabulary' | 'phrase' | 'info';
    term?: string;
    translation?: string;
    pronunciation?: string;
    description?: string;
    image?: string;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    icon: string; // Lucide icon name or similar
    color: string; // Tailwind class
    steps: LessonStep[];
}

export const lessons: Lesson[] = [
    {
        id: 'greetings',
        title: 'Greetings',
        description: 'Learn how to say hello and introduce yourself.',
        icon: 'Hand',
        color: 'bg-primary',
        steps: [
            {
                type: 'info',
                description: "In Mi'gmaq culture, greetings are important for establishing connection. The most common greeting is 'Kwe''."
            },
            {
                type: 'vocabulary',
                term: "Kwe'",
                translation: "Hello / Hi",
                pronunciation: "Gway",
                description: "A universal greeting used at any time of day."
            },
            {
                type: 'vocabulary',
                term: "Me' tal-wuleyn?",
                translation: "How are you?",
                pronunciation: "Meh dal-woo-layn",
                description: "Asking about someone's well-being."
            },
            {
                type: 'vocabulary',
                term: "Wela'lin",
                translation: "Thank you",
                pronunciation: "Wel-ah-lin",
                description: "Used to express gratitude to one person."
            },
            {
                type: 'phrase',
                term: "Kwe', me' tal-wuleyn?",
                translation: "Hello, how are you?",
                description: "Combining the greeting and the question."
            }
        ]
    },
    {
        id: 'numbers',
        title: 'Numbers (1-5)',
        description: 'Count to five in Mi\'gmaq.',
        icon: 'Hash',
        color: 'bg-secondary',
        steps: [
            {
                type: 'vocabulary',
                term: "Newt",
                translation: "One",
                pronunciation: "Newt",
                description: "The number 1."
            },
            {
                type: 'vocabulary',
                term: "Tapu",
                translation: "Two",
                pronunciation: "Dah-boo",
                description: "The number 2."
            },
            {
                type: 'vocabulary',
                term: "Si'st",
                translation: "Three",
                pronunciation: "Seest",
                description: "The number 3."
            },
            {
                type: 'vocabulary',
                term: "Ne'w",
                translation: "Four",
                pronunciation: "Nay-oo",
                description: "The number 4."
            },
            {
                type: 'vocabulary',
                term: "Na'n",
                translation: "Five",
                pronunciation: "Nahn",
                description: "The number 5."
            }
        ]
    },
    {
        id: 'family',
        title: 'Family',
        description: 'Words for family members.',
        icon: 'Users',
        color: 'bg-accent',
        steps: [
            {
                type: 'vocabulary',
                term: "Ngij",
                translation: "My mother",
                pronunciation: "N-geej",
                description: "Refers to one's own mother."
            },
            {
                type: 'vocabulary',
                term: "Nujj",
                translation: "My father",
                pronunciation: "Nooch",
                description: "Refers to one's own father."
            },
            {
                type: 'vocabulary',
                term: "Nmis",
                translation: "My older sister",
                pronunciation: "N-mees",
                description: "Specific term for an older sister."
            }
        ]
    }
];
