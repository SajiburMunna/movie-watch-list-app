import type { Metadata } from "next";
import { Suspense } from "react";

import SearchPage from "@/features/public/search";

export const metadata: Metadata = {
  title: "Search | Movie Watch List",
  description: "Search movies by title",
};

export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}

