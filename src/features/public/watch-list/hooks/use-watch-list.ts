"use client";

import * as React from "react";

type CurrentUser = { email: string; name?: string } | null;

const readCurrentUser = (): CurrentUser => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem("mw_current_user");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { email?: string; name?: string };
    if (!parsed?.email) return null;
    return { email: parsed.email, name: parsed.name };
  } catch {
    return null;
  }
};

const keyFor = (email: string) => `mw_watch_list:${email.toLowerCase()}`;

const readIds = (email: string): number[] => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(keyFor(email));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((x) => Number(x)).filter((n) => Number.isFinite(n));
  } catch {
    return [];
  }
};

const writeIds = (email: string, ids: number[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(keyFor(email), JSON.stringify(ids));
};

export function useWatchList() {
  const [user, setUser] = React.useState<CurrentUser>(null);
  const [ids, setIds] = React.useState<number[]>([]);

  React.useEffect(() => {
    const u = readCurrentUser();
    setUser(u);
    if (u?.email) setIds(readIds(u.email));
  }, []);

  const isInList = React.useCallback(
    (id: number) => ids.includes(id),
    [ids],
  );

  const add = React.useCallback(
    (id: number) => {
      if (!user?.email) return { ok: false as const, reason: "not_signed_in" as const };
      setIds((prev) => {
        if (prev.includes(id)) return prev;
        const next = [id, ...prev];
        writeIds(user.email, next);
        return next;
      });
      return { ok: true as const };
    },
    [user],
  );

  const remove = React.useCallback(
    (id: number) => {
      if (!user?.email) return { ok: false as const, reason: "not_signed_in" as const };
      setIds((prev) => {
        const next = prev.filter((x) => x !== id);
        writeIds(user.email, next);
        return next;
      });
      return { ok: true as const };
    },
    [user],
  );

  const toggle = React.useCallback(
    (id: number) => {
      if (!user?.email) return { ok: false as const, reason: "not_signed_in" as const };
      if (ids.includes(id)) return remove(id);
      return add(id);
    },
    [add, ids, remove, user],
  );

  return { user, ids, isInList, add, remove, toggle };
}

