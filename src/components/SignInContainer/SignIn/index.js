import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
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
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mt: 1, mb: 3 }}>
        SIGN IN
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <FacebookLoginButton />
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <GoogleLoginButton />
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
