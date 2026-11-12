"use client";
import SectionPage, { DataTable } from "@/components/ui/SectionPage";
import Button from "@/components/ui/Button";
import { useApp } from "@/lib/store";

export default function StudentsPage() {
  const { students, openModal } = useApp();
  return (
    <SectionPage title="Data Siswa" desc="Daftar siswa aktif MI Nashrul Fajar.">
      <div><Button variant="primary" onClick={() => openModal("student")}>+ Tambah Siswa</Button></div>
      <DataTable head={["NIS", "Nama", "Kelas", "Wali"]} rows={students.map((s) => [s.nis, s.name, s.kelas, s.wali])} />
    </SectionPage>
  );
}
