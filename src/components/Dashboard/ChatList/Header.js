import * as React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import useModal from "../../../hooks/useModal";
import { useSelector, useDispatch } from "react-redux";
import { setStateSearch } from "../../../redux/dataSlice";

const ListHeaderWrapper = styled.div`
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddIconStyled = styled(AddIcon)`
  color: #4eac6d;
`;

const ButtonStyled = styled(Button)`
  background: #edf7f0 !important;
  min-width: 50px !important;
`;

const TextFieldStyled = styled(TextField)`
  input::placeholder {
    font-weight: 600;
  }
  border-radius: 4px;
  background: #edf7f0;
  .MuiFilledInput-root:before,
  .MuiFilledInput-root:after {
    display: none !important;
  }
  fieldset {
    outline: none !important;
    border: none;
  }
`;

const ListHeader = () => {
  const rooms = useSelector((state) => state.data.rooms);
  const dispatch = useDispatch();
  const { modalAddRoom } = useModal();

  const handleOpenModalAdd = () => {
    modalAddRoom(true);
  };

  const handleInput = (e) => {
    dispatch(setStateSearch(e.target.value));
  };

  return (
    <ListHeaderWrapper>
      <Wrapper>
        <h3 style={{ fontSize: "20px" }}>🔥 Chats</h3>
        <Tooltip title="Add rooms">
          <ButtonStyled onClick={handleOpenModalAdd}>
            <AddIconStyled />
          </ButtonStyled>
        </Tooltip>
      </Wrapper>
      <TextFieldStyled
        fullWidth
        placeholder="Search here..."
        size="small"
        onChange={(e) => handleInput(e)}
      />
    </ListHeaderWrapper>
  );
};

export default ListHeader;
