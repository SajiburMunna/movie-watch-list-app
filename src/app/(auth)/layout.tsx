function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full bg-neutral-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-black via-neutral-950 to-neutral-950" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-red-600/25 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
      </div>
      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <main className="w-full max-w-md">{children}</main>
      </div>
    </div>
  );
}

export default AuthLayout;
