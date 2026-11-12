"use client";
import SectionPage, { DataTable } from "@/components/ui/SectionPage";
import Button from "@/components/ui/Button";
import { useApp } from "@/lib/store";

export default function TeachersPage() {
  const { teachers, openModal } = useApp();
  return (
    <SectionPage title="Data Guru" desc="Daftar tenaga pendidik (Asatidz).">
      <div><Button variant="primary" onClick={() => openModal("teacher")}>+ Tambah Guru</Button></div>
      <DataTable head={["NIP", "Nama", "Mata Pelajaran"]} rows={teachers.map((t) => [t.nip, t.name, t.mapel])} />
    </SectionPage>
  );
}
