import "./App.css";
import Dashboard from "./components/Dashboard";
import Error from "./Error";
import SignInContainer from "./components/SignInContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Dashboard/Users";
import Home from "./components/Dashboard/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="/auth/:path" element={<SignInContainer />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
