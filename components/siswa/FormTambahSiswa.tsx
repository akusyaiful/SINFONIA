"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  CloudUpload, CircleCheck, Building2, Mars, Venus, MessageCircle,
  AtSign, KeyRound, Copy, RefreshCw, Send, UserPlus,
} from "lucide-react";
import Field, { inputCls } from "@/components/ui/Field";

const tahunAjaran = ["2024/2025 (Tahun Berjalan)", "2025/2026"];
const rombel = [
  "Kelas 4–A (Wali: Ust. Ahmad Fadil, S.Pd.I)",
  "Kelas 4–B (Wali: Ustzh. Aisyah, S.Pd)",
  "Kelas 5–A (Wali: Ust. Hanif Fauzan)",
];
const hubungan = ["Ayah Kandung", "Ibu Kandung", "Wali"];

function usia(tgl: string) {
  if (!tgl) return "";
  const d = new Date(tgl), n = new Date();
  let bln = (n.getFullYear() - d.getFullYear()) * 12 + n.getMonth() - d.getMonth();
  if (n.getDate() < d.getDate()) bln--;
  return bln < 0 ? "" : `Usia: ${Math.floor(bln / 12)} Tahun, ${bln % 12} Bulan saat pendaftaran.`;
}

function Section({ no, title, note, children }: { no: number; title: string; note: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
      <header className="flex items-center justify-between gap-3 border-b border-primary/10 bg-surface px-6 py-4">
        <h2 className="flex items-center gap-3 font-heading text-lg font-bold">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-sm text-white">{no}</span>
          {title}
        </h2>
        <span className="hidden text-xs text-neutral/70 sm:block">{note}</span>
      </header>
      <div className="grid gap-5 p-6 md:grid-cols-6">{children}</div>
    </section>
  );
}

