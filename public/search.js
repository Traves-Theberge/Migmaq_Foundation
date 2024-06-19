
// We are using the document object to add an event listener to the DOMContentLoaded event and function. 
document.addEventListener("DOMContentLoaded", function () {
  // We are using the document object to get the search input element by its ID.
  const searchInput = document.getElementById("searchInput");
  // We are using the document object to get the search button element by its ID.
  const searchButton = document.getElementById("searchButton");
  // We are using the document object to get the filter select element by its ID.
  const filterSelect = document.getElementById("filterSelect");
  // We are using the document object to get the dictionary container element by its ID.
  const dictionaryContainer = document.getElementById("dictionary-container");
  // We are using the document object to get the alphabet container element by its ID.
  const alphabetContainer = document.getElementById("alphabet-container"); // Ensure this element exists in your HTML

  // Create alphabet letters and add click event listeners to filter by letter.
  // We are creating a constant variable called alphabet and setting it to a string of uppercase letters.
  const alphabet = "AEGIJLMNOPQSTUW";
  // We are using the split method to split the alphabet string into an array of letters.
  alphabet.split("").forEach((letter) => {
    // We are creating a constant variable called letterSpan and setting it to a new span element.
    const letterSpan = document.createElement("span");
    // We are setting the text content of the letterSpan to the current letter in the loop.
    letterSpan.textContent = letter;
    // We are adding a click event listener to the letterSpan element.
    letterSpan.addEventListener("click", () => filterByLetter(letter));
    // We are appending the letterSpan element to the alphabetContainer element.
    alphabetContainer.appendChild(letterSpan);
  });

  // Add click event listener to search button to fetch dictionary data.
  searchButton.addEventListener("click", function () {
    // We are creating a constant variable called searchTerm and setting it to the trimmed value of the search input element.
    const searchTerm = searchInput.value.trim();
    // We are creating a constant variable called filter and setting it to the value of the filter select element.
    const filter = filterSelect.value;
    // We are checking if the length of the search term is equal to 0.
    if (searchTerm.length === 0) {
      // We are calling the displayNoInputMessage function.
      displayNoInputMessage();
      return;
    }

    // Fetch dictionary data based on search term and filter.
    fetch(
      // We are using the fetch method to make a GET request to the dictionary API with the search term and filter as query parameters.
      `/api/dictionary?term=${encodeURIComponent(
        // We are using the encodeURIComponent method to encode the search term.
        searchTerm
        // We are using the encodeURIComponent method to encode the filter.
      )}&filter=${encodeURIComponent(filter)}`
    )
      // We are using the then method to handle the response from the fetch request.
      .then((response) => {
        // We are checking if the response is not ok.
        if (!response.ok) {
          // We are throwing an error if the response is not ok.
          throw new Error("Network response was not ok");
        }
        // We are returning the response as JSON if the response is ok.
        return response.json();
      })
      // We are using the then method to handle the data from the JSON response.
      .then((data) => {
        // We are checking if the length of the words array in the data is equal to 0.
        if (data.words.length === 0) {
          displayNoResults();
        } 
        // We are calling the displayDictionary function with the words array from the data as an argument.
        else {
          displayDictionary([]);
          displayDictionary(data.words);
        }
      })
      // We are using the catch method to handle any errors that occur during the fetch request.
      .catch((error) => {
        console.error("Error fetching or parsing dictionary data:", error);
        displayError();
      });
  });

  // function to filter dictionary data by letter
  function filterByLetter(letter) {
    // Fetch dictionary data based on letter, We are using the fetch method to make a GET request to the dictionary API with the letter as a query parameter.
    fetch(`/api/dictionary?term=${encodeURIComponent(letter)}&filter=word`)
      // We are using the then method to handle the response from the fetch request.
      .then((response) => {
        // We are checking if the response is not ok.
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // We are returning the response as JSON if the response is ok.
        return response.json();
      })
      // We are using the then method to handle the data from the JSON response.
      .then((data) => {
        // We are checking if the length of the words array in the data is equal to 0.
        const filteredWords = data.words.filter(
          // We are filtering the words array to only include words that start with the selected letter.
          (word) => word.word[0].toUpperCase() === letter
        );
        // We are checking if the length of the filtered words array is equal to 0.
        if (filteredWords.length === 0) {
          displayNoResults();
        } 
        // We are calling the displayDictionary function with the filtered words array as an argument.
        else {
          displayDictionary(filteredWords);
        }
      })
      // We are using the catch method to handle any errors that occur during the fetch request.
      .catch((error) => {
        console.error("Error fetching or parsing dictionary data:", error);
        displayError();
      });
  }

  // function to display dictionary data
  function displayDictionary(words) {
    // We are setting the inner HTML of the dictionaryContainer element to an empty string.
    dictionaryContainer.innerHTML = "";
    // We are creating a constant variable called newWordsHtml and setting it to an empty string.
    let newWordsHtml = "";
    // We are iterating over each word in the words array.
    words.forEach((word) => {
      // We are creating a constant variable called wordHTML and setting it to an HTML string with the word data.
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
            // We are appending the wordHTML to the newWordsHtml string.        
            newWordsHtml += wordHTML;
    });
    // We are setting the inner HTML of the dictionaryContainer element to the newWordsHtml string.
    dictionaryContainer.innerHTML = newWordsHtml;
  }
  // function to display no results message
  function displayNoResults() {
    // We are setting the inner HTML of the dictionaryContainer element to a message indicating no results were found.
    dictionaryContainer.innerHTML =
      '<p class="no-results text-red-500 text-center">No results found.</p>';
  }
  // function to display error message
  function displayError() {
    // We are setting the inner HTML of the dictionaryContainer element to an error message.
    dictionaryContainer.innerHTML =
      '<p class="error text-red-500 text-center">Error fetching dictionary data. Please try again later.</p>';
  }
  // function to display no input message
  function displayNoInputMessage() {
    // We are setting the inner HTML of the dictionaryContainer element to a message indicating no input was provided.
    dictionaryContainer.innerHTML =
      '<p class="no-input text-red-500 text-center">Please enter a search term.</p>';
  }
});
