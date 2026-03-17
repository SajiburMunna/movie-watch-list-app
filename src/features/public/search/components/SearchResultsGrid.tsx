/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";

import type { TmdbMovie } from "@/features/public/home/api/movies-queries";
import { getImageUrl, getMovieTitle } from "@/features/public/home/utils/utils";
import { useWatchList } from "@/features/public/watch-list/hooks/use-watch-list";

type SearchResultsGridProps = {
  movies: TmdbMovie[];
};

const getYear = (movie: TmdbMovie) =>
  (movie.release_date ?? movie.first_air_date ?? "").slice(0, 4);

export function SearchResultsGrid({ movies }: SearchResultsGridProps) {
  const { user, isInList, toggle } = useWatchList();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <article
          key={movie.id}
          className="relative overflow-hidden rounded-xl border border-white/5 bg-neutral-900 shadow-md"
        >
          <div className="relative">
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={getMovieTitle(movie)}
              width={500}
              height={750}
              loading="lazy"
              decoding="async"
              className="aspect-2/3 w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
            <div className="pointer-events-none absolute inset-x-2 bottom-2 space-y-0.5">
              <p className="line-clamp-1 text-sm font-semibold text-white">
                {getMovieTitle(movie)}
              </p>
              <p className="text-xs text-neutral-300">
                {getYear(movie) || "—"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-2">
            <Link
              href={`/movie/${movie.id}`}
              className="inline-flex items-center justify-center rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-black hover:bg-white"
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
                  inList ? "Removed from Watchlist" : "Added to Watchlist",
                );
              }}
              className="inline-flex items-center justify-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
            >
              {isInList(movie.id) ? (
                <>
                  <Check className="h-4 w-4" />
                  In List
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Watchlist
                </>
              )}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