export default function FormTambahSiswa() {
  const [foto, setFoto] = useState<string | null>(null);
  const [panggilan, setPanggilan] = useState("");
  const [nisn, setNisn] = useState("");
  const [lahir, setLahir] = useState("");
  const [gender, setGender] = useState("L");
  const [relasi, setRelasi] = useState("baru");
  const [wa, setWa] = useState("");
  const [kirimWa, setKirimWa] = useState(true);
  const [sandi, setSandi] = useState("FajarSantri#2024");
  const [status, setStatus] = useState("Belum ada perubahan yang disimpan.");

  const username = `${panggilan.trim().toLowerCase().replace(/\s+/g, "") || "nama"}@student.minashrulfajar.sch.id`;
  const jam = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }).replace(".", ":");

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus(`Santri didaftarkan pada ${jam()} WIB (data dummy, belum masuk database).`);
      }}
    >
      <Section no={1} title="Identitas Pribadi Santri" note="Dokumen Akta & Kartu Keluarga">
        <div className="md:col-span-6">
          <p className="mb-1.5 text-sm font-semibold">Foto Profil / Pasfoto Resmi <span className="text-red-600">*</span></p>
          <label className="flex cursor-pointer items-center gap-5 rounded-xl border-2 border-dashed border-primary/25 p-5 hover:bg-primary/5">
            <input
              type="file" accept="image/png,image/jpeg" className="sr-only"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) setFoto(URL.createObjectURL(f)); }}
            />
            <div className="grid h-28 w-24 shrink-0 place-items-center overflow-hidden rounded-lg bg-tertiary/15 text-primary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {foto ? <img src={foto} alt="Pratinjau pasfoto" className="size-full object-cover" /> : <CloudUpload size={28} />}
            </div>
            <div className="text-sm">
              <p className="font-bold text-primary">Unggah pasfoto santri atau seret file ke sini</p>
              <p className="mt-1 text-neutral/80">Format disarankan: JPG atau PNG dengan rasio 3×4 formal, pencahayaan terang, maksimal 2 MB.</p>
              <div className="mt-2 flex gap-2 text-xs font-semibold">
                <span className="rounded bg-tertiary/15 px-2 py-1">Background Merah/Biru</span>
                <span className="rounded bg-tertiary/15 px-2 py-1">Min. 300x400 px</span>
              </div>
            </div>
          </label>
        </div>

        <Field className="md:col-span-4" label="Nama Lengkap Santri" required hint="Gunakan huruf kapital di awal setiap kata tanpa gelar.">
          <input className={inputCls} placeholder="Muhammad Rayhan Al-Fatih" />
        </Field>
        <Field className="md:col-span-2" label="Nama Panggilan" hint="Panggilan akrab di kelas.">
          <input className={inputCls} value={panggilan} onChange={(e) => setPanggilan(e.target.value)} placeholder="Rayhan" />
        </Field>

        <Field
          className="md:col-span-2" label="NISN (10 Digit)" required
          hint={nisn.length === 10 ? <span className="text-secondary">Format NISN valid.</span> : "Terdiri dari 10 digit angka."}
        >
          <div className="relative">
            <input className={`${inputCls} pr-10 font-mono`} inputMode="numeric" maxLength={10} value={nisn}
              onChange={(e) => setNisn(e.target.value.replace(/\D/g, ""))} placeholder="0129482011" />
            {nisn.length === 10 && <CircleCheck size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary" />}
          </div>
        </Field>
        <Field className="md:col-span-2" label="Nomor Induk Madrasah (NIM/NIPD)" required hint="Format penomoran otomatis buku induk.">
          <input className={`${inputCls} font-mono`} defaultValue="NF-2024-0482" />
        </Field>
        <Field className="md:col-span-2" label="NIK Santri (16 Digit)" required hint="Diperlukan untuk sinkronisasi EMIS Kemenag.">
          <input className={`${inputCls} font-mono`} inputMode="numeric" maxLength={16} placeholder="3374101405140003" />
        </Field>

        <Field className="md:col-span-3" label="Tempat Lahir (Kota/Kabupaten)" required>
          <div className="relative">
            <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/50" />
            <input className={`${inputCls} pl-10`} placeholder="Semarang" />
          </div>
        </Field>
        <Field className="md:col-span-3" label="Tanggal Lahir" required hint={usia(lahir)}>
          <input type="date" className={inputCls} value={lahir} onChange={(e) => setLahir(e.target.value)} />
        </Field>

        <fieldset className="md:col-span-6">
          <legend className="mb-1.5 text-sm font-semibold">Jenis Kelamin <span className="text-red-600">*</span></legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { v: "L", t: "Laki-laki (Ikhwan)", Icon: Mars },
              { v: "P", t: "Perempuan (Akhwat)", Icon: Venus },
            ].map(({ v, t, Icon }) => (
              <label key={v} className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 text-sm font-semibold ${
                gender === v ? "border-primary bg-primary/10 text-primary" : "border-primary/15"}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" name="gender" checked={gender === v} onChange={() => setGender(v)} className="size-4 accent-primary" />
                  {t}
                </span>
                <Icon size={18} />
              </label>
            ))}
          </div>
        </fieldset>

        <Field className="md:col-span-3" label="Anak Ke-"><input type="number" min={1} className={inputCls} placeholder="2" /></Field>
        <Field className="md:col-span-3" label="Jumlah Saudara"><input type="number" min={0} className={inputCls} placeholder="3" /></Field>
      </Section>

      <Section no={2} title="Penempatan Akademik & Rombel" note="Struktur Kurikulum & Penugasan Kelas">
        <Field className="md:col-span-3" label="Tahun Ajaran Masuk" required>
          <select className={inputCls}>{tahunAjaran.map((t) => <option key={t}>{t}</option>)}</select>
        </Field>
        <Field className="md:col-span-3" label="Tingkat & Rombongan Belajar" required hint="Kapasitas rombel saat ini: 24/28 Santri.">
          <select className={inputCls}>{rombel.map((r) => <option key={r}>{r}</option>)}</select>
        </Field>
      </Section>

      <Section no={3} title="Data Orang Tua / Wali Murid" note="Konektivitas Portal Wali Santri">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-tertiary/10 px-4 py-3 text-sm md:col-span-6">
          <span className="font-semibold">Relasi Akun Sistem:</span>
          {[["baru", "Buat Akun Wali Baru"], ["lama", "Hubungkan Akun Terdaftar (Kakak/Saudara)"]].map(([v, t]) => (
            <label key={v} className="flex items-center gap-2 font-semibold">
              <input type="radio" name="relasi" checked={relasi === v} onChange={() => setRelasi(v)} className="size-4 accent-primary" />
              {t}
            </label>
          ))}
        </div>
        <Field className="md:col-span-4" label="Nama Lengkap Ayah / Ibu / Wali" required><input className={inputCls} /></Field>
        <Field className="md:col-span-2" label="Hubungan Keluarga" required>
          <select className={inputCls}>{hubungan.map((h) => <option key={h}>{h}</option>)}</select>
        </Field>
        <Field className="md:col-span-3" label="NIK Wali Murid" required>
          <input className={`${inputCls} font-mono`} inputMode="numeric" maxLength={16} />
        </Field>
        <Field className="md:col-span-3" label="Nomor WhatsApp Aktif" required hint="Digunakan untuk laporan Mutaba'ah harian & tagihan SPP.">
          <div className="relative">
            <MessageCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input className={`${inputCls} pl-10`} value={wa} onChange={(e) => setWa(e.target.value)} placeholder="+62 812-3456-7890" />
          </div>
        </Field>
        <Field className="md:col-span-2" label="Pekerjaan Utama"><input className={inputCls} placeholder="Karyawan Swasta / BUMN" /></Field>
        <Field className="md:col-span-4" label="Alamat Domisili Lengkap" required><textarea rows={3} className={inputCls} /></Field>
      </Section>

      <Section no={4} title="Akses Portal & Otentikasi" note="Kredensial Single Sign-On Madrasah">
        <Field className="md:col-span-3" label="Username Otomatis" hint="Akun Google Workspace for Education madrasah.">
          <div className="relative">
            <AtSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/50" />
            <input readOnly value={username} className={`${inputCls} bg-tertiary/10 pl-10 font-mono`} />
          </div>
        </Field>
        <div className="md:col-span-3">
          <Field label="Kata Sandi Sementara (Generated)" hint="Siswa diwajibkan mengganti kata sandi pada login pertama.">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/50" />
                <input readOnly value={sandi} className={`${inputCls} pl-10 font-mono`} />
              </div>
              <button type="button" aria-label="Salin kata sandi" onClick={() => navigator.clipboard?.writeText(sandi)}
                className="rounded-lg bg-tertiary/15 px-3 text-primary hover:bg-tertiary/25"><Copy size={18} /></button>
              <button type="button" aria-label="Buat ulang kata sandi"
                onClick={() => setSandi(`FajarSantri#${Math.floor(1000 + Math.random() * 9000)}`)}
                className="rounded-lg bg-tertiary/15 px-3 text-primary hover:bg-tertiary/25"><RefreshCw size={18} /></button>
            </div>
          </Field>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-xl bg-tertiary/10 p-4 md:col-span-6">
          <div className="flex items-start gap-3">
            <Send size={20} className="mt-0.5 text-secondary" />
            <div className="text-sm">
              <p className="font-bold">Kirimkan tautan aktivasi dan kredensial via WhatsApp Wali Murid</p>
              <p className="text-neutral/80">Notifikasi otomatis akan dikirim ke nomor <b>{wa || "—"}</b> segera setelah data disimpan.</p>
            </div>
          </div>
          <button type="button" role="switch" aria-checked={kirimWa} aria-label="Kirim via WhatsApp"
            onClick={() => setKirimWa(!kirimWa)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${kirimWa ? "bg-secondary" : "bg-neutral/30"}`}>
            <span className={`absolute top-1 size-5 rounded-full bg-white transition-all ${kirimWa ? "left-6" : "left-1"}`} />
          </button>
        </div>
      </Section>

      <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/10 bg-white p-4 shadow-lg">
        <p className="flex items-center gap-2 text-sm text-neutral/80">
          <span className="size-2 rounded-full bg-secondary" /> {status}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/pengguna/siswa" className="rounded-lg border border-primary/20 px-4 py-2.5 text-sm font-semibold hover:bg-primary/5">
            Batal & Kembali ke Daftar
          </Link>
          <button type="button" onClick={() => setStatus(`Draf disimpan pada ${jam()} WIB (belum masuk database).`)}
            className="px-2 text-sm font-semibold text-primary hover:underline">Simpan sebagai Draf</button>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
            <UserPlus size={16} /> Simpan & Daftarkan Santri
          </button>
        </div>
      </div>
    </form>
  );
}
