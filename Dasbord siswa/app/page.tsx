
"use client";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  Bell,
  CalendarDays,
  UserRound,
  UserPlus,
  School,
  BookMarked,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  Menu,
  X,
  MoreHorizontal,
  Megaphone,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "NAVIGASI UTAMA",
    items: [
      { name: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "PENGGUNA",
    items: [
      { name: "Manajemen Pengguna", icon: Users },
      { name: "Data Siswa", icon: GraduationCap },
      { name: "Data Guru", icon: UserRound },
      { name: "Data Orang Tua", icon: Users },
      { name: "Alumni & Sandi", icon: ShieldCheck },
    ],
  },
  {
    title: "AKADEMIK",
    items: [
      { name: "Manajemen Akademik", icon: BookOpen },
      { name: "Operasional Pembelajaran", icon: BookMarked },
      { name: "Monitoring & Evaluasi", icon: BarChart3 },
      { name: "Komunikasi", icon: MessageSquare },
      { name: "Pengaturan Sistem", icon: Settings },
    ],
  },
];

const stats = [
  {
    title: "Total Siswa Aktif",
    value: "548",
    description: "+12 semester ini",
    icon: GraduationCap,
    color: "blue",
  },
  {
    title: "Tenaga Pendidik",
    value: "36",
    description: "Semua aktif",
    icon: Users,
    color: "indigo",
  },
  {
    title: "Rombongan Belajar",
    value: "18",
    description: "Rata-rata 30 siswa",
    icon: School,
    color: "emerald",
  },
  {
    title: "Mata & Tugas Belajar",
    value: "142",
    description: "68 tugas aktif",
    icon: BookOpen,
    color: "violet",
  },
];

const activities = [
  {
    title: "Guru Ahmad Fadli, S.Pd. mengunggah RPP Fiqih",
    description: "RPP Bab Sholat Jamaah kelas X-4 berhasil disimpan.",
    time: "12 menit yang lalu",
    icon: FileText,
    color: "blue",
  },
  {
    title: "Pengumuman Jadwal PTS dibagikan ke 18 Kelas",
    description: "Jadwal penilaian tengah semester berhasil dikirim.",
    time: "45 menit yang lalu",
    icon: Megaphone,
    color: "indigo",
  },
  {
    title: "Update Rekap Nilai Tahfidz Juz 30 Kelas 4-B",
    description: "Ustadz Hani Fauzan menyelesaikan evaluasi.",
    time: "2 jam yang lalu",
    icon: BookOpen,
    color: "emerald",
  },
];

