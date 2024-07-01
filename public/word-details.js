// Wait for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Extract the 'word' parameter from the URL query string
    const queryParams = new URLSearchParams(window.location.search);
    const word = queryParams.get('word');

    // Check if 'word' parameter is missing
    if (!word) {
        console.error('No word parameter found in URL.');
        return;
    }

    // Get the container where word details will be displayed
    const wordDetailsContainer = document.getElementById('word-details-container');

    // Fetch word details from the backend API
    fetch(`/api/word-details?word=${encodeURIComponent(word)}`)
        .then(response => response.json()) // Parse the JSON response
        .then(wordDetails => {
            // Display word details and initialize the chatbot
            displayWordDetails(wordDetails);
            initializeChatbot(wordDetails);
        })
        .catch(error => {
            // Handle errors if fetching word details fails
            console.error('Error fetching word details:', error);
            displayError();
        });

    // Function to display word details in the HTML
    function displayWordDetails(wordDetails) {
        // Generate HTML content for displaying word details
        const wordHTML = `
            <div class="word-item">
                <div class="p-6 text-white">
                    <h2 class="text-xl font-semibold mb-4">${wordDetails.word}</h2>
                    <div class="mb-4">
                        <strong class="block text-white-600 mb-2">Part of Speech:</strong>
                        <span class="block">${wordDetails.type}</span>
                    </div>
                    <div class="mb-4">
                        <strong class="block text-white-600 mb-2">English Definitions:</strong>
                        <ul class="list-disc list-inside">
                            ${wordDetails.definitions.map(def => `<li>${def}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <strong class="block text-white-600 mb-2">Translations:</strong>
                        <ul>
                            ${wordDetails.usages.map(usage => `
                                <li>
                                    <strong>Mi'gmaq Translation:</strong> ${usage.translation}<br>
                                    <strong>English Translation:</strong> ${usage.english}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        // Create a div element and append the generated HTML to display word details
        const wordDiv = document.createElement("div");
        wordDiv.classList.add("word-item", "min-h-[10rem]", "border", "border-gray-300", "rounded-lg", "p-10", "mb-4");
        wordDiv.innerHTML = wordHTML;
        wordDetailsContainer.appendChild(wordDiv);
    }

    // Function to initialize the chatbot for the word details
    function initializeChatbot(wordDetails) {
        // Create a container for the chatbox and add initial HTML content
        const chatboxContainer = document.createElement('div');
        chatboxContainer.className = 'chatbox-container max-h-80 overflow-y-auto border border-gray-500 rounded-lg p-4';
        chatboxContainer.innerHTML = `
            <ul class="chatbox list space-y-2">
                <li class="chat-incoming chat text-white p-4 rounded-lg border border-gray-500">
                    <p class="text-center">Click the word above for an Fact!</p>
                </li>
            </ul>
        `;
        wordDetailsContainer.appendChild(chatboxContainer);

        // Get the chatbox element
        const chatbox = chatboxContainer.querySelector('.chatbox');

        // Example interaction with chatbot on clicking a word
        wordDetailsContainer.addEventListener('click', function(event) {
            const target = event.target.closest('.word-item');
            if (target) {
                // Get the clicked word and fetch an interesting fact about it
                const clickedWord = target.querySelector('h2').textContent.trim();
                if (clickedWord) {
                    getInterestingFact(clickedWord);
                }
            }
        });

        // Function to fetch an interesting fact about the clicked word
        function getInterestingFact(word) {
            // Construct query string with word details and fetch from backend API
            const queryString = Object.keys(wordDetails)
                .map(key => `${key}=${encodeURIComponent(wordDetails[key])}`)
                .join("&");

            fetch(`/api/interesting?${queryString}`)
                .then(response => response.json()) // Parse JSON response
                .then(data => {
                    // Display the fetched fact in the chatbox
                    appendMessage(data.fact, 'chat-incoming');
                })
                .catch(error => {
                    // Handle errors if fetching interesting fact fails
                    console.error('Error fetching interesting fact:', error);
                    appendMessage('Failed to fetch interesting fact', 'chat-error');
                });
        }

        // Function to append a message to the chatbox
        function appendMessage(message, className) {
            const newMessage = document.createElement('li');
            newMessage.classList.add(className, 'chat', 'bg-gray-700', 'text-white', 'p-4', 'rounded-lg', 'hover:bg-gray-600', 'transition-colors', 'duration-300', 'border', 'border-gray-500');
            newMessage.textContent = message;
            chatbox.appendChild(newMessage);
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }

    // Function to display an error message if fetching word details fails
    function displayError() {
        wordDetailsContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching word details. Please try again later.</p>';
    }
});
