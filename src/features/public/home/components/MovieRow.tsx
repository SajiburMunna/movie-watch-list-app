"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Check, Plus } from "lucide-react";

import type { TmdbMovie } from "../api/movies-queries";
import { getImageUrl, getMovieTitle } from "../utils/utils";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useWatchList } from "@/features/public/watch-list/hooks/use-watch-list";

type RowProps = {
  title: string;
  movies?: TmdbMovie[];
  isLoading: boolean;
};

const getYear = (movie: TmdbMovie) =>
  (movie.release_date ?? movie.first_air_date ?? "").slice(0, 4);

export function MovieRow({ title, movies, isLoading }: RowProps) {
  const { user, isInList, toggle } = useWatchList();
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
                <article
                  key={movie.id}
                  className="relative h-44 w-32 shrink-0 overflow-hidden rounded-md border border-white/5 bg-neutral-900 shadow-md md:h-60 md:w-40"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={getImageUrl(movie.poster_path, "w300")}
                      alt={getMovieTitle(movie)}
                      fill
                      sizes="(min-width: 768px) 160px, 128px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent" />
                  </div>

                  <div className="relative flex h-full flex-col justify-end gap-2 p-2">
                    <div className="space-y-0.5">
                      <p className="line-clamp-1 text-xs font-semibold text-white md:text-sm">
                        {getMovieTitle(movie)}
                      </p>
                      <p className="text-[11px] text-neutral-300 md:text-xs">
                        {getYear(movie) || "—"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/movie/${movie.id}`}
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-neutral-100 px-2 py-1 text-[11px] font-semibold text-black hover:bg-white md:text-xs"
                      >
                        Details
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          if (!user) {
                            toast.error("Please sign in to use Watchlist");
                            return;
                          }
                          const inList = isInList(movie.id);
                          toggle(movie.id);
                          toast.success(
                            inList
                              ? "Removed from Watchlist"
                              : "Added to Watchlist",
                          );
                        }}
                        className="inline-flex cursor-pointer flex-1 items-center justify-center rounded-full bg-red-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-red-700 md:text-xs"
                      >
                        {isInList(movie.id) ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Watchlist</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Watchlist</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </section>
  );
}
