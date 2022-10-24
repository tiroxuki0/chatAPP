import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useSelector, useDispatch } from "react-redux";
import useModal from "../../hooks/useModal";
import styled from "styled-components";
import { updateMemberInRoom, getAllDocs } from "../../firebase/services";
import { setRoomSelected } from "../../redux/dataSlice";

const FormControlStyled = styled(FormControl)`
  .MuiInputBase-root {
    color: currentColor;
    & > svg {
      color: currentColor;
      fill: currentColor;
    }
  }
  .MuiChip-root {
    background-color: #969696;
  }
  fieldset {
    border-color: currentColor !important;
  }
  label {
    color: currentColor;
  }
`;

const MenuItemStyled = styled(MenuItem)`
  .MuiAvatar-root {
    position: relative;
    z-index: 9;
  }
  p {
    position: relative;
    z-index: 9;
  }
  .MuiTouchRipple-root {
    z-index: 10;
  }
`;

const ModalAddWrapper = styled(Box)`
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  button:hover {
    background: rgb(46, 46, 46);
    color: white;
  }
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ModalAddUser() {
  const dispatch = useDispatch();
  const addUser = useSelector((state) => state.auth.addUser);
  const [uidSelected, setUidSelected] = React.useState("");
  const [usersRemaining, setUsersRemaining] = React.useState([]);
  const users = useSelector((state) => state.data.users);
  const theme = useSelector((state) => state.auth.theme);
  const roomSelected = useSelector((state) => state.data.roomSelected);
  const members = useSelector((state) => state.data?.roomSelected?.members);
  const { modalAddUser } = useModal();

  /*  */
  const [personName, setPersonName] = React.useState([]);

  const handleSelected = (e) => {
    const uid = e.target.attributes.uid.value;
    if (!e.target.selected) {
      setUidSelected((prev) => [...prev, uid]);
    } else {
      setUidSelected((prev) => prev.filter((e) => e !== uid));
    }
    /* setUidSelected((prev) => {
      if (prev.includes(uid)) {
        return prev.filter((e) => {
          return e !== uid;
        });
      }
      return [...prev, uid];
    }); */
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onClickBackdrop = (e) => {
    if ([...e.target.classList].includes("backdrop")) {
      modalAddUser(false);
      setPersonName([]);
    }
  };

  const handleClose = () => {
    modalAddUser(false);
    setPersonName([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uidSelected) {
      modalAddUser(false);
      await updateMemberInRoom(
        "rooms",
        [...uidSelected, ...roomSelected.members],
        roomSelected.id
      );
      const rooms = await getAllDocs("rooms");
      const roomSelectedUpdate = await rooms.filter(
        (room) => room.id == roomSelected.id
      );
      dispatch(setRoomSelected(roomSelectedUpdate[0]));
      setPersonName([]);
    }
  };

  React.useEffect(() => {
    if (members) {
      const usersRemainingResult = users.filter((user) => {
        return members.includes(user.uid) == false;
      });
      setUsersRemaining(usersRemainingResult);
    }
  }, [users, members]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={addUser}
        onClick={onClickBackdrop}
        className="backdrop"
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
            <PersonAddIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, color: theme ? "black" : "#a7a9b3" }}
          >
            Add user to this room
          </Typography>
          <FormControlStyled
            sx={{
              width: "100%",
              color: theme ? "black" : "rgb(99, 100, 100)",
              borderColor: theme ? "black" : "rgb(99, 100, 100)",
            }}
          >
            <InputLabel id="multiple-chip-label">Select users</InputLabel>
            <Select
              labelId="multiple-chip-label"
              id="multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Select users" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {usersRemaining.length === 0 ? (
                <p style={{ textAlign: "center" }}>No user available</p>
              ) : (
                usersRemaining.map((u) => (
                  <MenuItemStyled
                    key={u.uid}
                    value={u.displayName}
                    uid={u.uid}
                    onClick={handleSelected}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Avatar
                      alt={u.displayName}
                      src={u.photoURL}
                      sx={{ width: 35, height: 35 }}
                    />
                    {u.displayName}
                  </MenuItemStyled>
                ))
              )}
            </Select>
          </FormControlStyled>
          <Buttons>
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
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Buttons>
        </ModalAddWrapper>
      </Backdrop>
    </div>
  );
}
