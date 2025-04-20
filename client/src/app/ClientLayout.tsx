"use client";

import { SessionProvider } from "next-auth/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import Header from "./components/Header";
import Layout from "./components/Layout";

// Create the color mode context
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  // Add state to track if we're mounted on the client
  const [mounted, setMounted] = React.useState(false);

  // After hydration, set mounted to true
  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  // Only render the header when the component is mounted on the client
  // This prevents hydration mismatch errors
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider
        theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}
      >
        <SessionProvider>
          <CssBaseline />
          {mounted && <Header ColorModeContext={ColorModeContext} />}
          {!mounted && <div style={{ marginBottom: "35px" }}></div>}
          <Layout>{children}</Layout>
        </SessionProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}