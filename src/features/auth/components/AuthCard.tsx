"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkHref: string;
  footerLinkText: string;
};

export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkHref,
  footerLinkText,
}: AuthCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/70 p-7 shadow-[0_22px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:p-9">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-10 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative space-y-6">
        <header className="space-y-3 text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-red-600 text-sm font-extrabold tracking-tight text-white shadow-md ring-2 ring-red-500/40">
              MW
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.2em] text-neutral-300 sm:inline">
              MovieWatch
            </span>
          </Link>
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-emerald-300/80">
              {title.includes("Welcome") ? "Sign in" : "Join today"}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h1>
          </div>
          <p className="text-sm text-neutral-300">{subtitle}</p>
        </header>

        <section className="space-y-4">{children}</section>

        <footer className="space-y-3 text-center">
          <p className="text-xs text-neutral-400">
            This is a demo experience. Do not use real passwords.
          </p>
          <p className="text-sm text-neutral-300">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              {footerLinkText}
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

