"use client";
import { useRouter } from "next/navigation";
import { BookOpen, Contact, DoorOpen, GraduationCap } from "lucide-react";
import type { StatItem } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const iconMap = {
  GraduationCap,
  Contact,
  DoorOpen,
  BookOpen,
};

export default function StatisticCard({ s }: { s: StatItem }) {
  const router = useRouter();
  const Icon = iconMap[s.icon as keyof typeof iconMap] ?? BookOpen;
  return (
    <button onClick={() => router.push(s.href)}
      className="rounded-2xl border border-line bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] leading-snug text-muted">{s.label}</p>
          <p className="mt-1 text-[28px] font-extrabold leading-none">{s.value} <span className="text-xs font-medium text-muted">{s.unit}</span></p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-soft text-primary"><Icon size={17} /></span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] text-muted">
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 font-bold",
          s.pillTone === "green" && "bg-[#E6F5EE] text-success", s.pillTone === "blue" && "bg-soft text-navy", s.pillTone === "dot" && "px-0 text-ink")}>
          {s.pillTone === "dot" && <span className="h-1.5 w-1.5 rounded-full bg-success" />}{s.pill}
        </span>
        <span>{s.note}</span>
      </div>
    </button>
  );
}
