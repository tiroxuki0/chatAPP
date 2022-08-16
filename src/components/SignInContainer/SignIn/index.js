import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  color: #f2eee9;
  text-decoration: none;
`;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a
        style={{ color: "white", textDecoration: "none" }}
        href="https://mui.com/"
      >
        Tiroxuki
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { username, password };
    console.log(user);
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <ExitToAppIcon />
      </Avatar>
      <Typography
        component="h1"
        variant="h5"
        sx={{ mt: 1, mb: 3, textTransform: "uppercase" }}
      >
        Sign in
      </Typography>
      <ValidatorForm onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextValidator
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          validators={["required"]}
          errorMessages={["This field is required"]}
        />
        <TextValidator
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          validators={["required"]}
          errorMessages={["This field is required"]}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs={12}>
            <LinkStyled to="/auth/sign-up" variant="body2">
              Forgot password?
            </LinkStyled>
          </Grid>
          <Grid item xs={12}>
            <LinkStyled to="/auth/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </LinkStyled>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </ValidatorForm>
    </Box>
  );
}
