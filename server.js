// Wait for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterSelect = document.getElementById('filterSelect');
    const dictionaryContainer = document.getElementById('dictionary-container');
    const alphabetContainer = document.getElementById('alphabet-container');
    const paginationContainer = document.getElementById('pagination-container');

    // Constants and variables
    const alphabet = "AEGIJLMNOPQSTUW";
    let currentPage = 1;
    const itemsPerPage = 20;
    let currentFilter = '';
    let currentTerm = '';
    let fuse; // Fuse.js instance

    // Initialize application
    initialize();

    // Function to initialize the application
    function initialize() {
        populateAlphabetContainer();
        addEventListeners();
        fetchDictionaryData();
    }

    // Function to populate the alphabet filter container
    function populateAlphabetContainer() {
        alphabet.split('').forEach(letter => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = 'border border-gray-300 w-14 h-14 flex items-center justify-center text-4xl cursor-pointer rounded-md m-2 hover:bg-gray-200';
            letterSpan.addEventListener('click', () => filterByLetter(letter));
            alphabetContainer.appendChild(letterSpan);
        });
    }

    // Function to add event listeners to search input and button
    function addEventListeners() {
        searchButton.addEventListener('click', () => searchDictionary());
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchDictionary();
            }
        });
    }

    // Function to fetch dictionary data from the backend
    function fetchDictionaryData(page = 1) {
        currentPage = page;
        const url = new URL('/api/dictionary', window.location.origin);
        url.searchParams.append('page', page);
        url.searchParams.append('limit', itemsPerPage);
        if (currentTerm) {
            url.searchParams.append('term', currentTerm);
            url.searchParams.append('filter', currentFilter);
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (currentTerm && currentFilter) {
                    initializeFuse(data.words);
                }
                displayDictionary(data.words);
                createPagination(data.total);
            })
            .catch(error => {
                console.error('Error fetching dictionary data:', error);
                displayError();
            });
    }

    // Function to initialize Fuse.js for fuzzy searching
    function initializeFuse(words) {
        let fuseOptions = {
            keys: [],
            includeScore: true,
        };

        // Configure Fuse.js options based on current filter
        switch (currentFilter) {
            case 'definitions':
                fuseOptions.keys = ['definitions'];
                fuseOptions.threshold = 0.1;
                fuseOptions.distance = 3;
                break;
            case 'word':
                fuseOptions.keys = ['word'];
                fuseOptions.threshold = 0.6;
                fuseOptions.distance = 3;
                break;
            case 'translations':
                fuseOptions.keys = ['usages.translation', 'usages.english'];
                fuseOptions.threshold = 0.6;
                fuseOptions.distance = 3;
                break;
            case 'type':
                fuseOptions.keys = ['type'];
                fuseOptions.threshold = 0.6;
                fuseOptions.distance = 1;
                break;
        }

        // Create a new Fuse instance
        fuse = new Fuse(words, fuseOptions);
    }

    // Function to handle search action
    function searchDictionary() {
        currentTerm = searchInput.value.trim();
        currentFilter = filterSelect.value;
        fetchDictionaryData();
    }

    // Function to filter words by starting letter
    function filterByLetter(letter) {
        currentTerm = letter;
        currentFilter = 'startsWith';
        fetchAllWords();
    }

    // Function to fetch all words based on current filter and term
    function fetchAllWords() {
        const url = new URL('/api/dictionary', window.location.origin);
        url.searchParams.append('term', currentTerm);
        url.searchParams.append('filter', currentFilter);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayDictionary(data.words);
                paginationContainer.innerHTML = '';
            })
            .catch(error => {
                console.error('Error fetching dictionary data:', error);
                displayError();
            });
    }

    // Function to display dictionary words in the UI
    function displayDictionary(words) {
        dictionaryContainer.innerHTML = '';
        if (words.length === 0) {
            displayNoResults();
            return;
        }

        // Generate HTML for each word and append to dictionary container
        words.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.classList.add('word-item', 'min-h-[10rem]', 'border', 'border-gray-300', 'rounded-lg', 'p-10', 'mb-4');
            wordDiv.innerHTML = `
                <a href="/word-details.html?word=${encodeURIComponent(word.word)}" class="block p-6 text-white">
                    <h2 class="text-xl font-semibold mb-4">${word.word}</h2>
                    <div class="mb-4">
                        <strong class="block text-white-600 mb-2">Part of Speech:</strong>
                        <span class="block">${word.type}</span>
                    </div>
                    <div class="mb-4">
                        <strong class="block text-white-600 mb-2">English Definitions:</strong>
                        <ul class="list-disc list-inside">
                            ${word.definitions.map(def => `<li>${def}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <strong class="block text-white-600 mb-2">Translations:</strong>
                        <ul>
                            ${word.usages.map(usage => `
                                <li>
                                    <strong>Mi'gmaq Translation:</strong> ${usage.translation}<br>
                                    <strong>English Translation:</strong> ${usage.english}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </a>
            `;
            dictionaryContainer.appendChild(wordDiv);
        });
    }

    // Function to create pagination controls
    function createPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        paginationContainer.innerHTML = '';

        // Previous button
        paginationContainer.appendChild(createPaginationButton('Previous', currentPage > 1, currentPage - 1));

        // Input field for page number
        const pageInput = document.createElement('input');
        pageInput.type = 'number';
        pageInput.min = 1;
        pageInput.max = totalPages;
        pageInput.value = currentPage;
        pageInput.className = 'px-3 py-1 bg-gray-800 text-white rounded-md mx-2 w-16 text-center';
        paginationContainer.appendChild(pageInput);

        // Go to page button
        paginationContainer.appendChild(createPaginationButton('Go', true, () => {
            const pageNumber = parseInt(pageInput.value);
            if (pageNumber >= 1 && pageNumber <= totalPages) {
                fetchDictionaryData(pageNumber);
            } else {
                alert(`Please enter a valid page number between 1 and ${totalPages}.`);
            }
        }));

        // Total pages label
        const totalPagesLabel = document.createElement('span');
        totalPagesLabel.textContent = `of ${totalPages}`;
        totalPagesLabel.className = 'text-white mx-2';
        paginationContainer.appendChild(totalPagesLabel);

        // Next button
        paginationContainer.appendChild(createPaginationButton('Next', currentPage < totalPages, currentPage + 1));
    }

    // Function to create a pagination button
    function createPaginationButton(text, enabled, page) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'px-3 py-1 bg-gray-800 text-white rounded-md mx-2 hover:bg-gray-600';
        button.disabled = !enabled;
        if (enabled) {
            button.addEventListener('click', () => fetchDictionaryData(page));
        }
        return button;
    }

    // Function to display a message when no results are found
    function displayNoResults() {
        dictionaryContainer.innerHTML = '<p class="no-results text-white-500 text-center">No results found.</p>';
    }

    // Function to display an error message when fetching data fails
    function displayError() {
        dictionaryContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching dictionary data. Please try again later.</p>';
    }
});
