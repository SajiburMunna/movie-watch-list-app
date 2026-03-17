"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-neutral-800 bg-black/60 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-red-600 text-sm font-extrabold tracking-tight text-white shadow-md">
            MW
          </span>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-neutral-100">MovieWatch</p>
            <p className="text-xs leading-relaxed text-neutral-400">
              Discover trending titles and build your personal watch list.
            </p>
            <p className="text-[11px] text-neutral-500">© {year} MovieWatch</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3 lg:col-span-2 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Browse
            </p>
            <div className="flex flex-col gap-1 text-neutral-300">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <Link href="/watch-list" className="hover:text-white">
                My List
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Account
            </p>
            <div className="flex flex-col gap-1 text-neutral-300">
              <Link href="/sign-in" className="hover:text-white">
                Sign in
              </Link>
              <Link href="/sign-up" className="hover:text-white">
                Sign up
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Data
            </p>
            <p className="text-xs leading-relaxed text-neutral-400">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

