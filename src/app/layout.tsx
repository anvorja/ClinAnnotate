// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeFavicon } from "@/components/shared/ThemeFavicon";
import Header from "@/components/shared/Header";
import {Toaster} from "@/components/ui/toaster";
import {Sidebar} from "@/components/shared/Sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cancer Annotation",
  description: "Annotator for clinical NER",
    icons: {
        icon: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736252278/analitica-de-datos-black_osqvyo.png"
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <ThemeFavicon />
          <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col bg-background">
                  <Header />
                  <main className="flex-1 overflow-auto">
                      {children}
                  </main>
              </div>
          </div>
          <Toaster />
      </ThemeProvider>
      </body>
      </html>
  );
}
