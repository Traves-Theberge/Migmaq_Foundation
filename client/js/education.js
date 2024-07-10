document.addEventListener('DOMContentLoaded', function() {
    const wordOfTheDayContainer = document.getElementById('word-of-the-day-container');

    // Function to fetch the word of the day from the server
    function fetchWordOfTheDay() {
        fetch('/api/word-of-the-day')
            .then(response => response.json())
            .then(data => {
                displayWordOfTheDay(data);
            })
            .catch(error => {
                console.error('Error fetching word of the day:', error);
                wordOfTheDayContainer.innerHTML = '<p class="text-red-500">Error fetching word of the day. Please try again later.</p>';
            });
    }

    // Function to display the word of the day in the HTML
    function displayWordOfTheDay(word) {
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

    // Fetch and display the word of the day when the page loads
    fetchWordOfTheDay();
});
