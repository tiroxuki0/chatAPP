import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  height: auto;
  background: #ededed;
  padding: 15px;
  border-radius: 0px 0px 6px 6px;
  border-top: 1px solid #d5d5d5;
  @media only screen and (max-width: 400px) {
    padding: 5px;
  }
`;

const ContainerInput = styled(Container)`
  height: 100%;
  position: relative;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  gap: 5px;
`;

const TextFieldStyled = styled(TextField)`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  background: transparent;
  color: #797c8c;
  .MuiOutlinedInput-root {
    padding: 10px;
    textarea {
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
      }
    }
    fieldset {
      border: none;
    }
  }
`;
const PickerWrapper = styled.div`
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  transform: translate(4%, -100%);
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;
  &.enable {
    visibility: visible;
    opacity: 1;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(100%);
    width: 100%;
    height: 15px;
    background: transparent;
  }
`;

const WindowsInput = () => {
  const btnPickerRef = React.useRef(null);
  const pickerRef = React.useRef(null);
  const [message, setMessage] = React.useState("");

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  React.useEffect(() => {
    btnPickerRef.current.addEventListener("mouseover", () => {
      pickerRef.current.classList.add("enable");
    });
    pickerRef.current.addEventListener("mouseover", (e) => {
      e.currentTarget.classList.add("enable");
    });

    btnPickerRef.current.addEventListener("mouseleave", () => {
      pickerRef.current.classList.remove("enable");
    });

    pickerRef.current.addEventListener("mouseleave", (e) => {
      e.currentTarget.classList.remove("enable");
    });

    return () => {
      btnPickerRef.current.removeEventListener("mouseover", () => {
        pickerRef.current.classList.add("enable");
      });
      pickerRef.current.removeEventListener("mouseover", (e) => {
        e.currentTarget.classList.add("enable");
      });

      btnPickerRef.current.removeEventListener("mouseleave", () => {
        pickerRef.current.classList.remove("enable");
      });

      pickerRef.current.removeEventListener("mouseleave", (e) => {
        e.currentTarget.classList.remove("enable");
      });
    };
  }, []);

  return (
    <Wrapper>
      <ContainerInput disableGutters>
        <TextFieldStyled
          id="message_text"
          multiline
          fullWidth
          maxRows={4}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button ref={btnPickerRef} sx={{ minWidth: 20 }}>
          <SentimentSatisfiedAltIcon
            sx={{ color: "#797c8c", width: 25, height: 25 }}
          />
        </Button>
        <PickerWrapper ref={pickerRef}>
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            perLine={7}
            previewPosition="none"
            maxFrequentRows={1}
            emojiSize={22}
            emojiButtonSize={32}
          />
        </PickerWrapper>
        <Button sx={{ minWidth: 20 }}>
          <SendIcon sx={{ color: "#797c8c", width: 25, height: 25 }} />
        </Button>
      </ContainerInput>
    </Wrapper>
  );
};

export default WindowsInput;
