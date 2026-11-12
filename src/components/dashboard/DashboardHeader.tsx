"use client";
import { Download, Megaphone, UserPlus, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { attendance, stats } from "@/data/dashboard";
import { useApp } from "@/lib/store";

export default function DashboardHeader() {
  const { openModal, notify } = useApp();

  const download = () => {
    const rows = [["Kategori", "Nilai"], ...stats.map((s) => [s.label, `${s.value} ${s.unit}`]), ...attendance.map((a) => [a.label, `${a.pct} (${a.count})`])];
    const blob = new Blob([rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "laporan-mingguan-sinfonia.csv"; a.click();
    URL.revokeObjectURL(url);
    notify("Laporan mingguan diunduh.");
  };

  return (
    <div className="flex flex-col gap-4 border-b border-line pb-4 md:flex-row md:items-start md:justify-between">
      <div className="max-w-md">
        <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-ink">Dasbor Administrator</h1>
        <p className="mt-1 text-xs text-muted">Ringkasan operasional akademik, data madrasah, dan monitoring pembelajaran MI Nashrul Fajar.</p>
      </div>
      <div className="flex flex-wrap gap-2 md:max-w-[380px] md:justify-end">
        <Button onClick={() => openModal("student")}><UserPlus size={13} />Tambah Siswa</Button>
        <Button onClick={() => openModal("teacher")}><Users size={13} />Tambah Guru</Button>
        <Button onClick={() => openModal("announcement")}><Megaphone size={13} />Kirim Pengumuman</Button>
        <Button variant="primary" onClick={download}><Download size={13} />Unduh Laporan Mingguan</Button>
      </div>
    </div>
  );
}
