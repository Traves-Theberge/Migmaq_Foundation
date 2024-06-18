document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterSelect = document.getElementById('filterSelect');
    const dictionaryContainer = document.getElementById('dictionary-container');

    // Create alphabet letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet.split('').forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letter;
        letterSpan.addEventListener('click', () => filterByLetter(letter));
        alphabetContainer.appendChild(letterSpan);
    });

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        const filter = filterSelect.value;

        if (searchTerm.length === 0) {
            window.location.reload(); // Reload the page if search term is empty
            return;
        }

        fetch(`/dictionary.json?term=${encodeURIComponent(searchTerm)}&filter=${encodeURIComponent(filter)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.words.length === 0) {
                    displayNoResults();
                } else {
                    displayDictionary(data.words);
                }
            })
            .catch(error => {
                console.error('Error fetching or parsing dictionary data:', error);
                displayError();
            });
    });

    function displayDictionary(words) {
        dictionaryContainer.innerHTML = '';

        words.forEach(word => {
            const wordHTML = `
                <div class="word-item bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm mb-4">
                    <p class="text-lg"><strong class="font-semibold">Mi'gmaq Word:</strong> ${word.word}</p>
                    <p><strong class="font-semibold">Part of speech:</strong> ${word.type}</p>
                    <p><strong class="font-semibold">Definitions:</strong> ${word.definitions.join(', ')}</p>
                    <p><strong class="font-semibold">Usage:</strong> ${word.translations.join(', ')}</p>
                </div>
            `;
            dictionaryContainer.innerHTML += wordHTML;
        });
    }

    function filterByLetter(letter) {
        fetch(`/dictionary.json?term=${encodeURIComponent(letter)}&filter=word`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const filteredWords = data.words.filter(word => word.word[0].toUpperCase() === letter);
                if (filteredWords.length === 0) {
                    displayNoResults();
                } else {
                    displayDictionary(filteredWords);
                }
            })
            .catch(error => {
                console.error('Error fetching or parsing dictionary data:', error);
                displayError();
            });
    }

    function displayDictionary(words) {
        dictionaryContainer.innerHTML = '';

        words.forEach(word => {
            const wordHTML = `
                <div class="word-item">
                    <p class="text-lg"><strong class="font-semibold">Mi'gmag:</strong> ${word.word}</p>
                    <p><strong class="font-semibold">Type:</strong> ${word.type}</p>
                    <p><strong class="font-semibold">Definitions:</strong> ${word.definitions.join(', ')}</p>
                    <p><strong class="font-semibold">Translations:</strong> ${word.translations.join(', ')}</p>
                </div>
            `;
            dictionaryContainer.innerHTML += wordHTML;
        });
    }

    function displayNoResults() {
        dictionaryContainer.innerHTML = '<p class="no-results text-red-500 text-center">No results found.</p>';
    }

    function displayError() {
        dictionaryContainer.innerHTML = '<p class="error text-red-500 text-center">Error fetching dictionary data. Please try again later.</p>';
    }
});