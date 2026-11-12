import type { ReactNode } from "react";
import Card from "./Card";

export default function SectionPage({ title, desc, children }: { title: string; desc: string; children?: ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="border-b border-line pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-1 text-xs text-muted">{desc}</p>
      </div>
      {children ?? <Card><p className="text-xs text-muted">Konten halaman ini menggunakan mock data dan siap dikembangkan.</p></Card>}
    </div>
  );
}

export function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[420px] text-left text-xs">
        <thead className="bg-soft text-[10px] uppercase text-navy"><tr>{head.map((h) => <th key={h} className="px-4 py-2.5">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-line">{r.map((c, j) => <td key={j} className="px-4 py-2.5">{c}</td>)}</tr>)}</tbody>
      </table>
    </Card>
  );
}
