
# Mi'gmaq Foundation

Welcome to the Mi'gmaq Foundation repository. This project provides educational resources and tools for learning and preserving the Mi'gmaq language.

## Features

- **Dictionary** - Browse and search Mi'gmaq words with translations and definitions
- **Word Details** - View detailed information about specific words
- **Games** - Interactive flashcard game for vocabulary practice
- **Lessons** - Self-paced learning modules for Mi'gmaq language basics
- **Dark/Light Mode** - Toggle between dark and light themes

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Client-side Code](#client-side-code)
- [Server-side Code](#server-side-code)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## API Endpoints

All data is served from local JSON files - no external database required.

### Dictionary Routes

- `GET /api/dictionary` - Retrieve the entire dictionary
- `GET /api/word-details?word={word}` - Retrieve details for a specific word

### Games Routes

- `GET /api/games/flashcard` - Get random words for flashcard game

## Client-side Code

### `client/js/index.js`

Homepage JavaScript functionality including theme initialization and spelling cycler.

### `client/js/dictionary.js`

- Handles dictionary search and filtering using Fuse.js
- Fetches and displays dictionary data
- Implements pagination for dictionary entries
- Supports search by word, translations, definitions, and part of speech
- Alphabet navigation for browsing words

### `client/js/word-details.js`

- Fetches and displays details for a specific word
- Handles theme toggling and UI interactions
- Shows word definitions, translations, and usage examples

### `client/js/games/flashcard.js`

Interactive flashcard game for learning Mi'gmaq vocabulary with matching pairs.

### `client/js/lessons/lesson1.js`

Interactive lessons for learning Mi'gmaq language basics (self-contained, no API calls).

### `client/js/utils/theme-toggle.js`

Theme management utilities for dark/light mode switching.

### `client/js/components/spelling-cycler.js`

Component that cycles through different spellings of "Mi'gmaq" on the homepage.

## Server-side Code

The server is a simple Express application that serves static files and provides JSON-based API endpoints. No database required.

### `server/app.js`

Sets up the Express application, middleware, and routes. Handles:
- CORS configuration
- Static file serving
- API route mounting
- HTML page routing

### `server/server.js`

Starts the server on port 3001 (configurable via PORT environment variable).

### Controllers

- `dictionaryController.js` - Handles dictionary-related API requests
- `games/gamesController.js` - Handles game data requests

### Services

- `dictionaryService.js` - Reads and provides dictionary data from JSON file
- `games/gamesService.js` - Generates random word pairs for flashcard game

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
│   ├── assets
│   │   ├── dictionary.json      # Main dictionary data
│   │   └── Images/              # Image assets
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
│   │   ├── components
│   │   │   └── spelling-cycler.js
│   │   ├── games
│   │   │   └── flashcard.js
│   │   ├── lessons
│   │   │   └── lesson1.js
│   │   └── utils
│   │       └── theme-toggle.js
│   └── pages
│       ├── index.html
│       ├── education.html
│       ├── dictionary.html
│       ├── word-details.html
│       ├── games
│       │   └── flashcard.html
│       └── lessons
│           └── lesson1.html
├── server
│   ├── controllers
│   │   ├── dictionaryController.js
│   │   └── games
│   │       └── gamesController.js
│   ├── routes
│   │   ├── dictionaryRoutes.js
│   │   └── games
│   │       └── gamesRoutes.js
│   ├── services
│   │   ├── dictionaryService.js
│   │   └── games
│   │       └── gamesService.js
│   ├── app.js
│   └── server.js
└── Additional
    └── getdic.js                # Utility scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

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

To rebuild the Tailwind CSS styles during development:
```bash
npm run build:tailwind
```

This will watch for changes and automatically recompile your styles.

## Technology Stack

- **Backend**: Express.js (Node.js)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Tailwind CSS
- **Search**: Fuse.js (fuzzy search)
- **Deployment**: Vercel-ready

## Contributing

We welcome contributions! If you would like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

This project aims to preserve and promote the Mi'gmaq language and culture through accessible digital tools.
