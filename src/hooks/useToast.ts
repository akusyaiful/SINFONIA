'use client';
import { useCallback, useState } from 'react';
export interface ToastItem { id: number; message: string }
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);
  return { toasts, toast };
}
