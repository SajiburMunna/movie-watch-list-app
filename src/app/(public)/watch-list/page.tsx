import type { Metadata } from "next";

import WatchList from "@/features/public/watch-list";

export const metadata: Metadata = {
  title: "My List | Movie Watch List",
  description: "Your saved titles",
};

export default function Page() {
  return <WatchList />;
}

