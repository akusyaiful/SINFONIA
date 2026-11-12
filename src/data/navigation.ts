
import type { NavSection } from "@/types";

export const navSections: NavSection[] = [
  {
    title: "NAVIGASI UTAMA",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    title: "PENGGUNA",
    items: [
      {
        label: "Manajemen Pengguna",
        href: "/users",
        icon: "Users",
        children: [
          { label: "Data Siswa", href: "/students" },
          { label: "Data Guru", href: "/teachers" },
          { label: "Data Orang Tua", href: "/parents" },
          { label: "Akun & Sandi", href: "/accounts" },
        ],
      },
    ],
  },
  {
    title: "AKADEMIK",
    items: [
      {
        label: "Manajemen Akademik",
        href: "/academics",
        icon: "GraduationCap",
      },
      {
        label: "Operasional Pembelajaran",
        href: "/learning",
        icon: "BookOpen",
      },
      {
        label: "Monitoring & Evaluasi",
        href: "/monitoring",
        icon: "MonitorCheck",
      },
      {
        label: "Komunikasi",
        href: "/communication",
        icon: "Megaphone",
      },
      {
        label: "Pengaturan Sistem",
        href: "/settings",
        icon: "Settings",
      },
    ],
  },
];
