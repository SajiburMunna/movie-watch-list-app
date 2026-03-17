"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Bell, User as UserIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

type CurrentUser = {
  name?: string;
  email: string;
} | null;

type TopbarProps = {
  onSearchChange?: (query: string) => void;
};

function Topbar({ onSearchChange }: TopbarProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<CurrentUser>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("mw_current_user");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as { name?: string; email: string };
      if (parsed?.email) {
        setUser(parsed);
      }
    } catch {
      // ignore malformed data
    }
  }, []);

  const handleLogout = () => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem("mw_current_user");
    setUser(null);
    toast.success("You have been logged out");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-red-600 text-sm font-extrabold tracking-tight text-white shadow-md">
              MW
            </span>
            <span className="hidden text-lg font-semibold tracking-tight text-white sm:inline">
              MovieWatch
            </span>
          </Link>
        </div>
        <div className="ml-auto" />

        {/* User / actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            className="rounded-full bg-neutral-900/60 p-1.5 text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
          >
            <Bell className="h-4 w-4" />
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/watch-list")}
                className="hidden text-sm font-medium text-neutral-100 hover:bg-neutral-900/70 md:inline-flex"
              >
                My List
              </Button>
              <div className="flex items-center gap-2 rounded-full bg-neutral-900/70 px-2 py-1 text-xs text-neutral-100">
                <UserIcon className="h-4 w-4 text-neutral-300" />
                <span className="max-w-[120px] truncate">
                  {user.name ?? user.email}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleLogout}
                className="border-neutral-700 bg-black/60 text-xs font-medium text-neutral-100 hover:bg-neutral-900"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                type="button"
                className="text-xs font-medium text-neutral-100 hover:bg-neutral-900/70"
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button
                asChild
                size="sm"
                type="button"
                className="bg-red-600 text-xs font-semibold text-white hover:bg-red-700"
              >
                <Link href="/sign-up">Join now</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { Topbar };
