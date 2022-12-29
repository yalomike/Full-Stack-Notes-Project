import React, { useState } from "react";
import background from "../images/1.jpg";
import { Link } from "react-router-dom";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("isLoggedIn");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="container">
      <div className="boxIntro">
        <img
          className="bg-image img-fluid"
          src={background}
          alt="background "
        />
        {!authState.status ? (
          <>
            <Link to="/login">
              <button className="btnCont">
                <div className="loginText text-black h4">Log in</div>
              </button>
            </Link>

            <Link to="/registration">
              <button className="btnCont2">
                <div className="signinText text-black h4">Sign in</div>
              </button>
            </Link>
          </>
        ) : (
          <Link to="/">
            <button className="logoutBtn btn btn-primary" onClick={logout}>
              Log out
            </button>
          </Link>
        )}
      </div>
      {/* <div>{!changeLogin ? <Login /> : <Registration />}</div> */}
    </div>
  );
}

export default Home;
