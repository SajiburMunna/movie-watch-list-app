/* eslint-disable @next/next/no-img-element */
"use client";

import type { TmdbMovie } from "../api/movies-queries";
import { getImageUrl, getMovieTitle } from "../utils/utils";

type HeroSectionProps = {
  movie?: TmdbMovie;
};

export function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) return null;

  return (
    <section className="relative mb-10 overflow-hidden rounded-2xl border border-white/5 bg-neutral-950 shadow-2xl">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(
            movie.backdrop_path ?? movie.poster_path,
            "original",
          )}
          alt={getMovieTitle(movie)}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-neutral-950/40" />
      </div>
      <div className="relative z-10 flex flex-col gap-6 px-6 py-10 sm:px-10 md:flex-row md:items-end md:py-16">
        <div className="max-w-xl space-y-4 md:space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            MovieWatch Originals
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {getMovieTitle(movie)}
          </h1>
          <p className="line-clamp-4 max-w-lg text-sm text-neutral-200 md:text-base">
            {movie.overview}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 font-semibold text-black shadow-md">
              <span className="text-[11px] uppercase tracking-wide">Score</span>
              <span>{movie.vote_average?.toFixed(1) ?? "NR"}</span>
            </span>
            {(movie.release_date ?? movie.first_air_date) && (
              <span className="rounded-full bg-neutral-900/80 px-3 py-1 text-neutral-100">
                {(movie.release_date ?? movie.first_air_date)?.slice(0, 4)}
              </span>
            )}
            <span className="rounded-full border border-white/10 bg-neutral-900/60 px-3 py-1 text-neutral-200">
              HD
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
