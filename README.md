# CineXplore

A Movie Explorer app for browsing popular movies, searching by title, and viewing details in a modal. It uses the TMDB (The Movie Database) API v3 for data.

## Features

- **Home page** with hero banner and CTA button
- **Movie listing page** with a search bar
- **Responsive movie grid** (mobile 1-column, tablet 2-column, desktop 3-4 column)
- **Movie detail modal** with backdrop, title, overview, rating, release date, genres, and director
- **Dark mode** support via Tailwind CSS `dark` variant
- **Error handling** for rate limits, network failures, and missing data

## Getting Started

### Prerequisites

A TMDB API key. Set it in `.env`:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_ACCESS_TOKEN=your_access_token_here
```

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Lint

```bash
bun run lint
```
### Format

```bash
bunx --yes prettier --write .
```

## Tech Stack

- **Framework:** React 19, Vite
- **Styling:** Tailwind CSS v4
- **API:** TMDB (The Movie Database) v3
