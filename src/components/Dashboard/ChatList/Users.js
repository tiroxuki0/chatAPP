import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import styledd from "styled-components";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { formatRelative } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import {
  usersRemaining,
  usersDisplayRemaining,
} from "../../../redux/selectors";
import { setStateChatWindows } from "../../../redux/authSlice";
import {
  getDataStart,
  getDataSuccess,
  setRoomSelected,
  setUsersDisplay,
} from "../../../redux/dataSlice";
import * as firebaseServices from "../../../firebase/services";

const BoxStyled = styledd(Box)`
  overflow: hidden auto;
  max-height: 550px;
  width: calc(100% + 28px);
  margin: 0 -15px -15px -15px;
  mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 7px, black 7px);
  mask-size: 100% 20000px;
  mask-position: left bottom;
  -webkit-mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 7px, black 7px);
  -webkit-mask-size: 100% 20000px;
  -webkit-mask-position: left bottom;
  transition: mask-position 0.3s, -webkit-mask-position 0.3s;
  &:hover{
    -webkit-mask-position: left top;
  }
  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbcdd3;
    border-radius: 10px;
  }
  .createdTime{
    position: absolute;
    right: 0;
    top: 3px;
    margin: 0;
  }
`;

const ListItemTextStyled = styledd(ListItemText)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  margin: 0;
`;

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 10,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2)",
      opacity: 0,
    },
  },
}));

function CustomizedList() {
  const dispatch = useDispatch();
  const users = useSelector(usersRemaining);
  const usersDisplay = useSelector(usersDisplayRemaining);
  const theme = useSelector((state) => state.auth.theme);
  const user = useSelector((state) => state.auth.user);
  const search = useSelector((state) => state.data.search);
  const rooms = useSelector((state) => state.data.rooms);
  const messages = useSelector((state) => state.data.messages);
  const viewBody = useSelector((state) => state.data.viewBody);
  const roomSelected = useSelector((state) => state.data.roomSelected);

  const formatDate = (seconds) => {
    let formated = "";
    if (seconds) {
      formated = formatRelative(new Date(seconds * 1000), new Date());
    }

    return formated;
  };

  const usersListRemaining = async () => {
    let usersSort = [];
    if (usersDisplay.length === 0) {
      const usersFirestore = await firebaseServices.getAllDocs("users");
      const newUsers = usersFirestore.map((user) => {
        return { ...user, password: null };
      });
      /* ===================== */
      /* ===================== */
      /* ===================== */
      /* sort user */
      const usersFilted = newUsers.filter((u) => {
        return user.uid !== u.uid;
      });
      const usersUpdate = usersFilted.map((u) => {
        const roomFound = rooms.find((room) => {
          return (
            room.members.includes(u.uid) &&
            room.members.includes(user.uid) &&
            room.private == true
          );
        });
        let second = 0;
        if (roomFound) {
          const messagesRemaining = messages.filter((message) => {
            return roomFound.id === message.roomId;
          });
          if (
            messagesRemaining.length !== 0 &&
            messagesRemaining[messagesRemaining.length - 1].uid
          ) {
            second =
              messagesRemaining[messagesRemaining.length - 1]?.createdAt
                ?.seconds;
          }
        }
        return {
          ...u,
          second: second === null || second === undefined ? u.second : second,
        };
      });
      usersSort = usersUpdate?.sort(
        (a, b) => parseFloat(b.second) - parseFloat(a.second)
      );
    } else {
      /* start */
      const usersFilted = usersDisplay.filter((u) => {
        return user.uid !== u.uid;
      });
      const usersUpdate = usersFilted.map((u) => {
        const roomFound = rooms.find((room) => {
          return (
            room.members.includes(u.uid) &&
            room.members.includes(user.uid) &&
            room.private == true
          );
        });
        let second = 0;
        if (roomFound) {
          const messagesRemaining = messages.filter((message) => {
            return roomFound.id === message.roomId;
          });
          if (
            messagesRemaining.length !== 0 &&
            messagesRemaining[messagesRemaining.length - 1].uid
          ) {
            second =
              messagesRemaining[messagesRemaining.length - 1]?.createdAt
                ?.seconds;
          }
        }
        return {
          ...u,
          second: second === null || second === undefined ? u.second : second,
        };
      });
      usersSort = usersUpdate?.sort(
        (a, b) => parseFloat(b.second) - parseFloat(a.second)
      );
    }
    dispatch(setUsersDisplay(usersSort));
    /* end sort user */
    /* ===================== */
    /* ===================== */
    /* ===================== */
  };

  React.useEffect(() => {
    usersListRemaining();
  }, [messages]);

  React.useEffect(() => {
    if (usersDisplay.length > 0) {
      /* ===================== */
      /* ===================== */
      /* ===================== */
      /* sort user */
      const usersFilted = users.filter((u) => {
        return user.uid !== u.uid;
      });
      const usersUpdate = usersFilted.map((u) => {
        const roomFound = rooms.find((room) => {
          return (
            room.members.includes(u.uid) &&
            room.members.includes(user.uid) &&
            room.private == true
          );
        });
        let second = 0;
        if (roomFound) {
          const messagesRemaining = messages.filter((message) => {
            return roomFound.id === message.roomId;
          });
          if (
            messagesRemaining.length !== 0 &&
            messagesRemaining[messagesRemaining.length - 1].uid
          ) {
            second =
              messagesRemaining[messagesRemaining.length - 1]?.createdAt
                ?.seconds;
          }
        }
        return {
          ...u,
          second: second === null || second === undefined ? u.second : second,
        };
      });
      const usersSort = usersUpdate?.sort(
        (a, b) => parseFloat(b.second) - parseFloat(a.second)
      );
      dispatch(setUsersDisplay(usersSort));
      /* end sort user */
      /* =============== */
      /* =============== */
      /* =============== */
    }
  }, [users]);

  const handleChatWindows = async (userSelected) => {
    dispatch(setStateChatWindows(true));
    const roomFound = rooms.find((room) => {
      return (
        room.members.includes(userSelected.uid) &&
        room.members.includes(user.uid) &&
        room.private == true
      );
    });
    if (roomFound) {
      if (roomFound.id !== roomSelected?.id) {
        dispatch(setRoomSelected({ private: true }));
        dispatch(
          setRoomSelected({
            displayName: userSelected.displayName,
            photoURL: userSelected.photoURL,
            ...roomFound,
          })
        );
      }
    } else {
      dispatch(setRoomSelected({ private: true }));
      dispatch(getDataStart());
      const resultRoom = await firebaseServices.addDocument("rooms", {
        roomName: "Private room",
        roomDes: "Private room",
        members: [user.uid, userSelected.uid],
        private: true,
      });
      await firebaseServices.addDocument("messages", {
        type: "text",
        text: `Let's chat!`,
        uid: null,
        displayName: null,
        photoURL: "hidden",
        roomId: resultRoom.docId,
        seen: [],
      });
      dispatch(
        setRoomSelected({
          displayName: userSelected.displayName,
          photoURL: userSelected.photoURL,
          id: resultRoom.docId,
          ...resultRoom.data,
        })
      );
      dispatch(getDataSuccess());
    }
  };

  const UsersRender = () => {
    if (usersDisplay.length == 0) {
      return (
        <ListItemButton
          sx={{
            py: 0,
            minHeight: 32,
            color: "#6c6c6c",
            padding: "10px 0px",
          }}
        >
          <ListItemTextStyled
            primary="No contact"
            primaryTypographyProps={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          />
        </ListItemButton>
      );
    } else {
      return usersDisplay.map((u) => {
        /* handle show last chat */
        const roomFound = rooms.find((room) => {
          return (
            room.members.includes(u.uid) &&
            room.members.includes(user.uid) &&
            room.private == true
          );
        });
        let textMessage = "";
        if (roomFound) {
          const messagesRemaining = messages.filter((message) => {
            return roomFound.id === message.roomId;
          });
          if (
            messagesRemaining.length !== 0 &&
            messagesRemaining[messagesRemaining.length - 1].uid
          ) {
            if (
              messagesRemaining[messagesRemaining.length - 1].type === "image"
            ) {
              textMessage =
                messagesRemaining[messagesRemaining.length - 1].uid === user.uid
                  ? "you: " + "[image]"
                  : "[image]";
            } else {
              textMessage =
                messagesRemaining[messagesRemaining.length - 1].uid === user.uid
                  ? "you: " +
                    messagesRemaining[messagesRemaining.length - 1].text
                  : messagesRemaining[messagesRemaining.length - 1].text;
            }
          }
        }
        /* end handle */
        return (
          <ListItemButton
            key={u.displayName}
            sx={{
              py: 0,
              minHeight: 32,
              color: "#6c6c6c",
              padding: "10px 15px !important",
            }}
            onClick={() => handleChatWindows(u)}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              {u.photoURL && u.photoURL.includes("http") ? (
                <Avatar
                  alt={u.displayName}
                  src={u.photoURL}
                  sx={{ width: 35, height: 35 }}
                />
              ) : (
                <Avatar
                  alt={u.displayName}
                  src={`data:image/svg+xml;base64,${u.photoURL}`}
                  sx={{ width: 35, height: 35 }}
                />
              )}
              {/* <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                {u.photoURL && u.photoURL.includes("http") ? (
                  <Avatar
                    alt={u.displayName}
                    src={u.photoURL}
                    sx={{ width: 30, height: 30 }}
                  />
                ) : (
                  <Avatar
                    alt={u.displayName}
                    src={`data:image/svg+xml;base64,${u.photoURL}`}
                    sx={{ width: 30, height: 30 }}
                  />
                )}
              </StyledBadge> */}
            </ListItemIcon>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                width: "100%",
              }}
            >
              <ListItemTextStyled
                primary={u.displayName}
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
                sx={{ margin: 0 }}
              />
              <ListItemTextStyled
                primary={textMessage}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: "500",
                }}
                sx={{ margin: 0 }}
              />
              <p className="createdTime">
                {formatDate(u?.second) ? formatDate(u?.second) : ""}
              </p>
            </div>
          </ListItemButton>
        );
      });
    }
  };

  return (
    <BoxStyled style={{ display: viewBody ? "none" : "block" }}>
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
            mode: theme ? "light" : "dark",
            background: { paper: theme ? "white" : "dark" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: "100%" }}>
          <FireNav component="nav" disablePadding>
            <Box
              sx={{
                maxWidth: "100%",
              }}
            >
              <ListItemText
                primary="FAVOURITES"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "700",
                  lineHeight: "20px",
                  mb: "2px",
                  color: "#a7a9b3",
                }}
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                }}
                sx={{ my: 0, px: 3, pt: 2.5, pb: 1, textAlign: "left" }}
              />
              <List
                sx={{
                  bgcolor: "background.paper",
                  "& ul": { padding: 0 },
                }}
              >
                <UsersRender />
              </List>
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </BoxStyled>
  );
}

export default React.memo(CustomizedList);
