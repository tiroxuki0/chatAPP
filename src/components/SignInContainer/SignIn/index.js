import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  normalSignIn,
  facebookSignIn,
  googleSignIn,
} from "../../../redux/authRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../assets/imgs";
import { updateUserStatus } from "../../../firebase/services";

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

const LinkStyled = styled(Link)`
  color: #4eac6d;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: silver;
  }
`;

export default React.memo(function SignIn({ toastNoti }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { email, password };
    const res = await normalSignIn(dispatch, navigate, user);
    if (res.code === 0) {
      toastNoti(res);
    } else {
      updateUserStatus();
    }
  };

  const handleFBSignIn = async () => {
    await facebookSignIn(dispatch, navigate);
  };
  const handleGGSignIn = async () => {
    await googleSignIn(dispatch, navigate);
    updateUserStatus();
  };

  return (
    <Box
      sx={{
        my: 6,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={signIn}
        style={{ width: "55px", height: "55px" }}
        alt="sign-in logo"
      />
      <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
        Welcome Back !
      </Typography>
      <p style={{ color: "rgb(182 182 182)", margin: "10px 0px 20px 0px" }}>
        Sign in to continue to chat.
      </p>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={"10px"}>
          <Grid item xs={12}>
            <TextValidator
              fullWidth
              defaultValue={"abc@gmail.com"}
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validators={["required", "isEmail", "minStringLength:10"]}
              errorMessages={[
                "Please enter your email",
                "Email is not valid!",
                "Email must be at least 10 characters long",
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              validators={["required"]}
              errorMessages={["Please enter your password"]}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ fontWeight: 600, background: "#4eac6d", color: "white" }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography component="p" variant="p" sx={{ mt: 1, mb: 1 }}>
              Sign in with :
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ pt: "0px !important" }}>
            <Button onClick={handleGGSignIn} sx={{ minWidth: 30 }}>
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                style={{ width: "35px", height: "35px" }}
                alt="google icon"
              />
            </Button>
            <Button onClick={handleFBSignIn} sx={{ minWidth: 30 }}>
              <img
                src="https://img.icons8.com/color/48/000000/facebook-new.png"
                style={{ width: "35px", height: "35px" }}
                alt="facebook icon"
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            {"Don't have an account? "}
            <LinkStyled to="/auth/sign-up" variant="body2">
              Sign Up
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
  );
});
