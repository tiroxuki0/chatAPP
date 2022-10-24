import React from "react";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import clsx from "clsx";

const Wrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 5px;
  margin-top: 2px;
  &.right {
    flex-direction: row-reverse;
  }
  .hidden {
    opacity: 0;
    visibility: hidden;
  }
`;

const MessageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  span {
    width: 100%;
  }
  &.right {
    align-items: flex-end;
  }
  gap: 4px;
`;

const MessageStyled = styled(Skeleton)`
  word-wrap: break-word;
  margin: 1px 0;
  padding: 10px 14px 2px 14px;
  border-radius: 20px !important;
  max-width: 75%;
  text-align: left;
  font-size: 14px;
  color: #3f3f3f !important;
  .createdTime {
    font-weight: 600;
    color: #797c8c;
    font-size: 10px;
    margin: 0;
  }
  &.left {
    border-bottom-left-radius: 7px !important;
    .createdTime {
      text-align: left;
    }
    &.dark {
      background: #383838;
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }
  &.right {
    border-bottom-right-radius: 7px !important;
    .createdTime {
      text-align: right;
    }
    &.dark {
      background: rgba(78, 172, 109, 0.23);
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }
  @media only screen and (max-width: 900px) {
    max-width: 80%;
  }
`;

const Message = (props) => {
  const theme = useSelector((state) => state.auth.theme);

  return (
    <Wrapper className={props.side} style={{ height: `${props.height}px` }}>
      <Skeleton
        variant="circular"
        width={30}
        height={30}
        className={props.hidden ? "hidden" : "visible"}
      />
      <MessageWrapper className={clsx(props.side, theme ? "light" : "dark")}>
        <MessageStyled
          variant="rounded"
          className={clsx(props.side, theme ? "light" : "dark")}
          width={props?.width}
          height={props?.height}
        />
      </MessageWrapper>
    </Wrapper>
  );
};

export default React.memo(Message);
