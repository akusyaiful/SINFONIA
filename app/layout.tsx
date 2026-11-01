import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Nunito_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SINfonia LMS",
  description: "LMS MI Nashrul Fajar Kota Semarang",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full bg-surface font-sans text-neutral">{children}</body>
    </html>
  );
}
