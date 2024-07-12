document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterSelect = document.getElementById('filterSelect');
    const dictionaryContainer = document.getElementById('dictionary-container');
    const alphabetContainer = document.getElementById('alphabet-container');
    const paginationContainer = document.getElementById('pagination-container');

    // Define alphabet for navigation
    const alphabet = "AEGIJLMNOPQSTUW";
    let currentPage = 1; // Current page for pagination
    const itemsPerPage = 20; // Items per page for pagination
    let currentFilter = ''; // Current filter for search
    let currentTerm = ''; // Current search term
    let dictionaryData = []; // Full dictionary data
    let filteredData = []; // Filtered dictionary data
    let fuse; // Fuse.js instance for searching

    // Initialize the application
    initialize();

    function initialize() {
        populateAlphabetContainer(); // Populate alphabet navigation
        addEventListeners(); // Add event listeners
        fetchFullDictionaryData(); // Fetch dictionary data
        applyTheme(); // Apply the current theme
    }

    // Populate alphabet navigation container
    function populateAlphabetContainer() {
        alphabet.split('').forEach(letter => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = 'border border-gray-300 w-14 h-14 flex items-center justify-center text-4xl cursor-pointer rounded-md m-2 hover:bg-gray-400 dark:hover:bg-gray-300';
            letterSpan.addEventListener('click', () => filterByLetter(letter));
            alphabetContainer.appendChild(letterSpan);
        });
    }

    // Add event listeners for search and theme toggle
    function addEventListeners() {
        searchButton.addEventListener('click', () => searchDictionary());
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchDictionary();
            }
        });

        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            applyTheme();
        });
    }

    // Fetch the full dictionary data from the server
    function fetchFullDictionaryData() {
        fetch('/api/dictionary')
            .then(response => response.json())
            .then(data => {
                dictionaryData = data || [];
                initializeFuse(dictionaryData);
                filteredData = dictionaryData;
                displayDictionary(filteredData);
                createPagination(filteredData.length);
            })
            .catch(error => {
                console.error('Error fetching dictionary data:', error);
                displayError('Error fetching dictionary data. Please try again later.');
            });
    }

    // Initialize Fuse.js for searching
    function initializeFuse(words) {
        const fuseOptions = {
            keys: [
                'word',
                { name: 'usages.translation', weight: 0.5 },
                { name: 'usages.english', weight: 0.5 },
                'type',
                'definitions'
            ],
            threshold: 0.4,
        };
        fuse = new Fuse(words, fuseOptions);
    }

    // Search the dictionary based on the current term and filter
    function searchDictionary() {
        currentTerm = searchInput.value.trim();
        currentFilter = filterSelect.value;
        if (currentTerm) {
            let result = [];
            switch (currentFilter) {
                case 'word':
                    result = fuse.search(currentTerm).filter(item =>
                        item.item.word.toLowerCase().includes(currentTerm.toLowerCase()) ||
                        (item.item.usages && item.item.usages.some(usage => usage.translation.toLowerCase().includes(currentTerm.toLowerCase())))
                    );
                    break;
                case 'translations_mi':
                    result = fuse.search(currentTerm).filter(item =>
                        (item.item.usages && item.item.usages.some(usage => usage.translation.toLowerCase().includes(currentTerm.toLowerCase()))) ||
                        item.item.word.toLowerCase().includes(currentTerm.toLowerCase())
                    );
                    break;
                case 'translations_en':
                    result = fuse.search(currentTerm).filter(item =>
                        (item.item.usages && item.item.usages.some(usage => usage.english.toLowerCase().includes(currentTerm.toLowerCase()))) ||
                        (item.item.definitions && item.item.definitions.some(def => def.toLowerCase().includes(currentTerm.toLowerCase())))
                    );
                    break;
                case 'definitions':
                    result = fuse.search(currentTerm).filter(item =>
                        (item.item.definitions && item.item.definitions.some(def => def.toLowerCase().includes(currentTerm.toLowerCase()))) ||
                        (item.item.usages && item.item.usages.some(usage => usage.english.toLowerCase().includes(currentTerm.toLowerCase())))
                    );
                    break;
                case 'type':
                    result = fuse.search(currentTerm).filter(item => item.item.type.toLowerCase().includes(currentTerm.toLowerCase()));
                    break;
                default:
                    result = fuse.search(currentTerm);
                    break;
            }
            filteredData = result.map(r => r.item);
        } else {
            filteredData = dictionaryData;
        }

        if (filteredData.length === 0) {
            displayError('No results found. Please check your filter and try again.');
        } else {
            currentPage = 1;
            displayDictionary(filteredData);
            createPagination(filteredData.length);
        }
    }

    // Filter dictionary by letter
    function filterByLetter(letter) {
        currentTerm = letter;
        currentFilter = 'startsWith';
        filteredData = dictionaryData.filter(word => word.word.toLowerCase().startsWith(letter.toLowerCase()));
        if (filteredData.length === 0) {
            displayError('No results found. Please check your filter and try again.');
        } else {
            currentPage = 1;
            displayDictionary(filteredData);
            createPagination(filteredData.length);
        }
    }

    // Display the dictionary words on the page
    function displayDictionary(words) {
        dictionaryContainer.innerHTML = '';
        if (words.length === 0) {
            displayError('No results found. Please check your filter and try again.');
            return;
        }

        const paginatedWords = words.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        paginatedWords.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.classList.add('word-item', 'min-h-[10rem]', 'border', 'border-gray-300', 'rounded-lg', 'p-10', 'mb-4', 'transition', 'duration-300');

            wordDiv.innerHTML = `
                <a href="/word-details.html?word=${encodeURIComponent(word.word)}" class="block p-6">
                    <h2 class="text-xl font-semibold mb-4">${word.word}</h2>
                    <div class="mb-4">
                        <strong class="block mb-2">Part of Speech:</strong>
                        <span class="block">${word.type}</span>
                    </div>
                    <div class="mb-4">
                        <strong class="block mb-2">English Definitions:</strong>
                        <ul class="list-disc list-inside">
                            ${word.definitions.map(def => `<li>${def}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <strong class="block mb-2">Translations:</strong>
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
            wordDiv.addEventListener('mouseover', () => applyHoverEffect(wordDiv, true));
            wordDiv.addEventListener('mouseout', () => applyHoverEffect(wordDiv, false));
            dictionaryContainer.appendChild(wordDiv);
        });

        applyTheme(); // Ensure dark mode classes are applied after appending new elements
    }

    // Create pagination controls
    function createPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        paginationContainer.innerHTML = '';

        paginationContainer.appendChild(createPaginationButton('Previous', currentPage > 1, currentPage - 1));

        const pageInput = document.createElement('input');
        pageInput.type = 'number';
        pageInput.min = 1;
        pageInput.max = totalPages;
        pageInput.value = currentPage;
        pageInput.className = 'px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md mx-2 w-16 text-center';
        pageInput.addEventListener('change', () => {
            const pageNumber = parseInt(pageInput.value);
            if (pageNumber >= 1 && pageNumber <= totalPages) {
                currentPage = pageNumber;
                displayDictionary(filteredData);
                createPagination(filteredData.length);
            } else {
                alert(`Please enter a valid page number between 1 and ${totalPages}.`);
            }
        });
        paginationContainer.appendChild(pageInput);

        const totalPagesLabel = document.createElement('span');
        totalPagesLabel.textContent = `of ${totalPages}`;
        totalPagesLabel.className = 'text-gray-900 dark:text-white mx-2';
        paginationContainer.appendChild(totalPagesLabel);

        paginationContainer.appendChild(createPaginationButton('Next', currentPage < totalPages, currentPage + 1));

        applyTheme();
    }

    // Create a pagination button
    function createPaginationButton(text, enabled, page) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md mx-2 hover:bg-gray-300 dark:hover:bg-gray-600';
        button.disabled = !enabled;
        if (enabled) {
            button.addEventListener('click', () => {
                currentPage = page;
                displayDictionary(filteredData);
                createPagination(filteredData.length);
            });
        }
        return button;
    }

    // Apply the current theme (dark or light)
    function applyTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        document.querySelectorAll('.word-item').forEach(item => {
            item.style.backgroundColor = isDarkMode ? '#2d3748' : '#f7fafc';
            item.style.color = isDarkMode ? '#ffffff' : '#1a202c';
        });
        document.querySelectorAll('a.block').forEach(link => {
            link.style.color = isDarkMode ? '#ffffff' : '#1a202c';
        });
        document.querySelectorAll('.pagination button').forEach(button => {
            button.style.backgroundColor = isDarkMode ? '#2d3748' : '#f7fafc';
            button.style.color = isDarkMode ? '#ffffff' : '#1a202c';
        });
        // Apply dark mode to search input and filter select
        searchInput.style.backgroundColor = isDarkMode ? '#2d3748' : '#f7fafc';
        searchInput.style.color = isDarkMode ? '#ffffff' : '#1a202c';
        filterSelect.style.backgroundColor = isDarkMode ? '#2d3748' : '#f7fafc';
        filterSelect.style.color = isDarkMode ? '#ffffff' : '#1a202c';
        // Apply dark mode to pagination label
        const totalPagesLabel = document.querySelector('.pagination span');
        if (totalPagesLabel) {
            totalPagesLabel.style.color = isDarkMode ? '#ffffff' : '#1a202c';
        }
    }

    // Apply hover effect for word items
    function applyHoverEffect(element, isHover) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        element.style.backgroundColor = isHover 
            ? (isDarkMode ? '#4a5568' : '#e2e8f0') 
            : (isDarkMode ? '#2d3748' : '#f7fafc');
    }

    // Display an error message
    function displayError(message) {
        dictionaryContainer.innerHTML = `<p class="error text-gray-500 text-center dark:text-white">${message}</p>`;
    }
});
