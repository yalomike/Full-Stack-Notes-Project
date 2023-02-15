import React, { useState } from "react";
import background1 from "../images/cody-scott-milewski-3j4AG5-VQVs-unsplash.jpg";
import { Link } from "react-router-dom";
import Login from "./Login";

function Home() {
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
    <div className="container bg-white">
      <div className="row">
        <div className="col-6 ">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active d-none d-sm-block">
                <img
                  className="d-flex w-100"
                  src={background1}
                  alt="First slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="row d-flex justify-content-end position-absolute">
          <div className="col-6">
            {!authState.status ? (
              <>
                <Login />
              </>
            ) : (
              <Link to="/">
                <button className="logoutBtn btn btn-primary" onClick={logout}>
                  Log out
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
