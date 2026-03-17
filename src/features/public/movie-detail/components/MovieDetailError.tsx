import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function MovieDetailError() {
  return (
    <main className="h-full bg-neutral-950 text-neutral-50">
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-10 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-neutral-300">
          We couldn&apos;t load details for this title.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  );
}

