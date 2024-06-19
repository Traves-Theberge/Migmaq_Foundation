document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const filterSelect = document.getElementById("filterSelect");
  const dictionaryContainer = document.getElementById("dictionary-container");
  const alphabetContainer = document.getElementById("alphabet-container"); // Ensure this element exists in your HTML

  // Create alphabet letters
  const alphabet = "AEGIJLMNOPQSTUW";
  alphabet.split("").forEach((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.textContent = letter;
    letterSpan.addEventListener("click", () => filterByLetter(letter));
    alphabetContainer.appendChild(letterSpan);
  });

  searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim();
    const filter = filterSelect.value;

    if (searchTerm.length === 0) {
      displayNoInputMessage(); // Display a message instead of reloading the page
      return;
    }

    fetch(
      `/api/dictionary?term=${encodeURIComponent(
        searchTerm
      )}&filter=${encodeURIComponent(filter)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.words.length === 0) {
          displayNoResults();
        } else {
          displayDictionary([]);
          displayDictionary(data.words);
        }
      })
      .catch((error) => {
        console.error("Error fetching or parsing dictionary data:", error);
        displayError();
      });
  });

  function filterByLetter(letter) {
    fetch(`/api/dictionary?term=${encodeURIComponent(letter)}&filter=word`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const filteredWords = data.words.filter(
          (word) => word.word[0].toUpperCase() === letter
        );
        if (filteredWords.length === 0) {
          displayNoResults();
        } else {
          displayDictionary(filteredWords);
        }
      })
      .catch((error) => {
        console.error("Error fetching or parsing dictionary data:", error);
        displayError();
      });
  }

  function displayDictionary(words) {
    dictionaryContainer.innerHTML = "";

    let newWordsHtml = "";

    words.forEach((word) => {
      const wordHTML = `
                <div class="word-item bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm mb-4">
                    <p class="text-lg"><strong class="font-semibold">Mi'gmaq Word:</strong> ${
                      word.word
                    }</p>
                    <p><strong class="font-semibold">Part of speech:</strong> ${
                      word.type
                    }</p>
                    <p><strong class="font-semibold">Definitions:</strong> ${word.definitions.join(
                      ", "
                    )}</p>
                    <p><strong class="font-semibold">Usage:</strong> ${word.translations.join(
                      ", "
                    )}</p>
                </div>
            `;
      newWordsHtml += wordHTML;
    });

    dictionaryContainer.innerHTML = newWordsHtml;
  }

  function displayNoResults() {
    dictionaryContainer.innerHTML =
      '<p class="no-results text-red-500 text-center">No results found.</p>';
  }

  function displayError() {
    dictionaryContainer.innerHTML =
      '<p class="error text-red-500 text-center">Error fetching dictionary data. Please try again later.</p>';
  }

  function displayNoInputMessage() {
    dictionaryContainer.innerHTML =
      '<p class="no-input text-red-500 text-center">Please enter a search term.</p>';
  }
});
