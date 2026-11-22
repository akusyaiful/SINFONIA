"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  House, Pencil, Printer, KeyRound, ChevronDown, Mars, ShieldCheck, MapPin, User, Users,
  Trophy, School, MessageCircle, Copy, BookOpen, Info, ListOrdered, Contact, ClipboardCheck, FolderOpen,
} from "lucide-react";
import { siswa as s } from "@/lib/dummy-siswa";

const tabs = [
  { t: "Ringkasan & Biodata", Icon: Contact },
  { t: "Riwayat Akademik & Nilai", Icon: BookOpen },
  { t: "Rekapitulasi Presensi & Mutaba'ah", Icon: ClipboardCheck },
  { t: "Portofolio & Tugas", Icon: FolderOpen },
];

const btn = "inline-flex items-center justify-center gap-2 rounded-lg border border-primary/15 bg-white px-4 py-2 text-sm font-semibold hover:bg-primary/5";
const chip = "rounded-full px-2.5 py-0.5 text-xs font-bold";

function Card({ icon, title, badge, children }: { icon: ReactNode; title: string; badge?: ReactNode; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
      <header className="flex items-center justify-between gap-3 border-b border-primary/10 px-5 py-4">
        <h2 className="flex items-center gap-3 font-heading font-bold">
          <span className="grid size-8 place-items-center rounded-lg bg-tertiary/15 text-primary">{icon}</span>
          {title}
        </h2>
        {badge}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-xs font-bold uppercase tracking-wide text-neutral/60">{children}</p>
);

function Bar({ label, value, note, color }: { label: string; value: number; note: string; color: string }) {
  return (
    <div className="mt-3 text-xs">
      <div className="flex justify-between font-semibold"><span>{label}</span><span className={color === "bg-secondary" ? "text-secondary" : "text-primary"}>{note}</span></div>
      <div className="mt-1 h-2 rounded-full bg-tertiary/15"><div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} /></div>
    </div>
  );
}

