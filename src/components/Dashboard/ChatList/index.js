import styled from "styled-components";
import Header from "./Header";
import Body from "./Body";

const ChatListWrapper = styled.div`
  height: 100%;
`;

const ChatList = () => {
  return (
    <ChatListWrapper>
      <Header />
      <Body />
    </ChatListWrapper>
  );
};

export default ChatList;
