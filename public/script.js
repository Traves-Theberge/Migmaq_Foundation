document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const filterSelect = document.getElementById('filterSelect');
  const dictionaryContainer = document.getElementById('dictionary-container');
  const alphabetContainer = document.getElementById('alphabet-container');

  const alphabet = "AEGIJLMNOPQSTUW";
  alphabet.split('').forEach(letter => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = letter;
      letterSpan.addEventListener('click', () => filterByLetter(letter));
      alphabetContainer.appendChild(letterSpan);
  });

  searchButton.addEventListener('click', searchDictionary);

  function searchDictionary() {
      const searchTerm = searchInput.value.trim();
      const filter = filterSelect.value;
      if (searchTerm.length === 0) {
          displayNoInputMessage(); 
          return;
      }

      fetchDictionaryData(searchTerm, filter);
  }

  function fetchDictionaryData(searchTerm, filter) {
      fetch(`/api/dictionary?term=${encodeURIComponent(searchTerm)}&filter=${encodeURIComponent(filter)}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              if (data.words.length === 0) {
                  displayNoResults();
              } else {
                  displayDictionary(data.words);
              }
          })
          .catch(error => {
              console.error('Error fetching or parsing dictionary data:', error);
              displayError();
          });
  }

  function filterByLetter(letter) {
      fetch(`/api/dictionary?term=${encodeURIComponent(letter)}&filter=word`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              const filteredWords = data.words.filter(word => word.word[0].toUpperCase() === letter);
              if (filteredWords.length === 0) {
                  displayNoResults();
              } else {
                  displayDictionary(filteredWords);
              }
          })
          .catch(error => {
              console.error('Error fetching or parsing dictionary data:', error);
              displayError();
          });
  }

  function displayDictionary(words) {
    dictionaryContainer.innerHTML = '';
    words.forEach(word => {
        const wordHTML = `
            <div class="word-item">
                <p class="text-lg"><strong class="font-semibold">Mi'gmaq Word:</strong> ${word.word}</p>
                <p><strong class="font-semibold">Part of speech:</strong> ${word.type}</p>
                <p><strong class="font-semibold">Definition:</strong> ${word.definitions.join(", ")}</p>
                <div class="usages">
                    <p><strong class="font-semibold">Usage:</strong></p>
                    ${word.usages.map(usage => `
                        <div class="Example-item">
                            <p><strong>Mi'gmaq:</strong> ${usage.translation}</p>
                            <p><strong>English Translation:</strong> ${usage.english}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        const wordDiv = document.createElement("div");
        wordDiv.classList.add("word-item");
        wordDiv.addEventListener("click", function () {
            getInterestingFact(word);
        });
        wordDiv.innerHTML = wordHTML;
        dictionaryContainer.appendChild(wordDiv);
    });
}

  function displayNoResults() {
      dictionaryContainer.innerHTML = '<p class="no-results text-red-500 text-center">No results found.</p>';
  }

  function displayError() {
      dictionaryContainer.innerHTML = '<p class="error text-red-500 text-center">Error fetching dictionary data. Please try again later.</p>';
  }

  function displayNoInputMessage() {
      dictionaryContainer.innerHTML = '<p class="no-input text-red-500 text-center">Please enter a search term.</p>';
  }

  async function getInterestingFact(word) { 
      const queryString = Object.keys(word)
          .map((key) => `${key}=${encodeURIComponent(word[key])}`)
          .join("&");

      try {
          const response = await fetch("/api/interesting?" + queryString);
          if (!response.ok) {
              throw new Error('Failed to fetch interesting fact');
          }
          const data = await response.json();
          appendMessage(data.fact, 'chat-incoming');
      } catch (error) {
          console.error('Error fetching interesting fact:', error);
      }
  }

  function appendMessage(message, className) {
      const chatbox = document.querySelector('.chatbox');
      const newMessage = document.createElement('li');
      newMessage.classList.add(className, 'chat');
      newMessage.innerHTML = `<p>${message}</p>`;
      chatbox.appendChild(newMessage);
  }

  // Initial fetch when the page loads
  fetchDictionaryData('', '');

});
