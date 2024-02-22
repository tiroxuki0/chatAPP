import "./App.css"
import React from "react"
import Dashboard from "./components/Dashboard"
import Error from "./Error"
import SignInContainer from "./components/SignInContainer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddRoomModal from "./components/Modals/AddRoom"
import AddUserModal from "./components/Modals/AddUser"
import useWindowSize from "./hooks/useWindowSize"
import styled from "styled-components"
import Load from "./components/Effects/Load"
import SetAvatar from "./components/SignInContainer/SetAvatar"
import RequiredAuth from "./components/RequiredAuth"
import { useDispatch, useSelector } from "react-redux"
import { setStateChatWindows, setMobile } from "./redux/authSlice"
import { setStatus } from "./redux/dataSlice"
import { onValue, ref } from "firebase/database"
import { rtdb } from "./firebase/config"
import jwtDefaultConfig from "./@core/auth/jwt/jwtDefaultConfig"
import socketService from "./socket/config"
import { BASE_CONSTANTS } from "./constants/base-constant"
import * as authActions from "./redux/authSlice"

const AlertNotSupported = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    font-weight: 600;
  }
`

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const token = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)
  const windowSize = useWindowSize()

  React.useEffect(() => {
    if (windowSize.width >= 900) {
      dispatch(setStateChatWindows(false))
      dispatch(setMobile(false))
    } else {
      dispatch(setMobile(true))
    }
  }, [windowSize])

  const connectFCM = async () => {
    await socketService.connect(BASE_CONSTANTS.BASE_WS, token, "")
  }

  const getStatus = () => {
    const statusRef = ref(rtdb, "status")
    onValue(statusRef, (snapshot) => {
      const data = snapshot.val()
      const array = data
        ? Object.keys(data).map((key) => {
            return { ...data[key], uid: key }
          })
        : []
      dispatch(setStatus(array))
    })
  }

  React.useEffect(() => {
    getStatus()
    if (token) {
      connectFCM()
    }
  }, [token, user])

  React.useEffect(() => {
    if (socketService?.socket) {
      socketService?.socket?.on("DISCONNECT_SSC", (data) => {
        window.location.href = "/auth/sign-in"
        dispatch(authActions?.signInFailed())
        localStorage.removeItem(jwtDefaultConfig.storageUserData)
        localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
        localStorage.removeItem(jwtDefaultConfig.storageRefreshTokenKeyName)
        localStorage.removeItem(jwtDefaultConfig.storageUserDataReLogin)
        localStorage.removeItem(jwtDefaultConfig.firebaseTokenUser)
      })
    }
  }, [socketService?.socket])

  return (
    <>
      {windowSize.width <= 339 ? (
        <AlertNotSupported>
          <h3>Device not supported!</h3>
        </AlertNotSupported>
      ) : (
        <div className="App">
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <RequiredAuth>
                    <Dashboard />
                  </RequiredAuth>
                }
              />
              <Route path="/set-avatar" element={<SetAvatar />} />
              <Route path="/auth/:path" element={<SignInContainer />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </Router>
          <AddUserModal />
          <AddRoomModal />
          <Load />
        </div>
      )}
    </>
  )
}

export default App
