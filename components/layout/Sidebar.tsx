"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, CircleHelp, ExternalLink, LogOut } from "lucide-react";
import { menuByRole, roleLabel, type Role } from "@/lib/menu";

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = menuByRole[role].flatMap((section) => section.items);

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-primary/10 bg-white lg:flex">
      <div className="flex items-center gap-3 border-b border-primary/10 p-5">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-white">
          <GraduationCap size={22} />
        </div>
        <div>
          <p className="font-heading text-lg font-extrabold leading-tight text-primary">SINfonia LMS</p>
          <p className="text-xs text-neutral/70">MI Nashrul Fajar • {roleLabel[role]}</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {items.map(({ label, href, icon: Icon, children }) => {
            const active = children ? pathname.startsWith(href) : pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    active ? "bg-primary/10 text-primary" : "text-neutral hover:bg-primary/5"
                  }`}
                >
                  <Icon size={20} />
                  <span className="flex-1">{label}</span>
                  {active && children && <span className="size-1.5 rounded-full bg-primary" />}
                </Link>
                {active && children && (
                  <ul className="mt-1 space-y-0.5 pl-11">
                    {children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className={`block rounded-md px-2 py-1.5 text-sm hover:text-primary ${
                            pathname.startsWith(c.href) ? "font-semibold text-primary" : "text-neutral/80"
                          }`}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-1 border-t border-primary/10 p-3 text-sm font-semibold">
        <Link href="/bantuan" className="flex items-center gap-3 rounded-lg bg-tertiary/10 px-3 py-2.5 text-primary hover:bg-tertiary/20">
          <CircleHelp size={20} />
          <span className="flex-1">Bantuan & Dukungan</span>
          <ExternalLink size={14} />
        </Link>
        <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50">
          <LogOut size={20} /> Keluar Akun
        </Link>
      </div>
    </aside>
  );
}
