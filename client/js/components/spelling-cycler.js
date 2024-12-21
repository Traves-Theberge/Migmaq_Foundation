export class SpellingCycler {
    constructor() {
        this.spellings = [
            "Mi'gmaq",
            "Mi'kmaq",
            "Mi'kmaw",
            "Míkmaq",
            "Miꞌkmaqi",
            "Micmac"
        ];
        this.currentIndex = 0;
        this.spellingElement = document.getElementById('cycling-spelling');
    }

    init() {
        this.spellingElement.classList.add('fall-active');
        setInterval(() => this.updateSpelling(), 3000);
    }

    updateSpelling() {
        this.spellingElement.classList.add('fall-exit');
        
        setTimeout(() => {
            this.currentIndex = (this.currentIndex + 1) % this.spellings.length;
            this.spellingElement.textContent = this.spellings[this.currentIndex];
            this.spellingElement.classList.remove('fall-exit');
            this.spellingElement.classList.add('fall-enter');
            
            // Force reflow
            this.spellingElement.offsetHeight;
            
            this.spellingElement.classList.remove('fall-enter');
            this.spellingElement.classList.add('fall-active');
        }, 500);
    }
} 