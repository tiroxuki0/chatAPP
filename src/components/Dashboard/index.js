import * as React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import Container from "@mui/material/Container"
import { useDispatch } from "react-redux"
import ListItems from "./listItems"
import ChatPage from "./ChatPage"
import styled from "styled-components"
import { setUsers, setMessages, setRooms } from "../../redux/dataSlice"
import useFirestore from "../../hooks/useFirestore"
import * as authActions from "../../redux/authSlice"
import instances from "../../@core/plugin/axios"
import jwtDefaultConfig from "../../@core/auth/jwt/jwtDefaultConfig"

const BoxStyled = styled(Box)`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const ListStyled = styled(List)`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000"
    }
  }
})

function DashboardContent() {
  const dispatch = useDispatch()
  const roomsFirestore = useFirestore("rooms")
  const usersFirestore = useFirestore("users")
  const messagesFirestore = useFirestore("messages")

  const getMyProfile = () => {
    instances.get("/user/profile").then((response) => {
      if (response?.data?.data) {
        const userData = response?.data?.data
        localStorage.setItem(jwtDefaultConfig.storageUserData, JSON.stringify({ ...userData }))
        dispatch(authActions.getUserProfile(userData))
      }
    })
  }

  React.useEffect(() => {
    if (roomsFirestore) {
      dispatch(setRooms(roomsFirestore))
    }
  }, [roomsFirestore])

  React.useEffect(() => {
    if (usersFirestore) {
      const newUsers = usersFirestore.map((user) => {
        return { ...user, password: null }
      })
      dispatch(setUsers(newUsers))
    }
  }, [usersFirestore])

  React.useEffect(() => {
    if (messagesFirestore) {
      dispatch(setMessages(messagesFirestore))
    }
  }, [messagesFirestore])

  React.useEffect(() => {
    getMyProfile()
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <div className="nav_bar" style={{ height: "100vh", width: "70px", background: "#2e2e2e" }}>
          <ListStyled component="nav">
            <ListItems />
          </ListStyled>
        </div>
        <BoxStyled
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
            flexGrow: 1,
            height: "100vh",
            width: "calc(100% - 70px)",
            overflow: "auto"
          }}
        >
          <Container maxWidth="xxl" disableGutters sx={{ overflow: "auto hidden" }}>
            <ChatPage />
          </Container>
        </BoxStyled>
      </Box>
    </ThemeProvider>
  )
}

export default function Dashboard() {
  return <DashboardContent />
}
