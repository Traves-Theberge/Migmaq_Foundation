document.addEventListener('DOMContentLoaded', function() {
    const memoryGame = document.getElementById('memory-game');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    // Function to fetch game data from the server
    async function fetchGameData() {
        try {
            const response = await fetch('/api/games/flashcard');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching game data:', error);
            return null;
        }
    }

    // Function to create memory cards
    function createMemoryCards(words) {
        memoryGame.innerHTML = ''; // Clear existing cards
        matchedPairs = 0; // Reset matched pairs count
        words.forEach(wordObj => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.framework = wordObj.word;

            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            frontFace.innerHTML = `<div class="word">${wordObj.word}</div><div class="definition">${wordObj.definition}</div>`;

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');
            backFace.textContent = '?'; // Placeholder symbol

            card.appendChild(frontFace);
            card.appendChild(backFace);

            card.addEventListener('click', flipCard);
            memoryGame.appendChild(card);
        });

        // Shuffle the cards
        (function shuffle() {
            const cards = document.querySelectorAll('.memory-card');
            cards.forEach(card => {
                let randomPos = Math.floor(Math.random() * 12);
                card.style.order = randomPos;
            });
        })();
    }

    // Function to flip a card
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Function to check if two cards match
    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
    }

    // Function to disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('glow');
        secondCard.classList.add('glow');
        matchedPairs += 1; // Increment matched pairs count
        if (matchedPairs === 6) { // All pairs matched
            setTimeout(restartGame, 1500); // Restart game after a short delay
        }
        resetBoard();
    }

    // Function to unflip unmatched cards
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    // Function to reset the board
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Function to restart the game
    async function restartGame() {
        const gameData = await fetchGameData();
        if (gameData) {
            createMemoryCards(gameData);
        } else {
            memoryGame.innerHTML = '<p class="text-red-500">Failed to load game data. Please try again later.</p>';
        }
    }

    // Initialize the game
    async function init() {
        await restartGame();
        applyTheme(); // Apply the current theme initially
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        applyTheme();
    });

    function applyTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        document.querySelectorAll('.memory-card').forEach(card => {
            card.style.backgroundColor = isDarkMode ? '#2d3748' : '#f7fafc';
            card.style.color = isDarkMode ? '#f9f9f9' : '#1a202c';
        });
    }

    init();
});
