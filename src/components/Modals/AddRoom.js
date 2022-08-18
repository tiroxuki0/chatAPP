import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Box from "@mui/material/Box";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import styled from "styled-components";

const ModalAddWrapper = styled(Box)`
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default function ModalAddRoom() {
  const addRoom = useSelector((state) => state.auth.addRoom);
  const [name, setName] = React.useState("");
  const [des, setDes] = React.useState("");
  const { modalAddRoom } = useModal();

  const onClickBackdrop = (e) => {
    if ([...e.target.classList].includes("MuiBackdrop-root")) {
      modalAddRoom(false);
    }
  };

  const handleClose = () => {
    modalAddRoom(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const room = { name, des };
    modalAddRoom(false);
    console.log(room);
  };

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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#4eac6d" }}>
            <AddCommentIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, color: "black" }}
          >
            Create new room
          </Typography>
          <ValidatorForm onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextValidator
              margin="normal"
              fullWidth
              id="roomName"
              label="Room name"
              name="roomName"
              autoComplete="roomName"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              validators={["required"]}
              errorMessages={["This field is required"]}
            />
            <TextValidator
              margin="normal"
              value={des}
              onChange={(e) => setDes(e.target.value)}
              fullWidth
              name="roomDes"
              label="Room Description"
              type="text"
              id="roomDes"
              autoComplete="roomDes"
              validators={["required"]}
              errorMessages={["This field is required"]}
            />
            <Buttons>
              <Button
                type="button"
                variant="contained"
                sx={{ bgcolor: "#4eac6d", mt: 3, mb: 2, mr: 1 }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#4eac6d", mt: 3, mb: 2 }}
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
