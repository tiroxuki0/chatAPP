import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import useWindowSize from "../../hooks/useWindowSize";
import { useParams } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f2eee9",
    },
  },
});

export default function SignInContainer() {
  const windowSize = useWindowSize();
  let { path } = useParams();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const toastNoti = (data) => {
    if (data.code == 0) {
      toast.error(data.message, toastOptions);
    } else {
      toast.success(data.message, toastOptions);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundColor: "#4eac6d",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={false}
          sm={false}
          md={4}
          component={Paper}
          square
          sx={{
            height: "95vh",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "5px 0px 0px 5px",
          }}
        ></Grid>
        <Grid
          item
          xs={11}
          sm={6}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{
            height: "95vh",
            background: "#000000c2",
            backdropFilter: "blur(10px)",
            borderRadius: windowSize.width <= 900 ? "5px" : "0px 5px 5px 0px",
          }}
        >
          {path === "sign-in" ? (
            <SignIn toastNoti={toastNoti} />
          ) : (
            <SignUp toastNoti={toastNoti} />
          )}
        </Grid>
        <ToastContainer />
      </Grid>
    </ThemeProvider>
  );
}
