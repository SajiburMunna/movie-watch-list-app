import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api-client";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

type TmdbMovie = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genres?: Array<{ id: number; name: string }>;
};

type TmdbPaginatedResponse = {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
};

const fetchTmdb = async (
  path: string,
  params?: Record<string, string | number>,
): Promise<TmdbPaginatedResponse> => {
  const client = new ApiClient({
    baseUrl: TMDB_BASE_URL,
    withCredentials: false,
  });

  return client.get<TmdbPaginatedResponse>(path, {
    query: {
      api_key: TMDB_API_KEY ?? "",
      ...(params ?? {}),
    },
  });
};

export const movieKeys = {
  all: ["movies"] as const,
  trending: () => [...movieKeys.all, "trending"] as const,
  popular: () => [...movieKeys.all, "popular"] as const,
  topRated: () => [...movieKeys.all, "top-rated"] as const,
  action: () => [...movieKeys.all, "action"] as const,
};

export const useTrendingMovies = () =>
  useQuery({
    queryKey: movieKeys.trending(),
    queryFn: () => fetchTmdb("/trending/movie/week"),
  });

export const usePopularMovies = () =>
  useQuery({
    queryKey: movieKeys.popular(),
    queryFn: () => fetchTmdb("/movie/popular"),
  });

export const useTopRatedMovies = () =>
  useQuery({
    queryKey: movieKeys.topRated(),
    queryFn: () => fetchTmdb("/movie/top_rated"),
  });

export const useActionMovies = () =>
  useQuery({
    queryKey: movieKeys.action(),
    queryFn: () =>
      fetchTmdb("/discover/movie", {
        with_genres: 28,
        sort_by: "popularity.desc",
      }),
  });

export type { TmdbMovie, TmdbPaginatedResponse };

