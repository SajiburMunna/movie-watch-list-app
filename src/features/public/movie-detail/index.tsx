"use client";

import { useMovieDetail } from "./api/movie-detail-query";
import { MovieDetailHero } from "./components/MovieDetailHero";
import { MovieDetailError } from "./components/MovieDetailError";
import { MovieDetailSkeleton } from "./components/MovieDetailSkeleton";

type MovieDetailProps = {
  id: string;
};

export default function MovieDetail({ id }: MovieDetailProps) {
  const { data: movie, isLoading, isError } = useMovieDetail(id);

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (isError || !movie) {
    return <MovieDetailError />;
  }

  return <MovieDetailHero movie={movie} />;
}

