import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Rooms from "./Rooms";
import Users from "./Users";
import { useSelector } from "react-redux";

const ChatListWrapper = styled.div`
  height: 100%;
`;

const ChatList = () => {
  const viewChatList = useSelector((state) => state.data.viewChatList);

  return (
    <ChatListWrapper style={{ display: viewChatList ? "" : "none" }}>
      <Header />
      <Rooms />
      <Users />
    </ChatListWrapper>
  );
};

export default ChatList;
