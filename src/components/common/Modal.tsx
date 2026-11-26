'use client';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ToastItem } from '../../hooks/useToast';
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#202637]/40 sm:p-4" onClick={onClose}>
      <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4"><h3 className="text-[16px] font-semibold text-[#202637]">{title}</h3>
          <button onClick={onClose} aria-label="Tutup" className="p-1 rounded-lg hover:bg-[#F8F8FC]"><X size={18} /></button></div>
        {children}
      </div>
    </div>
  );
}
export function Toasts({ items }: { items: ToastItem[] }) {
  return <div className="fixed bottom-4 right-4 z-[60] space-y-2">{items.map((t) => <div key={t.id} className="bg-[#202637] text-white text-[13px] px-4 py-2.5 rounded-xl shadow-lg">{t.message}</div>)}</div>;
}
