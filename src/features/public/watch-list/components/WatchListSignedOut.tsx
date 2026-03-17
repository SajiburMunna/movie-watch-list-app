import Link from "next/link";

export function WatchListSignedOut() {
  return (
    <main className="h-full bg-neutral-950 text-neutral-50">
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-3 px-4 py-10 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">My List</h1>
        <p className="max-w-md text-sm text-neutral-300">
          Sign in to save titles to your watch list.
        </p>
        <Link
          href="/sign-in"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}

