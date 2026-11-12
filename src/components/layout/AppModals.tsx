"use client";
import type { FormEvent, ReactNode } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useApp } from "@/lib/store";

function Field({ label, name, children }: { label: string; name: string; children?: ReactNode }) {
  const cls = "mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs outline-none focus:border-primary";
  return (
    <label className="block text-[11px] font-semibold text-ink">{label}
      {children ?? <input required name={name} type="text" className={cls} />}
    </label>
  );
}

function Actions({ onClose, submit }: { onClose: () => void; submit: string }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <Button onClick={onClose}>Batal</Button>
      <button type="submit" className="rounded-lg bg-navy px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-primary">{submit}</button>
    </div>
  );
}

export default function AppModals() {
  const { modal, closeModal, detail, closeDetail, addStudent, addTeacher, addAnnouncement, notify, toast } = useApp();
  const get = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); return new FormData(e.currentTarget); };

  return (
    <>
      {modal === "student" && (
        <Modal title="Tambah Siswa" onClose={closeModal}>
          <form className="space-y-3" onSubmit={(e) => {
            const f = get(e);
            addStudent({ nis: String(f.get("nis")), name: String(f.get("name")), kelas: String(f.get("kelas")), wali: String(f.get("wali")) });
            closeModal(); notify("Siswa berhasil ditambahkan.");
          }}>
            <Field label="NIS" name="nis" /><Field label="Nama Lengkap" name="name" />
            <Field label="Kelas (mis. 4B)" name="kelas" /><Field label="Nama Wali" name="wali" />
            <Actions onClose={closeModal} submit="Simpan" />
          </form>
        </Modal>
      )}
      {modal === "teacher" && (
        <Modal title="Tambah Guru" onClose={closeModal}>
          <form className="space-y-3" onSubmit={(e) => {
            const f = get(e);
            addTeacher({ nip: String(f.get("nip")), name: String(f.get("name")), mapel: String(f.get("mapel")) });
            closeModal(); notify("Guru berhasil ditambahkan.");
          }}>
            <Field label="NIP / NUPTK" name="nip" /><Field label="Nama Lengkap" name="name" /><Field label="Mata Pelajaran" name="mapel" />
            <Actions onClose={closeModal} submit="Simpan" />
          </form>
        </Modal>
      )}
      {modal === "announcement" && (
        <Modal title="Kirim Pengumuman" onClose={closeModal}>
          <form className="space-y-3" onSubmit={(e) => {
            const f = get(e);
            addAnnouncement({ id: String(Date.now()), title: String(f.get("title")), body: String(f.get("body")), meta: `Diterbitkan: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}`, tone: "info" });
            closeModal(); notify("Pengumuman terkirim.");
          }}>
            <Field label="Judul" name="title" />
            <Field label="Isi Pengumuman" name="body">
              <textarea required name="body" rows={4} className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs outline-none focus:border-primary" />
            </Field>
            <Actions onClose={closeModal} submit="Kirim" />
          </form>
        </Modal>
      )}
      {detail && (
        <Modal title={detail.title} onClose={closeDetail}>
          {detail.subtitle && <p className="mb-2 text-xs font-semibold text-primary">{detail.subtitle}</p>}
          <p className="text-xs leading-relaxed text-ink">{detail.body}</p>
          {detail.meta && <p className="mt-3 text-[11px] text-muted">{detail.meta}</p>}
        </Modal>
      )}
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white shadow-lg">{toast}</div>}
    </>
  );
}
