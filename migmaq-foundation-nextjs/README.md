# Mi'gmaq Foundation (Next.js Version)

This is a modern Next.js 16+ reimplementation of the Mi'gmaq Foundation web application. It provides resources for learning the Mi'gmaq language, including a comprehensive dictionary, interactive games, and educational materials.

## Features

- **Dictionary**: Searchable Mi'gmaq dictionary with English definitions and usages.
- **Flashcard Game**: Interactive memory game to learn vocabulary.
- **Education Center**: Hub for lessons and language resources.
- **Dark Mode**: Fully supported dark/light theme toggling.
- **Responsive Design**: Optimized for mobile and desktop devices.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Search**: [Fuse.js](https://fusejs.io/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Prerequisites

- Node.js 18+ installed.

### Installation

1.  Navigate to the project directory:
    ```bash
    cd migmaq-foundation-nextjs
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

- `app/`: Contains the application routes and pages (App Router).
- `components/`: Reusable UI components.
- `lib/`: Utility functions and type definitions.
- `public/assets/`: Static assets including the `dictionary.json` data file.

## License

MIT
