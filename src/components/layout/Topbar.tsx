"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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
  const [search, setSearch] = React.useState("");

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

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearchChange?.(search);
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            MW
          </span>
          <span className="hidden text-base font-semibold sm:inline">
            MovieWatch
          </span>
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 items-center gap-2"
        >
          <Input
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search movies, shows, or people..."
            className="max-w-xl"
          />
        </form>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/watch-list")}
              >
                Watchlist
              </Button>
              <span className="hidden text-sm text-muted-foreground md:inline">
                {user.name ?? user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" type="button">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm" type="button">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export { Topbar };
