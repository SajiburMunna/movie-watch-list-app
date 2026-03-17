import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api-client";
import type { TmdbPaginatedResponse } from "@/features/public/home/api/movies-queries";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

const client = new ApiClient({
  baseUrl: TMDB_BASE_URL,
  withCredentials: false,
});

export const searchKeys = {
  all: ["search"] as const,
  movies: (query: string) => [...searchKeys.all, "movies", query] as const,
};

export const useMovieSearch = (query: string) =>
  useQuery({
    enabled: query.trim().length > 0,
    queryKey: searchKeys.movies(query.trim()),
    queryFn: async () =>
      client.get<TmdbPaginatedResponse>("/search/movie", {
        query: {
          api_key: TMDB_API_KEY ?? "",
          query: query.trim(),
          include_adult: false,
        },
      }),
    staleTime: 1000 * 15,
  });

