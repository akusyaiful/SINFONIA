export type Presensi = 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';
export interface Parent { nama: string; wa: string }
export interface TahfidzProgress { juz: number; detail: string }
export interface Attendance { pct: number; h: number; i: number; s: number; a: number }
export interface Student {
  id: number; nama: string; nisn: string; gender: 'Ikhwan' | 'Akhwat'; wali: Parent;
  presensi: Presensi; att: Attendance; tugas: number; tugasTotal: number; nilai: number; tahfidz: TahfidzProgress; aktif: boolean;
}
export interface ClassInformation { nama: string; fase: string; ta: string; wali: string; total: string; lokasi: string }
export interface DashboardStatistic { label: string; value: string; unit?: string; note: string; tone: 'green' | 'blue' }