const announcements = [
  {
    title: "Surat Edaran Libur Ramadhan",
    description:
      "Pembelajaran efektif menjelang bulan suci Ramadhan 1446 H berakhir pada hari Kamis.",
    date: "12 Feb 2025",
    color: "orange",
  },
  {
    title: "Rapat Pleno Dewan Asatidz",
    description:
      "Evaluasi mutu kurikulum, tahfidz & persiapan asesmen madrasah.",
    date: "15 Feb 2025",
    color: "blue",
  },
];

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-800">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[255px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}
        <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-800 text-white">
            <GraduationCap size={23} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-blue-900">
              SINfonia LMS
            </h1>
            <p className="text-[10px] text-slate-500">
              M. Nashrul Fiqri • Super Admin
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          {menuItems.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-3 px-3 text-[10px] font-bold tracking-widest text-slate-400">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeMenu === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveMenu(item.name);
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition ${
                        active
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                      }`}
                    >
                      <Icon size={16} />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="border-t border-slate-100 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-xs text-slate-600 hover:bg-slate-50">
            <MessageSquare size={16} />
            Pusat Bantuan
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-xs text-red-500 hover:bg-red-50">
            <LogOut size={16} />
            Keluar Akun
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-h-screen lg:ml-[255px]">

        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-7">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-700">
                Dashboard Administrator
              </p>
              <p className="text-[10px] text-slate-400">
                Sistem Informasi Manajemen Madrasah
              </p>
            </div>
          </div>

          <div className="hidden max-w-[330px] flex-1 md:flex">
            <div className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <Search size={15} className="text-slate-400" />
              <input
                type="text"
                placeholder="Cari siswa, guru, kelas, atau berkas..."
                className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
              <Bell size={19} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold">Ustadzah Siti</p>
              <p className="text-[10px] text-slate-400">
                Administrator
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              S
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-7">

          {/* TITLE */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                {activeMenu === "Dashboard"
                  ? "Dasbor Administrator"
                  : activeMenu}
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Ringkasan operasional akademik, data madrasah, dan monitoring
                pembelajaran.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold shadow-sm hover:bg-slate-50">
                <UserPlus size={14} />
                Tambah Siswa
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold shadow-sm hover:bg-slate-50">
                <Users size={14} />
                Tambah Guru
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-blue-800 px-3 py-2 text-[11px] font-semibold text-white shadow-sm hover:bg-blue-900">
                <Megaphone size={14} />
                Kirim Pengumuman
              </button>
            </div>
          </div>

          {/* STATISTICS */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              const colors: Record<string, string> = {
                blue: "bg-blue-50 text-blue-700",
                indigo: "bg-indigo-50 text-indigo-700",
                emerald: "bg-emerald-50 text-emerald-700",
                violet: "bg-violet-50 text-violet-700",
              };

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {stat.title}
                      </p>
                      <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
                        {stat.value}
                      </h3>
                    </div>
                    <div className={`rounded-lg p-2.5 ${colors[stat.color]}`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                      {stat.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

            {/* LEFT CONTENT */}
            <div className="space-y-5 xl:col-span-2">

              {/* ATTENDANCE */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold">
                      Ringkasan Kehadiran Madrasah Hari Ini
                    </h3>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Monitoring kehadiran peserta didik dan tenaga pendidik.
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Live
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      title: "Hadir Tepat Waktu",
                      value: "96.4%",
                      desc: "528 Siswa",
                      color: "emerald",
                    },
                    {
                      title: "Izin Terkonfirmasi",
                      value: "2.1%",
                      desc: "11 Siswa",
                      color: "orange",
                    },
                    {
                      title: "Sakit (Keterangan)",
                      value: "1.1%",
                      desc: "6 Siswa",
                      color: "blue",
                    },
                    {
                      title: "Alpa / Belum Hadir",
                      value: "0.4%",
                      desc: "3 Siswa",
                      color: "red",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-lg border p-3 ${
                        item.color === "emerald"
                          ? "border-emerald-100 bg-emerald-50/50"
                          : item.color === "orange"
                          ? "border-orange-100 bg-orange-50/50"
                          : item.color === "blue"
                          ? "border-blue-100 bg-blue-50/50"
                          : "border-red-100 bg-red-50/50"
                      }`}
                    >
                      <p className="text-[10px] font-medium text-slate-500">
                        {item.title}
                      </p>
                      <h4
                        className={`mt-2 text-2xl font-bold ${
                          item.color === "emerald"
                            ? "text-emerald-600"
                            : item.color === "orange"
                            ? "text-orange-600"
                            : item.color === "blue"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.value}
                      </h4>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-[10px] text-slate-400">
                  <span>Sinkronisasi data kehadiran otomatis</span>
                  <span className="font-medium text-slate-500">
                    Data contoh dashboard
                  </span>
                </div>
              </section>

              {/* ACTIVITY */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold">
                      Aktivitas Operasional & Pembelajaran
                    </h3>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Log pembaruan data kurikulum dan interaksi sistem.
                    </p>
                  </div>
                  <button className="text-[10px] font-semibold text-blue-700 hover:underline">
                    Lihat Semua Log
                  </button>
                </div>

                <div className="space-y-4">
                  {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                      <div
                        key={activity.title}
                        className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            activity.color === "blue"
                              ? "bg-blue-50 text-blue-700"
                              : activity.color === "indigo"
                              ? "bg-indigo-50 text-indigo-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs font-semibold text-slate-700">
                              {activity.title}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {activity.time}
                            </span>
                          </div>
                          <p className="mt-1 text-[10px] text-slate-500">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* QUICK SUMMARY */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-bold">
                  Ringkasan Sistem
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Activity size={18} />
                      <span className="text-xs font-semibold">
                        Status Sistem
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-blue-900">
                      Normal
                    </p>
                    <p className="text-[10px] text-blue-600">
                      Semua layanan berjalan
                    </p>
                  </div>

                  <div className="rounded-lg bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 size={18} />
                      <span className="text-xs font-semibold">
                        Database
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-emerald-900">
                      Terhubung
                    </p>
                    <p className="text-[10px] text-emerald-600">
                      Sinkronisasi berhasil
                    </p>
                  </div>

                  <div className="rounded-lg bg-orange-50 p-4">
                    <div className="flex items-center gap-2 text-orange-700">
                      <Clock size={18} />
                      <span className="text-xs font-semibold">
                        Jadwal Backup
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-orange-900">
                      23:00 WIB
                    </p>
                    <p className="text-[10px] text-orange-600">
                      Backup otomatis
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT CONTENT */}
            <div className="space-y-5">

              {/* QUICK ACTIONS */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-bold">
                  <span className="mr-2 text-blue-700">⚡</span>
                  Aksi Cepat Pengelolaan
                </h3>

                {[
                  {
                    title: "Registrasi Santri Baru",
                    desc: "Input data PPDB & NISN",
                    icon: UserPlus,
                  },
                  {
                    title: "Penjadwalan Ujian",
                    desc: "Atur ruang & pengawas PTS",
                    icon: CalendarDays,
                  },
                  {
                    title: "Sinkronisasi EMIS",
                    desc: "Verifikasi sinkron 4.0",
                    icon: ClipboardList,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      className="mb-3 flex w-full items-center gap-3 rounded-lg border border-slate-100 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/50 last:mb-0"
                    >
                      <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                        <Icon size={17} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                      <ChevronRight size={15} className="text-slate-400" />
                    </button>
                  );
                })}
              </section>

              {/* ANNOUNCEMENTS */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold">
                    Pengumuman Penting
                  </h3>
                  <MoreHorizontal size={18} className="text-slate-400" />
                </div>

                <div className="space-y-3">
                  {announcements.map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-lg border p-3 ${
                        item.color === "orange"
                          ? "border-orange-100 bg-orange-50/60"
                          : "border-blue-100 bg-blue-50/60"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            item.color === "orange"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <p className="text-xs font-bold">{item.title}</p>
                      </div>

                      <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                      <p className="mt-2 text-[9px] font-semibold text-slate-400">
                        Diterbitkan: {item.date}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* AGENDA */}
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold">
                    Agenda Terdekat
                  </h3>
                  <CalendarDays size={16} className="text-slate-400" />
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-800 text-white">
                      <span className="text-[9px]">FEB</span>
                      <span className="text-lg font-bold">16</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">
                        Pekan Penilaian Harian Ke-3
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        Seluruh jenjang kelas 1-6
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-emerald-600 text-white">
                      <span className="text-[9px]">FEB</span>
                      <span className="text-lg font-bold">22</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">
                        Khotmil Quran Santri Tahfidz
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        Wisuda Juz 30 & Juz 29
                      </p>
                    </div>
                  </div>
                </div>

                <button className="mt-5 w-full rounded-lg border border-slate-200 py-2 text-[11px] font-semibold text-blue-700 transition hover:bg-blue-50">
                  Buka Kalender Pendidikan
                </button>
              </section>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="mt-8 border-t border-slate-200 py-5 text-center text-[10px] text-slate-400">
            © 2026 SINfonia LMS. Administrator Dashboard.
            <br />
            Sistem Informasi Manajemen Madrasah
          </footer>
        </div>
      </main>
    </div>
  );
}
