# Mi'gmaq Dictionary Project

## Overview

This project is a Mi'gmaq dictionary web application that provides users with the ability to search and explore Mi'gmaq words, their definitions, translations, and usage examples. The application also features a "Word of the Day" functionality, which is updated daily.

## Features

- **Search Dictionary**: Users can search for words in the Mi'gmaq dictionary.
- **Word of the Day**: Displays a randomly selected word each day.
- **Word Details**: Provides detailed information about selected words, including definitions, translations, and usage examples.
- **Interactive Chatbot**: Users can click on words to get interesting facts or stories about them.

## Project Structure

|-- public
|   |-- dictionary.html
|   |-- index.html
|   |-- word-details.html
|   |-- dictionary.json
|   |-- wordOfTheDay.json
|   |-- output.css
|
|-- server.js
|-- index-script.js
|-- script.js
|-- word-details.js

### Installation

### Clone the repository:

```
bash
Copy code
git clone <repository-url>
cd <repository-directory>

```
### Install dependencies:
```
bash
Copy code
npm install
```
### Set up environment variables:
Create a .env file in the root directory and add the following:

```
PORT=3001
OPENAI_API_KEY=<your-openai-api-key>
SUPABASE_KEY=<your-supabase-key>
```

### Run the server:
```
bash
node server.js
Usage
Access the application: Open your browser and go to http://localhost:3001.
```

### 
Search for words: Use the search bar to find words in the dictionary.
View word details: Click on any word to view its detailed information.
Word of the Day: Check the homepage for the word of the day.
Interactive Chatbot: Click on words in the details page to get interesting facts.
Scripts
server.js: Main server script that handles API requests and updates the word of the day.
index-script.js: Handles fetching and displaying the word of the day on the homepage.
script.js: Manages search functionality and displays dictionary words.
word-details.js: Displays detailed information about selected words and integrates the chatbot.
Data
dictionary.json: Contains the Mi'gmaq words, their definitions, translations, and usage examples.
wordOfTheDay.json: Stores the current word of the day.
Dependencies
Express: Web framework for Node.js.
Cors: Middleware for enabling CORS (Cross-Origin Resource Sharing).
fs: File system module for reading and writing files.
path: Module for handling file paths.
OpenAI: OpenAI API client for generating interesting facts.
node-cron: Library for scheduling cron jobs.
Fuse.js: Lightweight fuzzy-search library.
License
This project is licensed under the MIT License.

Feel free to contribute to the project by submitting issues or pull requests. We appreciate your feedback and contributions!

vbnet
Copy code

There you have it! The comments are enhanced for better clarity, and the README.md file is ready.