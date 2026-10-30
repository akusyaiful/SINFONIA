import {
  LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardCheck, Megaphone, Settings,
  type LucideIcon,
} from "lucide-react";

export type Role = "admin" | "guru" | "siswa";
export type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string }[];
};
export type MenuSection = { title?: string; items: MenuItem[] };

const admin: MenuSection[] = [
  { title: "Navigasi Utama", items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }] },
  {
    title: "Pengguna",
    items: [{
      label: "Manajemen Pengguna", href: "/admin/pengguna", icon: Users,
      children: [
        { label: "Data Siswa", href: "/admin/pengguna/siswa" },
        { label: "Data Guru", href: "/admin/pengguna/guru" },
        { label: "Data Orang Tua", href: "/admin/pengguna/orang-tua" },
        { label: "Akun & Sandi", href: "/admin/pengguna/akun" },
      ],
    }],
  },
  {
    title: "Akademik",
    items: [
      { label: "Manajemen Akademik", href: "/admin/akademik", icon: GraduationCap },
      { label: "Operasional Pembelajaran", href: "/admin/operasional", icon: BookOpen },
      { label: "Monitoring & Evaluasi", href: "/admin/monitoring", icon: ClipboardCheck },
      { label: "Komunikasi", href: "/admin/komunikasi", icon: Megaphone },
      { label: "Pengaturan Sistem", href: "/admin/pengaturan", icon: Settings },
    ],
  },
];

// Guru dan siswa diisi oleh pemilik dashboard masing-masing.
export const menuByRole: Record<Role, MenuSection[]> = { admin, guru: [], siswa: [] };
export const roleLabel: Record<Role, string> = { admin: "Super Admin / TU", guru: "Guru", siswa: "Siswa" };
