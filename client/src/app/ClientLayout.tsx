"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import Header from "./components/Header";
import Layout from "./components/Layout";
import ComboBox from "./components/ComboBox";

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
  const { data: session } = useSession();

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

  // Use a consistent structure for both server and client rendering
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider
        theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}
      >
        <SessionProvider>
          <CssBaseline />
          <div
            style={{
              visibility: mounted ? "visible" : "hidden",
              marginBottom: "35px",
            }}
          >
            <Header ColorModeContext={ColorModeContext} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "16px 0",
            }}
          >
            <ComboBox session={session} />
          </div>

          <Layout>{children}</Layout>
        </SessionProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
