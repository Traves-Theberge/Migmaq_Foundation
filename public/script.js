// Description: This file contains the client-side JavaScript code for the dictionary search functionality. 

// This function is called when the user clicks on a word in the dictionary. It fetches an interesting fact about the word from the server and displays it in an alert.
async function getInterestingFact(word) {
  // We are using the fetch method to make a GET request to the /api/interesting endpoint with the word object as a query parameter. 
  console.log({ word });
  // We are using the Object.keys method to get an array of the keys in the word object.
  const queryString = Object.keys(word)
    // We are using the map method to create an array of key-value pairs for each key in the word object.
    .map((key) => `${key}=${word[key]}`)
    // We are using the join method to join the key-value pairs with an ampersand (&) separator.
    .join("&");
  // We are logging the queryString to the console.
  console.log({ queryString });
  // We are using the fetch method to make a GET request to the /api/interesting endpoint with the queryString as a query parameter.
  const response = await fetch("/api/interesting?" + queryString);
  // We are using the await keyword to wait for the response to be resolved to a JSON object.
  const data = await response.json();
  // We are using the alert method to display the fact from the data object in an alert dialog.
  alert(data.fact);
}

// This function is called when the DOM content is loaded. It fetches the dictionary data from the server and displays it on the page.
document.addEventListener("DOMContentLoaded", function () {
  // We are using the fetch method to make a GET request to the dictionary.json file on the server.
  fetch("/dictionary.json")
    // We are using the then method to handle the response from the fetch request.
    .then((response) => response.json())
    // We are using the then method to handle the data from the JSON response.
    .then((data) => {
      // We are getting the dictionary container element by ID.
      const container = document.getElementById("dictionary-container");
      // We are using the forEach method to iterate over the words in the data object.
      data.message.words.forEach((word) => {
        // We are creating a new div element to display the word data.
        const wordDiv = document.createElement("div");
        // We are adding the word-item class to the wordDiv element.
        wordDiv.classList.add("word-item");
        // We are adding a click event listener to the wordDiv element that calls the getInterestingFact function with the word object as an argument.
        wordDiv.addEventListener("click", function () {
          // We are calling the getInterestingFact function with the word object as an argument.
          getInterestingFact(word);
        });

        // We are creating a new p element to display the word title.
        const wordTitle = document.createElement("p");
        // We are setting the innerHTML of the wordTitle element to the word object properties.
        wordTitle.innerHTML = `<strong>Mi'gmaq Word:</strong> ${word.word}`;
        // We are appending the wordTitle element to the wordDiv element.
        wordDiv.appendChild(wordTitle);

        // We are creating a new p element to display the part of speech of the word.
        const wordType = document.createElement("p");
        // We are setting the innerHTML of the wordType element to the word object properties.
        wordType.innerHTML = `<strong>Part of speech:</strong> ${word.type}`;
        // We are appending the wordType element to the wordDiv element.
        wordDiv.appendChild(wordType);

        // We are creating a new p element to display the definitions of the word.
        const wordDefinitions = document.createElement("p");
        // We are setting the innerHTML of the wordDefinitions element to the word object properties.
        // We are joining the definitions array with a comma separator.
        wordDefinitions.innerHTML = `<strong>Definition:</strong> ${word.definitions.join(
          // We are joining the definitions array with a comma separator.
          ", "
        )}`;
        // We are appending the wordDefinitions element to the wordDiv element.
        wordDiv.appendChild(wordDefinitions);
        
        // We are creating a new p element to display the translations of the word.
        const wordTranslations = document.createElement("p");
        // We are setting the innerHTML of the wordTranslations element to the word object properties.
        wordTranslations.innerHTML = `<strong>Usage:</strong> ${word.translations.join(
          // We are joining the translations array with a comma separator.
          ", "
        )}`;
        // We are appending the wordTranslations element to the wordDiv element.
        wordDiv.appendChild(wordTranslations);

        // We are creating a new p element to display the word usages. (for use later)
        /*const wordUsagesTitle = document.createElement('p');
                wordUsagesTitle.innerHTML = `<strong>Example:</strong>`;
                wordDiv.appendChild(wordUsagesTitle);*/

        // We are using the forEach method to iterate over the usages in the word object.        
        word.usages.forEach((usage) => {
          // We are creating a new p element to display the Mi'gmaq translation of the word.
          const usageTranslation = document.createElement("p");
          // We are setting the innerHTML of the usageTranslation element to the usage object properties.
          usageTranslation.innerHTML = `<strong>Mi'gmaq Translation:</strong> ${usage.translation}`;
          // We are appending the usageTranslation element to the wordDiv element.
          wordDiv.appendChild(usageTranslation);

          // We are creating a new p element to display the English translation of the word.
          const usageEnglish = document.createElement("p");
          // We are setting the innerHTML of the usageEnglish element to the usage object properties.
          usageEnglish.innerHTML = `<strong>English Translation:</strong> ${usage.english}`;
          // We are appending the usageEnglish element to the wordDiv element.
          wordDiv.appendChild(usageEnglish);
        });

        // We are appending the wordDiv element to the container element.
        container.appendChild(wordDiv);
      });
    })
    // We are using the catch method to handle any errors that occur during the fetch request.
    .catch((error) => console.error("Error fetching dictionary:", error));
});
