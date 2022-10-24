import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import styledd from "styled-components";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { roomsRemaining } from "../../../redux/selectors";
import { setStateChatWindows } from "../../../redux/authSlice";
import {
  getDataStart,
  getDataSuccess,
  setRoomSelected,
} from "../../../redux/dataSlice";

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
`;

const ListStyled = styled(List)``;

const ListItemTextStyled = styledd(ListItemText)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
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

function CustomizedList() {
  const dispatch = useDispatch();
  const rooms = useSelector(roomsRemaining);
  const theme = useSelector((state) => state.auth.theme);
  const chatWindows = useSelector((state) => state.auth.chatWindows);
  const viewBody = useSelector((state) => state.data.viewBody);
  const roomSelected = useSelector((state) => state.data.roomSelected);

  const handleChatWindows = (item) => {
    if (item.id !== roomSelected?.id) {
      dispatch(setRoomSelected({ private: false }));
      dispatch(getDataStart());
      dispatch(setRoomSelected(item));
      dispatch(getDataSuccess());
    }
    if (!chatWindows) {
      dispatch(setStateChatWindows(true));
    }
  };

  const RoomsRender = () => {
    if (rooms.length == 0) {
      return (
        <ListItemButton
          sx={{
            py: 0,
            minHeight: 32,
            color: "#6c6c6c",
            padding: "5px 0px",
          }}
        >
          <ListItemTextStyled
            primary="No group"
            primaryTypographyProps={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          />
        </ListItemButton>
      );
    }
    if (rooms) {
      return rooms.map((item) => (
        <ListItemButton
          key={item.roomName}
          sx={{
            py: 0,
            minHeight: 32,
            color: "#6c6c6c",
            padding: "5px 0px",
          }}
          onClick={() => handleChatWindows(item)}
        >
          <ListItemTextStyled
            primary={item.roomName}
            primaryTypographyProps={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          />
        </ListItemButton>
      ));
    }
  };

  return (
    <BoxStyled style={{ display: viewBody ? "block" : "none" }}>
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
                primary="GROUPS"
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
              <ListStyled
                sx={{ bgcolor: "background.paper", "& ul": { padding: 0 } }}
                subheader={<li />}
              >
                <RoomsRender />
              </ListStyled>
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </BoxStyled>
  );
}

export default React.memo(CustomizedList);
