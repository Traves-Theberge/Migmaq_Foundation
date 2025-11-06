
# Mi'gmaq Foundation

Welcome to the Mi'gmaq Foundation repository. This project aims to provide educational resources and tools for learning and preserving the Mi'gmaq language.

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Client-side Code](#client-side-code)
- [Server-side Code](#server-side-code)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)


## API Endpoints

### Dictionary Routes

- `GET /api/dictionary` - Retrieve the entire dictionary.
- `GET /api/word-details?word={word}` - Retrieve details for a specific word.

### Games Routes

- Game-related API endpoints for interactive learning.

### Lessons Routes

- Lesson-related API endpoints for structured learning.

## Client-side Code

### `client/js/index.js`

Homepage JavaScript functionality.

### `client/js/dictionary.js`

- Handles dictionary search and filtering.
- Fetches and displays dictionary data.
- Implements pagination for dictionary entries.

### `client/js/word-details.js`

- Fetches and displays details for a specific word.
- Handles theme toggling and UI interactions.

### `client/js/games/flashcard.js`

Interactive flashcard game for learning Mi'gmaq vocabulary.

### `client/js/lessons/lesson1.js`

Interactive lessons for learning Mi'gmaq language basics.

## Server-side Code

### `server/app.js`

Sets up the Express application, middleware, and routes.

### `server/server.js`

Starts the server on the specified port (default: 3001).

## Controllers

- `dictionaryController.js` - Handles dictionary-related API requests.
- `games/gamesController.js` - Handles game-related API requests.
- `lessons/lessonsController.js` - Handles lesson-related API requests.
- `resources/resourcesController.js` - Handles resource-related API requests.

## Services

- `dictionaryService.js` - Provides dictionary data operations.
- `games/gamesService.js` - Provides game-related operations.
- `lessons/lessonsService.js` - Provides lesson-related operations.
- `resources/resourcesService.js` - Provides resource-related operations.

## Project Structure

```
Mi'gmaq Foundation
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
│   │   ├── styles.css
│   │   └── components
│   │       ├── animations.css
│   │       ├── theme-toggle.css
│   │       └── feature-card.css
│   ├── js
│   │   ├── index.js
│   │   ├── dictionary.js
│   │   ├── word-details.js
│   │   ├── utils
│   │   │   └── theme-toggle.js
│   │   ├── components
│   │   │   └── spelling-cycler.js
│   │   ├── games
│   │   │   └── flashcard.js
│   │   ├── lessons
│   │   │   └── lesson1.js
│   │   └── resources
│   │       └── resource1.js
│   ├── pages
│   │   ├── index.html
│   │   ├── education.html
│   │   ├── dictionary.html
│   │   ├── word-details.html
│   │   ├── games
│   │   │   └── flashcard.html
│   │   ├── lessons
│   │   │   └── lesson1.html
│   │   └── resources
│   │       └── resource1.html
│   └── assets
│       ├── dictionary.json
│       └── documentation.json
├── server
│   ├── controllers
│   │   ├── dictionaryController.js
│   │   ├── games
│   │   │   └── gamesController.js
│   │   ├── lessons
│   │   │   └── lessonsController.js
│   │   └── resources
│   │       └── resourcesController.js
│   ├── routes
│   │   ├── dictionaryRoutes.js
│   │   ├── games
│   │   │   └── gamesRoutes.js
│   │   ├── lessons
│   │   │   └── lessonsRoutes.js
│   │   └── resources
│   │       └── resourcesRoutes.js
│   ├── services
│   │   ├── dictionaryService.js
│   │   ├── games
│   │   │   └── gamesService.js
│   │   ├── lessons
│   │   │   └── lessonsService.js
│   │   └── resources
│   │       └── resourcesService.js
│   ├── app.js
│   └── server.js
```

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Traves-Theberge/Migmaq_Foundation.git
   cd Migmaq_Foundation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3001`

### Building Tailwind CSS

To rebuild the Tailwind CSS styles:
```bash
npm run build:tailwind
```

## Contributing

If you would like to contribute, please fork the repository and submit a pull request. For major changes, please open an issue to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
