import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-lg border border-primary/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

type Props = { label: string; required?: boolean; hint?: ReactNode; className?: string; children: ReactNode };

export default function Field({ label, required, hint, className = "", children }: Props) {
  return (
    <div className={className}>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </span>
        {children}
      </label>
      {hint && <p className="mt-1.5 text-xs text-neutral/70">{hint}</p>}
    </div>
  );
}
