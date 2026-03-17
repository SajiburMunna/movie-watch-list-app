"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { useDebouncedValue } from "../../../hooks/use-debounced-value";
import { useMovieSearch } from "./api/search-queries";
import { SearchResultsGrid } from "./components/SearchResultsGrid";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const [query, setQuery] = React.useState(q);
  React.useEffect(() => setQuery(q), [q]);

  const debounced = useDebouncedValue(query, 350);
  const { data, isLoading, isError } = useMovieSearch(debounced);
  const results = data?.results ?? [];

  return (
    <main className="h-full bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">Search</h1>

          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              value={query}
              onChange={(e) => {
                const next = e.target.value;
                setQuery(next);
                router.replace(`/search?q=${encodeURIComponent(next)}`);
              }}
              placeholder="Search movies by title..."
              className="h-10 rounded-full border-neutral-700 bg-neutral-900/70 pl-9 text-neutral-100 placeholder:text-neutral-500"
            />
          </div>
        </div>

        {query.trim().length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center text-sm text-neutral-300">
            Start typing to search for a movie.
          </div>
        )}

        {query.trim().length > 0 && isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-2/3 animate-pulse rounded-xl bg-neutral-900"
              />
            ))}
          </div>
        )}

        {query.trim().length > 0 && isError && (
          <div className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center text-sm text-neutral-300">
            Something went wrong while searching. Please try again.
          </div>
        )}

        {query.trim().length > 0 &&
          !isLoading &&
          !isError &&
          results.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center text-sm text-neutral-300">
              No results found for{" "}
              <span className="font-semibold text-white">“{query}”</span>.
            </div>
          )}

        {results.length > 0 && <SearchResultsGrid movies={results} />}
      </div>
    </main>
  );
}
