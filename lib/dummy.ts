export const adminUser = { name: "Ustadzah Siti Maryam, S.Kom", role: "Super Admin / TU" };

export const adminStats = [
  { label: "Total Siswa Aktif", value: "548", unit: "Siswa", icon: "siswa",
    badge: "+12 semester ini", tone: "green", note: "18 Rombel aktif" },
  { label: "Tenaga Pendidik (Asatidz)", value: "36", unit: "Guru", icon: "guru",
    badge: "Semua Aktif", tone: "blue", note: "12 Guru Sertifikasi" },
  { label: "Rombongan Belajar (Kelas)", value: "18", unit: "Rombel", icon: "kelas",
    badge: "1A – 6C Lengkap", tone: "blue", note: "Rata-rata 30.4 /kelas" },
  { label: "Materi & Tugas Berjalan", value: "142", unit: "Modul", icon: "materi",
    badge: "68 Tugas Aktif", tone: "dot", note: "98.2% Terkumpul" },
] as const;
