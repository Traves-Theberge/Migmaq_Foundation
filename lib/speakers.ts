export const SPEAKER_NAMES: Record<string, string> = {
    dmm: 'Speaker DMM',
    ewm: 'Speaker EWM',
    jnw: 'Speaker JNW',
};

export const speakerLabel = (s: string) => SPEAKER_NAMES[s] ?? `Speaker ${s.toUpperCase()}`;
