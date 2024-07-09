# Mi'gmaq Foundation

## Overview

The Mi'gmaq Foundation project is a web application aimed at preserving and promoting the Mi'gmaq language through an interactive dictionary, educational resources, and a word of the day feature. The application is built using Node.js for the backend, with Express for routing and Supabase for data storage. The frontend is built with HTML, CSS, and JavaScript.

## Project Structure

```
Mi'gmaq Foundation
├── .env.sample
├── .gitignore
├── LICENSE.md
├── README.md
├── package-lock.json
├── package.json
├── tailwind.config.js
├── vercel.json
├── client
│ ├── css
│ │ ├── input.css
│ │ ├── output.css
│ ├── js
│ │ ├── index.js
│ │ ├── education.js
│ │ ├── dictionary.js
│ │ ├── word-details.js
│ ├── pages
│ │ ├── index.html
│ │ ├── education.html
│ │ ├── dictionary.html
│ │ ├── word-details.html
│ ├── assets
│ │ ├── dictionary.json
│ │ ├── wordOfTheDay.json
├── server
│ ├── config
│ │ ├── database.js
│ │ ├── openai.js
│ ├── controllers
│ │ ├── dictionaryController.js
│ │ ├── wordOfTheDayController.js
│ │ ├── aiController.js
│ │ ├── commentsController.js
│ ├── routes
│ │ ├── dictionaryRoutes.js
│ │ ├── wordOfTheDayRoutes.js
│ │ ├── aiRoutes.js
│ │ ├── commentsRoutes.js
│ ├── services
│ │ ├── dictionaryService.js
│ │ ├── wordOfTheDayService.js
│ │ ├── aiService.js
│ │ ├── commentsService.js           
│ ├── app.js
│ ├── server.js
├── .env
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- NPM (v6 or later)
- Supabase account and API keys
- OpenAI API keys

### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/migmaq-foundation.git
cd migmaq-foundation
```
Install the dependencies:
```
npm install
```
Copy the sample environment file and configure it with your keys:
```
cp .env.sample .env
Update .env with your Supabase and OpenAI keys.
```
## Running the Application

Start the server:
```
node server/server.js
Open your browser and navigate to http://localhost:3001.
```

## Features

### Word of the Day
- Displays a new Mi'gmaq word every day.
- Fetches word details and an interesting fact using the OpenAI API.

### Dictionary
- Allows users to search for Mi'gmaq words and view their translations and definitions.
- Provides details for each word, including part of speech, translations, and example usages.

### Educational Resources
- Contains various sections including lessons, games, and additional resources to help users learn Mi'gmaq.

### Comments
- Users can comment on words, and comments can have nested replies.
- Each comment displays the user's avatar (based on the initial of their email), name, date, and content.

## Project Structure Details

### Backend
- `server/config`: Contains configuration files for database and OpenAI.
- `server/controllers`: Handles the business logic for different functionalities.
- `server/routes`: Defines the routes for the API endpoints.
- `server/services`: Contains service files that interact with the database and external APIs.

### Frontend
- `client/css`: Contains the CSS files for styling the application.
- `client/js`: Contains JavaScript files for handling client-side logic and interactions.
- `client/pages`: Contains HTML files for different pages of the application.
- `client/assets`: Contains JSON files and other static assets.

## API Endpoints

### Word of the Day
- `GET /api/word-of-the-day`: Fetches the current word of the day.

### Dictionary
- `GET /api/dictionary`: Fetches the list of words in the dictionary.
- `GET /api/word-details?word=<word>`: Fetches details for a specific word.

### Comments
- `GET /api/comments?word_id=<word_id>`: Fetches comments for a specific word.
- `POST /api/comments`: Submits a new comment.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- Supabase for providing a robust backend solution.
- OpenAI for their powerful language processing API.
- Tailwind CSS for their utility-first CSS framework.

Feel free to modify this README as per your project's needs and specifics.
