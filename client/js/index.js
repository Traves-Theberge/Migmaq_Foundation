import { initializeTheme } from './utils/theme-toggle.js';
import { SpellingCycler } from './components/spelling-cycler.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initializeTheme();
    
    // Initialize spelling cycler
    const spellingCycler = new SpellingCycler();
    spellingCycler.init();
});
