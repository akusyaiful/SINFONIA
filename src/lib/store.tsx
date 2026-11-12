"use client";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Announcement, AppState, Detail, ModalType, Student, Teacher } from "@/types";
import { initialAnnouncements, initialStudents, initialTeachers } from "@/data/dashboard";

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [toast, setToast] = useState<string | null>(null);

  const notify = useCallback((m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2800);
  }, []);

  const value: AppState = {
    modal, openModal: setModal, closeModal: () => setModal(null),
    detail, openDetail: setDetail, closeDetail: () => setDetail(null),
    students, addStudent: (s) => setStudents((p) => [s, ...p]),
    teachers, addTeacher: (t) => setTeachers((p) => [t, ...p]),
    announcements, addAnnouncement: (a) => setAnnouncements((p) => [a, ...p]),
    toast, notify,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
}
