import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  let navigate = useNavigate();

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
    <div className="containerRegistration">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formArea gap-4 w-50">
          <label className="text-login row text-black mb-2 ms-0 d-flex text-uppercase position-absolute me-5 mt-2">
            Name
          </label>
          <ErrorMessage name="name" component="span" />
          <Field
            className="inputRegister "
            type="name"
            id="inputNamePost"
            name="name"
            placeholder="Ex. Michael..."
          />

          <label className="text-login row text-black mb-2 ms-0 d-flex text-uppercase position-absolute me-5 mt-2">
            Lastname
          </label>
          <ErrorMessage name="lastname" component="span" />
          <Field
            className="inputRegister "
            type="lastname"
            id="inputLastNamePost"
            name="lastname"
            placeholder="Ex. Jordan..."
          />

          <label className="text-login row text-black mb-2 ms-0 d-flex text-uppercase position-absolute me-5 mt-2">
            Username
          </label>
          <ErrorMessage name="username" component="span" />
          <Field
            className="inputRegister "
            type="username"
            id="inputCreatePost"
            name="username"
            placeholder="Ex. John123..."
          />

          <label className="text-login row text-black mb-2 ms-0 me-5 d-flex text-uppercase position-absolute mt-2 ">
            Password
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
              className="btnRegister btn btn-primary fs-6 text-uppercase pt-3 pb-3 ps-5 pe-5 mt-5"
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
  );
}

export default Registration;
