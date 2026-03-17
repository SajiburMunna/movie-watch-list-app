import type { ReactNode } from "react";

import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex h-dvh flex-col bg-neutral-950 text-neutral-50">
      <Topbar />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex min-h-full flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

