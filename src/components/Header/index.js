import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const LoginControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 20px;
  }
`;

const pages = [];
const settings = [
  {
    href: "/",
    text: "Profile",
  },
  {
    href: "/users",
    text: "Users",
  },
  {
    href: "/logout",
    text: "Logout",
  },
];

const ResponsiveAppBar = () => {
  const [login, setLogin] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav("On Nav Menu:", event.currentTarget);
  };
  const handleCloseNavMenu = (event) => {
    console.log("On Nav Menu:", event.currentTarget);
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (event) => {
    if (event.currentTarget.localName === "li") {
      const path = event.currentTarget.attributes.path.value;
      setAnchorElUser(null);
      switch (path) {
        case "/": {
          break;
        }
        case "/users": {
          break;
        }
        case "/logout": {
          break;
        }
        default: {
          return "not match path";
        }
      }
    } else {
      setAnchorElUser(null);
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
              LOGO
            </Typography>
            {/* PAGES CONTROL */}
            {pages.length > 0 && (
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
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
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* USER CONTROL */}
            {login ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
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
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.text}
                      path={setting.href}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting.text}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <LoginControl>
                  <Link to="/auth/sign-in">Sign In</Link>
                </LoginControl>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
