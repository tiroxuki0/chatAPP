import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersDisplay: [],
  users: [],
  rooms: [],
  search: "",
  messages: [],
  roomSelected: null,
  pending: false,
  viewBody: false,
  viewChatList: true,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsersDisplay: (state, action) => {
      state.usersDisplay = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    /* GET DATA STATE */
    getDataStart: (state) => {
      state.pending = true;
    },
    getDataSuccess: (state) => {
      state.pending = false;
    },
    /* SEARCH STATE */
    setStateSearch: (state, action) => {
      state.search = action.payload;
    },
    /* SET DATA ACTION */
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setRoomSelected: (state, action) => {
      state.roomSelected = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setViewBody: (state, action) => {
      state.viewBody = action.payload;
    },
    setViewChatList: (state, action) => {
      state.viewChatList = action.payload;
    },
    /* CLEAR DATA */
    clearData: (state) => {
      state.users = [];
      state.rooms = [];
      state.search = "";
      state.roomSelected = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUsersDisplay,
  setMessages,
  setStateSearch,
  setRooms,
  setRoomSelected,
  setUsers,
  clearData,
  updateMember,
  getDataStart,
  getDataSuccess,
  setViewBody,
  setViewChatList,
} = dataSlice.actions;

export default dataSlice.reducer;
