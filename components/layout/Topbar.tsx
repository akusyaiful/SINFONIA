import { Search, Bell, Zap, CalendarDays } from "lucide-react";

type Props = { user: { name: string; role: string } };

export default function Topbar({ user }: Props) {
  const initials = user.name.split(" ").filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-primary/10 bg-white/90 px-6 py-3 backdrop-blur">
      <label className="relative min-w-0 flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/50" />
        <input
          type="search"
          placeholder="Cari siswa (NIS/Nama), guru, kelas, atau berkas kurikulum..."
          className="w-full rounded-lg border border-primary/15 bg-surface py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <span className="hidden items-center gap-2 rounded-full bg-tertiary/10 px-4 py-2 text-sm font-semibold text-primary xl:flex">
        <CalendarDays size={16} /> TA 2024/2025 Genap
      </span>

      <button className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark md:flex">
        <Zap size={16} /> Entri Data Cepat
      </button>

      <button aria-label="Notifikasi" className="relative rounded-lg p-2 hover:bg-primary/5">
        <Bell size={20} />
        <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
      </button>

      <div className="flex items-center gap-3 border-l border-primary/10 pl-3">
        <div className="hidden text-right leading-tight sm:block">
          <p className="text-sm font-bold">{user.name}</p>
          <p className="text-xs text-neutral/70">{user.role}</p>
        </div>
        <div className="grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-white">
          {initials}
        </div>
      </div>
    </header>
  );
}
