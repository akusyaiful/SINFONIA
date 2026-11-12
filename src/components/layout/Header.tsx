"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CalendarDays, ChevronDown, MessageSquare, Menu, UserPlus, Users, Megaphone, Zap } from "lucide-react";
import SearchBar, { type SearchResult } from "@/components/ui/SearchBar";
import Dropdown from "@/components/ui/Dropdown";
import { classes, curriculumFiles, notifications } from "@/data/dashboard";
import { useApp } from "@/lib/store";

const item = "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium hover:bg-soft";

export default function Header({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const { students, teachers, openModal, notify } = useApp();
  const [q, setQ] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    const all: SearchResult[] = [
      ...students.map((s) => ({ type: "Siswa", title: s.name, sub: `NIS ${s.nis} • Kelas ${s.kelas}`, href: "/students" })),
      ...teachers.map((g) => ({ type: "Guru", title: g.name, sub: `NIP ${g.nip} • ${g.mapel}`, href: "/teachers" })),
      ...classes.map((c) => ({ type: "Kelas", title: c, sub: "Rombongan belajar", href: "/academics" })),
      ...curriculumFiles.map((f) => ({ type: "Berkas", title: f, sub: "Kurikulum", href: "/learning" })),
    ];
    return all.filter((r) => `${r.title} ${r.sub}`.toLowerCase().includes(t)).slice(0, 8);
  }, [q, students, teachers]);

  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center gap-2 border-b border-line bg-white/95 px-3 backdrop-blur sm:gap-3 sm:px-5">
      <button aria-label="Buka menu" onClick={onMenu} className="rounded-lg p-2 text-navy hover:bg-soft lg:hidden"><Menu size={18} /></button>
      <SearchBar value={q} onChange={setQ} results={results} onPick={(r) => { setQ(""); router.push(r.href); }} />

      <div className="hidden items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 text-[10px] font-semibold text-navy md:flex">
        <CalendarDays size={13} />TA 2024/2025 Genap
      </div>

      <Dropdown width="w-56" trigger={(t) => (
        <button onClick={t} className="flex items-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-[11px] font-semibold text-white hover:bg-primary">
          <Zap size={13} /><span className="hidden sm:inline">Entri Data Cepat</span>
        </button>)}>
        {(close) => (<>
          <button className={item} onClick={() => { close(); openModal("student"); }}><UserPlus size={14} />Tambah Siswa</button>
          <button className={item} onClick={() => { close(); openModal("teacher"); }}><Users size={14} />Tambah Guru</button>
          <button className={item} onClick={() => { close(); openModal("announcement"); }}><Megaphone size={14} />Kirim Pengumuman</button>
        </>)}
      </Dropdown>

      <Dropdown width="w-72" trigger={(t) => (
        <button aria-label="Notifikasi" onClick={t} className="relative rounded-lg p-2 text-navy hover:bg-soft">
          <Bell size={17} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>)}>
        {() => (<>
          <p className="px-3 py-2 text-xs font-bold text-navy">Notifikasi</p>
          {notifications.map((n) => (
            <div key={n.id} className="rounded-lg px-3 py-2 hover:bg-soft"><p className="text-xs">{n.text}</p><p className="text-[10px] text-muted">{n.time}</p></div>
          ))}
        </>)}
      </Dropdown>

      <button aria-label="Komunikasi" onClick={() => router.push("/communication")} className="hidden rounded-lg p-2 text-navy hover:bg-soft sm:block"><MessageSquare size={17} /></button>

      <Dropdown width="w-48" trigger={(t) => (
        <button onClick={t} className="flex items-center gap-2 rounded-lg p-1 hover:bg-soft">
          <span className="hidden text-right leading-tight sm:block">
            <span className="block text-[11px] font-bold">Ustadzah Siti Maryam, S.Kom</span>
            <span className="block text-[9px] text-muted">Super Admin / TU</span>
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">SM</span>
          <ChevronDown size={13} className="text-muted" />
        </button>)}>
        {(close) => (<>
          <button className={item} onClick={() => { close(); router.push("/settings"); }}>Pengaturan Akun</button>
          <button className={item} onClick={() => { close(); router.push("/help"); }}>Pusat Bantuan</button>
          <button className={item + " text-danger"} onClick={() => { close(); notify("Anda telah keluar (simulasi)."); }}>Keluar Akun</button>
        </>)}
      </Dropdown>
    </header>
  );
}
