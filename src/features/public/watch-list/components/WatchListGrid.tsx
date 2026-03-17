import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import type { TmdbMovie } from "@/features/public/home/api/movies-queries";
import { getImageUrl, getMovieTitle } from "@/features/public/home/utils/utils";

type WatchListGridProps = {
  ids: number[];
  movies: TmdbMovie[];
  isLoading: boolean;
  onRemove: (id: number) => void;
};

const getYear = (movie: TmdbMovie) =>
  (movie.release_date ?? movie.first_air_date ?? "").slice(0, 4);

export function WatchListGrid({
  ids,
  movies,
  isLoading,
  onRemove,
}: WatchListGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {isLoading &&
        Array.from({ length: Math.min(ids.length, 10) }).map((_, idx) => (
          <div
            key={idx}
            className="aspect-2/3 animate-pulse rounded-xl bg-neutral-900"
          />
        ))}

      {movies.map((movie) => (
        <div key={movie.id} className="relative">
          <Link
            href={`/movie/${movie.id}`}
            className="relative block overflow-hidden rounded-xl border border-white/5 bg-neutral-900 shadow-md"
          >
            <Image
              src={getImageUrl(movie.poster_path, "w500")}
              alt={getMovieTitle(movie)}
              width={500}
              height={750}
              className="aspect-2/3 w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="pointer-events-none absolute inset-x-2 bottom-2 space-y-0.5">
              <p className="line-clamp-1 text-sm font-semibold text-white">
                {getMovieTitle(movie)}
              </p>
              <p className="text-xs text-neutral-300">
                {getYear(movie) || "—"}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => onRemove(movie.id)}
            className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-neutral-100 ring-1 ring-white/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
