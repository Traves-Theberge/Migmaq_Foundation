// Description: This file contains the client-side JavaScript code for the Mi'gmaq dictionary app. It fetches the dictionary data from the server and displays it in the browser. It also includes a function to fetch interesting facts about a word from the server.


//comments below are for the current search.js file lets step through it
// 1. The code starts by selecting the search input, search button, filter select, dictionary container, and alphabet container elements from the DOM.
// 2. It then creates alphabet letters and appends them to the alphabet container.
// 3. It adds an event listener to the search button that fetches the dictionary data from the server based on the search term and filter value.
// 4. If the search term is empty, it displays a message instead of fetching data.
// 5. If the fetch request is successful, it displays the dictionary data in the browser.
// 6. If there are no results, it displays a "No results found" message.
// 7. If there is an error fetching the data, it displays an error message.
// 8. It also includes a function to filter the dictionary data by letter when a letter is clicked in the alphabet container.
// 9. The displayDictionary function generates HTML for each word in the dictionary data and appends it to the dictionary container.
// 10. The displayNoResults function displays a "No results found" message in the dictionary container.
// 11. The displayError function displays an error message in the dictionary container.
// 12. The displayNoInputMessage function displays a message prompting the user to enter a search term in the dictionary container.

//a function that is called when the DOM is fully loaded. This ensures that the JavaScript code runs after the HTML content is loaded.
document.addEventListener('DOMContentLoaded', function() {
// 1. The code starts by selecting the search input, search button, filter select, dictionary container, and alphabet container elements from the DOM.
    //seachInput is the input field where the user enters the search term.
    const searchInput = document.getElementById('searchInput');
    //searchButton is the button that the user clicks to search for a word.  
    const searchButton = document.getElementById('searchButton');
    //filterSelect is a dropdown menu that allows the user to select a filter option for the search.
    const filterSelect = document.getElementById('filterSelect');
    //dictionaryContainer is the container where the dictionary data will be displayed.
    const dictionaryContainer = document.getElementById('dictionary-container');
    //alphabetContainer is the container where the alphabet letters will be displayed.
    const alphabetContainer = document.getElementById('alphabet-container'); // Ensure this element exists in your HTML
// 2. It then creates alphabet letters and appends them to the alphabet container.
// Create an alphabet array
  const alphabet = "AEGIJLMNOPQSTUW";
// Loop through the alphabet array and create a span element for each letter
  alphabet.split('').forEach(letter => {
    // Create a span element for each letter
      const letterSpan = document.createElement('span');
    // Set the text content of the span element to the current letter  
      letterSpan.textContent = letter;
    // Add a click event listener to filter words by the selected letter  
      letterSpan.addEventListener('click', () => filterByLetter(letter));
      // Append the span element to the alphabet container
      alphabetContainer.appendChild(letterSpan);
  });
// 3. It adds an event listener to the search button that fetches the dictionary data from the server based on the search term and filter value.
// Add an event listener to the search button  
    searchButton.addEventListener('click', function() {
    // Get the search term and filter value from the input fields  
    const searchTerm = searchInput.value.trim();
    // Get the filter value from the select element
    const filter = filterSelect.value;
// 4. If the search term is empty, it displays a message instead of fetching data.
      if (searchTerm.length === 0) {
        // Display a message prompting the user to enter a search term
        displayNoInputMessage(); 
        // Exit the function early if the search term is empty
          return;
      }
// 5. If the fetch request is successful, it displays the dictionary data in the browser.
// Fetch dictionary data based on the search term and filter value
fetch(`/api/dictionary?term=${encodeURIComponent(searchTerm)}&filter=${encodeURIComponent(filter)}`)
            // Parse the JSON response and return the data         
            .then(response => {
            // Check if the response is ok
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              // Parse the JSON response and return the data. 
              return response.json();
          })
          // 6. If there are no results, it displays a "No results found" message.
          .then(data => {
            // Check if the data contains any words
              if (data.words.length === 0) {
                  displayNoResults();
                // If there are no results, display a message
              } else {
                // If there are results, display the dictionary data
                  displayDictionary(data.words);
              }
          })
          // 7. If there is an error fetching the data, it displays an error message.
          // If there is an error fetching the data, display an error message
          .catch(error => {
              // Log the error to the console
              console.error('Error fetching or parsing dictionary data:', error);
              // Display an error message
              displayError();
          });
  });
// 8. The filterByLetter function fetches dictionary data based on the selected letter and displays it in the browser.
// Filter the dictionary data by letter when a letter is clicked
  function filterByLetter(letter) {
    // Fetch dictionary data based on the selected letter  
    fetch(`/api/dictionary?term=${encodeURIComponent(letter)}&filter=word`)
    // Parse the JSON respons and return the data
          .then(response => {
            // Check if the response is ok
              if (!response.ok) {
                // If the response is not ok, throw an error
                  throw new Error('Network response was not ok');
              }
              // Parse the JSON response and return the data
              return response.json();
          })
          // Filter the dictionary data based on the selected letter
          .then(data => {
            // Filter the words that start with the selected letter
              const filteredWords = data.words.filter(word => word.word[0].toUpperCase() === letter);
              // If there are no results, display a message.
              if (filteredWords.length === 0) {
                  displayNoResults();
                // If there are results, display the filtered words
              } else {
                // Display the filtered words
                  displayDictionary(filteredWords);
              }
          })
          // If there is an error fetching the data, display an error message
          .catch(error => {
            // Log the error to the console
              console.error('Error fetching or parsing dictionary data:', error);
              // Display an error message
              displayError();
          });
  }
// 9. The displayDictionary function generates HTML for each word in the dictionary data and appends it to the dictionary container.
// Display the dictionary data in the browser
  function displayDictionary(words) {
    // Clear the dictionary container
    dictionaryContainer.innerHTML = '';
    // Initialize a variable to store the HTML for the words
    let newWordsHtml = ""; // Initialize as an empty string to store the HTML for the words
    // Loop through the words and generate HTML for each word
    words.forEach(word => {
        // Generate HTML for each word
        const wordHTML = `
            <div class="word-item bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm mb-4">
                <p class="text-lg"><strong class="font-semibold">Mi'gmaq Word:</strong> ${ // Display the Mi'gmaq word
                  word.word
                }</p>
                <p><strong class="font-semibold">Part of speech:</strong> ${ // Display the part of speech  
                  word.type
                }</p>
                <p><strong class="font-semibold">Definitions:</strong> ${word.definitions.join( // Display the definitions .join() method to join the definitions with a comma
                  ", "
                )}</p>
                <p><strong class="font-semibold">Usage:</strong> ${word.translations.join( // Display the usage .join() method to join the translations with a comma
                  ", "
                )}</p>
                <p><strong class="font-semibold">Example:</strong> ${ // Display the example
                    word.usages
                        .map(
                        usage => `
                            <p><strong>Mi'gmaq Translation:</strong> ${usage.translation}</p>
                            <p><strong>English Translation:</strong> ${usage.english}</p>
                        `
                        )
                        .join("")// Display the example .map() method to generate HTML for each usage and .join() method to join the HTML
                    }</p>
            </div>
        `;
        // Append the word HTML to the newWordsHtml variable
    newWordsHtml += wordHTML;
    });
    //
    dictionaryContainer.innerHTML = newWordsHtml;
}

// 10. The displayNoResults function displays a "No results found" message in the dictionary container.
  function displayNoResults() {
      dictionaryContainer.innerHTML = '<p class="no-results text-red-500 text-center">No results found.</p>';
  }
// 11. The displayError function displays an error message in the dictionary container.
  function displayError() {
      dictionaryContainer.innerHTML = '<p class="error text-red-500 text-center">Error fetching dictionary data. Please try again later.</p>';
  }
// 12. The displayNoInputMessage function displays a message prompting the user to enter a search term in the dictionary container.
  function displayNoInputMessage() {
      dictionaryContainer.innerHTML = '<p class="no-input text-red-500 text-center">Please enter a search term.</p>';
  }
});
