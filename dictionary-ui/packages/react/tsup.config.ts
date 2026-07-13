import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/styles.css'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'react-pageflip', 'canvas-confetti'],
    banner: { js: '"use client";' },
});
