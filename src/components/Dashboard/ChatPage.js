import * as React from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import ChatList from "./ChatList"
import UserInfo from "./UserInfo"
import ChatWindows from "./ChatWindows"
import { chat_feed_bg, chat_box } from "../../assets/imgs/index"
import { useSelector } from "react-redux"
import clsx from "clsx"
import styledd from "styled-components"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
  padding: "15px"
}))

const BoxStyled = styled(Box)`
  height: 100vh;
  width: 100%;
`

const ItemChatFeed = styled(Item)`
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #00000012;
    z-index: 3;
  }
  & > * {
    position: relative;
    z-index: 5;
  }
`

const GridFeed = styled(Grid)`
  transition: all 2s ease;
  transform: translateX(0);
  z-index: 99;
  @media only screen and (max-width: 900px) {
    &.close {
      display: none;
    }
    position: absolute;
    width: calc(100% - 70px);
    height: 100%;
    left: 70px;
    top: 0px;
  }

  @media only screen and (max-width: 600px) {
    width: calc(100% - 45px);
    left: 45px;
  }
`

const GridWrapper = styled(Grid)`
  height: 100%;
  margin: 0px !important;
  padding: 0px !important;
`

const TextStyled = styledd.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: 600;
  font-size: 20px;
  height: 100%;
`

const NoRoomSelected = () => {
  const theme = useSelector((state) => state.auth.theme)
  const chatWindows = useSelector((state) => state.auth.chatWindows)
  const displayName = useSelector((state) => state.auth.user?.displayName)
  return (
    <>
      <TextStyled>
        <img src={chat_box} style={{ width: 250, height: 250, marginBottom: "20px" }} />
        <p style={{ margin: 0, color: theme ? "#828282" : "rgb(173, 181, 189)" }}>
          Welcome, <span style={{ color: "#4eac6d" }}>{displayName}</span>
        </p>
        <p style={{ margin: 0, color: theme ? "#828282" : "rgb(173, 181, 189)" }}>Please select a chat to Start Messaging!</p>
      </TextStyled>
      ;
    </>
  )
}

export default React.memo(function ChatPage() {
  const theme = useSelector((state) => state.auth.theme)
  const roomSelected = useSelector((state) => state.data.roomSelected)
  const chatWindows = useSelector((state) => state.auth.chatWindows)
  return (
    <BoxStyled>
      <GridWrapper container>
        <Grid item xs={12} md={3} sx={{ height: "100%" }} className="mobile">
          <Item
            sx={{
              height: "100%",
              background: theme ? "#fff" : "#262626",
              borderRadius: theme ? "4px" : "0px"
            }}
          >
            {/* {viewChatList ? <ChatList /> : <UserInfo />} */}
            <ChatList />
            <UserInfo />
          </Item>
        </Grid>
        <GridFeed item xs={12} md={9} sx={{ height: "100%" }} className={clsx(chatWindows ? "" : "close")}>
          <ItemChatFeed
            sx={{
              backgroundImage: `url(${chat_feed_bg})`,
              backgroundColor: theme ? "white" : "#2e2e2e",
              borderRadius: theme ? "4px" : "0px",
              height: "100%",
              padding: "0px !important"
            }}
          >
            {roomSelected == null ? <NoRoomSelected /> : <ChatWindows />}
          </ItemChatFeed>
        </GridFeed>
      </GridWrapper>
    </BoxStyled>
  )
})
