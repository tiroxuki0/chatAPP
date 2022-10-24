import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

export default function SimpleBackdrop() {
  const pending = useSelector((state) => state.auth.pending);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
