document.addEventListener('DOMContentLoaded', function() {
    const wordOfTheDayContainer = document.getElementById('word-of-the-day-container');

    function fetchWordOfTheDay() {
        fetch('/api/word-of-the-day')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                console.log('Fetched word of the day:', data);
                displayWordOfTheDay(data);
            })
            .catch(error => {
                console.error('Error fetching word of the day:', error);
                wordOfTheDayContainer.innerHTML = '<p class="text-red-500">Error fetching word of the day. Please try again later.</p>';
            });
    }

    function displayWordOfTheDay(word) {
        if (!word || !word.word || !word.type || !word.definitions || !word.translations || !word.usages) {
            console.error('Invalid word data:', word);
            wordOfTheDayContainer.innerHTML = '<p class="text-red-500">Error displaying word of the day. Invalid data format.</p>';
            return;
        }

        wordOfTheDayContainer.innerHTML = `
            <h3 class="text-3xl font-extrabold mb-6 text-white">${word.word}</h3>
            <div class="mb-6">
                <p class="text-2xl font-semibold mb-2">Part of Speech:</p>
                <p class="text-xl">${word.type}</p>
            </div>
            <div class="mb-6">
                <p class="text-2xl font-semibold mb-2">Definitions:</p>
                <p class="text-xl">${word.definitions.join(', ')}</p>
            </div>
            <div class="mb-6">
                <p class="text-2xl font-semibold mb-2">Translations:</p>
                <div class="space-y-4">
                    ${word.translations.map(translation => `<p class="text-xl">${translation}</p>`).join('')}
                </div>
            </div>
            <div class="mb-6">
                <p class="text-2xl font-semibold mb-2">Usages:</p>
                <div class="space-y-4">
                    ${word.usages.map(usage => `
                        <div class="mb-6">
                            <p class="text-xl font-semibold mb-2">Mi'gmaq:</p>
                            <p class="text-xl mb-4">${usage.translation}</p>
                            <p class="text-xl font-semibold mb-2">English:</p>
                            <p class="text-xl">${usage.english}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    fetchWordOfTheDay();
});
