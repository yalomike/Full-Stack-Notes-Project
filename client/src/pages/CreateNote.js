import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasicExample from "./Navbar";

function CreateNote() {
  const [form, setForm] = useState({ title: "", text: "" });
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: "post",
      url: "http://localhost:3001/notes",
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
      data: form,
    });
    console.log(response);
    navigate("/userprofile");
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  // function addNote() {
  //     setNotes((note) => [...note, form]);
  //     setForm({ title: "", text: "" });
  //   };
  // }

  return (
    <>
      <div>
        <BasicExample />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="containerNotes">
              <form onSubmit={onSubmit} className="note">
                <label className="label d-flex text-black">Title:</label>
                <textarea
                  cols="50"
                  rows="1"
                  placeholder="Type your title here...."
                  maxLength="100"
                  onChange={handleChange}
                  value={form.title}
                  name="title"
                ></textarea>

                <div className="createnote__footer"></div>

                <hr />

                <label className="label mb-3 text-black ">Note Comment:</label>

                <div>
                  <textarea
                    cols="67"
                    rows="5"
                    placeholder="Type your note here...."
                    maxLength="100"
                    onChange={handleChange}
                    value={form.text}
                    name="text"
                  ></textarea>

                  <div className="createnote__footer">
                    <button type="submit" className="note__save">
                      Create
                    </button>
                    <Link className="note__save" to="/userprofile">
                      Home
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNote;

// <Formik
//   onSubmit={(event) => {
//     event.preventDefault();
//   }}
// >
//   <Form className="noteArea w-75">
//     <ErrorMessage name="name" component="span" />
//     <Field
//       className="inputTitle "
//       type="text"
//       id="title"
//       name="title"
//       placeholder="Ex. Michael..."
//       onChange={handleChange}
//     />

//     <label className="text-title row text-black text-uppercase position-relative ">
//       Note Comments
//     </label>
//     <ErrorMessage name="comments" component="span" />
//     <textarea
//       onChange={handleChange}
//       name="comments"
//       id=""
//       cols="30"
//       rows="4"
//     ></textarea>

//     <div>
//       <button
//         className="btnRegister btn btn-primary fs-6 text-uppercase pt-3 pb-3 ps-5 pe-5 mt-5"
//         type="submit"
//       >
//         Create
//       </button>
//       <br />
//       <div className="homeLabel">
//         <Link className="text-primary h6" to="/userprofile">
//           Home
//         </Link>
//       </div>
//     </div>
//   </Form>
// </Formik>
