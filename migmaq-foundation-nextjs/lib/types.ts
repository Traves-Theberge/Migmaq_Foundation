export interface Usage {
    translation: string;
    english: string;
}

export interface Word {
    word: string;
    type?: string;
    definitions: string[];
    translations?: string[];
    usages?: Usage[];
    audio?: string;
}
