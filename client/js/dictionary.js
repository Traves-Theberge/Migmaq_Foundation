document.addEventListener('DOMContentLoaded', function() {
    // Elements for the search input, search button, filter select, dictionary container, alphabet container, and pagination container
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterSelect = document.getElementById('filterSelect');
    const dictionaryContainer = document.getElementById('dictionary-container');
    const alphabetContainer = document.getElementById('alphabet-container');
    const paginationContainer = document.getElementById('pagination-container');

    // Define constants and variables for alphabet, current page, items per page, current filter, current term, dictionary data, filtered data, and Fuse instance
    const alphabet = "AEGIJLMNOPQSTUW";
    let currentPage = 1;
    const itemsPerPage = 20;
    let currentFilter = '';
    let currentTerm = '';
    let dictionaryData = [];
    let filteredData = [];
    let fuse;

    // Initialize the dictionary functionalities
    initialize();

    // Function to initialize the dictionary functionalities
    function initialize() {
        populateAlphabetContainer();
        addEventListeners();
        fetchFullDictionaryData();
    }

    // Function to populate the alphabet container with clickable letters
    function populateAlphabetContainer() {
        alphabet.split('').forEach(letter => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = 'border border-gray-300 w-14 h-14 flex items-center justify-center text-4xl cursor-pointer rounded-md m-2 hover:bg-gray-200';
            letterSpan.addEventListener('click', () => filterByLetter(letter));
            alphabetContainer.appendChild(letterSpan);
        });
    }

    // Function to add event listeners for search button and input field
    function addEventListeners() {
        searchButton.addEventListener('click', () => searchDictionary());
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchDictionary();
            }
        });
    }

    // Function to fetch full dictionary data from the server
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

    // Function to initialize Fuse.js for searching
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

    // Function to search the dictionary based on input and filter
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

    // Function to filter dictionary data by starting letter
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

    // Function to display dictionary data
    function displayDictionary(words) {
        dictionaryContainer.innerHTML = '';
        if (words.length === 0) {
            displayError('No results found. Please check your filter and try again.');
            return;
        }

        const paginatedWords = words.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        paginatedWords.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.classList.add('word-item', 'min-h-[10rem]', 'border', 'border-gray-300', 'rounded-lg', 'p-10', 'mb-4', 'hover:bg-gray-600', 'transition', 'duration-300');
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

    // Function to create pagination buttons
    function createPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        paginationContainer.innerHTML = '';

        paginationContainer.appendChild(createPaginationButton('Previous', currentPage > 1, currentPage - 1));

        const pageInput = document.createElement('input');
        pageInput.type = 'number';
        pageInput.min = 1;
        pageInput.max = totalPages;
        pageInput.value = currentPage;
        pageInput.className = 'px-3 py-1 bg-gray-800 text-white rounded-md mx-2 w-16 text-center';
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
        totalPagesLabel.className = 'text-white mx-2';
        paginationContainer.appendChild(totalPagesLabel);

        paginationContainer.appendChild(createPaginationButton('Next', currentPage < totalPages, currentPage + 1));
    }

    // Function to create a pagination button
    function createPaginationButton(text, enabled, page) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'px-3 py-1 bg-gray-800 text-white rounded-md mx-2 hover:bg-gray-600';
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

    // Function to display an error message
    function displayError(message) {
        dictionaryContainer.innerHTML = `<p class="error text-white-500 text-center">${message}</p>`;
    }
});
