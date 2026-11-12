"use client";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { agenda } from "@/data/dashboard";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function UpcomingAgenda() {
  const { openDetail } = useApp();
  const router = useRouter();
  return (
    <Card>
      <h2 className="mb-3 flex items-center justify-between text-sm font-bold">Agenda Terdekat <CalendarDays size={14} className="text-muted" /></h2>
      <div className="space-y-1">
        {agenda.map((a) => (
          <button key={a.title} onClick={() => openDetail({ title: a.title, subtitle: `${a.day} ${a.month} 2025`, body: a.desc })}
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-bg">
            <span className={cn("flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg text-white", a.color)}>
              <span className="text-[8px] font-bold leading-none">{a.month}</span><span className="text-base font-extrabold leading-none">{a.day}</span>
            </span>
            <span><span className="block text-[11px] font-bold">{a.title}</span><span className="block text-[10px] text-muted">{a.desc}</span></span>
          </button>
        ))}
      </div>
      <Button className="mt-3 w-full" onClick={() => router.push("/academics")}>Buka Kalender Pendidikan</Button>
    </Card>
  );
}
