import { useQuery } from "@tanstack/react-query";

import { ApiClient } from "@/lib/api-client";
import type { TmdbMovie } from "@/features/public/home/api/movies-queries";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

const client = new ApiClient({
  baseUrl: TMDB_BASE_URL,
  withCredentials: false,
});

export const movieDetailKeys = {
  detail: (id: string | number) => ["movie", "detail", id] as const,
};

export const useMovieDetail = (id: string | number) =>
  useQuery({
    enabled: !!id,
    queryKey: movieDetailKeys.detail(id),
    queryFn: async () =>
      client.get<TmdbMovie>(`/movie/${id}`, {
        query: {
          api_key: TMDB_API_KEY ?? "",
          append_to_response: "credits,videos,images",
        },
      }),
  });
