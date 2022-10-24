import * as React from "react";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ToastContainer, toast } from "react-toastify";
import styledd from "styled-components";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { checkExist, updateDocument } from "../../../firebase/services";
import { signInSuccess } from "../../../redux/authSlice";

const BoxStyled = styledd(Box)`
  overflow: hidden auto;
  margin-top: 80px;
  position: relative;
`;

const HeaderInfo = styledd.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ButtonStyled = styledd(Button)`
  min-width: 30px !important;
  transition: all 0.3s ease;
  padding: 7px;
  &:hover{
    background #4eac6d !important;
    svg{
      fill: white;
    }
  }
`;

const ItemInfo = styledd.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const LeftInfo = styledd.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  div{
    width: 100%;
  }
`;

const TextValidatorStyled = styledd(TextValidator)`
width: 100%;
  input{
    width: 100%;
    padding: 5px 5px 5px 0px;
  }
  fieldset{
    border-color: transparent !important;
  }
`;

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

function CustomizedList() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = React.useState(user.displayName);
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState(user.password);
  const [isName, setIsName] = React.useState(true);
  const [isEmail, setIsEmail] = React.useState(true);
  const [isPassword, setIsPassword] = React.useState(true);
  const [isEdit, setIsEdit] = React.useState(false);

  ValidatorForm.addValidationRule("isEmailExist", async (email) => {
    const mailCheck = await checkExist("users", {
      field: "email",
      operator: "==",
      value: email,
    });
    if (mailCheck.code == 0 && mailCheck.data.id !== user.id) {
      return false;
    }
    return true;
  });

  const toastOptions = {
    position: "bottom-left",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSaveEdit = async () => {
    setIsEdit(false);
    setIsName(true);
    setIsEmail(true);
    setIsPassword(true);
    console.log({ displayName: name, email, password });
    const { id, ...remaining } = user;
    if (
      name !== user.displayName ||
      email !== user.email ||
      password !== user.password
    ) {
      dispatch(signInSuccess({ ...user, displayName: name, email, password }));
      const res = await updateDocument(
        "users",
        {
          ...remaining,
          displayName: name,
          email,
          password,
        },
        user.id
      );
      if (res.code == 0) {
        toast.error("Update failed", toastOptions);
      } else {
        toast.success("Update success", toastOptions);
      }
    }
  };

  const handleChangeName = () => {
    setIsName(false);
    setIsEdit(true);
  };
  const handleChangeEMail = () => {
    setIsEdit(true);
    setIsEmail(false);
  };
  const handleChangePassword = () => {
    setIsEdit(true);
    setIsPassword(false);
  };

  return (
    <BoxStyled>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: theme ? "light" : "dark",
            background: { paper: theme ? "white" : "dark" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: "100%" }}>
          <FireNav component="nav" disablePadding>
            <ValidatorForm
              sx={{
                maxWidth: "100%",
              }}
              onSubmit={handleSaveEdit}
            >
              <HeaderInfo>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    my: 0,
                    px: 0,
                    pt: 0,
                    textAlign: "left",
                    fontSize: 15,
                    fontWeight: "700",
                    lineHeight: "20px",
                    color: "rgba(255, 255, 255, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    gap: "10px",
                  }}
                >
                  <PersonIcon
                    sx={{
                      width: 16,
                      height: 16,
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  />
                  Personal Info
                </Typography>
                {isEdit && (
                  <Tooltip title="Save Info" placement="right">
                    <ButtonStyled
                      type="submit"
                      sx={{
                        background: theme
                          ? "#edf7f0 !important"
                          : "rgba(78,172,109,.1) !important",
                        minWidth: "40px !important",
                      }}
                    >
                      <CheckIcon
                        sx={{ width: 16, height: 16, color: "#4eac6d" }}
                      />
                    </ButtonStyled>
                  </Tooltip>
                )}
              </HeaderInfo>
              <List
                sx={{ bgcolor: "background.paper", "& ul": { padding: 0 } }}
                subheader={<li />}
              >
                <ItemInfo>
                  <LeftInfo>
                    <h5
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        color: theme ? "#797c8c" : "#adb5bd",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      Name
                    </h5>
                    <TextValidatorStyled
                      disabled={isName}
                      fullWidth
                      validators={["required", "minStringLength:8"]}
                      errorMessages={[
                        "Please enter name",
                        "Display name must be at least 8 characters long",
                      ]}
                      sx={{
                        margin: 0,
                        fontSize: "20px",
                        color: theme ? "#495057" : "#adb5bd",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </LeftInfo>
                  <Tooltip title="Edit Name" placement="right">
                    <ButtonStyled
                      disabled={user.providerId == "firebase" ? false : true}
                      onClick={handleChangeName}
                      sx={{
                        background: theme
                          ? "#edf7f0 !important"
                          : "rgba(78,172,109,.1) !important",
                      }}
                    >
                      {user.providerId == "firebase" ? (
                        <EditIcon
                          sx={{ width: 16, height: 16, color: "#4eac6d" }}
                        />
                      ) : (
                        <LockIcon
                          sx={{ width: 16, height: 16, color: "#495057" }}
                        />
                      )}
                    </ButtonStyled>
                  </Tooltip>
                </ItemInfo>
                <ItemInfo>
                  <LeftInfo>
                    <h5
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        color: theme ? "#797c8c" : "#adb5bd",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      Email
                    </h5>
                    <TextValidatorStyled
                      disabled={isEmail}
                      fullWidth
                      autoComplete="email"
                      validators={[
                        "required",
                        "isEmail",
                        "minStringLength:18",
                        "isEmailExist",
                      ]}
                      errorMessages={[
                        "Please enter email",
                        "Email is not valid!",
                        "Email must be at least 8 characters long",
                        "Email is already exist",
                      ]}
                      sx={{
                        margin: 0,
                        fontSize: "20px",
                        color: theme ? "#495057" : "#adb5bd",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </LeftInfo>
                  <Tooltip title="Edit Email" placement="right">
                    <ButtonStyled
                      disabled={user.providerId == "firebase" ? false : true}
                      onClick={handleChangeEMail}
                      sx={{
                        background: theme
                          ? "#edf7f0 !important"
                          : "rgba(78,172,109,.1) !important",
                      }}
                    >
                      {user.providerId == "firebase" ? (
                        <EditIcon
                          sx={{ width: 16, height: 16, color: "#4eac6d" }}
                        />
                      ) : (
                        <LockIcon
                          sx={{ width: 16, height: 16, color: "#495057" }}
                        />
                      )}
                    </ButtonStyled>
                  </Tooltip>
                </ItemInfo>
                <ItemInfo>
                  <LeftInfo>
                    <h5
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        color: theme ? "#797c8c" : "#adb5bd",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      Password
                    </h5>
                    <TextValidatorStyled
                      disabled={isPassword}
                      type={isPassword ? "password" : "text"}
                      fullWidth
                      validators={["required", "minStringLength:8"]}
                      errorMessages={[
                        "Please enter password",
                        "Password must be at least 8 characters long",
                      ]}
                      sx={{
                        margin: 0,
                        fontSize: "20px",
                        color: theme ? "#495057" : "#adb5bd",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </LeftInfo>
                  <Tooltip title="Edit Password" placement="right">
                    <ButtonStyled
                      disabled={user.providerId == "firebase" ? false : true}
                      onClick={handleChangePassword}
                      sx={{
                        background: theme
                          ? "#edf7f0 !important"
                          : "rgba(78,172,109,.1) !important",
                      }}
                    >
                      {user.providerId == "firebase" ? (
                        <EditIcon
                          sx={{ width: 16, height: 16, color: "#4eac6d" }}
                        />
                      ) : (
                        <LockIcon
                          sx={{ width: 16, height: 16, color: "#495057" }}
                        />
                      )}
                    </ButtonStyled>
                  </Tooltip>
                </ItemInfo>
              </List>
            </ValidatorForm>
            <ToastContainer />
          </FireNav>
        </Paper>
      </ThemeProvider>
    </BoxStyled>
  );
}

export default React.memo(CustomizedList);
