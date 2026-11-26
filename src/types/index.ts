
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export type Tone = "success" | "warning" | "info" | "danger";

export interface Student {
  nis: string;
  name: string;
  kelas: string;
  wali: string;
}

export interface Teacher {
  nip: string;
  name: string;
  mapel: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  meta: string;
  tone: "warning" | "info";
}

export interface Detail {
  title: string;
  subtitle?: string;
  body: string;
  meta?: string;
}

export type ModalType =
  | "student"
  | "teacher"
  | "announcement"
  | null;

export interface AppState {
  modal: ModalType;
  openModal: (m: ModalType) => void;
  closeModal: () => void;

  detail: Detail | null;
  openDetail: (d: Detail) => void;
  closeDetail: () => void;

  students: Student[];
  addStudent: (s: Student) => void;

  teachers: Teacher[];
  addTeacher: (t: Teacher) => void;

  announcements: Announcement[];
  addAnnouncement: (a: Announcement) => void;

  toast: string | null;
  notify: (m: string) => void;
}

// ─── Classroom / Kelas types ───────────────────────────────────────────────
export type Presensi = 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';
export interface Parent { nama: string; wa: string }
export interface TahfidzProgress { juz: number; detail: string }
export interface Attendance { pct: number; h: number; i: number; s: number; a: number }
export interface ClassroomStudent {
  id: number;
  nama: string;
  nisn: string;
  gender: 'Ikhwan' | 'Akhwat';
  wali: Parent;
  presensi: Presensi;
  att: Attendance;
  tugas: number;
  tugasTotal: number;
  nilai: number;
  tahfidz: TahfidzProgress;
  aktif: boolean;
}
export interface ClassInformation {
  nama: string;
  fase: string;
  ta: string;
  wali: string;
  total: string;
  lokasi: string;
}
export interface DashboardStatistic {
  label: string;
  value: string;
  unit?: string;
  note: string;
  tone: 'green' | 'blue';
}
