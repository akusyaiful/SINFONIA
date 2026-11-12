"use client";
import { Search } from "lucide-react";

export interface SearchResult { type: string; title: string; sub: string; href: string }
interface Props { value: string; onChange: (v: string) => void; results: SearchResult[]; onPick: (r: SearchResult) => void }

export default function SearchBar({ value, onChange, results, onPick }: Props) {
  return (
    <div className="relative min-w-0 flex-1">
      <div className="flex h-9 items-center gap-2 rounded-xl border border-line bg-soft/70 px-3">
        <Search size={14} className="shrink-0 text-muted" />
        <input value={value} onChange={(e) => onChange(e.target.value)} aria-label="Pencarian"
          placeholder="Cari siswa (NIS/Nama), guru, kelas, atau berkas kurikulum..."
          className="w-full min-w-0 bg-transparent text-[11px] text-ink outline-none placeholder:text-muted" />
      </div>
      {value.trim() && (
        <ul className="absolute left-0 right-0 top-full z-40 mt-2 max-h-72 overflow-auto rounded-xl border border-line bg-white p-1.5 shadow-xl">
          {results.length === 0 && <li className="px-3 py-2 text-xs text-muted">Tidak ada hasil.</li>}
          {results.map((r, i) => (
            <li key={i}>
              <button onClick={() => onPick(r)} className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left hover:bg-soft">
                <span><span className="block text-xs font-semibold">{r.title}</span><span className="block text-[11px] text-muted">{r.sub}</span></span>
                <span className="rounded bg-soft px-1.5 py-0.5 text-[10px] font-semibold text-primary">{r.type}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
