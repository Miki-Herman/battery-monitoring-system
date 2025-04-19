import { IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import {IoMoon, IoSunny} from "react-icons/io5";
import React from "react";

export type ThemeToggleProps = {
    ColorModeContext : React.Context<{ toggleColorMode: () => void; } >,
}

const ThemeToggle = (props: ThemeToggleProps) => {
    const mobileCheck = useMediaQuery('(max-width: 500px)');
    const { ColorModeContext = React.createContext( {toggleColorMode: () => {} })} = props;
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    return (
        <>
            {!mobileCheck && (
                <Typography>{theme.palette.mode}</Typography>
            )}
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === "dark" ? (
                    <IoSunny size={24} />
                ) : (
                    <IoMoon size={24} />
                )}
            </IconButton>
        </>
    )
}

export default ThemeToggle;