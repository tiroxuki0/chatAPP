import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Box from "@mui/material/Box";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Grid from "@mui/material/Grid";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import styled from "styled-components";
import { addDocument } from "../../firebase/services";
import { useDispatch } from "react-redux";

const ModalAddWrapper = styled(Box)`
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
`;

const TextValidatorStyled = styled(TextValidator)`
  & > div {
    color: currentColor;
    & > fieldset {
      border-color: currentColor;
    }
  }
  label {
    color: currentColor;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  button:hover {
    background: rgb(46, 46, 46);
    color: white;
  }
`;

const PickerWrapper = styled.div`
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  transform: translate(5%, -25%);
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;
  em-emoji-picker {
    height: 230px;
    min-height: 230px;
  }
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

export default function ModalAddRoom() {
  const addRoom = useSelector((state) => state.auth.addRoom);
  const user = useSelector((state) => state.auth.user);
  const rooms = useSelector((state) => state.data.rooms);
  const theme = useSelector((state) => state.auth.theme);
  const btnPickerRef = React.useRef(null);
  const pickerRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const desRef = React.useRef(null);
  const [error, setError] = React.useState(null);
  const [name, setName] = React.useState("");
  const [des, setDes] = React.useState("");
  const { modalAddRoom } = useModal();

  const handleEmojiSelect = (emoji) => {
    setName((prev) => prev + emoji.native);
  };

  const onClickBackdrop = (e) => {
    if ([...e.target.classList].includes("MuiBackdrop-root")) {
      modalAddRoom(false);
      setName("");
      setDes("");
    }
  };

  const handleClose = () => {
    modalAddRoom(false);
    setName("");
    setDes("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const roomFound = rooms.find((room) => {
      return room.roomName === name;
    });
    if (roomFound) {
      setError(true);
    } else {
      modalAddRoom(false);
      setName("");
      setDes("");
      setError(false);
      const result = await addDocument("rooms", {
        roomName: name.trim(),
        roomDes: des.trim(),
        members: [user.uid],
        private: false,
      });
      addDocument("messages", {
        type: "text",
        text: `Welcome to ${name.trim()}`,
        uid: null,
        displayName: null,
        photoURL: "hidden",
        roomId: result.docId,
        seen: [],
      });
    }
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
  }, []);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={addRoom}
        onClick={onClickBackdrop}
      >
        <ModalAddWrapper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: theme ? "white" : "#262626",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#4eac6d" }}>
            <AddCommentIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, color: theme ? "black" : "#a7a9b3" }}
          >
            Create new group
          </Typography>
          <ValidatorForm onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container>
              <Grid item xs={12} sx={{ position: "relative" }}>
                <TextValidatorStyled
                  ref={nameRef}
                  margin="normal"
                  fullWidth
                  id="roomName"
                  label="Group name"
                  name="roomName"
                  autoComplete="roomName"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  validators={["required"]}
                  errorMessages={["Please enter room name"]}
                  style={{
                    color: theme ? "#737373" : "#636464",
                  }}
                />
                <Button
                  ref={btnPickerRef}
                  sx={{
                    mt: 0,
                    mb: 0,
                    mr: 0,
                    color: theme ? "white" : "black",
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translate(10%,-40%)",
                  }}
                >
                  <SentimentSatisfiedAltIcon
                    sx={{ color: "#797c8c", width: 25, height: 25 }}
                  />
                </Button>
                <PickerWrapper ref={pickerRef}>
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    perLine={10}
                    previewPosition="none"
                    maxFrequentRows={1}
                    emojiSize={16}
                    emojiButtonSize={22}
                    theme={theme ? "light" : "dark"}
                  />
                </PickerWrapper>
              </Grid>
              <Grid item xs={12}>
                <TextValidatorStyled
                  ref={desRef}
                  margin="normal"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  fullWidth
                  name="roomDes"
                  label="Group Description"
                  type="text"
                  id="roomDes"
                  autoComplete="roomDes"
                  validators={["required"]}
                  errorMessages={["Please enter room description"]}
                  style={{
                    color: theme ? "#737373" : "#636464",
                  }}
                />
              </Grid>
            </Grid>
            <Buttons>
              {error && (
                <p style={{ color: "#d32f2f", margin: "24px 8px 16px 0" }}>
                  Room name already exist!
                </p>
              )}
              <Button
                type="button"
                variant="contained"
                sx={{
                  bgcolor: "#4eac6d",
                  mt: 3,
                  mb: 2,
                  mr: 1,
                  color: theme ? "white" : "black",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#4eac6d",
                  mt: 3,
                  mb: 2,
                  color: theme ? "white" : "black",
                }}
              >
                Create
              </Button>
            </Buttons>
          </ValidatorForm>
        </ModalAddWrapper>
      </Backdrop>
    </div>
  );
}
