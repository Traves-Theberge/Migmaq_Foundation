# Mi'gmaq Dictionary Project

## Overview

This project is a Mi'gmaq dictionary web application that provides users with the ability to search and explore Mi'gmaq words, their definitions, translations, and usage examples. The application also features a "Word of the Day" functionality, which is updated daily.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [License](#license)
- [Contributing](#contributing)
- 
## Features

- **Search Dictionary**: Users can search for words in the Mi'gmaq dictionary.
- **Word of the Day**: Displays a randomly selected word each day.
- **Word Details**: Provides detailed information about selected words, including definitions, translations, and usage examples.
- **Interactive Chatbot**: Users can click on words to get interesting facts or stories about them.
- **Help feature**: Help Feature: Easily accessible help icon with instructions.

## Project Structure

```
Mi'gmaq Foundation
│   ├── .env.sample // rename to .env
│   ├── .gitignore
│   ├── LICENSE.md
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── server.js
│   ├── tailwind.config.js
│   └── vercel.json
├── src
│   └── input.css
└── public
    ├── dictionary.html
    ├── dictionary.json
    ├── index-script.js
    ├── index.html
    ├── output.css
    ├── script.js
    ├── word-details.html
    ├── word-details.js
    └── wordOfTheDay.json
```

# Installation

## Clone the repository:

```
git clone <repository-url>
cd <repository-directory>

```
## Install dependencies:

```
npm install
```

## Set up environment variables:
Create a .env file in the root directory and add the following:

```
OPENAI_API_KEY=<your-openai-api-key>
SUPABASE_KEY=<your-supabase-key>
```

### Run the server:
```
nodemon server.js
```
Access the application: Open your browser and go to http://localhost:3001.

## Using the Mi'gmaq Dictionary

### Homepage

- **Welcome Section**: The homepage greets you with a welcome message and a button to enter the dictionary.
- **Word of the Day**: The homepage displays a "Word of the Day" along with its part of speech, definitions, and translations.

### Searching the Dictionary

1. **Navigate to the Dictionary**:
   - Click the "Enter Dictionary" button on the homepage to go to the dictionary page.

2. **Using the Search Bar**:
   - Enter the term you want to search for in the search input field.
   - Use the dropdown menu to select the type of search filter:
     - `English Word` (definitions)
     - `Mi'gmaq Word` (word)
     - `Part of Speech` (type)
     - `Translations (English)` (translations_en)
     - `Translations (Mi'gmaq)` (translations_mi)
   - Click the "Search" button or press `Enter` to execute the search.

3. **Filtering by Alphabet**:
   - Click on any letter in the alphabet filter to view words that start with that letter.

### Viewing Word Details

1. **Select a Word**:
   - Click on any word from the search results or the filtered list to view its details.

2. **Word Details Page**:
   - The word details page displays the selected word along with its part of speech, definitions, translations, and usage examples.
   - You can interact with the chatbot by clicking on the word to get an interesting fact or story about it.

### Adding Comments - undergoing change.

1. **Comment Section**:
   - At the bottom of the word details page, there is a comment section where you can add comments about the word.
   
### License
- This project is licensed under the MIT License.

### contributing  
- Feel free to contribute to the project by submitting issues or pull requests. We appreciate your feedback and contributions!


