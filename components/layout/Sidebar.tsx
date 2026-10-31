"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, CircleHelp, LogOut } from "lucide-react";
import { menuByRole, roleLabel, type Role } from "@/lib/menu";

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();

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

      <nav className="flex-1 space-y-5 overflow-y-auto p-3">
        {menuByRole[role].map((section) => (
          <div key={section.title}>
            {section.title && (
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral/60">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map(({ label, href, icon: Icon, children }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                        active ? "bg-primary/10 text-primary" : "text-neutral hover:bg-primary/5"
                      }`}
                    >
                      <Icon size={20} />
                      {label}
                    </Link>
                    {children && (
                      <ul className="mt-1 space-y-0.5 pl-11">
                        {children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className={`block rounded-md px-2 py-1.5 text-sm hover:text-primary ${
                                pathname === c.href ? "font-semibold text-primary" : "text-neutral/80"
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
          </div>
        ))}
      </nav>

      <div className="space-y-1 border-t border-primary/10 p-3 text-sm font-semibold">
        <Link href="/bantuan" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary/5">
          <CircleHelp size={20} /> Pusat Bantuan
        </Link>
        <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50">
          <LogOut size={20} /> Keluar Akun
        </Link>
      </div>
    </aside>
  );
}
