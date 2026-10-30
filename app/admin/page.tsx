import { UserPlus, Contact, Send, Download } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { adminStats } from "@/lib/dummy";

const outline =
  "inline-flex items-center gap-2 rounded-lg border border-primary/15 bg-white px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-primary/10 pb-6">
        <div className="max-w-xl">
          <h1 className="font-heading text-3xl font-extrabold">Dasbor Administrator</h1>
          <p className="mt-2 text-neutral/80">
            Ringkasan operasional akademik, data madrasah, dan monitoring pembelajaran MI Nashrul Fajar.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className={outline}><UserPlus size={16} /> Tambah Siswa</button>
          <button className={outline}><Contact size={16} /> Tambah Guru</button>
          <button className={outline}><Send size={16} /> Kirim Pengumuman</button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
            <Download size={16} /> Unduh Laporan Mingguan
          </button>
        </div>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>
    </div>
  );
}