export default function DetailSiswa() {
  const [tab, setTab] = useState(0);
  const [status, setStatus] = useState("Aktif");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-neutral/70">
        <Link href="/admin" className="inline-flex items-center gap-1.5 hover:text-primary"><House size={14} /> Beranda</Link>
        <span>/</span>
        <Link href="/admin/pengguna/siswa" className="hover:text-primary">Data Siswa</Link>
        <span>/</span>
        <span className="font-semibold text-primary">{s.nama} ({s.nisn})</span>
      </nav>

      <section className="rounded-2xl border border-primary/10 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-5 p-6">
          <div className="flex gap-5">
            <div className="relative self-start">
              <div className="grid size-24 place-items-center rounded-xl bg-primary font-heading text-3xl font-extrabold text-white">{s.inisial}</div>
              <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full border-2 border-white bg-secondary text-white"><ShieldCheck size={12} /></span>
            </div>
            <div className="max-w-md">
              <h1 className="font-heading text-3xl font-extrabold leading-tight">{s.nama}</h1>
              <span className={`${chip} mt-2 inline-block bg-tertiary/15 text-primary`}>Santri Aktif - Kelas {s.kelas}</span>
              <p className="mt-2 text-sm">
                <b>NISN:</b> <span className="font-mono">{s.nisn}</span> &nbsp; <b>NIK:</b> <span className="font-mono">{s.nik}</span>
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><Mars size={14} className="text-primary" /> Ikhwan (Laki-laki)</p>
              <p className="mt-2 text-xs text-neutral/70">Terdaftar sejak: {s.terdaftar}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className={btn}><Pencil size={15} /> Edit Profil</button>
            <button className={btn}><Printer size={15} /> Cetak Kartu Santri / NISN</button>
            <button className={btn}><KeyRound size={15} /> Reset Kata Sandi Akun</button>
            <label className="relative">
              <span className="sr-only">Status santri</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="appearance-none rounded-lg border border-secondary/40 bg-secondary/10 py-2 pl-4 pr-9 text-sm font-semibold text-emerald-800 outline-none">
                {["Aktif", "Cuti", "Pindah", "Lulus"].map((o) => <option key={o} value={o}>Status Santri: {o}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-800" />
            </label>
          </div>
        </div>
        <div role="tablist" className="flex flex-wrap gap-2 border-t border-primary/10 px-4">
          {tabs.map(({ t, Icon }, i) => (
            <button key={t} role="tab" aria-selected={tab === i} onClick={() => setTab(i)}
              className={`flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-semibold ${tab === i ? "border-primary text-primary" : "border-transparent text-neutral/70 hover:text-primary"}`}>
              <Icon size={16} /> {t}
            </button>
          ))}
        </div>
      </section>

      {tab !== 0 ? (
        <div className="rounded-2xl border border-dashed border-primary/25 bg-white p-12 text-center text-neutral/70">
          Konten tab &ldquo;{tabs[tab].t}&rdquo; belum dibuat.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card icon={<User size={18} />} title="Informasi Biodata Resmi" badge={<span className={`${chip} bg-secondary/15 text-emerald-800`}>Data Dapodik Valid</span>}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div><Label>Tempat / Tanggal Lahir</Label><p className="mt-1 font-semibold">{s.tempatLahir}, {s.tglLahir}</p><p className="text-xs text-neutral/70">Usia: {s.usia}</p></div>
                <div><Label>Agama & Keyakinan</Label><p className="mt-1 font-semibold">Islam</p><p className="text-xs text-neutral/70">Mazhab / Tradisi: Ahlussunnah wal Jama&apos;ah</p></div>
                <div><Label>Status Hubungan Anak</Label><p className="mt-1 font-semibold">Anak Ke-1 dari 3 bersaudara</p><p className="text-xs text-neutral/70">Status: Anak Kandung</p></div>
                <div><Label>Golongan Darah</Label><p className="mt-1 font-semibold"><span className="mr-2 rounded bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-700">O+</span>Rhesus Positif</p><p className="text-xs text-neutral/70">Alergi Makanan: Tidak ada</p></div>
              </div>
              <div className="mt-5 flex gap-3 rounded-lg bg-surface p-3 text-sm">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-secondary" />
                <div><p className="font-semibold">Riwayat Imunisasi Lengkap</p><p className="text-neutral/80">Vaksinasi Dasar, Booster Campak, Rubella, dan BIAS (Bulan Imunisasi Anak Sekolah) tercatat lengkap di Puskesmas Ungaran Barat.</p></div>
              </div>
              <div className="mt-5 border-t border-primary/10 pt-4">
                <Label>Alamat Tempat Tinggal Resmi</Label>
                <p className="mt-1 flex gap-2 font-semibold"><MapPin size={16} className="mt-1 shrink-0 text-primary" />{s.alamat}</p>
              </div>
            </Card>

            <Card icon={<School size={18} />} title="Rombongan Belajar & Kurikulum" badge={<span className={`${chip} bg-tertiary/15 text-primary`}>Tingkat Ibtidaiyah</span>}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 rounded-xl border border-primary/10 p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-white"><BookOpen size={18} /></span>
                  <div><Label>Kelas & Lokasi</Label><p className="font-heading text-lg font-bold">Kelas {s.kelas}</p><p className="text-xs text-neutral/70">Gedung Umar bin Khattab Lt. 2</p></div>
                </div>
                <div className="flex gap-3 rounded-xl border border-primary/10 p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-tertiary/15 text-primary"><ListOrdered size={18} /></span>
                  <div><Label>Presensi Kelas</Label><p className="font-heading text-lg font-bold">No. Absen 18</p><p className="text-xs text-neutral/70">Total 28 Santri di Kelas {s.kelas}</p></div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-secondary/25 text-sm font-bold text-emerald-900">{s.waliKelas.inisial}</span>
                  <div><Label>Wali Kelas Pengampu</Label><p className="font-bold">{s.waliKelas.nama}</p><p className="text-xs text-neutral/70">{s.waliKelas.info}</p></div>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg bg-tertiary/15 px-3 py-2 text-xs font-bold text-primary hover:bg-tertiary/25"><MessageCircle size={14} /> Hubungi Guru</button>
              </div>
              <p className="mt-4 flex items-center gap-2 rounded-lg bg-tertiary/10 p-3 text-xs">
                <BookOpen size={15} className="text-primary" /> Kurikulum Acuan: <b>Kurikulum Merdeka Kemenag 2024 (Integrasi P5-PPRA)</b>
                <Info size={14} className="ml-auto text-neutral/50" />
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card icon={<Users size={18} />} title="Orang Tua / Wali Penanggung Jawab">
              <ul className="space-y-4">
                {s.wali.map((w) => (
                  <li key={w.nama} className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tertiary/15 text-sm font-bold text-primary">{w.inisial}</span>
                    <div className="flex-1"><p className="text-sm font-bold">{w.nama}</p><p className="text-xs text-neutral/70">Pekerjaan: {w.kerja}</p></div>
                    <span className={`${chip} bg-tertiary/15 text-primary`}>{w.relasi}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-tertiary/10 p-3 text-xs">
                <div className="flex justify-between"><span>Kontak Utama WhatsApp Wali:</span><b className="text-primary">{s.wa}</b></div>
                <div className="mt-2 flex gap-2">
                  <a href={s.waLink} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-bold text-white hover:opacity-90"><MessageCircle size={15} /> Chat WhatsApp Wali</a>
                  <button aria-label="Salin nomor" onClick={() => navigator.clipboard?.writeText(s.wa)} className="rounded-lg border border-primary/15 bg-white px-3"><Copy size={15} /></button>
                </div>
              </div>
            </Card>

            <Card icon={<Trophy size={18} />} title="Ringkasan Capaian Akademik" badge={<a href="#" className="text-xs font-bold text-primary hover:underline">Lihat Rapor Lengkap</a>}>
              <div className="rounded-xl bg-tertiary/10 p-4">
                <div className="flex items-start justify-between">
                  <p className="text-xs text-neutral/70">Rata-rata Nilai Rapor Semester</p>
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-white">Peringkat {s.nilai.peringkat}</span>
                </div>
                <p className="mt-1 font-heading text-3xl font-extrabold text-brand">{s.nilai.rata} <span className="text-xs font-semibold text-secondary">Predikat {s.nilai.predikat}</span></p>
                <p className="text-right text-xs text-neutral/70">di Kelas {s.kelas}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-bold"><span>Progres Target Tahfidz Al-Qur&apos;an</span><span className="text-secondary">Target Kelas 4: Juz 29</span></div>
              <Bar label="Target Tahfidz: Juz 30 Selesai" value={s.tahfidz.selesai} note="100% (Mutqin)" color="bg-secondary" />
              <Bar label="Sekarang berjalan Juz 29 (Surah Al-Mulk ayat 1–15)" value={s.tahfidz.berjalan} note="35%" color="bg-primary" />
              <p className="mt-3 text-center text-xs text-neutral/60">Terakhir disimak: Kemarin oleh {s.waliKelas.nama.replace(", M.Pd", "")}</p>
            </Card>
          </div>
        </div>
      )}

      <footer className="flex flex-wrap justify-between gap-3 border-t border-primary/10 pt-4 text-xs text-neutral/60">
        <p>© 2025 Madrasah Ibtidaiyah Nashrul Fajar Ungaran. Sistem Informasi Akademik & Portal Santri (SINfonia LMS).</p>
        <p className="font-mono">ID Audit: LOG-STU-202501-{s.nisn} • Terakhir diubah oleh Admin TU: 12 Jan 2025</p>
      </footer>
    </div>
  );
}