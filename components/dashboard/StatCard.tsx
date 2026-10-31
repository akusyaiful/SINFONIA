import { GraduationCap, Contact, DoorOpen, BookOpen, TrendingUp, CircleCheck } from "lucide-react";

const icons = { siswa: GraduationCap, guru: Contact, kelas: DoorOpen, materi: BookOpen };
const tones = {
  green: "bg-secondary/15 text-secondary",
  blue: "bg-tertiary/15 text-primary",
  dot: "text-neutral",
};

type Props = {
  label: string;
  value: string;
  unit: string;
  icon: keyof typeof icons;
  badge: string;
  tone: keyof typeof tones;
  note: string;
};

export default function StatCard({ label, value, unit, icon, badge, tone, note }: Props) {
  const Icon = icons[icon];
  return (
    <article className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-neutral/80">{label}</p>
          <p className="mt-2 font-heading text-4xl font-extrabold">
            {value} <span className="text-base font-semibold text-neutral/70">{unit}</span>
          </p>
        </div>
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-tertiary/15 text-primary">
          <Icon size={22} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-primary/10 pt-3 text-sm">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ${tones[tone]}`}>
          {tone === "green" && <TrendingUp size={14} />}
          {tone === "blue" && <CircleCheck size={14} />}
          {tone === "dot" && <span className="size-2 rounded-full bg-secondary" />}
          {badge}
        </span>
        <span className="text-neutral/70">{note}</span>
      </div>
    </article>
  );
}
