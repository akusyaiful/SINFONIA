
import type { Announcement, Student, Teacher } from "@/types";

export interface StatItem {
  label: string;
  value: string;
  unit: string;
  icon: string;
  href: string;
  pill: string;
  pillTone: "green" | "blue" | "dot";
  note: string;
  detail: string;
}

export const stats: StatItem[] = [
  {
    label: "Total Siswa Aktif",
    value: "548",
    unit: "Siswa",
    icon: "GraduationCap",
    href: "/students",
    pill: "+12 semester ini",
    pillTone: "green",
    note: "18 Rombel aktif",
    detail: "",
  },
  {
    label: "Tenaga Pendidik (Asatidz)",
    value: "36",
    unit: "Guru",
    icon: "Contact",
    href: "/teachers",
    pill: "Semua Aktif",
    pillTone: "blue",
    note: "12 Guru Sertifikasi",
    detail: "",
  },
  {
    label: "Rombongan Belajar (Kelas)",
    value: "18",
    unit: "Rombel",
    icon: "DoorOpen",
    href: "/academics",
    pill: "1A–6C Lengkap",
    pillTone: "blue",
    note: "Rata-rata 30,4 siswa/kelas",
    detail: "",
  },
  {
    label: "Materi & Tugas Berjalan",
    value: "142",
    unit: "Modul",
    icon: "BookOpen",
    href: "/learning",
    pill: "68 Tugas Aktif",
    pillTone: "dot",
    note: "98,2% Terkumpul",
    detail: "",
  },
];

export const attendance = [
  {
    label: "Hadir Tepat Waktu",
    pct: "96,4%",
    count: "528 Siswa",
    cls: "bg-[#EAF7F2] border-[#CBEBDD] text-success",
  },
  {
    label: "Izin Terkonfirmasi",
    pct: "2,1%",
    count: "11 Siswa",
    cls: "bg-[#FFF6E8] border-[#F6DFB8] text-warning",
  },
  {
    label: "Sakit (Keterangan)",
    pct: "1,1%",
    count: "6 Siswa",
    cls: "bg-[#EDF3FD] border-[#CFDDF5] text-primary",
  },
  {
    label: "Alpa / Belum Hadir",
    pct: "0,4%",
    count: "3 Siswa",
    cls: "bg-[#FDEEF1] border-[#F6CDD5] text-danger",
  },
];

export const quickActions = [
  {
    title: "Registrasi Santri Baru",
    desc: "Input data PPDB & NISN",
    icon: "UserPlus",
    action: "student",
  },
  {
    title: "Penjadwalan Ujian",
    desc: "Atur ruang & pengawas PTS",
    icon: "CalendarCheck",
    action: "/academics",
  },
  {
    title: "Sinkronisasi EMIS Kemenag",
    desc: "Verifikasi sinkron 4.0",
    icon: "RefreshCw",
    action: "emis",
  },
];

export const activities = [
  {
    icon: "FileUp",
    title: "Guru Ahmad Fadil, S.Pd.I mengunggah RPP Fiqih",
    desc: "RPP Bab Sholat Jamak & Qashar untuk Kelas 4–A & 4–B Semester Genap.",
    time: "12 mnt yang lalu",
  },
  {
    icon: "Megaphone",
    title: "Pengumuman Jadwal PTS dibagikan ke 18 Kelas",
    desc: "Jadwal dan tata tertib Penilaian Tengah Semester Genap telah diteruskan kepada akun wali murid.",
    time: "45 mnt yang lalu",
  },
  {
    icon: "BookOpen",
    title: "Update Rekap Nilai Tahfidz Juz 30 Kelas 4-B",
    desc: "Ustadzah Hanif Fauzan menyelesaikan evaluasi kelancaran makhraj dan tajwid 28 santri.",
    time: "2 jam yang lalu",
  },
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "a1",
    title: "Surat Edaran Libur Ramadan",
    body: "Pembelajaran efektif menjelang bulan suci Ramadan 1446 H berakhir pada hari Kamis.",
    meta: "Diterbitkan: 12 Feb 2025",
    tone: "warning",
  },
  {
    id: "a2",
    title: "Rapat Pleno Dewan Asatidz",
    body: "Evaluasi mutu kurikulum Tahfidz & persiapan asesmen madrasah di Aula Utama.",
    meta: "Sabtu, 15 Feb 2025 – 09:00 WIB",
    tone: "info",
  },
];

export const agenda = [
  {
    day: "17",
    month: "FEB",
    title: "Pekan Penilaian Harian Ke-3",
    desc: "Seluruh Jenjang Kelas 1–6",
    color: "bg-navy",
  },
  {
    day: "22",
    month: "FEB",
    title: "Khotmil Quran Santri Tahfidz",
    desc: "Wisuda Juz 30 & Juz 29",
    color: "bg-success",
  },
];

export const notifications = [
  {
    id: 1,
    text: "3 siswa belum melakukan tap-in hari ini",
    time: "5 mnt lalu",
  },
  {
    id: 2,
    text: "RPP Fiqih baru menunggu verifikasi",
    time: "12 mnt lalu",
  },
  {
    id: 3,
    text: "Sinkronisasi EMIS siap dijalankan",
    time: "1 jam lalu",
  },
];

export const initialStudents: Student[] = [
  {
    nis: "2024001",
    name: "M. Rizqi",
    kelas: "5A",
    wali: "Bpk. Hasan",
  },
  {
    nis: "2024002",
    name: "Aisyah Nur",
    kelas: "4B",
    wali: "Ibu Siti",
  },
  {
    nis: "2024003",
    name: "Fauzan Akbar",
    kelas: "6C",
    wali: "Bpk. Imam",
  },
];

export const initialTeachers: Teacher[] = [
  {
    nip: "198001",
    name: "Ahmad Fadil, S.Pd.I",
    mapel: "Fiqih",
  },
  {
    nip: "198502",
    name: "Hanif Fauzan, S.Pd",
    mapel: "Tahfidz",
  },
  {
    nip: "199003",
    name: "Siti Maryam, S.Kom",
    mapel: "Informatika",
  },
];

export const classes = [
  "Kelas 1A",
  "Kelas 4A",
  "Kelas 4B",
  "Kelas 5A",
  "Kelas 6C",
];

export const curriculumFiles = [
  "RPP Fiqih Bab Sholat Jamak & Qashar",
  "Silabus Tahfidz Juz 30",
  "Jadwal PTS Genap 2024/2025",
];
