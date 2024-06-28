document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const filterSelect = document.getElementById('filterSelect');
  const dictionaryContainer = document.getElementById('dictionary-container');
  const alphabetContainer = document.getElementById('alphabet-container');
  const paginationContainer = document.getElementById('pagination-container');
  const alphabet = "AEGIJLMNOPQSTUW";
  let currentPage = 1;
  const itemsPerPage = 20;
  let currentFilter = '';
  let currentTerm = '';

  alphabet.split('').forEach(letter => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = letter;
      letterSpan.className = 'border border-gray-300 w-14 h-14 flex items-center justify-center text-4xl cursor-pointer rounded-md m-2 hover:bg-gray-200';
      letterSpan.addEventListener('click', () => filterByLetter(letter));
      alphabetContainer.appendChild(letterSpan);
  });

  searchButton.addEventListener('click', () => searchDictionary(1));

  searchInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          searchDictionary(1);
      }
  });

  fetchDictionaryData(currentPage);

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
          .then(response => response.json())
          .then(data => {
              displayDictionary(data.words);
              createPagination(data.total, page);
          })
          .catch(error => {
              console.error('Error fetching dictionary data:', error);
              displayError();
          });
  }

  function searchDictionary(page) {
      currentTerm = searchInput.value.trim();
      currentFilter = filterSelect.value;
      fetchDictionaryData(page);
  }

  function filterByLetter(letter) {
      currentTerm = letter;
      currentFilter = 'startsWith'; // Special filter to handle letter filtering
      fetchAllWords(); // Fetch all words starting with the letter
  }

  function fetchAllWords() {
      const url = new URL('/api/dictionary', window.location.origin);
      url.searchParams.append('term', currentTerm);
      url.searchParams.append('filter', currentFilter);

      fetch(url)
          .then(response => response.json())
          .then(data => {
              displayDictionary(data.words);
              paginationContainer.innerHTML = ''; // Clear pagination for letter filter
          })
          .catch(error => {
              console.error('Error fetching dictionary data:', error);
              displayError();
          });
  }

  function displayDictionary(words) {
      dictionaryContainer.innerHTML = '';
      if (words.length === 0) {
          displayNoResults();
          return;
      }

      words.forEach(word => {
          const wordHTML = `
              <div class="word-item">
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
              </div>
          `;
          const wordDiv = document.createElement("div");
          wordDiv.classList.add("word-item", "min-h-[10rem]", "border", "border-gray-300", "rounded-lg", "p-10", "mb-4");
          wordDiv.innerHTML = wordHTML;
          dictionaryContainer.appendChild(wordDiv);
      });
  }

  function createPagination(totalItems, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = '';

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.className = 'px-3 py-1 bg-gray-800 text-white rounded-md mr-2 hover:bg-gray-600';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => fetchDictionaryData(currentPage - 1));
    paginationContainer.appendChild(prevButton);

    // Input field for page number
    const pageInput = document.createElement('input');
    pageInput.type = 'number';
    pageInput.min = 1;
    pageInput.max = totalPages;
    pageInput.value = currentPage;
    pageInput.className = 'px-3 py-1 bg-gray-800 text-white rounded-md mx-2 w-16 text-center';
    pageInput.addEventListener('change', () => {
        const pageNumber = parseInt(pageInput.value);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            fetchDictionaryData(pageNumber);
        } else {
            alert(`Please enter a valid page number between 1 and ${totalPages}.`);
            // Reset input value to current page to maintain consistency
            pageInput.value = currentPage;
        }
    });
    paginationContainer.appendChild(pageInput);

    // Total pages label
    const totalPagesLabel = document.createElement('span');
    totalPagesLabel.textContent = `of ${totalPages}`;
    totalPagesLabel.className = 'text-gray-400 mx-2';
    paginationContainer.appendChild(totalPagesLabel);

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.className = 'px-3 py-1 bg-gray-800 text-white rounded-md ml-2 hover:bg-gray-600';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => fetchDictionaryData(currentPage + 1));
    paginationContainer.appendChild(nextButton);

    // Apply flex layout to center align pagination controls
    paginationContainer.classList.add('flex', 'items-center', 'justify-center');
}



  function displayNoResults() {
      dictionaryContainer.innerHTML = '<p class="no-results text-white-500 text-center">No results found.</p>';
  }

  function displayError() {
      dictionaryContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching dictionary data. Please try again later.</p>';
  }
});
