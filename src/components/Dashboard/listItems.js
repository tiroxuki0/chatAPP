import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ForumIcon from "@mui/icons-material/Forum";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import styledd from "styled-components";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  setViewBody,
  setViewChatList,
  setStateSearch,
  clearData,
} from "../../redux/dataSlice";
import {
  setTheme,
  setStateChatWindows,
  signInFailed,
} from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { firebaseSignOut } from "../../firebase/services";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const SignIn = styled(Link)`
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
`;

const ListItemButtonStyled = styledd(ListItemButton)`
  width: 100%;
  padding: 10px 0px !important;
  justify-content: center !important;
  .MuiListItemIcon-root{
    margin: 0 !important;
    min-width: 100%;
    justify-content: center;
  }
`;

const Wrapper = styledd.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const MenuItemStyled = styledd(MenuItem)`
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between !important;
`;

export const ListItems = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);
  const login = useSelector((state) => state.auth.login);
  const user = useSelector((state) => state.auth.user);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCallWindowsChat = () => {
    dispatch(setViewBody(true));
    dispatch(setStateChatWindows(false));
    dispatch(setViewChatList(true));
    dispatch(setStateSearch(""));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(!anchorElUser);
  };

  const handleCloseUserMenu = async (event) => {
    setAnchorElUser(false);
    if (event.currentTarget.localName === "li") {
      const path = event.currentTarget.attributes.path.value;
      switch (path) {
        case "/": {
          dispatch(setViewChatList(false));
          dispatch(setStateChatWindows(false));
          break;
        }
        case "/sign-out": {
          await firebaseSignOut();
          dispatch(signInFailed());
          dispatch(clearData());
          break;
        }
        default: {
          return "not match path";
        }
      }
    } else {
      setAnchorElUser(false);
    }
  };

  return (
    <>
      <ListTop>
        <Wrapper>
          <BootstrapTooltip title="Groups" placement="right">
            <ListItemButtonStyled onClick={handleCallWindowsChat}>
              <ListItemIcon>
                <GroupsIcon sx={{ color: "#878a92", width: 28, height: 28 }} />
              </ListItemIcon>
            </ListItemButtonStyled>
          </BootstrapTooltip>
          <BootstrapTooltip title="Contacts" placement="right">
            <ListItemButtonStyled
              onClick={() => {
                dispatch(setViewBody(false));
                dispatch(setStateChatWindows(false));
                dispatch(setViewChatList(true));
                dispatch(setStateSearch(""));
              }}
            >
              <ListItemIcon>
                <RecentActorsIcon
                  sx={{ color: "#878a92", width: 28, height: 28 }}
                />
              </ListItemIcon>
            </ListItemButtonStyled>
          </BootstrapTooltip>
          <BootstrapTooltip title="Settings" placement="right">
            <ListItemButtonStyled
              onClick={() => {
                dispatch(setViewChatList(false));
                dispatch(setStateChatWindows(false));
              }}
            >
              <ListItemIcon>
                <SettingsIcon
                  sx={{ color: "#878a92", width: 28, height: 28 }}
                />
              </ListItemIcon>
            </ListItemButtonStyled>
          </BootstrapTooltip>
        </Wrapper>
      </ListTop>
      <ListBottom>
        {theme ? (
          <BootstrapTooltip title="Dark mode" placement="right">
            <ListItemButtonStyled onClick={() => dispatch(setTheme())}>
              <ListItemIcon>
                <DarkModeOutlinedIcon
                  sx={{ color: "#878a92", width: 28, height: 28 }}
                />
              </ListItemIcon>
            </ListItemButtonStyled>
          </BootstrapTooltip>
        ) : (
          <BootstrapTooltip title="Light mode" placement="right">
            <ListItemButtonStyled onClick={() => dispatch(setTheme())}>
              <ListItemIcon>
                <LightModeOutlinedIcon
                  sx={{ color: "#878a92", width: 28, height: 28 }}
                />
              </ListItemIcon>
            </ListItemButtonStyled>
          </BootstrapTooltip>
        )}
        {/* <BootstrapTooltip title="Notifications" placement="right">
          <ListItemButtonStyled>
            <ListItemIcon sx={{ mr: 2 }}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon
                  sx={{ color: "#878a92", width: 28, height: 28 }}
                />
              </Badge>
            </ListItemIcon>
          </ListItemButtonStyled>
        </BootstrapTooltip> */}
        {login ? (
          <ListItemButtonStyled onClick={handleOpenUserMenu}>
            <Box sx={{ flexGrow: 0 }}>
              <ListItemIcon sx={{ p: 0 }}>
                {user.photoURL && user.photoURL.includes("http") ? (
                  <Avatar
                    alt={user.displayName}
                    src={user.photoURL}
                    sx={{ width: 40, height: 40 }}
                    className="nav_avatar"
                  />
                ) : (
                  <Avatar
                    alt={user.displayName}
                    src={`data:image/svg+xml;base64,${user.photoURL}`}
                    sx={{ width: 40, height: 40 }}
                    className="nav_avatar"
                  />
                )}
              </ListItemIcon>
              <Menu
                sx={{
                  mt: "-60px",
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItemStyled path="/" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Setting</Typography>
                  <SettingsOutlinedIcon
                    sx={{ color: "#878a92", width: 20, height: 20 }}
                  />
                </MenuItemStyled>
                <MenuItemStyled path="/sign-out" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Sign out</Typography>
                  <LogoutOutlinedIcon
                    sx={{ color: "#878a92", width: 20, height: 20 }}
                  />
                </MenuItemStyled>
              </Menu>
            </Box>
          </ListItemButtonStyled>
        ) : (
          <ListItemButtonStyled>
            <SignIn to="/sign-in">Sign In</SignIn>
          </ListItemButtonStyled>
        )}
      </ListBottom>
    </>
  );
};

export default ListItems;
