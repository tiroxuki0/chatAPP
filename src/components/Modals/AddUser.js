import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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

export default function ModalAddUser() {
  const addUser = useSelector((state) => state.auth.addUser);
  const [username, setUserName] = React.useState("");
  const { modalAddUser } = useModal();

  const onClickBackdrop = (e) => {
    if ([...e.target.classList].includes("MuiBackdrop-root")) {
      modalAddUser(false);
    }
  };

  const handleClose = () => {
    modalAddUser(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    modalAddUser(false);
    console.log(username);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={addUser}
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
            <PersonAddIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, color: "black" }}
          >
            Add user to this room
          </Typography>
          <ValidatorForm onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextValidator
              margin="normal"
              fullWidth
              id="username"
              label="User name"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUserName(e.target.value)}
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
                Add
              </Button>
            </Buttons>
          </ValidatorForm>
        </ModalAddWrapper>
      </Backdrop>
    </div>
  );
}
