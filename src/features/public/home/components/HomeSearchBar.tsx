"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/Input";

export function HomeSearchBar() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }}
      className="mb-6"
    >
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies by title..."
          className="h-11 rounded-full border-neutral-700 bg-neutral-900/70 pl-9 text-neutral-100 placeholder:text-neutral-500"
        />
      </div>
    </form>
  );
}
