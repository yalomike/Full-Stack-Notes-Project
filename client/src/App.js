import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Registration from "../src/pages/Registration";
import { useState } from "react";
import { AuthContext } from "./helpers/AuthContext";
import UserProfile from "./pages/UserProfile";
import Notes from "../src/pages/Notes";
import CreateNote from "./pages/CreateNote";
import Edit from "./pages/Edit";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/notes/:id" element={<Edit />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
