import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRegisterInfo } from "../../../redux/authSlice";
import { checkExist } from "../../../firebase/services";
import { signUp } from "../../../assets/imgs";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  color: #4eac6d;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: silver;
  }
`;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      {new Date().getFullYear()}
      {" Crafted with 🔥 by Minh Huy."}
    </Typography>
  );
}

export default React.memo(function SignUp({ toastNoti }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    if (value !== password) {
      return false;
    }
    return true;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      displayName,
      email,
      password,
      background:
        "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    };
    const mailCheck = await checkExist("users", {
      field: "email",
      operator: "==",
      value: email,
    });
    if (mailCheck.code == 1) {
      dispatch(setRegisterInfo(user));
      navigate("/set-avatar");
    } else {
      toastNoti(mailCheck);
    }
  };

  return (
    <>
      <Box
        sx={{
          my: 6,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={signUp} style={{ width: "55px", height: "55px" }} />
        <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
          Create An Account
        </Typography>
        <p style={{ color: "rgb(182 182 182)", margin: "10px 0px 20px 0px" }}>
          Get your free account now.
        </p>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={"10px"}>
            <Grid item xs={12}>
              <TextValidator
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                fullWidth
                autoFocus
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete="displayName"
                validators={["required", "minStringLength:8"]}
                errorMessages={[
                  "Please enter display name",
                  "Display name must be at least 10 characters long",
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                name="email"
                id="email"
                fullWidth
                autoComplete="email"
                validators={["required", "isEmail", "minStringLength:18"]}
                errorMessages={[
                  "Please enter email",
                  "Email is not valid!",
                  "Email must be at least 8 characters long",
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                name="password"
                id="password"
                type="password"
                fullWidth
                validators={["required", "minStringLength:8"]}
                errorMessages={[
                  "Please enter password",
                  "Password must be at least 8 characters long",
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm password"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                fullWidth
                validators={["isPasswordMatch", "required"]}
                errorMessages={[
                  "Password mismatch",
                  "Please enter confirm password",
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  fontWeight: 600,
                  background: "#4eac6d",
                  color: "white",
                }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              {"Already have an account? "}
              <LinkStyled to="/auth/sign-in" variant="body2">
                Sign in
              </LinkStyled>
            </Grid>
          </Grid>
          <Copyright
            sx={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              maxWidth: "90%",
              width: "100%",
            }}
          />
        </ValidatorForm>
      </Box>
    </>
  );
});
