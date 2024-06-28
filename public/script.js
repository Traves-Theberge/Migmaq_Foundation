document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const filterSelect = document.getElementById('filterSelect');
  const dictionaryContainer = document.getElementById('dictionary-container');
  const alphabetContainer = document.getElementById('alphabet-container');
  const alphabet = "AEGIJLMNOPQSTUW";
  let dictionaryData = [];

  alphabet.split('').forEach(letter => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = letter;
      letterSpan.className = 'border border-gray-300 w-14 h-14 flex items-center justify-center text-4xl cursor-pointer rounded-md m-2 hover:bg-gray-200';
      letterSpan.addEventListener('click', () => filterByLetter(letter));
      alphabetContainer.appendChild(letterSpan);
  });

  searchButton.addEventListener('click', searchDictionary);

  fetch('/api/dictionary')
      .then(response => response.json())
      .then(data => {
          dictionaryData = data.words;
          displayDictionary(dictionaryData);
      })
      .catch(error => {
          console.error('Error fetching dictionary data:', error);
          displayError();
      });

  searchInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          searchDictionary();
      }
  });

  function searchDictionary() {
      const searchTerm = searchInput.value.trim();
      const filter = filterSelect.value;

      if (searchTerm.length === 0) {
          displayNoInputMessage();
          return;
      }

      let options = {
          threshold: 0.4,
          distance: 100
      };

      switch(filter) {
          case 'word':
              options.keys = ['word'];
              break;
          case 'type':
              options.keys = ['type'];
              break;
          case 'definitions':
              options.keys = ['definitions'];
              break;
          case 'translations':
              options.keys = ['translations'];
              break;
          default:
              options.keys = ['word', 'type', 'definitions', 'translations'];
      }

      const fuse = new Fuse(dictionaryData, options);
      const results = fuse.search(searchTerm).map(result => result.item);

      displayDictionary(results);
  }

  function filterByLetter(letter) {
      const results = dictionaryData.filter(word => word.word[0].toUpperCase() === letter);
      displayDictionary(results);
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

  function displayNoResults() {
      dictionaryContainer.innerHTML = '<p class="no-results text-white-500 text-center">No results found.</p>';
  }

  function displayError() {
      dictionaryContainer.innerHTML = '<p class="error text-white-500 text-center">Error fetching dictionary data. Please try again later.</p>';
  }

  function displayNoInputMessage() {
      dictionaryContainer.innerHTML = '<p class="no-input text-white-500 text-center">Please enter a search term.</p>';
  }
});
