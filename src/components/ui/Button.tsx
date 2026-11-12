import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" };

export default function Button({ variant = "outline", className, ...p }: Props) {
  const v = {
    primary: "bg-navy text-white hover:bg-primary border border-navy",
    outline: "bg-white text-navy border border-line hover:bg-soft",
    ghost: "text-primary hover:bg-soft",
  }[variant];
  return (
    <button
      type="button"
      className={cn("inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors", v, className)}
      {...p}
    />
  );
}
