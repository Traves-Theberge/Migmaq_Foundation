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
                description: "In Mi'gmaq culture, greetings are important for establishing connection. Common greetings help build relationships and show respect."
            },
            {
                type: 'vocabulary',
                term: "Pusu'l",
                translation: "Hello / Greetings",
                pronunciation: "Poo-sool",
                description: "A traditional greeting used to welcome someone."
            },
            {
                type: 'vocabulary',
                term: "Wela'lin",
                translation: "Thank you",
                pronunciation: "Wel-ah-lin",
                description: "Used to express gratitude to one person."
            },
            {
                type: 'info',
                description: "These basic greetings are essential for respectful communication in Mi'gmaq. Practice using them when meeting others!"
            }
        ]
    },
    {
        id: 'numbers',
        title: 'Numbers (1-10)',
        description: 'Learn to count from one to ten in Mi\'gmaq.',
        icon: 'Hash',
        color: 'bg-secondary',
        steps: [
            {
                type: 'info',
                description: "Numbers are fundamental to any language. In Mi'gmaq, counting is used in daily life, ceremonies, and storytelling."
            },
            {
                type: 'vocabulary',
                term: "newt",
                translation: "One",
                pronunciation: "newt",
                description: "The number 1."
            },
            {
                type: 'vocabulary',
                term: "ta'pu",
                translation: "Two",
                pronunciation: "dah-boo",
                description: "The number 2."
            },
            {
                type: 'vocabulary',
                term: "si'st",
                translation: "Three",
                pronunciation: "seest",
                description: "The number 3."
            },
            {
                type: 'vocabulary',
                term: "ne'w",
                translation: "Four",
                pronunciation: "nay-oo",
                description: "The number 4."
            },
            {
                type: 'vocabulary',
                term: "na'n",
                translation: "Five",
                pronunciation: "nahn",
                description: "The number 5."
            },
            {
                type: 'vocabulary',
                term: "as'gom",
                translation: "Six",
                pronunciation: "ahs-gom",
                description: "The number 6."
            },
            {
                type: 'vocabulary',
                term: "lluigneg",
                translation: "Seven",
                pronunciation: "loo-ig-neg",
                description: "The number 7."
            },
            {
                type: 'vocabulary',
                term: "ugumuljin",
                translation: "Eight",
                pronunciation: "oo-goo-mool-jin",
                description: "The number 8."
            },
            {
                type: 'vocabulary',
                term: "pesgunateg",
                translation: "Nine",
                pronunciation: "pes-goo-nah-teg",
                description: "The number 9."
            },
            {
                type: 'vocabulary',
                term: "newtisga'q",
                translation: "Ten",
                pronunciation: "newt-is-gahk",
                description: "The number 10."
            },
            {
                type: 'info',
                description: "Practice counting from newt to newtisga'q! Numbers are used everywhere in daily life."
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
                type: 'info',
                description: "Family is central to Mi'gmaq culture. These words help you talk about your loved ones."
            },
            {
                type: 'vocabulary',
                term: "giju'",
                translation: "Mother / Mom",
                pronunciation: "gee-joo",
                description: "The word for mother."
            },
            {
                type: 'vocabulary',
                term: "tata't",
                translation: "Father / Dad",
                pronunciation: "tah-taht",
                description: "The word for father."
            },
            {
                type: 'vocabulary',
                term: "uggwe'ji'jl",
                translation: "Younger sister",
                pronunciation: "oog-way-jee-jil",
                description: "Term for a younger sister."
            },
            {
                type: 'vocabulary',
                term: "ugjignaml",
                translation: "Younger brother",
                pronunciation: "oog-jig-naml",
                description: "Term for a younger brother."
            },
            {
                type: 'vocabulary',
                term: "nmi'",
                translation: "Grandmother / Granny",
                pronunciation: "n-mee",
                description: "Term of affection for grandmother."
            },
            {
                type: 'vocabulary',
                term: "nemijgami'",
                translation: "Grandfather / Grampa",
                pronunciation: "neh-mij-gah-mee",
                description: "Term of respect for grandfather."
            },
            {
                type: 'info',
                description: "Family relationships are honored in Mi'gmaq culture. Use these words with respect and love."
            }
        ]
    },
    {
        id: 'animals',
        title: 'Animals',
        description: 'Learn names of common animals.',
        icon: 'Squirrel',
        color: 'bg-primary',
        steps: [
            {
                type: 'info',
                description: "Animals play an important role in Mi'gmaq culture and stories. Learning their names connects you to the natural world."
            },
            {
                type: 'vocabulary',
                term: "tia'm",
                translation: "Moose",
                pronunciation: "tee-ahm",
                description: "The largest member of the deer family."
            },
            {
                type: 'vocabulary',
                term: "apli'gmuj",
                translation: "Rabbit / Hare",
                pronunciation: "ah-plee-gmoodge",
                description: "A small furry animal."
            },
            {
                type: 'vocabulary',
                term: "plamu",
                translation: "Salmon",
                pronunciation: "plah-moo",
                description: "An important fish in Mi'gmaq culture."
            },
            {
                type: 'vocabulary',
                term: "ji'nm",
                translation: "Man",
                pronunciation: "jee-nm",
                description: "A male person."
            },
            {
                type: 'info',
                description: "These animals are part of Mi'gmaq traditional knowledge and stories passed down through generations."
            }
        ]
    },
    {
        id: 'nature',
        title: 'Nature',
        description: 'Words for natural elements.',
        icon: 'Trees',
        color: 'bg-secondary',
        steps: [
            {
                type: 'info',
                description: "The natural world is sacred in Mi'gmaq culture. These words help you describe the environment around you."
            },
            {
                type: 'vocabulary',
                term: "samqwan",
                translation: "Water",
                pronunciation: "sahm-kwahn",
                description: "Essential element of life."
            },
            {
                type: 'vocabulary',
                term: "gmu'j",
                translation: "Wood / Stick",
                pronunciation: "gmoodge",
                description: "Wood or a piece of lumber."
            },
            {
                type: 'vocabulary',
                term: "wape'g",
                translation: "White",
                pronunciation: "wah-peg",
                description: "The color white."
            },
            {
                type: 'info',
                description: "Understanding nature words helps you appreciate Mi'gmaq connection to the land and environment."
            }
        ]
    }
];
