import "./App.css";
import Dashboard from "./components/Dashboard";
import Error from "./Error";
import SignInContainer from "./components/SignInContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRoomModal from "./components/Modals/AddRoom";
import AddUserModal from "./components/Modals/AddUser";
import useWindowSize from "./hooks/useWindowSize";
import styled from "styled-components";

const AlertNotSupported = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    font-weight: 600;
  }
`;

function App() {
  const windowSize = useWindowSize();

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
              <Route path="/" element={<Dashboard />}>
                {/* <Route path="/" element={<Home />} /> */}
              </Route>
              <Route path="/sign-in" element={<SignInContainer />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </Router>
          <AddUserModal />
          <AddRoomModal />
        </div>
      )}
    </>
  );
}

export default App;
