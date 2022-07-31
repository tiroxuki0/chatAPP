import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  color: #f2eee9;
  text-decoration: none;
`;

export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      username,
      email,
      password,
    };
    console.log(user);
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Sign up
      </Typography>
      <ValidatorForm onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextValidator
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              validators={["required"]}
              errorMessages={["This field is required"]}
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
              validators={["required", "isEmail"]}
              errorMessages={["This field is required", "Email is not valid"]}
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
              autoComplete="password"
              validators={["required"]}
              errorMessages={["This field is required"]}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <LinkStyled to="/auth/sign-in" variant="body2">
              Already have an account? Sign in
            </LinkStyled>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Box>
  );
}
