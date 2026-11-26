import type { ClassInformation, DashboardStatistic, ClassroomStudent, Presensi } from '../types';
const base: ClassroomStudent[] = [
  { id: 1, nama: 'Muhammad Rayhan Al-Fatih', nisn: '0129482011', gender: 'Ikhwan', wali: { nama: 'Irwan Kurniawan', wa: '+62 812-3456-7890' }, presensi: 'Hadir', att: { pct: 98.2, h: 112, i: 2, s: 0, a: 0 }, tugas: 14, tugasTotal: 14, nilai: 89.4, tahfidz: { juz: 30, detail: 'Juz 30 (Mutqin)' }, aktif: true },
  { id: 2, nama: 'Aisyah Zahira Putri', nisn: '0138294710', gender: 'Akhwat', wali: { nama: 'dr. Fauzan Al-Baqir', wa: '+62 811-2233-4455' }, presensi: 'Hadir', att: { pct: 100, h: 114, i: 0, s: 0, a: 0 }, tugas: 14, tugasTotal: 14, nilai: 94.8, tahfidz: { juz: 29, detail: 'Juz 29 (Al-Mulk)' }, aktif: true },
  { id: 3, nama: 'Fathan Rabbani Al-Habsyi', nisn: '0124819203', gender: 'Ikhwan', wali: { nama: 'Habib Ali Al-Habsyi', wa: '+62 813-9988-7766' }, presensi: 'Izin', att: { pct: 96.5, h: 110, i: 4, s: 0, a: 0 }, tugas: 12, tugasTotal: 14, nilai: 87.0, tahfidz: { juz: 30, detail: "Juz 30 (An-Naba')" }, aktif: true },
  { id: 4, nama: 'Naura Salsabila', nisn: '0139120485', gender: 'Akhwat', wali: { nama: 'Ibu Ratna Dewi, M.Pd', wa: '+62 857-1234-5678' }, presensi: 'Hadir', att: { pct: 99.1, h: 113, i: 1, s: 0, a: 0 }, tugas: 14, tugasTotal: 14, nilai: 91.2, tahfidz: { juz: 30, detail: 'Juz 30 (Mutqin)' }, aktif: true },
  { id: 5, nama: 'Zaidan Al-Farisi', nisn: '0125678432', gender: 'Ikhwan', wali: { nama: 'Bambang Irawan, S.E', wa: '+62 817-8899-0011' }, presensi: 'Hadir', att: { pct: 97.3, h: 111, i: 1, s: 2, a: 0 }, tugas: 13, tugasTotal: 14, nilai: 86.7, tahfidz: { juz: 30, detail: "Juz 30 (Al-A'la)" }, aktif: true },
];
const male = ['Abdullah Hanif', 'Ibrahim Naufal', 'Umar Faruq', 'Yusuf Maulana', 'Khalid Ramadhan', 'Hamzah Alfarizi', 'Bilal Syauqi', 'Idris Pratama', 'Salman Aziz', 'Rafif Mubarak', 'Ilyas Ghani', 'Zayyan Akbar'];
const female = ['Khadijah Nur Aini', 'Fatimah Azzahra', 'Maryam Qonita', 'Aminah Salma', 'Hafshah Rizka', 'Zainab Kamila', 'Ruqayyah Dina', 'Asma Nabila', 'Safiyyah Ayu', 'Halimah Inara', 'Syifa Humaira'];
const presensi: Presensi[] = ['Hadir', 'Hadir', 'Hadir', 'Sakit', 'Hadir', 'Izin', 'Hadir', 'Alpa'];
let m = 0, f = 0;
const rest: ClassroomStudent[] = Array.from({ length: 23 }, (_, k) => {
  const ikhwan = k % 2 === 0 || k === 22;
  const nama = ikhwan ? male[m++] : female[f++];
  const done = k % 3 !== 1;
  return {
    id: k + 6, nama, nisn: `01${24 + (k % 6)}${(5300000 + k * 7919).toString().slice(0, 6)}`.slice(0, 10), gender: ikhwan ? 'Ikhwan' : 'Akhwat',
    wali: { nama: `${ikhwan ? 'Bpk.' : 'Ibu'} Wali ${nama.split(' ')[1]}`, wa: `+62 8${12 + (k % 8)}-${1000 + k * 37}-${2000 + k * 53}` },
    presensi: presensi[k % presensi.length], att: { pct: 94 + (k % 6), h: 108 + (k % 6), i: k % 3, s: k % 2, a: k % 7 === 0 ? 1 : 0 },
    tugas: done ? 14 : 12 + (k % 2), tugasTotal: 14, nilai: 80 + ((k * 7) % 15) + 0.5, tahfidz: { juz: 30, detail: k % 4 === 0 ? 'Juz 30 (Mutqin)' : 'Juz 30 (Ad-Dhuha)' }, aktif: true,
  };
});
export const students: ClassroomStudent[] = [...base, ...rest];
export const classInfo: ClassInformation = { nama: 'Kelas 4-A (Umar bin Khattab)', fase: 'Fase B (Tingkat Dasar)', ta: 'Tahun Ajaran 2024/2025 Genap', wali: 'Ust. Ahmad Fadil, M.Pd.', total: '28 Santri (15 Ikhwan, 13 Akhwat)', lokasi: 'Ruang 204 Lt. 2 (Gedung Cordova)' };
export const classStats: DashboardStatistic[] = [
  { label: 'Rata-rata Kehadiran Kelas', value: '97.8%', note: 'Target Minimum: 90%', tone: 'green' },
  { label: 'Rata-rata Nilai Tugas', value: '88.6', unit: '/ 100', note: '+2.4 poin vs semester lalu', tone: 'blue' },
  { label: 'Capaian Tahfidz (Juz 30)', value: '23 / 28', unit: 'Mutqin', note: '82% Santri Tuntas', tone: 'blue' },
  { label: 'Konektivitas Wali Santri', value: '28 / 28', note: '100% Terhubung WhatsApp', tone: 'green' },
];
export const tabContent: Record<string, string[]> = {
  'Materi Pembelajaran': ['RPP Fiqih: Sholat Jamak & Qashar', 'Modul Tajwid Bab Mad', 'Hafalan Juz 30 (An-Naba’)', 'Hadits Arba’in ke-1 s.d. 5', 'Sirah Nabawiyah Bab 3', 'Aqidah Akhlak: Adab Bertetangga'],
  'Tugas & Kuis': ['Tugas Fiqih: Praktik Sholat Jamak', 'Kuis Tajwid Mingguan', 'Tugas Hadits: Menulis Arti', 'Kuis Aqidah Akhlak'],
  'Jadwal Pelajaran Kelas': ['Senin 07.30 – Fiqih', 'Selasa 08.15 – Tahfidz', 'Rabu 09.00 – Bahasa Arab', 'Kamis 07.30 – Aqidah Akhlak', 'Jumat 07.30 – Tajwid'],
  'Jurnal & Mutabaah': ['Jurnal 24 Feb: Tahfidz An-Naba’ 1–10', 'Mutabaah harian: 26/28 santri melengkapi', 'Catatan wali kelas: perlu penguatan makhraj'],
};
