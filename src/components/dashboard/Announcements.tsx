"use client";
import { AlertCircle, BellRing, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Announcements() {
  const { announcements, openDetail } = useApp();
  return (
    <Card>
      <h2 className="mb-3 flex items-center justify-between text-sm font-bold">Pengumuman Penting <BellRing size={14} className="text-muted" /></h2>
      <div className="space-y-3">
        {announcements.slice(0, 4).map((a) => {
          const warn = a.tone === "warning";
          const Icon = warn ? AlertCircle : Users;
          return (
            <button key={a.id} onClick={() => openDetail({ title: a.title, body: a.body, meta: a.meta })}
              className={cn("w-full rounded-xl border p-3 text-left transition hover:shadow-md", warn ? "border-[#F6E3B8] bg-[#FFF9EA]" : "border-[#D6E0F5] bg-[#EEF2FC]")}>
              <p className={cn("flex items-center gap-1.5 text-[11px] font-bold", warn ? "text-[#8A5A00]" : "text-navy")}><Icon size={12} />{a.title}</p>
              <p className="mt-1 text-[10px] leading-relaxed text-muted">{a.body}</p>
              <p className={cn("mt-1.5 text-[10px] font-semibold", warn ? "text-[#8A5A00]" : "text-muted")}>{a.meta}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
