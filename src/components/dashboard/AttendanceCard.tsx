"use client";
import { Radio } from "lucide-react";
import Card from "@/components/ui/Card";
import { attendance } from "@/data/dashboard";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function AttendanceCard() {
  const { openDetail } = useApp();
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold">Ringkasan Kehadiran Madrasah Hari Ini <span className="h-2 w-2 rounded-full bg-success" /></h2>
          <p className="mt-1 text-[10px] text-muted">Sinkronisasi otomatis RFID & kartu absensi (Pukul 07:45 WIB)</p>
        </div>
        <button onClick={() => openDetail({ title: "Tap-in Masuk", body: "528 siswa telah melakukan tap-in masuk melalui gerbang RFID hingga pukul 07:45 WIB." })}
          className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 text-[10px] font-bold text-primary hover:bg-[#dbe7fa]">
          <Radio size={12} />528 Tap-in Masuk
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {attendance.map((a) => (
          <div key={a.label} className={cn("rounded-xl border p-3", a.cls)}>
            <p className="text-[10px] font-bold">{a.label}</p>
            <p className="mt-1 text-2xl font-extrabold">{a.pct}</p>
            <p className="text-[10px] font-medium">{a.count}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col justify-between gap-1 text-[10px] text-muted sm:flex-row">
        <p>Santri Masuk Tercepat: <b className="text-ink">06:21 WIB</b> (M. Rizqi - 5A)</p>
        <p>Pintu Gerbang Madrasah Ditutup Pukul 07:15 WIB</p>
      </div>
    </Card>
  );
}
