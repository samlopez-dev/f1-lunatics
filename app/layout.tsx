import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <body className={`${sora.variable} antialiased`} style={{ fontFamily: "var(--font-sora), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}