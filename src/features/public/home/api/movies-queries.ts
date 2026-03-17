import { useQuery } from "@tanstack/react-query";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

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
};

type TmdbPaginatedResponse = {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
};

const buildTmdbUrl = (path: string, params?: Record<string, string | number>) => {
  const url = new URL(`${TMDB_BASE_URL}${path}`);

  if (TMDB_API_KEY) {
    url.searchParams.set("api_key", TMDB_API_KEY);
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );
  }

  return url.toString();
};

const fetchTmdb = async (
  path: string,
  params?: Record<string, string | number>,
): Promise<TmdbPaginatedResponse> => {
  const url = buildTmdbUrl(path, params);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`TMDB request failed with status ${res.status}`);
  }

  return res.json();
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

