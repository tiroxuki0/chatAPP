import React from "react";
import styled from "styled-components";
import Header from "./Header";
import HeaderLoading from "./HeaderLoading";
import Feed from "./Feed";
import Input from "./Input";
import { useSelector } from "react-redux";

const WindowsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 8px;
`;

const ChatWindows = () => {
  const pending = useSelector((state) => state.data.pending);
  return (
    <WindowsWrapper>
      {pending ? <HeaderLoading /> : <Header />}
      <Feed />
      <Input />
    </WindowsWrapper>
  );
};

export default React.memo(ChatWindows);
