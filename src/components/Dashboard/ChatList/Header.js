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

const ButtonStyled = styled(Button)`
  min-width: 40px !important;
  transition: all 0.3s ease;
  &:hover{
    background #4eac6d !important;
    svg{
      fill: white;
    }
  }
`;

const AddIconStyled = styled(AddIcon)`
  color: #4eac6d;
`;

const TextFieldStyled = styled(TextField)`
  .MuiOutlinedInput-root {
    color: currentColor;
    &::placeholder {
      color: currentColor;
      font-weight: 600;
    }
  }
  border-radius: 4px;
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
  const viewBody = useSelector((state) => state.data.viewBody);
  const theme = useSelector((state) => state.auth.theme);
  const search = useSelector((state) => state.data.search);
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
        <h3 style={{ fontSize: "20px", color: theme ? "black" : "#adb5bd" }}>
          🔥 Chats
        </h3>
        {viewBody && (
          <Tooltip title="Add Room">
            <ButtonStyled
              onClick={handleOpenModalAdd}
              sx={{
                background: theme
                  ? "#edf7f0 !important"
                  : "rgba(78,172,109,.1) !important",
              }}
            >
              <AddIconStyled sx={{ width: 20, height: 20 }} />
            </ButtonStyled>
          </Tooltip>
        )}
      </Wrapper>
      <TextFieldStyled
        value={search}
        fullWidth
        placeholder="Search here..."
        size="small"
        onChange={(e) => handleInput(e)}
        sx={{
          background: theme ? "#edf7f0" : "#2e2e2e",
          color: theme ? "#777777 !important" : "silver !important",
        }}
      />
    </ListHeaderWrapper>
  );
};

export default ListHeader;
