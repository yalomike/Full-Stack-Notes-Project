import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import background1 from "../images/cody-scott-milewski-3j4AG5-VQVs-unsplash.jpg";
import background2 from "../images/eric-barrett-kU9oLfenU3Y-unsplash.jpg";
import background3 from "../images/casey-horner-1sim8ojvCbE-unsplash.jpg";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15),
    password: Yup.string().min(4).max(20),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
    alert("You registered your user.");
  };

  return (
    <>
      <div className="container2">
        <div className="container bg-white">
          <div className="row">
            <div className="col-6">
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
                  <div className="carousel-item active">
                    <img
                      className="d-flex w-100 bg-dark"
                      src={background1}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-flex w-100"
                      src={background2}
                      alt="Second slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-flex w-100"
                      src={background3}
                      alt="Second slide"
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

            {/* <div className="row d-flex justify-content-end position-absolute">
              <div className="col-6">
                {!authState.status ? (
                  <>
                    <Login />
                  </>
                ) : (
                  <Link to="/">
                    <button
                      className="logoutBtn btn btn-primary"
                      onClick={logout}
                    >
                      Log out
                    </button>
                  </Link>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="container d-flex position-absolute ">
        <div className="containerRegistration ">
          <div className="row">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="formArea w-50">
                <div className="Title">
                  <h2>Sign up</h2>
                  <h6>Please enter your details</h6>
                </div>

                <label className="text-login text-blackd-flex mt-4">
                  Name*
                </label>

                <div className="containerAs">
                  <div className="row">
                    <div className="col">
                      <ErrorMessage name="name" component="span" />
                      <Field
                        className="inputRegister"
                        type="name"
                        id="inputNamePost"
                        name="name"
                        placeholder="Ex. Michael..."
                      />
                    </div>
                  </div>
                </div>
                <label className="text-login row text-black mb-2 ms-0 d-flex  me-5 mt-2">
                  Lastname*
                </label>
                <ErrorMessage name="lastname" component="span" />
                <Field
                  className="inputRegister "
                  type="lastname"
                  id="inputLastNamePost"
                  name="lastname"
                  placeholder="Ex. Jordan..."
                />

                <label className="text-login row text-black mb-2 ms-0 d-flex me-5 mt-2">
                  Username*
                </label>
                <ErrorMessage name="username" component="span" />
                <Field
                  className="inputRegister "
                  type="username"
                  id="inputCreatePost"
                  name="username"
                  placeholder="Ex. John123..."
                />

                <label className="text-login row text-black mb-2 ms-0 me-5 d-flex  mt-2 ">
                  Password*
                </label>
                <ErrorMessage name="password" component="span" />
                <Field
                  className=" inputRegister "
                  type="password"
                  id="passwordCreatePost"
                  name="password"
                  placeholder="Your Password..."
                />
                <div>
                  <button
                    className="btnRegister btn btn-primary fs-6 text-uppercase pt-2 pb-2 ps-5 pe-5 mt-5 w-50"
                    type="submit"
                  >
                    Register
                  </button>
                  <br />
                  <div className="homeTag">
                    <Link className="text-primary h6" to="/">
                      Home
                    </Link>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
