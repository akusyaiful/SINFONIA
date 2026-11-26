'use client';
import { BarChart3, BookOpen, CalendarDays, ClipboardCheck, FileQuestion, GraduationCap, HelpCircle, LayoutDashboard, LogOut, Megaphone, PlusCircle, School, UserCog, UserCheck } from 'lucide-react';

const menu = [
  { l: 'Dashboard Guru', i: LayoutDashboard }, { l: 'Kelas Saya', i: School }, { l: 'Jadwal Mengajar', i: CalendarDays }, { l: 'Materi Ajar', i: BookOpen },
  { l: 'Tugas & Penilaian', i: ClipboardCheck }, { l: 'Kuis & Ujian', i: FileQuestion }, { l: 'Presensi Santri', i: UserCheck }, { l: 'Buku Nilai', i: BarChart3 },
  { l: 'Pengumuman & Diskusi', i: Megaphone }, { l: 'Profil & Pengaturan', i: UserCog },
];
export function Sidebar({ open, onClose, onCreate, onSoon }: { open: boolean; onClose: () => void; onCreate: () => void; onSoon: (l: string) => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-[#202637]/40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-[236px] flex flex-col bg-white border-r border-[#E2E5ED] transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center gap-2.5 p-4 border-b border-[#E2E5ED] mx-3 px-1">
          <div className="w-9 h-9 rounded-lg bg-[#2455A4] grid place-items-center"><GraduationCap size={18} className="text-white" /></div>
          <div className="leading-tight"><div className="text-[15px] font-bold text-[#183F7A]">SINfonia LMS</div><div className="text-[10px] text-[#7B8190]">MI Nashrul Fajar</div></div>
        </div>
        <div className="p-3"><button onClick={onCreate} className="w-full h-9 rounded-lg bg-[#0f6b4f] hover:bg-[#0c5a43] text-white text-[12px] font-semibold flex items-center justify-center gap-2 transition-colors"><PlusCircle size={15} />Buat Tugas / Materi</button></div>
        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
          {menu.map(({ l, i: Icon }) => { const active = l === 'Kelas Saya'; return (
            <button key={l} onClick={() => (active ? onClose() : onSoon(l))} className={`relative flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors duration-150 ${active ? 'bg-[#EAF1FF] text-[#2455A4]' : 'text-[#3a4153] hover:bg-[#F8F8FC]'}`}>
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#2455A4]" />}<Icon size={16} />{l}
            </button>); })}
        </nav>
        <div className="p-3 border-t border-[#E2E5ED] mx-0">
          <button onClick={() => onSoon('Bantuan & Panduan')} className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-[#3a4153] hover:bg-[#F8F8FC]"><HelpCircle size={16} />Bantuan & Panduan</button>
          <button onClick={() => onSoon('Keluar')} className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-[#D94C65] hover:bg-[#FFF0F2]"><LogOut size={16} />Keluar</button>
        </div>
      </aside>
    </>
  );
}
