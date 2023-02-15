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
        <div className="Title">
          <h2>Welcome back</h2>
          <h6>Please enter your details</h6>
        </div>
        <label className="text-login text-black me-3 d-flex text-uppercase mt-5">
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
        <div className="mt-5">
          <input type="checkbox" />
          <span className="ms-3 text-remember">Remember for 30 days</span>
          <span className="ms-3 text-remember text-primary">
            Forgot password?
          </span>
        </div>
        <div className="button mt-5">
          <button
            className="btn btn-primary fs-6 text-uppercase pt-2 pb-2 ps-5 pe-5 w-100"
            onClick={login}
          >
            Sign in
          </button>
        </div>
      </div>

      <div className="container ms-5">
        <h6 className="mt-5">
          Don't have an account?{" "}
          <Link className="pt-3 text-danger h6 ms-4" to="/registration">
            Sign up
          </Link>
        </h6>
      </div>
    </div>
  );
}

export default Login;
