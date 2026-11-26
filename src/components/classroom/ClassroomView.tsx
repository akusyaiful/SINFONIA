'use client';
import { useMemo, useState, type FormEvent } from 'react';
import { Activity, BookOpen, CalendarDays, ClipboardCheck, ClipboardList, Eye, FileUp, Filter, Home, MessageCircle, Printer, Radio, Search, Send, Table2, User, Users, BarChart3, ChevronRight } from 'lucide-react';
import { classInfo, classStats, students, tabContent } from '../../data/studentData';
import { Modal } from '../common/Modal';
import type { ClassroomStudent } from '../../types';

type Form = 'presensi' | 'tugas' | 'materi' | 'broadcast' | 'pesan' | 'catatan';
const forms: Record<Form, { title: string; fields: [string, string][]; ok: string }> = {
  presensi: { title: 'Catat Presensi Kelas 4-A', fields: [['Tanggal', 'tgl'], ['Catatan', 'cat']], ok: 'Presensi kelas tersimpan' },
  tugas: { title: 'Buat Tugas Baru', fields: [['Judul Tugas', 'judul'], ['Batas Pengumpulan', 'tempo'], ['Deskripsi', 'desk']], ok: 'Tugas berhasil dibuat' },
  materi: { title: 'Unggah Materi', fields: [['Nama Materi', 'nama'], ['Mata Pelajaran', 'mapel'], ['Kelas Tujuan', 'kelas'], ['Deskripsi', 'desk']], ok: 'Materi berhasil diunggah' },
  broadcast: { title: 'Broadcast WA ke Seluruh Wali Santri', fields: [['Isi Pesan', 'pesan']], ok: 'Broadcast terkirim ke 28 wali santri (simulasi)' },
  pesan: { title: 'Kirim Pesan ke Wali', fields: [['Isi Pesan', 'pesan']], ok: 'Pesan terkirim (simulasi)' },
  catatan: { title: 'Catatan Santri', fields: [['Catatan', 'cat']], ok: 'Catatan disimpan' },
};
const tabs = ['Roster Santri', 'Materi Pembelajaran', 'Tugas & Kuis', 'Jadwal Pelajaran Kelas', 'Jurnal & Mutabaah'];
const tabCount: Record<string, number> = { 'Roster Santri': 28, 'Materi Pembelajaran': 6, 'Tugas & Kuis': 4 };
const presTone: Record<string, string> = { Hadir: 'text-[#159B78]', Izin: 'text-[#D99A32]', Sakit: 'text-[#2455A4]', Alpa: 'text-[#D94C65]' };
const statIcon = [Activity, BarChart3, BookOpen, MessageCircle];
const outline = 'h-8 px-3 rounded-lg border border-[#E2E5ED] bg-white text-[11px] font-semibold flex items-center gap-1.5 hover:bg-[#F8F8FC] transition-colors';
const sel = 'h-9 px-3 rounded-lg border border-[#E2E5ED] bg-white text-[12px] font-medium outline-none';

