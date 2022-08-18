import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  user: null,
  pending: false,
  addRoom: false,
  addUser: false,
  chatWindows: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStateModalAddRoom: (state, action) => {
      state.addRoom = action.payload;
    },
    setStateModalAddUser: (state, action) => {
      state.addUser = action.payload;
    },
    setStateChatWindows: (state, action) => {
      state.chatWindows = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStateModalAddRoom,
  setStateModalAddUser,
  setStateChatWindows,
} = authSlice.actions;

export default authSlice.reducer;
