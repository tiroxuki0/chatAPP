import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Body from "./Body";
import { useSelector } from "react-redux";

const InfoWrapper = styled.div`
  height: 100%;
`;

const UserInfo = () => {
  const viewChatList = useSelector((state) => state.data.viewChatList);

  return (
    <InfoWrapper style={{ display: viewChatList ? "none" : "" }}>
      <Header />
      <Body />
    </InfoWrapper>
  );
};

export default UserInfo;
