type WatchListHeaderProps = {
  name: string;
  count: number;
};

export function WatchListHeader({ name, count }: WatchListHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-3">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">My List</h1>
        <p className="text-sm text-neutral-300">
          Saved titles for{" "}
          <span className="font-semibold text-neutral-100">{name}</span>
        </p>
      </div>
      <span className="rounded-full border border-white/10 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-200">
        {count} title{count === 1 ? "" : "s"}
      </span>
    </div>
  );
}

