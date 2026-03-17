/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowLeft, Play, Star } from "lucide-react";

import type { TmdbMovie } from "@/features/public/home/api/movies-queries";
import { getImageUrl, getMovieTitle } from "@/features/public/home/utils/utils";

type MovieDetailHeroProps = {
  movie: TmdbMovie;
};

export function MovieDetailHero({ movie }: MovieDetailHeroProps) {
  const title = getMovieTitle(movie);
  const year = (movie.release_date ?? movie.first_air_date ?? "").slice(0, 4);

  return (
    <main className="h-full bg-neutral-950 text-neutral-50">
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-neutral-100 ring-1 ring-white/10 hover:bg-black/80"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to browsing
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-950 shadow-2xl">
          <div className="absolute inset-0">
            <img
              src={getImageUrl(movie.backdrop_path ?? movie.poster_path, "original")}
              alt={title}
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-neutral-950/40" />
          </div>

          <div className="relative z-10 flex flex-col gap-8 px-6 py-8 sm:px-10 sm:py-12 md:flex-row md:items-end">
            <div className="flex flex-1 flex-col gap-4 md:gap-5">
              <div className="space-y-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-emerald-300/80">
                  MovieWatch Title
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                  {title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-200 md:text-sm">
                {year && (
                  <span className="rounded-full bg-neutral-900/80 px-3 py-1 text-neutral-100">
                    {year}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 font-semibold text-black shadow-md">
                  <Star className="h-3.5 w-3.5 fill-black/20 text-black" />
                  <span>{movie.vote_average?.toFixed(1) ?? "NR"}</span>
                </span>
                <span className="rounded-full border border-white/15 bg-neutral-900/60 px-3 py-1 text-neutral-200">
                  HD
                </span>
              </div>

              <p className="max-w-2xl text-sm text-neutral-200 md:text-base">
                {movie.overview}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/30 hover:bg-red-700"
                >
                  <Play className="h-4 w-4 fill-white text-white" />
                  Play trailer
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2.5 text-xs font-medium text-neutral-100 hover:bg-black/70 md:text-sm"
                >
                  + My List
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

