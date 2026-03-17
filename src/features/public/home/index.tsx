"use client";

import {
  useActionMovies,
  usePopularMovies,
  useTopRatedMovies,
  useTrendingMovies,
  type TmdbMovie,
} from "./api/movies-queries";
import { HeroSection } from "./components/HeroSection";
import { MovieRow } from "./components/MovieRow";

const pickHeroMovie = (movies?: TmdbMovie[]) => {
  if (!movies || movies.length === 0) return undefined;
  const index = Math.floor(Math.random() * Math.min(movies.length, 10));
  return movies[index];
};

function Home() {
  const { data: trendingData, isLoading: isTrendingLoading } =
    useTrendingMovies();
  const { data: popularData, isLoading: isPopularLoading } = usePopularMovies();
  const { data: topRatedData, isLoading: isTopRatedLoading } =
    useTopRatedMovies();
  const { data: actionData, isLoading: isActionLoading } = useActionMovies();

  const heroMovie = pickHeroMovie(
    trendingData?.results ?? popularData?.results,
  );

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-neutral-950 via-neutral-950 to-neutral-950 text-neutral-50">
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <HeroSection movie={heroMovie} />

        <div className="space-y-8">
          <MovieRow
            title="Trending Now"
            movies={trendingData?.results}
            isLoading={isTrendingLoading}
          />
          <MovieRow
            title="Popular on MovieWatch"
            movies={popularData?.results}
            isLoading={isPopularLoading}
          />
          <MovieRow
            title="Top Rated"
            movies={topRatedData?.results}
            isLoading={isTopRatedLoading}
          />
          <MovieRow
            title="Action Thrillers"
            movies={actionData?.results}
            isLoading={isActionLoading}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
