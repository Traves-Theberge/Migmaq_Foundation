// flashcard.js
document.addEventListener('DOMContentLoaded', function() {
    const memoryGame = document.getElementById('memory-game');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

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
        words.forEach(word => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.framework = word.word;

            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            frontFace.textContent = word.word;

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');

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

    // Initialize the game
    async function init() {
        const gameData = await fetchGameData();
        if (gameData) {
            createMemoryCards(gameData);
        } else {
            memoryGame.innerHTML = '<p class="text-red-500">Failed to load game data. Please try again later.</p>';
        }
    }

    init();
});
