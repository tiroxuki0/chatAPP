import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ChatList from "./ChatList";
import ChatWindows from "./ChatWindows";
import { chat_feed_bg } from "../../assets/imgs/index";
import { useSelector } from "react-redux";
import clsx from "clsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
  padding: "8px",
}));

const BoxStyled = styled(Box)`
  height: calc(100vh - 68px);
  width: 100%;
`;

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
`;

const GridFeed = styled(Grid)`
  transition: all 0.5s ease;
  transform: translateX(0);
  @media only screen and (max-width: 900px) {
    &.close {
      opacity: 0;
      transform: translateX(100%);
    }
    position: absolute;
    width: calc(100% - 72px);
    height: calc(100% - 65px);
    left: 72px;
    top: 64px;
  }
  @media only screen and (max-width: 600px) {
    width: calc(100% - 56px);
    height: calc(100% - 56px);
    left: 56px;
    top: 56px;
  }
`;

const GridWrapper = styled(Grid)`
  height: 100%;
  margin: 0px !important;
  padding: 0px !important;
`;

export default function ChatPage() {
  const chatWindows = useSelector((state) => state.auth.chatWindows);
  return (
    <BoxStyled>
      <GridWrapper container>
        <Grid item xs={12} md={4} sx={{ height: "100%" }}>
          <Item sx={{ height: "100%" }}>
            <ChatList />
          </Item>
        </Grid>
        <GridFeed
          item
          xs={12}
          md={8}
          sx={{ height: "100%" }}
          className={clsx(chatWindows ? "" : "close")}
        >
          <ItemChatFeed
            sx={{
              backgroundImage: `url(${chat_feed_bg})`,
              height: "100%",
              padding: "0px !important",
            }}
          >
            <ChatWindows />
          </ItemChatFeed>
        </GridFeed>
      </GridWrapper>
    </BoxStyled>
  );
}
