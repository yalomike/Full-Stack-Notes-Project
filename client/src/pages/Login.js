import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/userprofile");
      }
    });
  };

  return (
    <div className="loginContainer text-center">
      <div className="loginBox row g-3">
        <label className="text-login text-black me-3 d-flex text-uppercase">
          Username
        </label>
        <input
          className="inputBox"
          placeholder="Jason Bolt"
          type="text"
          name="username"
          id="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <label className="text-login text-black me-3 d-flex text-uppercase mt-5">
          Password
        </label>
        <input
          className="inputBox"
          placeholder="Insert your password"
          type="password"
          name="password"
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="button mt-5 ">
          <button
            className="btn btn-primary fs-6 text-uppercase pt-3 pb-3 ps-5 pe-5"
            onClick={login}
          >
            Log in
          </button>
        </div>
      </div>

      <h6 className="mt-5">Forgot your password?</h6>
      <Link className="pt-3 text-primary h6 " to="/">
        Home
      </Link>
    </div>
  );
}

export default Login;
