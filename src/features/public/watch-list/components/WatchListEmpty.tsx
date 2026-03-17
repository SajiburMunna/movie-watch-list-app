import Link from "next/link";

export function WatchListEmpty() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center">
      <p className="text-sm text-neutral-300">
        Your list is empty. Add something from a movie details page.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-neutral-100 hover:bg-neutral-800"
      >
        Browse titles
      </Link>
    </div>
  );
}

