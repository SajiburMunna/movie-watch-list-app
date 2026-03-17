import type { TmdbMovie } from "../api/movies-queries";

export const getImageUrl = (
  path: string | null,
  size: "w300" | "w500" | "original",
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.svg");

export const getMovieTitle = (movie: TmdbMovie) =>
  movie.title ?? movie.name ?? "Untitled";

