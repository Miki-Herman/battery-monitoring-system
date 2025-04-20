import { IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import React from "react";

export type ThemeToggleProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

const ThemeToggle = (props: ThemeToggleProps) => {
  const mobileCheck = useMediaQuery("(max-width: 500px)");
  const {
    ColorModeContext = React.createContext({ toggleColorMode: () => {} }),
  } = props;
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <>
      {!mobileCheck && <Typography>{theme.palette.mode}</Typography>}
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness4Icon />
        ) : (
          <Brightness7Icon />
        )}
      </IconButton>
    </>
  );
};

export default ThemeToggle;
