import Link from "next/link";
import { House } from "lucide-react";
import FormTambahSiswa from "@/components/siswa/FormTambahSiswa";

export default function TambahSiswaPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral/70">
        <Link href="/admin" className="inline-flex items-center gap-1.5 hover:text-primary">
          <House size={14} /> Beranda
        </Link>
        <span>/</span>
        <Link href="/admin/pengguna/siswa" className="hover:text-primary">Data Siswa</Link>
        <span>/</span>
        <span className="font-semibold text-neutral">Tambah Siswa Baru</span>
      </nav>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-heading text-3xl font-extrabold">Pendaftaran & Tambah Santri Baru</h1>
        <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold text-emerald-800">
          EMIS 4.0 Sinkron
        </span>
      </div>
      <p className="mt-2 text-neutral/80">
        Lengkapi identitas resmi santri sesuai akta kelahiran dan data Dapodik/EMIS Kemenag.
      </p>

      <FormTambahSiswa />
    </div>
  );
}
