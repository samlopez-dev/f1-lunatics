import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "F1 Lunatics · 2026 Fantasy League",
  description: "Private F1 Fantasy league tracker — 2026 season",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`} style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}