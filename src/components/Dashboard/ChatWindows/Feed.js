import styled from "styled-components";
import Message from "./Message";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  overflow: hidden auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: silver;
    border-radius: 10px;
  }
`;

const WindowsFeed = () => {
  return (
    <Wrapper>
      <Message
        photoURL=""
        username="Minh Huy"
        message="TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe"
        createdAt="12355234"
        side="left"
      />
      <Message
        photoURL=""
        username="Minh Huy"
        message="TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe"
        createdAt="12355234"
        side="right"
      />
      <Message
        photoURL=""
        username="Minh Huy"
        message="I agree, it's frustrating. They should consider better loading patterns to keep their users happy and optimize loading performance!"
        createdAt="12355234"
        side="right"
      />
      <Message
        photoURL=""
        username="Minh Huy"
        message="TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTe"
        createdAt="12355234"
        side="left"
      />
    </Wrapper>
  );
};

export default WindowsFeed;
