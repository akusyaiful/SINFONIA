import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Card({ className, ...p }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("rounded-2xl border border-line bg-white p-5 shadow-card", className)} {...p} />;
}