export default function ClassroomView() {
  const [tab, setTab] = useState('Roster Santri');
  const [q, setQ] = useState(''); const [gender, setGender] = useState('Semua'); const [pres, setPres] = useState('Semua'); const [akun, setAkun] = useState('Aktif');
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<Form | null>(null); const [target, setTarget] = useState<ClassroomStudent | null>(null); const [detail, setDetail] = useState<ClassroomStudent | null>(null);
  const [toasts, setToasts] = useState<{ id: number; m: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const toast = (m: string) => { const id = Date.now(); setToasts((t) => [...t, { id, m }]); setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000); };
  const open = (f: Form, s: ClassroomStudent | null = null) => { setErrors({}); setTarget(s); setForm(f); };

  const filtered = useMemo(() => students.filter((s) => {
    const k = q.trim().toLowerCase();
    return (!k || s.nama.toLowerCase().includes(k) || s.nisn.includes(k)) && (gender === 'Semua' || s.gender === gender) && (pres === 'Semua' || s.presensi === pres) && (akun === 'Semua' || (akun === 'Aktif') === s.aktif);
  }), [q, gender, pres, akun]);
  const pages = Math.max(1, Math.ceil(filtered.length / 5));
  const cur = Math.min(page, pages);
  const rows = filtered.slice((cur - 1) * 5, cur * 5);
  const reset = <T,>(set: (v: T) => void) => (v: T) => { set(v); setPage(1); };

  const download = () => {
    const csv = 'NISN,Nama,Gender,Wali,WA,Kehadiran,Nilai\n' + students.map((s) => [s.nisn, s.nama, s.gender, s.wali.nama, s.wali.wa, s.att.pct, s.nilai].join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    Object.assign(document.createElement('a'), { href: url, download: 'buku-induk-4A.csv' }).click(); URL.revokeObjectURL(url); toast('Buku induk diunduh (CSV, bisa dibuka di Excel)');
  };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); if (!form) return;
    const fd = new FormData(e.currentTarget); const err: Record<string, boolean> = {};
    forms[form].fields.forEach(([, k]) => { if (!String(fd.get(k) ?? '').trim()) err[k] = true; });
    setErrors(err); if (Object.keys(err).length) return;
    toast(forms[form].ok); setForm(null);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[11px] text-[#7B8190]">
        <Home size={12} />Beranda<ChevronRight size={12} />Kelas Saya<ChevronRight size={12} /><span className="font-semibold text-[#2455A4]">Kelas 4-A (Umar bin Khattab)</span>
      </nav>

      {/* Header Kelas */}
      <section className="bg-white border border-[#E2E5ED] rounded-xl p-5 shadow-[0_1px_3px_rgba(32,38,55,.04)] flex flex-col xl:flex-row xl:justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2"><span className="px-2 py-0.5 rounded-full bg-[#EAF1FF] text-[#2455A4] text-[10px] font-semibold">{classInfo.fase}</span><span className="px-2 py-0.5 rounded-full bg-[#EAF8F2] text-[#159B78] text-[10px] font-semibold">{classInfo.ta}</span></div>
          <h1 className="text-[26px] lg:text-[28px] font-bold text-[#183F7A] mt-2 leading-tight">{classInfo.nama}</h1>
          <div className="mt-2.5 flex flex-col items-start gap-1.5 text-[11px] text-[#3a4153]">
            {([[User, 'Wali Kelas', classInfo.wali], [Users, 'Total', classInfo.total], [CalendarDays, 'Lokasi', classInfo.lokasi]] as const).map(([I, l, v]) => { const Icon = I as typeof User; return <span key={l as string} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8F8FC] border border-[#E2E5ED]"><Icon size={13} />{l as string}: <b>{v as string}</b></span>; })}
          </div>
        </div>
        <div className="flex flex-wrap xl:justify-end content-center gap-2 xl:max-w-md">
          <button onClick={() => open('presensi')} className="h-8 px-3 rounded-lg bg-[#0f6b4f] hover:bg-[#0c5a43] text-white text-[11px] font-semibold flex items-center gap-1.5"><ClipboardCheck size={14} />Catat Presensi Kelas</button>
          <button onClick={() => open('tugas')} className="h-8 px-3 rounded-lg bg-[#183F7A] hover:bg-[#2455A4] text-white text-[11px] font-semibold flex items-center gap-1.5">+ Buat Tugas Baru</button>
          <button onClick={() => open('materi')} className="h-8 px-3 rounded-lg bg-[#EAF1FF] text-[#2455A4] text-[11px] font-semibold flex items-center gap-1.5 hover:bg-[#dbe8ff]"><FileUp size={14} />+ Unggah Materi ke Kelas</button>
          <button onClick={() => toast('Buku Nilai: halaman akan segera tersedia')} className={outline}><BookOpen size={14} />Buka Buku Nilai</button>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-6 overflow-x-auto border-b border-[#E2E5ED]">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`py-2.5 text-[12px] font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${tab === t ? 'text-[#2455A4] border-[#2455A4]' : 'text-[#7B8190] border-transparent hover:text-[#202637]'}`}>{t}{tabCount[t] && <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[#EAF1FF] text-[10px]">{tabCount[t]}</span>}</button>)}
      </div>

      {tab !== 'Roster Santri' ? (
        <section className="bg-white border border-[#E2E5ED] rounded-xl divide-y divide-[#E2E5ED]">{tabContent[tab].map((t) => <div key={t} className="px-4 py-3 text-[12px] flex justify-between gap-2"><span>{t}</span><button onClick={() => toast(`Membuka: ${t}`)} className="text-[#2455A4] font-semibold">Buka</button></div>)}</section>
      ) : (<>
        <section className="bg-white border border-[#E2E5ED] rounded-xl p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-56"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8190]" /><input value={q} onChange={(e) => reset(setQ)(e.target.value)} placeholder="Cari nama santri, NISN..." className={`${sel} w-full pl-9`} /></div>
            <div className="flex items-center gap-1 p-1 rounded-lg border border-[#E2E5ED] text-[11px] font-semibold">{[['Semua', 'Semua'], ['Ikhwan', 'Ikhwan (15)'], ['Akhwat', 'Akhwat (13)']].map(([v, l]) => <button key={v} onClick={() => reset(setGender)(v)} className={`px-2.5 py-1 rounded-md ${gender === v ? 'bg-[#EAF1FF] text-[#2455A4]' : 'text-[#7B8190]'}`}>{l}</button>)}</div>
            <select value={pres} onChange={(e) => reset(setPres)(e.target.value)} className={sel} aria-label="Presensi">{['Semua', 'Hadir', 'Izin', 'Sakit', 'Alpa'].map((p) => <option key={p} value={p}>Presensi Hari Ini: {p}</option>)}</select>
            <select value={akun} onChange={(e) => reset(setAkun)(e.target.value)} className={sel} aria-label="Status akun">{['Semua', 'Aktif', 'Tidak Aktif'].map((p) => <option key={p} value={p}>Status Akun: {p}</option>)}</select>
            <button aria-label="Reset filter" onClick={() => { setQ(''); setGender('Semua'); setPres('Semua'); setAkun('Aktif'); setPage(1); toast('Filter direset'); }} className="h-9 w-9 grid place-items-center rounded-lg border border-[#E2E5ED] hover:bg-[#F8F8FC]"><Filter size={14} /></button>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">{classStats.map((s, i) => { const Icon = statIcon[i]; return (
            <div key={s.label} className={`rounded-xl border p-3 ${s.tone === 'green' ? 'bg-[#EAF8F2]/50 border-[#cdeee1]' : 'bg-[#EAF1FF]/50 border-[#d5e2fb]'}`}>
              <div className="flex justify-between gap-2"><div><div className="text-[10px] text-[#7B8190]">{s.label}</div><div className="text-[24px] font-bold leading-tight">{s.value}<span className="text-[11px] font-normal text-[#7B8190] ml-1">{s.unit}</span></div></div><div className={`w-8 h-8 shrink-0 rounded-full grid place-items-center ${s.tone === 'green' ? 'bg-[#bff0de] text-[#159B78]' : 'bg-[#dbe8ff] text-[#2455A4]'}`}><Icon size={15} /></div></div>
              <div className={`text-[10px] mt-1 ${s.tone === 'green' ? 'text-[#159B78]' : 'text-[#2455A4]'}`}>{s.note}</div></div>); })}</div>

          <div className="overflow-x-auto rounded-xl border border-[#E2E5ED]">
            <table className="w-full min-w-[900px] text-[11px]">
              <thead className="bg-[#EAF1FF] text-[10px] font-semibold tracking-wide text-[#3a4153] text-left"><tr>{['NO', 'SANTRI & NISN', 'GENDER', 'WALI SANTRI & KONTAK WA', 'KEHADIRAN SEMESTER', 'TUGAS TERKUMPUL', 'RATA-RATA & TAHFIDZ', 'AKSI CEPAT'].map((h) => <th key={h} className="px-3 py-3">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-[#E2E5ED]">
                {rows.map((s, i) => { const done = s.tugas === s.tugasTotal; return (
                  <tr key={s.id} className="hover:bg-[#F8F8FC]">
                    <td className="px-3 py-3 text-[#7B8190]">{(cur - 1) * 5 + i + 1}</td>
                    <td className="px-3 py-3"><div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-full bg-[#EAF1FF] text-[#2455A4] grid place-items-center text-[11px] font-bold">{s.nama.split(' ').slice(0, 2).map((w: string) => w[0]).join('')}</div>
                      <div><div className="text-[12px] font-semibold">{s.nama}</div><div className="text-[10px] text-[#7B8190]">NISN: {s.nisn} · <span className={`font-semibold ${presTone[s.presensi]}`}>Presensi: {s.presensi}</span></div></div></div></td>
                    <td className="px-3 py-3"><span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${s.gender === 'Ikhwan' ? 'bg-[#EAF1FF] text-[#2455A4]' : 'bg-[#F3EAFE] text-[#7C3AED]'}`}>{s.gender}</span></td>
                    <td className="px-3 py-3"><div className="font-medium">{s.wali.nama}</div><div className="text-[#159B78] flex items-center gap-1 whitespace-nowrap"><MessageCircle size={11} />{s.wali.wa}</div></td>
                    <td className="px-3 py-3"><div className="font-bold text-[#159B78]">{s.att.pct.toFixed(1)}%</div><div className="text-[10px] text-[#7B8190] whitespace-nowrap">H: {s.att.h} | I: {s.att.i} | S: {s.att.s} | A: {s.att.a}</div></td>
                    <td className="px-3 py-3 w-[150px]"><div className="flex items-center gap-2 whitespace-nowrap"><b>{s.tugas} / {s.tugasTotal}</b><span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${done ? 'bg-[#bff0de] text-[#0f6b4f]' : 'bg-[#dbe8ff] text-[#2455A4]'}`}>{done ? 'Selesai' : `${s.tugasTotal - s.tugas} Menunggu`}</span></div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-[#E2E5ED]"><div className={`h-full rounded-full ${done ? 'bg-[#159B78]' : 'bg-[#2455A4]'}`} style={{ width: `${(s.tugas / s.tugasTotal) * 100}%` }} /></div></td>
                    <td className="px-3 py-3"><div><b className="text-[13px]">{s.nilai.toFixed(1)}</b> <span className="text-[#7B8190]">/ 100</span></div><div className="text-[10px] text-[#159B78] flex items-center gap-1"><BookOpen size={11} />{s.tahfidz.detail}</div></td>
                    <td className="px-3 py-3"><div className="flex gap-1">{([[Eye, 'Lihat detail', () => setDetail(s)], [Send, 'Kirim pesan', () => open('pesan', s)], [ClipboardList, 'Catatan', () => open('catatan', s)]] as [typeof Eye, string, () => void][]).map(([I, l, f]) => { const Icon = I; return <button key={l} aria-label={l} title={l} onClick={f} className="p-1.5 rounded-lg text-[#159B78] hover:bg-[#EAF8F2]"><Icon size={15} /></button>; })}</div></td>
                  </tr>); })}
                {!rows.length && <tr><td colSpan={8} className="py-10 text-center text-[#7B8190]">Tidak ada santri yang cocok dengan filter.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <span>Menampilkan {filtered.length ? (cur - 1) * 5 + 1 : 0} - {(cur - 1) * 5 + rows.length} dari {filtered.length} santri terdaftar di Kelas 4-A</span>
            <div className="flex gap-1.5">
              <button disabled={cur === 1} onClick={() => setPage(cur - 1)} className="px-3 h-8 rounded-lg border border-[#E2E5ED] disabled:text-[#b5bac6]">Sebelumnya</button>
              {Array.from({ length: pages }, (_, n) => n + 1).map((n) => <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 rounded-lg font-semibold ${n === cur ? 'bg-[#183F7A] text-white' : 'hover:bg-[#F8F8FC]'}`}>{n}</button>)}
              <button disabled={cur === pages} onClick={() => setPage(cur + 1)} className="px-3 h-8 rounded-lg border border-[#E2E5ED] disabled:text-[#b5bac6]">Berikutnya</button>
            </div>
          </div>
        </section>

        <section className="bg-white border border-[#E2E5ED] rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-[#EAF1FF] text-[#2455A4] grid place-items-center"><Table2 size={18} /></div><div><h2 className="text-[13px] font-semibold">Aksi Kolektif Roster Kelas 4-A</h2><p className="text-[11px] text-[#7B8190]">Kelola data seluruh santri secara serentak untuk kebutuhan administrasi madrasah.</p></div></div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { toast('Membuka dialog cetak…'); setTimeout(() => window.print(), 300); }} className={outline}><Printer size={14} />Cetak Kartu Absensi</button>
            <button onClick={download} className={outline}><Table2 size={14} />Unduh Buku Induk Excel</button>
            <button onClick={() => open('broadcast')} className="h-8 px-3 rounded-lg bg-[#0f6b4f] hover:bg-[#0c5a43] text-white text-[11px] font-semibold flex items-center gap-1.5"><Radio size={14} />Broadcast WA ke Seluruh Wali Santri</button>
          </div>
        </section>
      </>)}

      {form && (
        <Modal title={target ? `${forms[form].title} — ${target.nama}` : forms[form].title} onClose={() => setForm(null)}>
          <form onSubmit={submit} noValidate className="space-y-3">
            {forms[form].fields.map(([l, k]) => <label key={k} className="block text-[12px] font-medium">{l}<input name={k} type={k === 'tgl' || k === 'tempo' ? 'date' : 'text'} className={`mt-1 w-full h-9 px-3 rounded-lg border text-[13px] outline-none focus:border-[#2455A4] ${errors[k] ? 'border-[#D94C65]' : 'border-[#E2E5ED]'}`} />{errors[k] && <span className="text-[11px] text-[#D94C65]">{l} wajib diisi</span>}</label>)}
            {form === 'materi' && <label className="block text-[12px] font-medium">Pilih File<input type="file" className="mt-1 block w-full text-[12px]" /></label>}
            <button className="w-full h-10 rounded-xl bg-[#2455A4] hover:bg-[#183F7A] text-white text-[13px] font-semibold">{form === 'broadcast' ? 'Kirim Broadcast' : form === 'materi' ? 'Unggah' : 'Simpan'}</button>
          </form>
        </Modal>
      )}
      {detail && <Modal title="Detail Santri" onClose={() => setDetail(null)}><dl className="text-[12px] space-y-1.5">{([['Nama', detail.nama], ['NISN', detail.nisn], ['Gender', detail.gender], ['Wali', `${detail.wali.nama} (${detail.wali.wa})`], ['Kehadiran', `${detail.att.pct}%`], ['Tugas', `${detail.tugas}/${detail.tugasTotal}`], ['Rata-rata', `${detail.nilai}/100`], ['Tahfidz', detail.tahfidz.detail]] as const).map(([k, v]) => <div key={k} className="flex justify-between gap-3"><dt className="text-[#7B8190]">{k}</dt><dd className="font-medium text-right">{v}</dd></div>)}</dl></Modal>}
      <div className="fixed bottom-4 right-4 z-[60] space-y-2">{toasts.map((t) => <div key={t.id} className="bg-[#202637] text-white text-[13px] px-4 py-2.5 rounded-xl shadow-lg">{t.m}</div>)}</div>
    </div>
  );
}
