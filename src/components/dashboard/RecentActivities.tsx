"use client";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import { activities } from "@/data/dashboard";
import { useApp } from "@/lib/store";

export default function RecentActivities() {
  const { openDetail } = useApp();
  const router = useRouter();
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold">Aktivitas Operasional & Pembelajaran Terbaru</h2>
          <p className="mt-1 text-[10px] text-muted">Log pembaharuan data kurikulum dan interaksi guru di sistem.</p>
        </div>
        <button onClick={() => router.push("/monitoring")} className="shrink-0 text-[10px] font-bold text-primary hover:underline">Lihat Semua Log</button>
      </div>
      <ul className="mt-4 space-y-1">
        {activities.map((a) => {
          const Icon = a.icon;
          return (
            <li key={a.title}>
              <button onClick={() => openDetail({ title: a.title, body: a.desc, meta: a.time })} className="flex w-full items-start gap-3 rounded-xl p-2.5 text-left hover:bg-bg">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-soft text-primary"><Icon size={15} /></span>
                <span className="min-w-0 flex-1"><span className="block text-[11px] font-bold">{a.title}</span><span className="block text-[10px] text-muted">{a.desc}</span></span>
                <span className="hidden shrink-0 text-[10px] text-muted sm:block">{a.time}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
