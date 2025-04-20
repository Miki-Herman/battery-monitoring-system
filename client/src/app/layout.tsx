"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import Header from "./components/Header";
import Layout from "./components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Create the color mode context
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const darkThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...darkTheme,
      }),
    [],
  );

  const lightThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...lightTheme,
      }),
    [],
  );

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider
            theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}
          >
            <SessionProvider>
              <CssBaseline />
              <Header ColorModeContext={ColorModeContext} />
              <Layout>{children}</Layout>
            </SessionProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
}
