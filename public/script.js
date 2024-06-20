/* Description: This file contains the client-side JavaScript code for the Mi'gmaq dictionary app. It fetches the dictionary data
 from the server and displays it in the browser. It also includes a function to fetch interesting facts about a word from the server. */
// 1. Fetch the dictionary data from the server
// 2. Convert the word object to a query string
// 3. Fetch the interesting fact from the server using the query string
// 4. Parse the JSON response from the server
// 5. Display the interesting fact in an alert box
// 6. Add an event listener to the DOM content loaded event
// 7. fetch the dictionary data from the server
// 8. Display the dictionary data in the browser through the dictionary container element and the word div elements.
// 9. Add an event listener to the word div element to fetch interesting facts about the word when clicked
// 10. Create and append the word title, type, definitions, translations, and usages to the word div element
// 11. Display the word title, type, definitions, translations, and usages in the browser
// 12. Append the word title to the word div element
// 13. Create and append the word type, definitions, translations, and usages to the word div element
// 14. Display the word type in the browser
// 15. Append the word type to the word div element.
// 16. Create and append the word definitions to the word div element.
// 17. Display the word definitions in the browser
// 18. Append the word definitions to the word div element.
// 19. Create and append the word translations to the word div element.
// 20. Display the word translations in the browser
// 21. Append the word translations to the word div element.
// 22. Create and append the word usages to the word div element. ( for future development)
// 23. Display the word usages in the browser
// 24. Create and append the word usages to the word div element.
// 25. Append the word div element to the dictionary container element
// 26. Catch any errors that occur during the fetch operation and log them to the console.

// 1. Fetch the dictionary data from the server
async function getInterestingFact(word) { 
  // log the word object to the console
  console.log({ word });

  // 2. Convert the word object to a query string
  const queryString = Object.keys(word) // get the keys of the word object as an array
    .map((key) => `${key}=${word[key]}`) // map each key to a string "key=value
    .join("&"); // join the array of strings with "&" to create a query string
  console.log({ queryString }); // log the query string to the console

  // 3. Fetch the interesting fact from the server using the query string
  const response = await fetch("/api/interesting?" + queryString);
  // 4. Parse the JSON response from the server
  const data = await response.json();
  // 5. Display the interesting fact in an alert box
  alert(data.fact);
}
// 6. Add an event listener to the DOM content loaded event
// This ensures that the dictionary data is fetched and displayed when the page is loaded
document.addEventListener("DOMContentLoaded", function () { 
  // 7. fetch the dictionary data from the server
  fetch("/dictionary.json")
    .then((response) => response.json()) // parse the JSON response
 // 8. Display the dictionary data in the browser through the dictionary container element and the word div elements. 
    .then((data) => { // log the dictionary data to the console
      const container = document.getElementById("dictionary-container"); // get the dictionary container element
      data.message.words.forEach((word) => { // iterate over each word in the dictionary data
        const wordDiv = document.createElement("div"); // create a new div element for the word
        wordDiv.classList.add("word-item"); // add a CSS class to the div element.

        // 9. Add an event listener to the word div element to fetch interesting facts about the word when clicked
        wordDiv.addEventListener("click", function () { // add an event listener to the word div element
          getInterestingFact(word); // call the getInterestingFact function with the word object as an argument
        });

        // 10. Create and append the word title, type, definitions, translations, and usages to the word div element
        const wordTitle = document.createElement("p"); 
        // 11. Display the word title, type, definitions, translations, and usages in the browser
        wordTitle.innerHTML = `<strong>Mi'gmaq Word:</strong> ${word.word}`;
        // 12. Append the word title to the word div element
        wordDiv.appendChild(wordTitle);
        // 13. Create and append the word type, definitions, translations, and usages to the word div element
        const wordType = document.createElement("p");
        // 14. Display the word type in the browser
        wordType.innerHTML = `<strong>Part of speech:</strong> ${word.type}`;
        // 15. Append the word type to the word div element.
        wordDiv.appendChild(wordType);
        // 16. Create and append the word definitions to the word div element.
        const wordDefinitions = document.createElement("p");
        // 17. Display the word definitions in the browser
        wordDefinitions.innerHTML = `<strong>Definition:</strong> ${word.definitions.join(
          ", "
        )}`;
        // 18. Append the word definitions to the word div element.
        wordDiv.appendChild(wordDefinitions);
        // 19. Create and append the word translations to the word div element.
        const wordTranslations = document.createElement("p");
        // 20. Display the word translations in the browser
        wordTranslations.innerHTML = `<strong>Usage:</strong> ${word.translations.join(
          ", "
        )}`;
        // 21. Append the word translations to the word div element.
        wordDiv.appendChild(wordTranslations);


        // 22. Create and append the word usages to the word div element. ( for future development)
        /*const wordUsagesTitle = document.createElement('p');
                wordUsagesTitle.innerHTML = `<strong>Example:</strong>`;
                wordDiv.appendChild(wordUsagesTitle);*/

        // 23. Display the word usages in the browser
        word.usages.forEach((usage) => {
          const usageTranslation = document.createElement("p");
          usageTranslation.innerHTML = `<strong>Mi'gmaq Translation:</strong> ${usage.translation}`;
          wordDiv.appendChild(usageTranslation);
          // 24. Create and append the word usages to the word div element.
          const usageEnglish = document.createElement("p");
          usageEnglish.innerHTML = `<strong>English Translation:</strong> ${usage.english}`;
          wordDiv.appendChild(usageEnglish);
        });
        // 25. Append the word div element to the dictionary container element
        container.appendChild(wordDiv);// append the word div element to the dictionary container element
      });
    })
    // 26. Catch any errors that occur during the fetch operation and log them to the console.
    .catch((error) => console.error("Error fetching dictionary:", error));
});