# Movie Watch List App

A movie discovery app where you can search movies, view details, and manage a personal watch list. Built with Next.js.

## Project link

- GitHub: `https://github.com/SajiburMunna/movie-watch-list-app`

- Live: `https://movie-watch-list-app-mu.vercel.app/`

## Demo video

- Video: `https://www.loom.com/share/158053918fe94e74af29a0196732d1f6`

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TanStack Query (React Query)
- shadcn/ui + Radix UI

## Requirements

- Node.js 18+ recommended

## Environment variables

Create `.env.local` in the project root (or copy from `.env.example`) and set:

- `NEXT_PUBLIC_TMDB_BASE_URL`: TMDB API base URL (example: `https://api.themoviedb.org/3`)
- `NEXT_PUBLIC_API_KEY`: Your TMDB API key

Example:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and fill the values.

## Run the project (local)

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev`: start development server
- `npm run build`: create production build
- `npm run start`: run production server (after build)
- `npm run lint`: run ESLint

## Basic documentation

### Main pages/features

- **Home**: browse curated movie rows and featured content
- **Search**: search movies and browse results
- **Movie detail**: view movie overview and metadata
- **Watch list**: add/remove movies from your watch list

### Project structure (high level)

- `src/components/`: shared UI + layout components
- `src/features/public/`: feature modules (home, search, movie detail, watch list)
- `.env.example`: environment variable template
