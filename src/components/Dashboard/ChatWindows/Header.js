import React from "react";
import Typography from "@mui/material/Typography";
import styledd from "styled-components";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import AvatarGroup from "@mui/material/AvatarGroup";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useModal from "../../../hooks/useModal";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { setStateChatWindows } from "../../../redux/authSlice";
import { default_avatar } from "../../../assets/imgs";

const HeaderWrapper = styledd(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(5px);
  position: absolute !important;
  width: 100%;
  height: 80px;
  z-index: 6;
  padding: 8px;
  margin: -8px;
`;

const HeaderLeft = styledd.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const RoomName = styledd.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > div {
    text-align: left;
    width: 100%;
    max-width: 250px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    margin: 0;
  }
`;

const Mobile = styledd.div`
  display: none;
  @media only screen and (max-width: 900px) {
    display: block;
  }
`;

const HeaderRight = styledd.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AvatarGroupStyled = styledd(AvatarGroup)`
  
`;

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

const WindowsHeader = () => {
  const dispatch = useDispatch();
  const [usersInRoom, setUsersInRoom] = React.useState([]);
  const theme = useSelector((state) => state.auth.theme);
  const roomSelected = useSelector((state) => state.data.roomSelected);
  const chatWindows = useSelector((state) => state.auth.chatWindows);
  const rooms = useSelector((state) => state.data.rooms);
  const users = useSelector((state) => state.data.users);
  const { modalAddUser } = useModal();

  const handleOpenAddUser = () => {
    modalAddUser(true);
  };

  const toggleChatWindows = () => {
    dispatch(setStateChatWindows(!chatWindows));
  };

  React.useEffect(() => {
    if (users) {
      const result = users.filter((user) => {
        return roomSelected.members.includes(user.uid);
      });
      setUsersInRoom(result);
    }
  }, [roomSelected, rooms]);

  return (
    <HeaderWrapper
      sx={{
        background: theme
          ? "rgba(255,255,255,.05) !important"
          : "rgba(46,46,46,.5) !important",
        borderBottom: theme ? "1px solid #d2d2d2" : "1px solid #333",
        boxShadow: "none !important",
      }}
    >
      <HeaderLeft>
        <Mobile>
          <IconButton
            onClick={toggleChatWindows}
            className="feed_header_left_arrow"
          >
            <KeyboardArrowLeftIcon
              fontSize="large"
              sx={{ color: theme ? "#797c8c" : "#adb5bd" }}
            />
          </IconButton>
        </Mobile>
        {roomSelected.private == true ? (
          <>
            {roomSelected.photoURL && roomSelected.photoURL.includes("http") ? (
              <Avatar
                alt={roomSelected.displayName}
                src={roomSelected.photoURL}
                size="large"
              />
            ) : (
              <>
                {roomSelected.photoURL ? (
                  <Avatar
                    alt={roomSelected.displayName}
                    src={`data:image/svg+xml;base64,${roomSelected.photoURL}`}
                    size="large"
                  />
                ) : (
                  <Avatar
                    alt={roomSelected.displayName}
                    src={default_avatar}
                    size="large"
                  />
                )}
              </>
            )}
          </>
        ) : (
          ""
        )}
        <RoomName style={{ color: theme ? "#495057" : "#adb5bd" }}>
          <Typography variant="h6" gutterBottom component="div">
            {roomSelected.private == true
              ? roomSelected.displayName
              : roomSelected.roomName}
          </Typography>
          {roomSelected.private == true ? (
            ""
          ) : (
            <Typography
              variant="caption"
              gutterBottom
              component="div"
              sx={{ color: "#797c8c", fontWeight: 600 }}
            >
              {roomSelected.roomDes}
            </Typography>
          )}
        </RoomName>
      </HeaderLeft>
      {roomSelected.private == true ? (
        ""
      ) : (
        <HeaderRight>
          <IconButton aria-label="add-user" onClick={handleOpenAddUser}>
            <PersonAddIcon
              fontSize="medium"
              sx={{ color: theme ? "#797c8c" : "#adb5bd" }}
            />
          </IconButton>
          <AvatarGroupStyled max={4}>
            {usersInRoom.map((user) => {
              let avatar = null;
              if (user.photoURL && user.photoURL.includes("http")) {
                avatar = (
                  <Avatar
                    key={user.displayName}
                    alt={user.displayName}
                    src={user.photoURL}
                    size="large"
                  />
                );
              } else {
                avatar = (
                  <>
                    {user.photoURL ? (
                      <Avatar
                        key={user.displayName}
                        alt={user.displayName}
                        src={`data:image/svg+xml;base64,${user.photoURL}`}
                        size="large"
                      />
                    ) : (
                      <Avatar
                        key={user.displayName}
                        alt={user.displayName}
                        src={default_avatar}
                        size="large"
                      />
                    )}
                  </>
                );
              }
              return avatar;
            })}
          </AvatarGroupStyled>
        </HeaderRight>
      )}
    </HeaderWrapper>
  );
};

export default React.memo(WindowsHeader);
