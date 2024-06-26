document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterSelect = document.getElementById('filterSelect');
    const dictionaryContainer = document.getElementById('dictionary-container');
    const alphabetContainer = document.getElementById('alphabet-container');
    const alphabet = "AEGIJLMNOPQSTUW";
    let fuse;
    let dictionaryData = [];

  document.getElementById('modeToggle').addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
  }); 
  alphabet.split('').forEach(letter => {
    const letterSpan = document.createElement('span');
    letterSpan.textContent = letter;
    letterSpan.className = 'border border-gray-300 dark:border-gray-600 w-16 h-16 flex items-center justify-center text-4xl cursor-pointer rounded-md m-2 hover:bg-gray-200 dark:hover:bg-gray-700'; // Fixed size and rounded-md classes
    letterSpan.addEventListener('click', () => filterByLetter(letter));
    alphabetContainer.appendChild(letterSpan);
});
  
    searchButton.addEventListener('click', searchDictionary);
  
    fetch('/api/dictionary')
      .then(response => response.json())
      .then(data => {
        dictionaryData = data.words;
        fuse = new Fuse(dictionaryData, {
          keys: ['word', 'type', 'definitions', 'translations'],
          threshold: 0.3
        });
        displayDictionary(dictionaryData); // Display the entire dictionary initially
      })
      .catch(error => {
        console.error('Error fetching dictionary data:', error);
        displayError();
      });
  
    function searchDictionary() {
      const searchTerm = searchInput.value.trim();
      const filter = filterSelect.value;
  
      if (searchTerm.length === 0) {
        displayNoInputMessage(); 
        return;
      }
  
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
          <div class="word-item border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-4">
            <div>
              <strong class="font-semibold">Mi'gmaq Word:</strong> ${word.word}<br>
              <strong>Part of speech:</strong> ${word.type}<br>
              <strong>English Word:</strong> ${word.definitions.join(", ")}<br>
              <div class="usages mt-2">
                <strong class="font-semibold">Translations:</strong><br>
                ${word.usages.map(usage => `
                  <div class="usage-item">
                    <strong>Mi'gmaq Translation:</strong> ${usage.translation}<br>
                    <strong>English Translation:</strong> ${usage.english}<br>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        const wordDiv = document.createElement("div");
        wordDiv.classList.add("word-item", "border", "border-gray-300", "dark:border-gray-600", "rounded-lg", "p-4", "mb-4");
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
  
      // Scroll to the bottom of the chatbox
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  });