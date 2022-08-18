import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useModal from "../../../hooks/useModal";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { setStateChatWindows } from "../../../redux/authSlice";

const HeaderWrapper = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(4px);
  position: absolute !important;
  width: 100%;
  height: 75px;
  z-index: 6;
  padding: 8px;
  margin: -8px;
`;

const HeaderLeft = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const RoomName = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  > div {
    text-align: left;
    width: 100%;
    max-width: 120px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
`;

const Mobile = styled.div`
  display: none;
  @media only screen and (max-width: 900px) {
    display: block;
  }
`;

const HeaderRight = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AvatarGroupStyled = styled(AvatarGroup)`
  .MuiAvatarGroup-avatar {
    width: 30px;
    height: 30px;
  }
`;

const WindowsHeader = () => {
  const dispatch = useDispatch();
  const chatWindows = useSelector((state) => state.auth.chatWindows);
  const { modalAddUser } = useModal();

  const handleOpenAddUser = () => {
    modalAddUser(true);
  };

  const toggleChatWindows = () => {
    dispatch(setStateChatWindows(!chatWindows));
  };

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <Mobile>
          <IconButton onClick={toggleChatWindows}>
            <KeyboardArrowLeftIcon fontSize="large" sx={{ color: "#6e6e6e" }} />
          </IconButton>
        </Mobile>
        <RoomName>
          <Typography variant="h6" gutterBottom component="div">
            Room name
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            component="div"
            sx={{ color: "#797c8c", fontWeight: 600 }}
          >
            Room description
          </Typography>
        </RoomName>
      </HeaderLeft>
      <HeaderRight>
        <IconButton aria-label="add-user" onClick={handleOpenAddUser}>
          <PersonAddIcon fontSize="medium" />
        </IconButton>
        <AvatarGroupStyled max={4}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            size="large"
          />
          <Avatar
            size="large"
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
          />
          <Avatar
            size="large"
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
          />
          <Avatar
            size="large"
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
          />
          <Avatar
            size="large"
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
          />
        </AvatarGroupStyled>
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default WindowsHeader;
