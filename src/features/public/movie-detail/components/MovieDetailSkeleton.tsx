export function MovieDetailSkeleton() {
  return (
    <main className="h-full bg-neutral-950 text-neutral-50">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-64 animate-pulse rounded-2xl bg-neutral-900" />
        <div className="space-y-3">
          <div className="h-6 w-1/3 animate-pulse rounded bg-neutral-800" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-800" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-800" />
        </div>
      </div>
    </main>
  );
}

