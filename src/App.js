import "./App.css";
import Home from "./Home";
import Error from "./Error";
import Header from "./components/Header";
import DataTable from "./components/DataTable";
import SignInContainer from "./components/SignInContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<DataTable />} />
          <Route path="/auth/:path" element={<SignInContainer />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
