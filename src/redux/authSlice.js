import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  login: false,
  user: null,
  register: null,
  pending: false,
  addRoom: false,
  addUser: false,
  chatWindows: true,
  theme: true,
  mobile: false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterInfo: (state, action) => {
      state.register = action.payload
    },
    setPendingEnd: (state) => {
      state.pending = false
    },
    setMobile: (state, action) => {
      state.mobile = action.payload
    },
    setTheme: (state) => {
      state.theme = !state.theme
    },
    setStateModalAddRoom: (state, action) => {
      state.addRoom = action.payload
    },
    setStateModalAddUser: (state, action) => {
      state.addUser = action.payload
    },
    setStateChatWindows: (state, action) => {
      state.chatWindows = action.payload
    },
    signInStart: (state) => {
      state.pending = true
    },
    signInSuccess: (state, action) => {
      state.login = true
      state.pending = false
      state.user = action.payload
    },
    getUserProfile: (state, action) => {
      state.user = action.payload
    },
    signInFailed: (state) => {
      state.login = false
      state.pending = false
      state.user = null
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setMobile,
  setTheme,
  setPendingEnd,
  setStateModalAddRoom,
  setStateModalAddUser,
  setStateChatWindows,
  signInStart,
  signInSuccess,
  getUserProfile,
  signInFailed,
  setRegisterInfo
} = authSlice.actions

export default authSlice.reducer
