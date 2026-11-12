"use client";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AppModals from "./AppModals";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <div className="min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 lg:pl-[195px]">
        <Header onMenu={() => setOpen(true)} />
        <main className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6">{children}</main>
      </div>
      <AppModals />
    </div>
  );
}
