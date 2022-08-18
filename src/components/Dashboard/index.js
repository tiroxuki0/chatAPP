import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useSelector } from "react-redux";
import { mainListItems } from "./listItems";
import ChatPage from "./ChatPage";
import styledd from "styled-components";

const BoxStyled = styledd(Box)`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px
  }
  &::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const SignIn = styled(Link)`
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
`;

const ListStyled = styledd(List)`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const ListTop = styledd.div`
  .MuiListItemIcon-root{
    margin-left: 7px;
    @media only screen and (max-width: 600px) {
      margin-left: 0px;
    }
  }
`;

const ListBottom = styledd.div`
  .MuiListItemIcon-root{
    margin-left: 7px;
    @media only screen and (max-width: 600px) {
      margin-left: 0px;
    }
  }
`;

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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",
    },
  },
});

function DashboardContent() {
  const login = useSelector((state) => state.auth.login);
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
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
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            ></Typography>
            {/* NOTIFICATIONS */}
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
                <SignIn to="/sign-in">Sign In</SignIn>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ height: "100vh" }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <ListStyled component="nav">
            <ListTop>{mainListItems}</ListTop>
            <ListBottom>
              <ListItemButton>
                <ListItemIcon>
                  <DarkModeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Change Theme" />
              </ListItemButton>
            </ListBottom>
          </ListStyled>
        </Drawer>
        <BoxStyled
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" disableGutters>
            <ChatPage />
          </Container>
        </BoxStyled>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
