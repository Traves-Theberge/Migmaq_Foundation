document.addEventListener('DOMContentLoaded', function() {
    const wordOfTheDayContainer = document.getElementById('word-of-the-day-container');

    // Fetch and display word of the day
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

    // Function to display word of the day
    function displayWordOfTheDay(word) {
        wordOfTheDayContainer.innerHTML = `
            <h3 class="text-2xl font-bold mb-2">${word.word}</h3>
            <p class="text-lg mb-4"><strong>Part of Speech:</strong> ${word.type}</p>
            <p class="text-lg mb-4"><strong>Definitions:</strong> ${word.definitions.join(', ')}</p>
            <div>
                <h4 class="text-xl font-semibold mb-2">Translations:</h4>
                <ul class="list-disc list-inside">
                    ${word.usages.map(usage => `<li><strong>Mi'gmaq:</strong> ${usage.translation}, <strong>English:</strong> ${usage.english}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    fetchWordOfTheDay();
});
