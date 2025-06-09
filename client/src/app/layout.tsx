import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import ClientLayout from "./ClientLayout";
import { SensorProvider } from "@/context/SensorContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <SensorProvider>
          <ClientLayout>{children}</ClientLayout>
        </SensorProvider>
      </body>
    </html>
  );
}
