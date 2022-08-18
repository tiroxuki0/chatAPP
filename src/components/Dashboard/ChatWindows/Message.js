import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 5px;
  &.right {
    flex-direction: row-reverse;
  }
`;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  &.right {
    align-items: flex-end;
  }
  justify-content: flex-start;
  flex-direction: column;
  gap: 5px;
`;

const MessageStyled = styled(Paper)`
  word-wrap: break-word;
  margin: 1px 0;
  padding: 10px 14px;
  border-radius: 20px !important;
  max-width: 75%;
  text-align: left;
  font-size: 14px;
  color: #3f3f3f !important;
  &.left {
    background: white;
    border-bottom-left-radius: 7px !important;
  }
  &.right {
    background: #cce2d3;
    border-bottom-right-radius: 7px !important;
  }
  @media only screen and (max-width: 900px) {
    width: 80%;
  }
`;

const Message = (props) => {
  return (
    <Wrapper className={props.side}>
      <Avatar
        alt={props.username}
        src={props.photoURL}
        sx={{ width: 30, height: 30 }}
      />
      <MessageWrapper className={props.side}>
        <MessageStyled className={props.side} elevation={2}>
          {props.message}
        </MessageStyled>
        <Typography
          variant="caption"
          component="div"
          sx={{ fontWeight: 600, color: "#797c8c" }}
        >
          {props.createdAt}
        </Typography>
      </MessageWrapper>
    </Wrapper>
  );
};

export default Message;
