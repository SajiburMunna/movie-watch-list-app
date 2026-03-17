/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import type { TmdbMovie } from "../api/movies-queries";
import { getImageUrl, getMovieTitle } from "../utils/utils";
import { ScrollArea } from "@/components/ui/ScrollArea";

type RowProps = {
  title: string;
  movies?: TmdbMovie[];
  isLoading: boolean;
};

export function MovieRow({ title, movies, isLoading }: RowProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-neutral-100 md:text-xl">
        {title}
      </h2>
      <div className="relative">
        {isLoading && (
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="h-40 w-28 shrink-0 animate-pulse rounded-md bg-neutral-800 md:h-52 md:w-36"
              />
            ))}
          </div>
        )}
        {!isLoading && movies && (
          <ScrollArea className="w-full">
            <div className="flex w-max gap-3 pb-2">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="group relative block h-40 w-28 shrink-0 cursor-pointer overflow-hidden rounded-md bg-neutral-900 shadow-md transition-transform duration-200 hover:z-10 hover:scale-110 md:h-52 md:w-36"
                >
                  <img
                    src={getImageUrl(movie.poster_path, "w300")}
                    alt={getMovieTitle(movie)}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-1 bottom-1 space-y-1 text-xs text-neutral-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:text-sm">
                    <p className="line-clamp-1 font-semibold">
                      {getMovieTitle(movie)}
                    </p>
                    <p className="flex items-center gap-1 text-[10px] text-neutral-300 md:text-xs">
                      <span className="rounded-sm bg-neutral-900/70 px-1 py-0.5 text-[10px] font-semibold text-emerald-400 md:text-xs">
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "NR"}
                      </span>
                      <span className="line-clamp-1">
                        {(movie.release_date ?? movie.first_air_date ?? "").slice(
                          0,
                          4,
                        )}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </section>
  );
}
