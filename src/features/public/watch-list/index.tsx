"use client";

import { toast } from "sonner";

import { useWatchList } from "./hooks/use-watch-list";
import { useWatchListMovies } from "./api/watch-list-queries";
import { WatchListSignedOut } from "./components/WatchListSignedOut";
import { WatchListHeader } from "./components/WatchListHeader";
import { WatchListEmpty } from "./components/WatchListEmpty";
import { WatchListGrid } from "./components/WatchListGrid";
import type { TmdbMovie } from "@/features/public/home/api/movies-queries";

export default function WatchList() {
  const { user, ids, remove } = useWatchList();
  const queries = useWatchListMovies(ids);

  if (!user) return <WatchListSignedOut />;

  const movies = queries
    .map((q) => q.data)
    .filter((m): m is TmdbMovie => Boolean(m));
  const isLoading = queries.some((q) => q.isLoading);

  return (
    <main className="h-full bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <WatchListHeader name={user.name ?? user.email} count={ids.length} />

        {ids.length === 0 && <WatchListEmpty />}

        {ids.length > 0 && (
          <WatchListGrid
            ids={ids}
            movies={movies}
            isLoading={isLoading}
            onRemove={(id) => {
              remove(id);
              toast.success("Removed from My List");
            }}
          />
        )}
      </div>
    </main>
  );
}

