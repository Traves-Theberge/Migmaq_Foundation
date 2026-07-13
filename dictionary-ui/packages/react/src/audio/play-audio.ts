"use client";

/**
 * Shared audio playback for recordings.
 *
 * Two problems this solves:
 *  - On some systems (notably Linux/PipeWire) the audio output device is
 *    suspended until the first sound, clipping the start of the first clip.
 *    A short burst of silence on the first user interaction wakes it up.
 *  - `new Audio(url).play()` without a kept reference can be garbage-collected
 *    mid-playback; the module holds the current element.
 *
 * Framework-agnostic — takes only a playable URL, no project-specific data
 * shape (manifest format, API routes, etc.) baked in.
 */

const STOP_EVENT = 'dictionary-ui-audio-play';

// 0.3s of silence as a tiny WAV data URI (44-byte header + zeroed samples).
const SILENCE = (() => {
    const rate = 8000;
    const seconds = 0.3;
    const samples = Math.floor(rate * seconds);
    const buf = new ArrayBuffer(44 + samples * 2);
    const v = new DataView(buf);
    const str = (o: number, s: string) => {
        for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
    };
    str(0, 'RIFF'); v.setUint32(4, 36 + samples * 2, true); str(8, 'WAVE');
    str(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    str(36, 'data'); v.setUint32(40, samples * 2, true);
    let b = '';
    new Uint8Array(buf).forEach((byte) => { b += String.fromCharCode(byte); });
    return 'data:audio/wav;base64,' + btoa(b);
})();

let warmed = false;
let current: HTMLAudioElement | null = null;

async function warmUp() {
    if (warmed) return;
    warmed = true;
    try {
        const s = new Audio(SILENCE);
        s.volume = 1; // real (silent) samples must reach the sink to resume it
        await s.play();
        await new Promise((r) => setTimeout(r, 250));
    } catch {
        /* autoplay rejection etc. — playback below still works */
    }
}

/** Stop whatever is playing (also fired by other players via the stop event). */
export function stopAudio() {
    current?.pause();
    current = null;
}

if (typeof window !== 'undefined') {
    window.addEventListener(STOP_EVENT, () => {
        current?.pause();
        current = null;
    });
}

/**
 * Play a recording. Returns the HTMLAudioElement so callers can track
 * ended/error state. Any other playing recording is stopped first.
 */
export async function playRecording(url: string): Promise<HTMLAudioElement> {
    window.dispatchEvent(new CustomEvent(STOP_EVENT));
    await warmUp();
    const audio = new Audio(url);
    audio.preload = 'auto';
    current = audio;
    const clear = () => { if (current === audio) current = null; };
    audio.addEventListener('ended', clear);
    audio.addEventListener('error', clear);
    await audio.play();
    return audio;
}
