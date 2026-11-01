# SINfonia

**Sistem Informasi dan Belajar Online Nashrul Fajar**

SINfonia adalah platform Learning Management System (LMS) berbasis web yang dikembangkan untuk mendukung kegiatan pembelajaran dan pengelolaan akademik di MI Nashrul Fajar.

Platform ini dirancang untuk menghubungkan pihak sekolah, guru, siswa, dan orang tua dalam satu sistem terintegrasi. SINfonia menyediakan lingkungan pembelajaran digital yang memudahkan pengelolaan materi, tugas, penilaian, kehadiran, serta informasi akademik.

## ✨ Fitur Utama

SINfonia direncanakan memiliki beberapa modul utama:

- **Authentication & Authorization** — Login, logout, manajemen session, dan pembatasan akses berdasarkan role.
- **Dashboard** — Dashboard berdasarkan hak akses pengguna.
- **Manajemen Pengguna** — Pengelolaan akun administrator, guru, siswa, dan orang tua.
- **Manajemen Akademik** — Pengelolaan tahun ajaran, semester, kelas, mata pelajaran, dan jadwal.
- **Materi Pembelajaran** — Pengelolaan dan distribusi materi pembelajaran.
- **Tugas & Pengumpulan** — Pembuatan tugas dan pengumpulan hasil pekerjaan siswa.
- **Quiz & Ujian** — Pembuatan kuis dan pengelolaan hasil pengerjaan.
- **Penilaian** — Pengelolaan nilai akademik siswa.
- **Presensi** — Pencatatan dan pemantauan kehadiran siswa.
- **Rapor** — Pengelolaan hasil belajar siswa.
- **Pengumuman** — Penyampaian informasi dari sekolah.
- **Diskusi** — Fasilitas komunikasi dan diskusi pembelajaran.
- **Notifikasi** — Pemberitahuan aktivitas dan informasi akademik.

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|---|---|
| Next.js 16 | Full-stack web framework |
| React 19 | UI library |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Styling |
| Supabase | Backend as a Service |
| PostgreSQL | Database |
| Supabase Auth | Authentication & session management |
| Supabase Storage | Penyimpanan file |

## 👥 User Roles

SINfonia menggunakan sistem role-based access control (RBAC).

| Role | Deskripsi |
|---|---|
| Admin | Mengelola sistem dan data akademik sekolah. |
| Teacher | Mengelola materi, tugas, presensi, dan penilaian siswa. |
| Student | Mengakses materi, mengerjakan tugas, dan melihat hasil belajar. |
| Parent | Memantau informasi akademik dan perkembangan siswa. |

## 🚀 Getting Started

### 1. Prerequisites

Pastikan perangkat sudah memiliki:

- Node.js
- npm
- Git
- Akun Supabase

### 2. Clone Repository

```bash
git clone <repository-url>
```

Masuk ke direktori proyek:

```bash
cd sinfonia
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Environment Variables

Buat file `.env.local` di root project.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Ganti nilai tersebut dengan kredensial dari proyek Supabase.

**Catatan:** Jangan pernah memasukkan `service_role` key atau secret key ke dalam variabel yang menggunakan prefix `NEXT_PUBLIC_` atau mengeksposnya ke browser.

### 5. Run Development Server

```bash
npm run dev
```

Buka aplikasi melalui:

```text
http://localhost:3000
```

## 📁 Project Structure

```text
sinfonia/
├── app/
│   ├── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   ├── me/
│   │   │   │   └── route.ts
│   │   │   ├── profile/
│   │   │   │   └── route.ts
│   │   │   └── change-password/
│   │   │       └── route.ts
│   │   │
│   │   └── supabase-check/
│   │       └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│
├── lib/
│   ├── auth/
│   │   └── authorization.ts
│   │
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   │
│   ├── dummy.ts
│   └── menu.ts
│
├── .env.local
├── .gitignore
├── package.json
├── package-lock.json
├── proxy.ts
└── README.md
```

*Catatan: Struktur di atas merupakan gambaran struktur yang direncanakan untuk modul autentikasi. Sesuaikan dengan file yang sudah tersedia di repository.*

## 🔐 Authentication & Security

SINfonia menggunakan Supabase Authentication untuk mengelola autentikasi pengguna.

Sistem autentikasi dirancang dengan mekanisme:

- Login menggunakan email dan password.
- Session management menggunakan cookie.
- Logout dan validasi session.
- Pemeriksaan role pengguna melalui tabel `user_roles`.
- Pembatasan akses berdasarkan role.
- First Login Password Enforcement.

### First Login Password Enforcement

Setiap akun baru dapat diberikan password sementara yang dibuat oleh administrator atau sistem.

Ketika pengguna pertama kali login:

1. Sistem memverifikasi email dan password.
2. Sistem memeriksa kolom `must_change_password` pada tabel `profiles`.
3. Jika nilainya `true`, pengguna wajib mengganti password.
4. Setelah password berhasil diganti, status diperbarui menjadi `false`.
5. Pengguna dapat mengakses fitur sesuai role yang dimiliki.

Password pengguna dikelola oleh Supabase Auth dan tidak disimpan dalam tabel profil.

## 🗄️ Database

SINfonia menggunakan PostgreSQL melalui Supabase.

Database dirancang untuk mendukung beberapa kebutuhan utama:

- User management dan role management.
- Academic year, semester, class, dan subject.
- Teaching assignments dan schedules.
- Learning materials dan attachments.
- Assignments dan submissions.
- Quizzes dan quiz attempts.
- Grades dan report cards.
- Attendance sessions dan attendance records.
- Announcements dan notifications.
- Discussions dan replies.
- Audit logs.

Row Level Security (RLS) digunakan untuk membatasi akses data berdasarkan identitas dan hak akses pengguna.

## 📌 Development Status

Pengembangan SINfonia dilakukan secara bertahap dengan pendekatan backend-first.

| Modul | Status |
|---|---|
| Project Setup | Selesai |
| Supabase Configuration | Selesai |
| Database Schema | Sudah dibuat |
| Supabase Connection Check | Teruji |
| Authentication API | Dalam pengembangan |
| Role-Based Authorization | Dalam pengembangan |
| First Login Password Enforcement | Dalam pengembangan |
| User Management | Direncanakan |
| Academic Management | Direncanakan |
| Learning Management | Direncanakan |
| Attendance & Grading | Direncanakan |
| Notification System | Direncanakan |

## 🧑‍💻 Development

Pengembangan dilakukan secara bertahap dengan prioritas:

1. Backend infrastructure dan database.
2. Authentication dan authorization.
3. User management.
4. Academic management.
5. Learning management.
6. Attendance dan grading.
7. Notification system.
8. Frontend integration dan UI refinement.

## 📄 License

Project ini dikembangkan sebagai proyek akademik untuk MI Nashrul Fajar.

---

**SINfonia — Sistem Informasi dan Belajar Online Nashrul Fajar**