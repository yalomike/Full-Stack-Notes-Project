import React, { useEffect, useState } from "react";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillMessage,
  AiFillGithub,
} from "react-icons/ai";
import michael from "../images/michael.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import BasicExample from "./Navbar";

function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState([]);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    const getAuth = async () => {
      const response = await axios.get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    };
    getAuth();
  }, []);

  console.log(authState);

  return (
    <>
      <BasicExample />

      <div className="user-container w-25 mt-5">
        <div className="user-box">
          <div className="welcome-user ms-2 pt-3 text-primary">
            <h1 className="text-center">Welcome {authState.username}</h1>
          </div>
          <div className="col">
            {authState.status && (
              <h1 className="login text-black pb-3 pt-3 text-center">
                Fullstack Project
              </h1>
            )}
            {authState.status && (
              <h3 className="text-black text-center pt-2">
                Michael Yalovetzky
              </h3>
            )}
            {authState.status && (
              <h4 className="text-black text-center">Web Developer</h4>
            )}
            <div className="d-flex justify-content-center ">
              <a className="fs-1 me-3" href="https://twitter.com/mikeyalo">
                <AiFillTwitterCircle />
              </a>
              <a
                className="fs-1 me-3"
                href="https://www.linkedin.com/in/michael-yalovetzky/"
              >
                <AiFillLinkedin />
              </a>
              <a className="fs-1 me-3" href="https://github.com/yalomike">
                <AiFillGithub />
              </a>
              <a className="fs-1 me-3" href="mailto=myalo12@gmail.com">
                <AiFillMessage />
              </a>
            </div>
            {authState.status && (
              <img
                className="bg-primary img-fluid rounded float-center mt-3 w-100"
                src={michael}
                alt="michael"
              />
            )}

            <div className="mt-1 mb-4 pb-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
