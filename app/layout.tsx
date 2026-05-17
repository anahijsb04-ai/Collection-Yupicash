import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable:
    "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",
    subsets: ["latin"],
  });

export const metadata: Metadata =
  {
    title: "YopiCash",
    description:
      "Préstamos rápidos y seguros con YopiCash",
    applicationName:
      "YopiCash",

    icons: {
      icon: "/icon/app_icon.png",
      shortcut:
        "/icon/app_icon.png",
      apple:
        "/icon/app_icon.png",
    },

    themeColor: "#7c3aed",

    manifest: "/manifest.json",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#f7f5fc] text-[#111827] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}