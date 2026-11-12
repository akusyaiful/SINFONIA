import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import DashboardLayout from "@/components/layout/DashboardLayout";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = { title: "SINFONIA LMS – MI Nashrul Fajar", description: "Sistem Informasi Manajemen Pendidikan" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} font-sans`}>
        <AppProvider><DashboardLayout>{children}</DashboardLayout></AppProvider>
      </body>
    </html>
  );
}
