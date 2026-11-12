
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  GraduationCap,
  HelpCircle,
  LogOut,
  BookOpen,
  LayoutDashboard,
  Megaphone,
  MonitorCheck,
  Settings,
  Users,
} from "lucide-react";

import { navSections } from "@/data/navigation";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

// Mapping nama ikon dengan komponen Lucide React
const iconMap = {
  GraduationCap,
  HelpCircle,
  LogOut,
  BookOpen,
  LayoutDashboard,
  Megaphone,
  MonitorCheck,
  Settings,
  Users,
};

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { notify } = useApp();

  const is = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const usersOpen = [
    "/users",
    "/students",
    "/teachers",
    "/parents",
    "/accounts",
  ].some(is);

  return (
    <>
      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[195px] flex-col border-r border-line bg-white transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white">
            <GraduationCap size={18} />
          </span>

          <div className="leading-tight">
            <p className="text-[15px] font-extrabold text-navy">
              SINfonia LMS
            </p>
            <p className="text-[9px] text-muted">
              MI Nashrul Fajar • Super Admin / TU
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {navSections.map((s) => (
            <div key={s.title} className="mt-4">
              <p className="mb-1.5 px-2 text-[9px] font-semibold tracking-wider text-muted">
                {s.title}
              </p>

              {s.items.map((it) => {
                const Icon = it.icon
                  ? iconMap[it.icon as keyof typeof iconMap]
                  : null;

                const active = it.children
                  ? pathname === it.href
                  : is(it.href);

                return (
                  <div key={it.href}>
                    <Link
                      href={it.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-semibold transition-colors",
                        active
                          ? "bg-soft text-navy"
                          : "text-ink hover:bg-bg"
                      )}
                    >
                      {Icon && <Icon size={15} />}
                      {it.label}
                    </Link>

                    {/* Submenu */}
                    {it.children && usersOpen && (
                      <div className="mt-0.5">
                        {it.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={onClose}
                            className={cn(
                              "block rounded-lg py-2 pl-9 pr-2 text-[11px] transition-colors",
                              is(c.href)
                                ? "bg-soft font-semibold text-navy"
                                : "text-ink/80 hover:bg-bg"
                            )}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-line px-3 py-3">
          <Link
            href="/help"
            onClick={onClose}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-semibold hover:bg-bg",
              is("/help") && "bg-soft text-navy"
            )}
          >
            <HelpCircle size={15} />
            Pusat Bantuan
          </Link>

          <button
            onClick={() => notify("Anda telah keluar (simulasi).")}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-danger hover:bg-danger/10"
          >
            <LogOut size={15} />
            Keluar Akun
          </button>
        </div>
      </aside>
    </>
  );
}
