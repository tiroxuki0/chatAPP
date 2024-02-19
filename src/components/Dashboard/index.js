import * as React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import Container from "@mui/material/Container"
import { useDispatch } from "react-redux"
import ListItems from "./listItems"
import ChatPage from "./ChatPage"
import styledd from "styled-components"
import { setUsers, setMessages, setRooms } from "../../redux/dataSlice"
import useFirestore from "../../hooks/useFirestore"

const BoxStyled = styledd(Box)`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px
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

const ListStyled = styledd(List)`
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
