"use client";
import { useRouter } from "next/navigation";
import { ChevronRight, Zap } from "lucide-react";
import Card from "@/components/ui/Card";
import { quickActions } from "@/data/dashboard";
import { useApp } from "@/lib/store";

export default function QuickActions() {
  const router = useRouter();
  const { openModal, openDetail } = useApp();
  const run = (a: string) => {
    if (a === "student") openModal("student");
    else if (a === "emis") openDetail({ title: "Sinkronisasi EMIS Kemenag", body: "Verifikasi sinkron 4.0 berhasil disimulasikan. Tidak ada data yang bentrok." });
    else router.push(a);
  };
  return (
    <Card>
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold"><Zap size={14} className="text-navy" />Aksi Cepat Pengelolaan</h2>
      <div className="space-y-2">
        {quickActions.map((q) => {
          const Icon = q.icon;
          return (
            <button key={q.title} onClick={() => run(q.action)} className="flex w-full items-center gap-3 rounded-xl border border-line bg-bg p-2.5 text-left hover:bg-soft">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-soft text-primary"><Icon size={15} /></span>
              <span className="min-w-0 flex-1"><span className="block text-[11px] font-bold">{q.title}</span><span className="block text-[10px] text-muted">{q.desc}</span></span>
              <ChevronRight size={14} className="text-muted" />
            </button>
          );
        })}
      </div>
    </Card>
  );
}
