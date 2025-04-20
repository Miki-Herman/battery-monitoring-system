"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import BatterySaverIcon from "@mui/icons-material/BatterySaver";
import ThemeToggle from "../ThemeToggle";
import { useMediaQuery } from "@mui/material";

export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

const Header = (props: HeaderProps) => {
  const { data: session, status } = useSession();
  const mobileCheck = useMediaQuery("(max-width: 500px)");
  const { ColorModeContext } = props;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userName = session?.user?.name ?? "User";
  const userEmail = session?.user?.email ?? "";
  const userProfileImg = session?.user?.image ?? undefined;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left side logo */}
          <BatterySaverIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BatteryMonitoringSystem
          </Typography>

          {/* Mobile Logo */}
          <BatterySaverIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BMS
          </Typography>

          {/* Push everything to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right side: email and avatar */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {session && !mobileCheck && (
              <Typography>Signed in as {userEmail}</Typography>
            )}
            <ThemeToggle ColorModeContext={ColorModeContext} />
            <Tooltip title="Open profile settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {status === "loading" ? (
                  <CircularProgress size={40} color="inherit" />
                ) : (
                  <Avatar alt={userName} src={userProfileImg} />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => (session ? signOut() : signIn())}>
                <Typography textAlign="center">
                  {session ? "Logout" : "Login"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
