document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const word = queryParams.get('word'); // Get the 'word' query parameter from the URL

    if (!word) {
        console.error('No word parameter found in URL.');
        return;
    }

    // Get references to HTML elements
    const wordDetailsContainer = document.getElementById('word-details-container');

    // Fetch and display word details
    fetchWordDetails(word).finally(() => {
        // Hide preloader after word details are loaded
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    });

    // Add event listener for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        applyTheme();
    });

    applyTheme(); // Apply the initial theme

    // Function to fetch word details from the server
    function fetchWordDetails(word) {
        return fetch(`/api/word-details?word=${encodeURIComponent(word)}`)
            .then(response => response.json())
            .then(wordDetails => {
                displayWordDetails(wordDetails);
                return wordDetails;
            })
            .catch(error => {
                console.error('Error fetching word details:', error);
                displayError();
            });
    }

    // Function to display word details in the HTML
    function displayWordDetails(wordDetails) {
        const wordHTML = `
            <div class="word-item rounded-md">
                <h2 class="text-3xl font-bold mb-6 text-center">${wordDetails.word}</h2>
                <div class="mb-6">
                    <strong class="block text-xl mb-3">Part of Speech:</strong>
                    <span class="block text-lg">${wordDetails.type}</span>
                </div>
                <div class="mb-6">
                    <strong class="block text-xl mb-3">English Definitions:</strong>
                    <ul class="list-disc list-inside text-lg">
                        ${wordDetails.definitions.map(def => `<li>${def}</li>`).join('')}
                    </ul>
                </div>
                <div class="mb-6">
                    <strong class="block text-xl mb-3">Translations:</strong>
                    <ul class="text-lg">
                        ${wordDetails.usages.map(usage => `
                            <li class="mb-4">
                                <strong>Mi'gmaq Translation:</strong> ${usage.translation}<br>
                                <strong>English Translation:</strong> ${usage.english}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        wordDetailsContainer.innerHTML = wordHTML;
        applyTheme(); // Apply theme to newly added elements
    }

    // Function to display an error message
    function displayError() {
        wordDetailsContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching word details. Please try again later.</p>';
    }

    // Function to apply the current theme (dark or light)
    function applyTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const themeToggleIcon = document.getElementById('theme-toggle');
        const githubIcon = document.querySelector('.icon[src*="github"]');

        // Update the theme toggle icon
        themeToggleIcon.src = isDarkMode
            ? 'https://img.icons8.com/ios-glyphs/30/ffffff/moon-symbol.png'
            : 'https://img.icons8.com/ios-glyphs/30/000000/sun.png';

        // Update the GitHub icon color
        githubIcon.src = isDarkMode
            ? 'https://img.icons8.com/material-outlined/24/ffffff/github.png'
            : 'https://img.icons8.com/material-outlined/24/000000/github.png';

        // Update the navbar classes
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('dark-mode', isDarkMode);
        navbar.classList.toggle('light-mode', !isDarkMode);

        // Set the background color for HTML and body elements
        document.documentElement.style.backgroundColor = isDarkMode ? '#1a202c' : '#f9f9f9';
        document.body.style.backgroundColor = isDarkMode ? '#1a202c' : '#f9f9f9';

        // Update text and background colors for various sections
        document.querySelectorAll('.word-item, .container > section').forEach(item => {
            item.style.backgroundColor = isDarkMode ? '#2d3748' : '#f7fafc';
            item.style.color = isDarkMode ? '#f9f9f9' : '#1a202c';
            item.classList.add('rounded-md');
        });

        document.querySelectorAll('input, textarea').forEach(input => {
            input.style.backgroundColor = isDarkMode ? '#2d3748' : '#f7fafc';
            input.style.color = isDarkMode ? '#f9f9f9' : '#1a202c';
        });
    }
});
