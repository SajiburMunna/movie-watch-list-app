import type { ReactNode } from "react";

import { Topbar } from "@/components/layout/Topbar";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex h-dvh flex-col bg-neutral-950 text-neutral-50">
      <Topbar />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {children}
      </div>
    </div>
  );
}

