
# Mi'gmaq Foundation

- Welcome to the Mi'gmaq Foundation repository. This project aims to provide educational resources and tools for learning and preserving the Mi'gmaq language.

## Table of Contents

- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Client-side Code](#client-side-code)
- [Server-side Code](#server-side-code)
- [Contributing](#contributing)
- [License](#license)

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
│   ├── css
│   │   ├── input.css
│   │   ├── output.css
│   ├── js
│   │   ├── index.js
│   │   ├── wordOfTheDay.js
│   │   ├── dictionary.js
│   │   ├── word-details.js
│   │   ├── games
│   │   │   ├── flashcard.js
│   │   ├── lessons
│   │   │   ├── lesson1.js
│   │   ├── resources
│   │       ├── resource1.js
│   ├── pages
│   │   ├── index.html
│   │   ├── education.html
│   │   ├── dictionary.html
│   │   ├── word-details.html
│   │   ├── games
│   │   │   ├── flashcard.html
│   │   ├── lessons
│   │   │   ├── lesson1.html
│   │   ├── resources
│   │       ├── resource1.html
│   ├── assets
│   │   ├── dictionary.json
│   │   ├── wordOfTheDay.json
│   │   ├── favicon.png
├── server
│   ├── config
│   │   ├── database.js
│   │   ├── openai.js
│   ├── controllers
│   │   ├── dictionaryController.js
│   │   ├── wordOfTheDayController.js
│   │   ├── aiController.js
│   │   ├── commentsController.js
│   │   ├── games
│   │   │   ├── gamesController.js
│   │   ├── lessons
│   │   │   ├── lessonsController.js
│   │   ├── resources
│   │       ├── resourcesController.js
│   ├── routes
│   │   ├── dictionaryRoutes.js
│   │   ├── wordOfTheDayRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── commentsRoutes.js
│   │   ├── games
│   │   │   ├── gamesRoutes.js
│   │   ├── lessons
│   │   │   ├── lessonsRoutes.js
│   │   ├── resources
│   │       ├── resourcesRoutes.js
│   ├── services
│   │   ├── dictionaryService.js
│   │   ├── wordOfTheDayService.js
│   │   ├── aiService.js
│   │   ├── commentsService.js
│   │   ├── games
│   │   │   ├── gamesService.js
│   │   ├── lessons
│   │   │   ├── lessonsService.js
│   │   ├── resources
│   │       ├── resourcesService.js
│   ├── app.js
│   ├── server.js
├── .env

```
## API Endpoints

### Dictionary Routes

- `GET /api/dictionary` - Retrieve the entire dictionary.
- `GET /api/word-details?word={word}` - Retrieve details for a specific word.

### Word of the Day Routes

- `GET /api/word-of-the-day` - Retrieve the word of the day.
- `PUT /api/word-of-the-day/update` - Update the word of the day.

### AI Routes

- `GET /api/fact?word={word}` - Retrieve an AI-generated fact about a word.

### Comments Routes

- `GET /api/comments?word_id={word_id}` - Retrieve comments for a specific word.
- `POST /api/comments` - Add a new comment.

## Client-side Code

### `client/js/index.js`

Placeholder for index-specific JavaScript if needed.

### `client/js/education.js`

- Fetches and displays the word of the day.

### `client/js/dictionary.js`

- Handles dictionary search and filtering.
- Fetches and displays dictionary data.
- Implements pagination for dictionary entries.

### `client/js/word-details.js`

- Fetches and displays details for a specific word.
- Fetches and displays comments for a word.
- Handles adding new comments and replies.

## Server-side Code

### `server/app.js`

- Sets up the Express application, middleware, and routes.

### `server/server.js`

- Starts the server on the specified port.

### `server/config/database.js`

- Configures and exports the Supabase client for database interactions.

### `server/config/openai.js`

- Configures and exports the OpenAI client for AI interactions.

## Controllers

- `dictionaryController.js` - Handles dictionary-related API requests.
- `wordOfTheDayController.js` - Handles word of the day API requests.
- `aiController.js` - Handles AI-related API requests.
- `commentsController.js` - Handles comment-related API requests.

## Services

- `dictionaryService.js` - Provides dictionary data operations.
- `wordOfTheDayService.js` - Provides word of the day data operations.
- `aiService.js` - Provides AI-related operations.
- `commentsService.js` - Provides comment-related operations.

## Contributing

If you would like to contribute, please fork the repository and submit a pull request. For major changes, please open an issue to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.





