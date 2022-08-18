import * as React from "react";
import Box from "@mui/material/Box";
import GroupsIcon from "@mui/icons-material/Groups";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
// import { roomsRemaining } from "../../../redux/selectors";
import { useDispatch } from "react-redux";
// import { setStateChatWindows } from "../../../redux/authSlice";

const ListStyled = styled(List)`
  margin-right: 15px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    margin-left: 5px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: silver;
    border-radius: 10px;
  }
`;

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const RoomsRender = () => {
  const [rooms, setRooms] = React.useState([]);
  const dispatch = useDispatch();
  // const rooms = useSelector(roomsRemaining);

  const handleChatWindows = () => {
    // dispatch(setStateChatWindows(true));
  };

  const render = rooms.map((item) => (
    <ListItemButton
      key={item.label}
      sx={{ py: 0, minHeight: 32, color: "#6c6c6c" }}
      onClick={handleChatWindows}
    >
      <ListItemIcon sx={{ color: "inherit" }}>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: "bold",
        }}
      />
    </ListItemButton>
  ));

  return render;
};

const NoRoom = styled(Typography)`
  font-weight: 600;
  margin-top: 10px;
  color: #797c8c;
`;

export default function CustomizedList() {
  // const rooms = useSelector(roomsRemaining);
  const [rooms, setRooms] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "light",
            background: { paper: "#edf7f0" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: "100%" }}>
          <FireNav component="nav" disablePadding>
            <Box
              sx={{
                pb: open ? 2 : 0,
                maxWidth: "100%",
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 1 : 2.5,
                  "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary="Rooms"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "bold",
                    lineHeight: "20px",
                    mb: "2px",
                    color: "#4eac6d",
                  }}
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: open ? "rgba(0,0,0,0)" : "#edf7f0",
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
              </ListItemButton>
              {open && (
                <ListStyled
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 400,
                    "& ul": { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  {rooms.length === 0 ? (
                    <NoRoom>No room</NoRoom>
                  ) : (
                    <RoomsRender />
                  )}
                </ListStyled>
              )}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
