import styled from "styled-components";
import Header from "./Header";
import Feed from "./Feed";
import Input from "./Input";

const WindowsWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 8px;
`;

const WindowsContent = styled.div`
  height: calc(100% - 58px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  margin: -8px -8px 0px -8px;
`;

const ChatWindows = () => {
  return (
    <WindowsWrapper sx={{ height: "100%" }}>
      <Header />
      <WindowsContent>
        <Feed />
      </WindowsContent>
      <Input />
    </WindowsWrapper>
  );
};

export default ChatWindows;
