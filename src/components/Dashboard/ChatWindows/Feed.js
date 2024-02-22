import React from "react"
import styled from "styled-components"
import Message from "./Message"
import MessageLoading from "./MessageLoading"
import { useSelector, useDispatch } from "react-redux"
import FancyBox from "../../../FancyBox"
import { updateMemberInSeen } from "../../../firebase/services"
import { getDataSuccess } from "../../../redux/dataSlice"

const FeedContainer = styled.div`
  height: calc(100% - 48px);
  margin: -8px -8px 0px -8px;
  overflow: hidden scroll;
  scroll-behavior: smooth;
  display: flex;
  mask-image: linear-gradient(to top, transparent, black), linear-gradient(to left, transparent 6px, black 6px);
  mask-size: 100% 20000px;
  mask-position: left bottom;
  -webkit-mask-image: linear-gradient(to top, transparent, black), linear-gradient(to left, transparent 6px, black 6px);
  -webkit-mask-size: 100% 20000px;
  -webkit-mask-position: left bottom;
  transition: mask-position 0.3s, -webkit-mask-position 0.3s;
  &:hover {
    -webkit-mask-position: left top;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #d2d2d236;
  }
  &::-webkit-scrollbar-thumb {
    background: #0000001a;
    border-radius: 10px;
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: auto;
  margin-bottom: 0;
  padding: 80px 8px 0px 8px !important;
`

const DivBottom = styled.div`
  width: 100%;
  height: 10px;
  background: transparent;
  color: transparent;
`

const LoadingText = styled.div`
  background: transparent;
  font-size: 20px;
  position: relative;
  z-index: 10;
`

const WindowsFeed = () => {
  const dispatch = useDispatch()
  const bottomRef = React.useRef(null)
  const [messagesRemaining, setMessagesRemaining] = React.useState([])
  const messages = useSelector((state) => state.data.messages)
  const roomSelected = useSelector((state) => state.data.roomSelected)
  const pending = useSelector((state) => state.data.pending)
  const user = useSelector((state) => state.auth.user)

  const getMessages = async () => {
    const messagesFirestore = await messages.filter((message) => {
      return message.roomId === roomSelected.id
    })
    if (messagesFirestore) {
      /* if (messagesFirestore[messagesFirestore.length - 1]) {
        await updateMemberInSeen(
          "messages",
          user.uid,
          messagesFirestore[messagesFirestore.length - 1].id
        );
      } */
      const messagesFilted = messagesFirestore.reduce((resultArray, currentMessage, currentIndex) => {
        let uidCurrent = currentMessage.uid
        let newMessage = currentMessage
        if (messagesFirestore[currentIndex + 1] && uidCurrent == messagesFirestore[currentIndex + 1].uid) {
          newMessage = { ...currentMessage, photoURL: "hidden" }
        }
        /* if (messagesFirestore[currentIndex + 1]) {
            if (
              currentMessage.seen.length !== 0 &&
              messagesFirestore[currentIndex + 1].seen.length !== 0
            ) {
              const resultSeen = currentMessage.seen.reduce(
                (resultArray, current) => {
                  let resultUser = messagesFirestore[
                    currentIndex + 1
                  ].seen.find((e) => {
                    return e == current;
                  });
                  let newUser = current;
                  if (resultUser) {
                    newUser = null;
                  }
                  return (resultArray = [...resultArray, newUser]);
                },
                []
              );
              newMessage = {
                ...newMessage,
                seen: resultSeen,
              };
            }
          } */
        return (resultArray = [...resultArray, newMessage])
      }, [])
      setMessagesRemaining(messagesFilted)
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }

  React.useEffect(() => {
    getMessages()
  }, [messages, roomSelected])

  const render = messagesRemaining.map((message) => {
    return (
      <Message
        type={message.type}
        key={message.id}
        photoURL={message.photoURL}
        username={message.displayName}
        message={message.text}
        createdAt={message.createdAt}
        side={message.uid == user.uid ? "right" : "left"}
        // seen={message.seen}
      />
    )
  })

  return (
    <FeedContainer className="feed_container">
      <FancyBox>
        <Wrapper>
          {pending ? (
            <>
              <MessageLoading side="right" height={30} width={400} hidden />
              <MessageLoading side="right" height={30} width={200} />
              <MessageLoading side="left" height={50} width={600} hidden />
              <MessageLoading side="left" height={30} width={400} hidden />
              <MessageLoading side="left" height={30} width={200} />
              <MessageLoading side="right" height={50} width={600} hidden />
              <MessageLoading side="right" height={30} width={400} hidden />
              <MessageLoading side="right" height={30} width={200} />
              <MessageLoading side="left" height={60} width={400} hidden />
              <MessageLoading side="left" height={50} />
              <MessageLoading side="right" height={30} width={400} hidden />
              <MessageLoading side="right" height={30} hidden />
              <MessageLoading side="right" height={30} />
              <MessageLoading side="left" height={50} width={300} hidden />
              <MessageLoading side="left" height={30} width={400} />
            </>
          ) : (
            render
          )}
          <DivBottom ref={bottomRef} />
        </Wrapper>
      </FancyBox>
    </FeedContainer>
  )
}

export default React.memo(WindowsFeed)
