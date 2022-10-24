import React from "react";
import styledd from "styled-components";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import AvatarGroup from "@mui/material/AvatarGroup";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useModal from "../../../hooks/useModal";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { setStateChatWindows } from "../../../redux/authSlice";
import Skeleton from "@mui/material/Skeleton";

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
  align-items: flex-start;
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
  .MuiAvatarGroup-avatar {
    width: 30px;
    height: 30px;
  }
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
  const theme = useSelector((state) => state.auth.theme);
  const roomSelected = useSelector((state) => state.data.roomSelected);
  const chatWindows = useSelector((state) => state.auth.chatWindows);
  const { modalAddUser } = useModal();

  const handleOpenAddUser = () => {
    modalAddUser(true);
  };

  const toggleChatWindows = () => {
    dispatch(setStateChatWindows(!chatWindows));
  };

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
          <IconButton onClick={toggleChatWindows}>
            <KeyboardArrowLeftIcon
              fontSize="large"
              sx={{ color: theme ? "#797c8c" : "#adb5bd" }}
            />
          </IconButton>
        </Mobile>
        {roomSelected.private == true ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
            size="large"
          />
        ) : (
          ""
        )}
        <RoomName style={{ color: theme ? "#495057" : "#adb5bd" }}>
          <Skeleton animation="wave" height={10} width="80px" />
          {roomSelected.private == true ? (
            ""
          ) : (
            <Skeleton animation="wave" height={10} width="40px" />
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
            <Skeleton
              animation="wave"
              variant="circular"
              width={30}
              height={30}
              size="large"
            />
            <Skeleton
              animation="wave"
              variant="circular"
              width={30}
              height={30}
              size="large"
            />
            <Skeleton
              animation="wave"
              variant="circular"
              width={30}
              height={30}
              size="large"
            />
          </AvatarGroupStyled>
        </HeaderRight>
      )}
    </HeaderWrapper>
  );
};

export default React.memo(WindowsHeader);
