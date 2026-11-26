'use client';
import { useState } from 'react';
import { Bell, ClipboardCheck, FileUp, HelpCircle, Menu, MessageSquare, Search } from 'lucide-react';

interface Props { onMenu: () => void; onUpload: () => void; onTask: () => void; onSoon: (l: string) => void }
const pop = 'absolute right-0 top-full mt-2 w-56 bg-white border border-[#E2E5ED] rounded-xl shadow-lg p-1.5 z-30';
const row = 'block w-full text-left px-3 py-2 rounded-lg text-[12px] hover:bg-[#F8F8FC]';
export function Topbar({ onMenu, onUpload, onTask, onSoon }: Props) {
  const [m, setM] = useState<'notif' | 'profile' | null>(null);
  const [unread, setUnread] = useState(true);
  return (
    <header className="sticky top-0 z-20 h-[66px] bg-white border-b border-[#E2E5ED] flex items-center gap-2.5 px-4 lg:px-6">
      <button onClick={onMenu} aria-label="Menu" className="lg:hidden p-2 rounded-lg hover:bg-[#F8F8FC]"><Menu size={18} /></button>
      <div className="relative flex-1 max-w-sm min-w-0"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8190]" />
        <input placeholder="Cari santri, materi, tugas atau..." className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#F8F8FC] border border-[#E2E5ED] text-[12px] outline-none focus:border-[#2455A4]" /></div>
      <span className="hidden md:inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#EAF1FF] text-[#2455A4] text-[11px] font-semibold whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-[#2455A4]" />TA 2024/2025 Genap</span>
      <button onClick={onUpload} className="hidden sm:flex h-8 px-3 rounded-lg bg-[#EAF1FF] text-[#2455A4] text-[11px] font-semibold items-center gap-1.5 hover:bg-[#dbe8ff]"><FileUp size={14} />Unggah Materi</button>
      <button onClick={onTask} className="h-8 px-3 rounded-lg bg-[#183F7A] hover:bg-[#2455A4] text-white text-[11px] font-semibold flex items-center gap-1.5"><ClipboardCheck size={14} /><span className="hidden sm:inline">Buat Tugas</span></button>
      <div className="relative"><button aria-label="Notifikasi" onClick={() => { setM(m === 'notif' ? null : 'notif'); setUnread(false); }} className="relative p-2 rounded-lg hover:bg-[#F8F8FC]"><Bell size={17} />{unread && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D94C65]" />}</button>
        {m === 'notif' && <div className={`${pop} !w-72`}>{['Zaidan mengumpulkan Tugas Fiqih', 'Wali Fathan membalas pesan izin'].map((t) => <div key={t} className="px-3 py-2 text-[12px]">{t}</div>)}</div>}</div>
      <button aria-label="Pesan" onClick={() => onSoon('Pesan')} className="hidden sm:block p-2 rounded-lg hover:bg-[#F8F8FC]"><MessageSquare size={17} /></button>
      <button aria-label="Bantuan" onClick={() => onSoon('Bantuan')} className="hidden sm:block p-2 rounded-lg hover:bg-[#F8F8FC]"><HelpCircle size={17} /></button>
      <div className="relative border-l border-[#E2E5ED] pl-3"><button onClick={() => setM(m === 'profile' ? null : 'profile')} className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[#EAF1FF] text-[#2455A4] grid place-items-center text-[12px] font-bold">AF</div>
        <div className="hidden xl:block text-left leading-tight"><div className="text-[12px] font-semibold">Ust. Ahmad Fadil, S.Pd.I</div><div className="text-[10px] text-[#7B8190]">Wali Kelas 4-A & Guru Fiqih</div></div></button>
        {m === 'profile' && <div className={pop}>{['Profil Saya', 'Pengaturan Akun', 'Keluar'].map((p) => <button key={p} className={row} onClick={() => { setM(null); onSoon(p); }}>{p}</button>)}</div>}</div>
    </header>
  );
}
