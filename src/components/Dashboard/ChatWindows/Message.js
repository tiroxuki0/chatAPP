import React from "react"
import Avatar from "@mui/material/Avatar"
import styled from "styled-components"
import Paper from "@mui/material/Paper"
import { formatRelative } from "date-fns"
import { useSelector } from "react-redux"
import clsx from "clsx"
import { default_avatar } from "../../../assets/imgs"

const Wrapper = styled.div`
  max-width: 100%;
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
`

const MessageWrapper = styled.div`
  width: 75%;
  display: flex;
  align-items: flex-start;
  &.welcome {
    align-items: center;
    justify-content: center;
  }
  &.right {
    align-items: flex-end;
  }
  justify-content: flex-start;
  flex-direction: column;
  gap: 4px;
`

const ImageArrayStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  align-items: flex-end;
  justify-content: flex-start;
  width: 90%;
  &.right {
    justify-content: flex-end;
  }
  a {
    height: 200px;
    display: block;
    img {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 4px;
    }
  }
`

const MessageStyled = styled(Paper)`
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
    background: white;
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
    background: #cce2d3;
    border-bottom-right-radius: 7px !important;
    .createdTime {
      text-align: right;
    }
    &.dark {
      background: rgba(78, 172, 109, 0.23);
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }
  &.welcome {
    padding: 10px;
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    margin-bottom: 20px;
    &.dark {
      background: #383838;
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }
  @media only screen and (max-width: 900px) {
    max-width: 80%;
  }
`

const SeenDiv = styled.div`
  margin-top: -2px;
  width: 100%;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
`

const Message = (props) => {
  const theme = useSelector((state) => state.auth.theme)
  const formatDate = (seconds) => {
    let formated = ""
    if (seconds) {
      formated = formatRelative(new Date(seconds * 1000), new Date())
      formated = formated.charAt(0).toUpperCase() + formated.slice(1)
      formated = formated.split("at")[formated.split("at").length - 1]
    }

    return formated
  }

  return (
    <Wrapper className={props.side}>
      {props.photoURL && props.photoURL.includes("http") ? (
        <Avatar alt={props.username} src={props.photoURL} sx={{ width: 30, height: 30 }} className={props.photoURL !== "hidden" ? "visible" : "hidden"} />
      ) : (
        <>
          {props.photoURL ? (
            <Avatar
              alt={props.username}
              src={`data:image/svg+xml;base64,${props.photoURL}`}
              sx={{ width: 30, height: 30 }}
              className={props.photoURL !== "hidden" ? "visible" : "hidden"}
            />
          ) : (
            <Avatar alt={props.username} src={default_avatar} sx={{ width: 30, height: 30 }} className={props.photoURL !== "hidden" ? "visible" : "hidden"} />
          )}
        </>
      )}
      <MessageWrapper className={clsx("message_wrapper", props.side, !props.username ? "welcome" : "", theme ? "light" : "dark")}>
        {props.type === "text" ? (
          <MessageStyled className={clsx(props.side, !props.username ? "welcome" : "", theme ? "light" : "dark")} elevation={2}>
            <p style={{ margin: 0 }}>{props.message}</p>
            {props.username && <p className="createdTime">{formatDate(props.createdAt?.seconds) ? formatDate(props.createdAt?.seconds) : "........"}</p>}
          </MessageStyled>
        ) : (
          <>
            <ImageArrayStyled className={clsx(props.side, "message_image")} style={{ display: "flex" }}>
              {props.message.map((img, index) => {
                return (
                  <a
                    key={index}
                    data-fancybox="gallery"
                    href={img}
                    style={{
                      width: props.message.length === 1 ? `calc(50% - 4px)` : `calc(${100 / 3}% - 4px)`
                    }}
                  >
                    <img key={img} src={img} />
                  </a>
                )
              })}
            </ImageArrayStyled>
            {props.username && (
              <p
                className="createdTime"
                style={{
                  margin: "0",
                  fontSize: "12px",
                  color: "#797c8c"
                }}
              >
                {formatDate(props.createdAt?.seconds) ? formatDate(props.createdAt?.seconds) : "........"}
              </p>
            )}
          </>
        )}
        {/* {props.seen.length !== 0 && (
          <SeenDiv className={props.side}>
            {props.seen.map((uid) => {
              const userDisplay = users.find((u) => {
                return u.uid == uid;
              });
              return (
                <Avatar
                  alt={userDisplay?.displayName}
                  src={userDisplay?.photoURL}
                  sx={{ width: 12, height: 12 }}
                />
              );
            })}
          </SeenDiv>
        )} */}
      </MessageWrapper>
    </Wrapper>
  )
}

export default React.memo(Message)
