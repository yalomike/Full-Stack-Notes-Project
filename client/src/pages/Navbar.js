import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function BasicExample() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <Navbar bg="primary" expand="sm" fixed="top">
      <div className="ms-4">
        <Navbar.Brand className="text-white fs-5" href="#home">
          NotesApp
        </Navbar.Brand>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="ms-4">
          <Nav>
            <Nav.Link className="text-white" href="/userprofile">
              Home
            </Nav.Link>
            <Nav.Link className="text-white " href="/notes">
              Notes
            </Nav.Link>
            <Nav.Link className="text-white" href="/createnote">
              + New Note
            </Nav.Link>
          </Nav>
        </div>

        <Link to="/">
          <button className="logoutBtn btn btn-outline-light" onClick={logout}>
            Log out
          </button>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BasicExample;
